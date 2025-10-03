import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FaClipboardList } from 'react-icons/fa';


const Navbar = () => {
  const { authenticatedUserDetails, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="flex justify-between items-center bg-gray-200 text-gray-800 shadow-md py-4 px-6">
         <div className="flex items-center space-x-2 text-3xl font-extrabold">
        <FaClipboardList className="text-blue-500 text-4xl" /> 
        <h2 className="text-blue-500 transition-transform transform hover:scale-110">
        QuickCV
        </h2>
      </div>

      {authenticatedUserDetails && (
        <div className=" md:flex md:items-center md:gap-6 lg:flex lg:items-center lg:gap-8">
          <div className="hidden md:block lg:block text-3xl cursor-pointer hover:text-gray-600 transition duration-200">
            <p className="text-xl font-extralight">
              Welcome{" "}
              <span className="font-bold text-gray-800">
                {authenticatedUserDetails.username}!
              </span>
            </p>
          </div>
          <div className="">
            <button
              onClick={handleLogout}
              className="w-full bg-black hover:bg-gray-800 text-white text-md px-3 py-2 rounded-lg transition-colors duration-200"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


