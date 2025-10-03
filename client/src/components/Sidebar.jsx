import SidebarComponent from "./SidebarComponent";
import PropTypes from "prop-types";
import { FiLayout } from "react-icons/fi";
import { CiUser } from "react-icons/ci";
import { RiGraduationCapLine } from "react-icons/ri";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import { CiTrophy } from "react-icons/ci";
import { IoLanguage } from "react-icons/io5";
import { FiUserCheck } from "react-icons/fi";
import { CiShare2 } from "react-icons/ci";

const sidebarItems = [
  { icon: <FiLayout />, title: "Template", formType: "template" },
  {icon: <FiLayout />, title: "Profile Image", formType: "profileImage" },
  { icon: <CiUser />, title: "About", formType: "about" },
  { icon: <RiGraduationCapLine />, title: "Education", formType: "education" },
  { icon: <IoBriefcaseOutline />, title: "Experience", formType: "experience" },
  { icon: <FaTasks />, title: "Projects", formType: "projects" },
  { icon: <GoLightBulb />, title: "Skills", formType: "skills" },
  { icon: <CiTrophy />, title: "Achievements", formType: "achievements" },
  { icon: <IoLanguage />, title: "Language", formType: "language" },
  // { icon: <FiUserCheck />, title: "References", formType: "references" },
  { icon: <CiShare2 />, title: "Share CV", formType: "share" },
];

const Sidebar = ({ onItemClick }) => {
  return (
    <div className="w-full overflow-x-auto px-4 hide-scrollbar">
      <div className="flex justify-center">
        <div className="flex max-w-[80vw] gap-8 whitespace-nowrap">
          {sidebarItems.map(({ icon, title, formType }) => (
            <div key={formType}>
              <SidebarComponent
                icon={icon}
                title={title}
                onClick={() => onItemClick(formType)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default Sidebar;
