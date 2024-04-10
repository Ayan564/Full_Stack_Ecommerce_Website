import { useState } from "react"; // Importing useState hook from React for managing component state
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice"; // Importing mutation and query hooks from Redux API slice for category management
import { toast } from "react-toastify"; // Importing toast notification library for displaying feedback messages
import CategoryForm from "../../components/CategoryForm"; // Importing CategoryForm component for category input
import Modal from "../../components/Modal"; // Importing Modal component for displaying a modal window
import AdminMenu from "./AdminMenu"; // Importing AdminMenu component for navigation within the admin panel

// Component for managing categories in the admin panel
const CategoryList = () => {
  // Fetch categories data using useFetchCategoriesQuery hook
  const { data: categories } = useFetchCategoriesQuery();

  // State variables for managing category data and modal visibility
  const [name, setName] = useState(""); // State variable for category name input
  const [selectedCategory, setSelectedCategory] = useState(null); // State variable for selected category
  const [updatingName, setUpdatingName] = useState(""); // State variable for updated category name input
  const [modalVisible, setModalVisible] = useState(false); // State variable for modal visibility

  // Mutation hooks for CRUD operations on categories
  const [createCategory] = useCreateCategoryMutation(); // Mutation hook for creating a category
  const [updateCategory] = useUpdateCategoryMutation(); // Mutation hook for updating a category
  const [deleteCategory] = useDeleteCategoryMutation(); // Mutation hook for deleting a category

  // Handler function to create a new category
  const handleCreateCategory = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior

    if (!name) {
      // Validation check: If category name is empty, display error toast
      toast.error("Category name is required");
      return;
    }

    try {
      // Attempting to create a new category using the createCategory mutation hook
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        // If there's an error, display error toast
        toast.error(result.error);
      } else {
        // If successful, clear category name input and display success toast
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      // Catching and logging any errors that occur during category creation
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  // Handler function to update an existing category
  const handleUpdateCategory = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior

    if (!updatingName) {
      // Validation check: If updated category name is empty, display error toast
      toast.error("Category name is required");
      return;
    }

    try {
      // Attempting to update the selected category using the updateCategory mutation hook
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        // If there's an error, display error toast
        toast.error(result.error);
      } else {
        // If successful, reset state variables, clear input, and close modal
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      // Catching and logging any errors that occur during category update
      console.error(error);
    }
  };

  // Handler function to delete a category
  const handleDeleteCategory = async () => {
    try {
      // Attempting to delete the selected category using the deleteCategory mutation hook
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        // If there's an error, display error toast
        toast.error(result.error);
      } else {
        // If successful, reset state variables and close modal
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      // Catching and logging any errors that occur during category deletion
      console.error(error);
      toast.error("Category deletion failed. Try again.");
    }
  };

  // Render component
  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      {/* Render AdminMenu component for navigation */}
      <AdminMenu />

      {/* Category management section */}
      <div className="md:w-3/4 p-3">
        {/* Title */}
        <div className="h-12">Manage Categories</div>

        {/* Form for creating a new category */}
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        {/* Display categories */}
        <div className="flex flex-wrap">
          {/* Map through categories and render a button for each */}
          {categories?.map((category) => (
            <div key={category._id}>
              {/* Button to select a category */}
              <button
                className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    // When clicked, set modal visibility, selected category, and updating name
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>

        {/* Modal for updating and deleting category */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          {/* CategoryForm component for updating and deleting category */}
          <CategoryForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateCategory}
            buttonText="Update"
            handleDelete={handleDeleteCategory}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CategoryList;
