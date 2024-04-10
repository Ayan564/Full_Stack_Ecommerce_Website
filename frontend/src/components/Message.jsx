// Message Component
// This component renders a message box with different background and text colors based on the provided variant.
// Props:
// - variant: The variant of the message box. Possible values are "success", "error", or any other value (default).
// - children: The content to be displayed inside the message box.
const Message = ({ variant, children }) => {
  // Function to determine the CSS classes based on the variant
  const getVariantClass = () => {
    switch (variant) {
      case "success":
        return "bg-green-100 text-green-800"; // Green background and text for success messages
      case "error":
        return "bg-red-100 text-red-800"; // Red background and text for error messages
      default:
        return "bg-blue-100 text-blue-800"; // Default background and text colors for other variants
    }
  };

  // Render the message box with appropriate styles based on the variant
  return <div className={`p-4 rounded ${getVariantClass()}`}>{children}</div>;
};

export default Message;
