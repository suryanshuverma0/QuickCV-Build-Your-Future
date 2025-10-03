import PropTypes from "prop-types";
const SidebarComponent = ({  title, onClick }) => {
  return (
    <>
      <div
        onClick={onClick}
        className="flex flex-col justify-center items-center shadow-sm rounded-xl hover:bg-gray-200 w-32 h-10 p-1 text-blue-600 bg-blue-50 transition-colors delay-100 cursor-pointer"
      >
        {/* <span className="text-sm">{icon}</span> */}
        <h1 className="text-md">{title}</h1>
      </div>
    </>
  );
};

SidebarComponent.propTypes = {
  // icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
export default SidebarComponent;
