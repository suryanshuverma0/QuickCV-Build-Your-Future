import PropTypes from "prop-types";
import AboutForm from "../Forms/AboutForm";
import EducationForm from "../Forms/EducationForm";
import ExperienceForm from "../Forms/ExperienceForm";
import ProjectForm from "../Forms/ProjectForm";
import SkillForm from "../Forms/SkillForm";
import AchievementForm from "../Forms/AchievementForm";
import LanguageForm from "../Forms/LanguageForm";
// import ReferenceForm from "../Forms/ReferenceForm";
import TemplateForm from "../Forms/TemplateForm";
import ShareForm from "../Forms/ShareForm";
import ProfileImageForm from "../Forms/ProfileImageForm";

const Form = ({ activeForm, onItemClick }) => {
  let formToDisplay;

  switch (activeForm) {
    case "about":
      formToDisplay = <AboutForm onItemClick={onItemClick} />;
      break;
    case "profileImage":
      formToDisplay = <ProfileImageForm onItemClick={onItemClick} />;
      break;
    case "education":
      formToDisplay = <EducationForm onItemClick={onItemClick} />;
      break;
    case "experience":
      formToDisplay = <ExperienceForm onItemClick={onItemClick} />;
      break;
    case "projects":
      formToDisplay = <ProjectForm onItemClick={onItemClick} />;
      break;
    case "skills":
      formToDisplay = <SkillForm onItemClick={onItemClick} />;
      break;
    case "achievements":
      formToDisplay = <AchievementForm onItemClick={onItemClick} />;
      break;
    case "language":
      formToDisplay = <LanguageForm onItemClick={onItemClick} />;
      break;
    // case "references":
    //   formToDisplay = <ReferenceForm onItemClick={onItemClick} />;
    //   break;
    case "share":
      formToDisplay = <ShareForm onItemClick={onItemClick} />;
      break;
    default:
      formToDisplay = <TemplateForm onItemClick={onItemClick} />;
      break;
  }

  return <div className="max-w-4xl w-full">{formToDisplay}</div>;
};
Form.propTypes = {
  activeForm: PropTypes.string,
  onItemClick: PropTypes.func,
};
export default Form;
