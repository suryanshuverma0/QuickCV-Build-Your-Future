// import PropTypes from "prop-types";

// const Button = ({text, type, onClick}) => {
//   return (
//     <button type={type} onClick={onClick}
//       className="g-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 transition ease-in-out duration-200"
//     >
//       {text}
//     </button>
//   );
// };

// Button.propTypes = {
//   text: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
//   onClick: PropTypes.func,
// };
// export default Button;


import PropTypes from "prop-types";
import clsx from "clsx";

const Button = ({ text, type, onClick, variant = "black", disabled = false, isLoading = false }) => {
  const baseStyles =
    "text-white text-sm py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2";

  const variants = {
    black: "bg-black hover:bg-gray-800 focus:ring-gray-500",
    green: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
    red: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(
        baseStyles,
        variants[variant],
        (disabled || isLoading) && "bg-gray-300 cursor-not-allowed"
      )}
    >
      {isLoading ? "Loading..." : text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string, // "button" | "submit" | "reset"
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["black", "green", "red"]),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default Button;
