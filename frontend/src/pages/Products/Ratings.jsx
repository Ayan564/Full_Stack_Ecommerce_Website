import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa"; // Importing star icons from react-icons/fa library

// Component for displaying ratings with stars
const Ratings = ({ value, text, color }) => {
  // Calculating the number of full stars, half stars, and empty stars
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStars - halfStars;

  // Rendering the component
  return (
    <div className="flex items-center">
      {/* Rendering full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className={`text-${color} ml-1`} />
      ))}
      {/* Rendering half star if necessary */}
      {halfStars === 1 && <FaStarHalfAlt className={`text-${color} ml-1`} />}
      {/* Rendering empty stars */}
      {[...Array(emptyStar)].map((_, index) => (
        <FaRegStar key={index} className={`text-${color} ml-1`} />
      ))}
      {/* Displaying the rating text if provided */}
      <span className={`rating-text ml-2 text-${color}`}>{text && text}</span>
    </div>
  );
};

// Default props for the Ratings component
Ratings.defaultProps = {
  color: "yellow-500", // Default color for the stars
};

export default Ratings; // Exporting the Ratings component as the default export
