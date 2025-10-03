import PropTypes from "prop-types";
import FormTitle from "../components/FormTitle";
import { useState, useContext, useEffect, useCallback } from "react";
import AddExperience from "../components/AddExperience";
import { IoIosAdd } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { resumeAPI } from "../api/apiService";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import { AiOutlineDelete } from "react-icons/ai";
import ShowExperienceDetails from "../components/ShowExperienceData";

const ExperienceForm = ({ onItemClick }) => {
  const { logout, decodedToken } = useContext(AuthContext);
  const [experiences, setExperiences] = useState([
    {
      id: Date.now(),
      jobTitle: "",
      organization: "",
      city: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      summary: "",
    },
  ]);

  const [experienceIdToUpdate, setExperienceIdToUpdate] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [experienceData, setExperienceData] = useState(null);

  const getExperienceDetail = async (id) => {
    try {
      const response = await resumeAPI.getExperienceDetail(id);
      const data = response.data;
      console.log("Experience detail fetched:", data);

      setExperiences([
        {
          jobTitle: data.jobTitle,
          organization: data.organization,
          city: data.city,
          startDate: data.startDate,
          endDate: data.endDate,
          currentlyWorking: data.currentlyWorking,
          summary: data.summary,
        },
      ]);
      setExperienceIdToUpdate(data._id);
    } catch (error) {
      console.error("Error fetching experience detail:", error);
      toast.error("Error fetching experience detail");
    }
  };

  const updateExperienceData = async () => {
    try {
      const response = await resumeAPI.updateExperience(
        experienceIdToUpdate,
        experiences[0]
      );
      console.log("Experience updated:", response.data);

      toast.success("Experience updated successfully!");
      setIsEditing(false);

      // Reset form
      setExperiences([
        {
          id: Date.now(),
          jobTitle: "",
          organization: "",
          city: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          summary: "",
        },
      ]);

      // Refresh the experience list
      fetchExperienceData();
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const deleteExperienceFormData = async (id) => {
    try {
      await resumeAPI.deleteExperience(id);
      toast.success("Experience deleted successfully!");
      fetchExperienceData(); // Refresh the experience list
    } catch (error) {
      console.error("Error deleting experience:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          logout();
        }, 1000);
      } else {
        toast.error("Error deleting experience");
      }
    }
  };

  const fetchExperienceData = useCallback(async () => {
    try {
      const response = await resumeAPI.getExperience();
      console.log("Experience data fetched:", response.data);
      setExperienceData(response.data);
    } catch (error) {
      console.error("Error fetching experience details:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          logout();
        }, 1000);
      } else {
        toast.error("Error fetching experience details");
      }
    }
  }, [logout]);

  useEffect(() => {
    if (decodedToken) {
      fetchExperienceData();
    }
  }, [decodedToken, fetchExperienceData]);

  const handleAddExperience = () => {
    setExperiences((prevExperiences) => [
      ...prevExperiences,
      {
        id: Date.now(),
        jobTitle: "",
        organization: "",
        city: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        summary: "",
      },
    ]);
  };

  const handleInputChange = (id, field, value) => {
    setExperiences((prevExperiences) =>
      prevExperiences.map((experience) =>
        experience.id === id ? { ...experience, [field]: value } : experience
      )
    );
  };

  const handleDeleteExperience = (id) => {
    setExperiences((prevExperiences) =>
      prevExperiences.filter((experience) => experience.id !== id)
    );
  };

  const handleSave = async () => {
    const isValid = experiences.every((experience) => {
      const hasRequiredFields =
        experience.jobTitle &&
        experience.organization &&
        experience.city &&
        experience.startDate;
      const isEndDateValid = experience.currentlyWorking || experience.endDate;
      return hasRequiredFields && isEndDateValid;
    });

    if (!isValid) {
      toast.error("Please fill all the required fields and check your dates!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      const response = await resumeAPI.addExperience({ experiences });
      console.log("Experience saved:", response.data);

      toast.success("Experience saved successfully!");

      // Reset form
      setExperiences([
        {
          id: Date.now(),
          jobTitle: "",
          organization: "",
          city: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          summary: "",
        },
      ]);

      // Refresh the experience list
      fetchExperienceData();
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Error saving data!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <div className="h-[1000px] overflow-y-auto">
        <div className="pl-4">
          <FormTitle
            title="Experience"
            description="Please share your career history, including a brief overview of each role you held."
          />
        </div>

        <ul className="flex flex-col gap-3 items-center">
          {experienceData &&
            experienceData.map((data) => {
              return (
                <ShowExperienceDetails
                  key={data._id}
                  value={data}
                  onEdit={getExperienceDetail}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  onDelete={deleteExperienceFormData}
                  n
                />
              );
            })}
        </ul>

        <div className="mt-8">
          {experiences.map((experience) => (
            <div key={experience.id} className="relative">
              <AddExperience
                experience={experience}
                onInputChange={handleInputChange}
              />
              <button
                onClick={() => handleDeleteExperience(experience.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                aria-label="Delete experience"
              >
                <AiOutlineDelete size={24} />
              </button>
            </div>
          ))}
        </div>

        <div
          onClick={handleAddExperience}
          className="mt-8 flex items-center text-lg gap-2 text-blue-400 font-semibold cursor-pointer hover:underline"
        >
          <span>
            <IoIosAdd />
          </span>
          <p>Add Experience</p>
        </div>

        <div className="m-8 flex justify-end">
          <Button
            text={isEditing ? "Update" : "Save"}
            type="button"
            onClick={
              isEditing ? () => updateExperienceData() : () => handleSave()
            }
          />
        </div>

        <div className="flex justify-between items-center p-4 my-4">
          <button
            className="bg-white hover:bg-neutral-800 hover:text-white transition-colors delay-100 border-black border-2 text-black text-sm py-2 px-4 rounded"
            onClick={() => onItemClick("education")}
          >
            Back
          </button>

          <button
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm py-2 px-4 rounded transition-colors delay-100"
            onClick={() => onItemClick("projects")}
          >
            Continue to Projects
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

ExperienceForm.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default ExperienceForm;
