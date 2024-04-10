// Modal Component
// This component renders a modal dialog box.
// Props:
// - isOpen: A boolean value indicating whether the modal is open or not.
// - onClose: A function to close the modal when triggered.
// - children: The content to be displayed inside the modal.
const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Render modal only if isOpen is true */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay to darken the background */}
          <div className="fixed inset-0 bg-black opacity-50"></div>
          {/* Modal content */}
          <div className="absolute top-[40%] right-[50%] bg-white p-4 rounded-lg z-10 text-right">
            {/* Close button */}
            <button
              className="text-black font-semibold hover:text-gray-700 focus:outline-none mr-2"
              onClick={onClose}
            >
              X {/* Close icon */}
            </button>
            {/* Content inside the modal */}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
