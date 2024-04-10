import { useState } from "react"; // Importing useState hook from React for managing component state
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom for programmatic navigation
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice"; // Importing mutation hooks from Redux API slice for creating product and uploading product image
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice"; // Importing query hook from Redux API slice for fetching categories
import { toast } from "react-toastify"; // Importing toast notification library for displaying feedback messages
import AdminMenu from "./AdminMenu"; // Importing AdminMenu component for navigation within the admin panel

// Component for creating a new product in the admin panel
const ProductList = () => {
  // State variables for managing product data
  const [image, setImage] = useState(""); // State variable for product image
  const [name, setName] = useState(""); // State variable for product name
  const [description, setDescription] = useState(""); // State variable for product description
  const [price, setPrice] = useState(""); // State variable for product price
  const [category, setCategory] = useState(""); // State variable for product category
  const [quantity, setQuantity] = useState(""); // State variable for product quantity
  const [brand, setBrand] = useState(""); // State variable for product brand
  const [stock, setStock] = useState(0); // State variable for product stock
  const [imageUrl, setImageUrl] = useState(null); // State variable for image URL
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  // Mutation hooks for uploading product image and creating product
  const [uploadProductImage] = useUploadProductImageMutation(); // Mutation hook for uploading product image
  const [createProduct] = useCreateProductMutation(); // Mutation hook for creating product
  const { data: categories } = useFetchCategoriesQuery(); // Query hook for fetching categories

  // Handler function for form submission to create a new product
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior

    try {
      // Creating form data with product information
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      // Calling the createProduct mutation hook to create the product
      const { data } = await createProduct(productData);

      if (data.error) {
        // If there's an error, display error toast
        toast.error("Product create failed. Try Again.");
      } else {
        // If successful, display success toast and navigate to home page
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      // Catching and logging any errors that occur during product creation
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };

  // Handler function for uploading product image
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      // Calling the uploadProductImage mutation hook to upload product image
      const res = await uploadProductImage(formData).unwrap();
      // Displaying success toast and updating image URL state
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      // Catching and displaying error toast if upload fails
      toast.error(error?.data?.message || error.error);
    }
  };

  // Render component
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      {/* Admin menu for navigation */}
      <div className="flex flex-col md:flex-row">
        <AdminMenu />

        {/* Form for creating a new product */}
        <div className="md:w-3/4 p-3">
          <div className="h-12">Create Product</div>

          {/* Display uploaded image */}
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          {/* Input for uploading product image */}
          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-white"}
              />
            </label>
          </div>

          {/* Form inputs for product details */}
          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="price">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="quantity">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="brand">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="description" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            {/* Form inputs for stock and category */}
            <div className="flex justify-between">
              <div>
                <label htmlFor="stock">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="category">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {/* Mapping through categories and rendering options */}
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
