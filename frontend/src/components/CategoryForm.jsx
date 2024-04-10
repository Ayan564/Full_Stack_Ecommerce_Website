const CategoryForm = ({
  value, // The current value of the input field for category name.
  setValue, // A function to update the value of the input field.
  handleSubmit, // A function to handle form submission.
  buttonText = "Submit", // Text to be displayed on the submit button. Default value is "Submit".
  handleDelete, // Optional. A function to handle category deletion.
}) => {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="py-3 px-4 border rounded-lg w-full"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)} // Update the value of the input field when it changes.
        />

        <div className="flex justify-between">
          <button className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50">
            {buttonText}
          </button>

          {handleDelete && ( // Render the delete button only if the handleDelete function is provided.
            <button
              onClick={handleDelete} // Call the handleDelete function when the delete button is clicked.
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 foucs:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
