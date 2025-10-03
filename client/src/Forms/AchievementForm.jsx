import PropTypes from "prop-types";
import FormTitle from "../components/FormTitle";
import { useState, useContext, useEffect, useCallback } from "react";
import AddAchievements from "../components/AddAchievements";
import { IoIosAdd } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import { resumeAPI } from "../api/apiService";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";
import Button from "../components/Button";
import ShowAchievementFormDetails from "../components/ShowAchievementFormDetails";

const AchievementForm = ({ onItemClick }) => {
  const { logout, decodedToken } = useContext(AuthContext);

  const [achievements, setAchievements] = useState([
    {
      id: Date.now(),
      title: "",
      summary: "",
      link: "",
    },
  ]);

  const [achievementIdToUpdate, setAchievementIdToUpdate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [achievementData, setAchievementData] = useState([]);

  // Fetch all achievements
  const fetchAchievementData = useCallback(async () => {
    try {
      const response = await resumeAPI.getAchievements();
      setAchievementData(response.data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => logout(), 1000);
      } else {
        toast.error("Error fetching achievement data.");
      }
    }
  }, [logout]);

  useEffect(() => {
    if (decodedToken) fetchAchievementData();
  }, [decodedToken, fetchAchievementData]);

  // Fetch single achievement detail for editing
  const getAchievementData = async (id) => {
    try {
      const response = await resumeAPI.getAchievementDetail(id);
      const data = response.data;
      setAchievements([
        {
          id: Date.now(),
          title: data.title,
          summary: data.summary,
          link: data.link,
        },
      ]);
      setAchievementIdToUpdate(data._id);
      setIsEditing(true);
    } catch (error) {
      console.error("Error fetching achievement detail:", error);
      toast.error("Error fetching achievement detail.");
    }
  };

  // Add / Save achievements
  const handleSave = async () => {
    if (achievements.length === 0) {
      toast.error("Please add achievements to save!");
      return;
    }

    try {
      const response = await resumeAPI.addAchievement({ achievements });
      toast.success("Achievements saved successfully!");
      setAchievements([
        {
          id: Date.now(),
          title: "",
          summary: "",
          link: "",
        },
      ]);
      fetchAchievementData();
    } catch (error) {
      console.error("Error saving achievements:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => logout(), 1000);
      } else {
        toast.error(error.response?.data?.message || "Error saving achievements!");
      }
    }
  };

  // Update achievement
  const updateAchievementData = async () => {
    if (!achievementIdToUpdate) return;

    try {
      const response = await resumeAPI.updateAchievement(
        achievementIdToUpdate,
        achievements[0]
      );
      toast.success("Achievement updated successfully!");
      setIsEditing(false);
      setAchievements([
        {
          id: Date.now(),
          title: "",
          summary: "",
          link: "",
        },
      ]);
      fetchAchievementData();
    } catch (error) {
      console.error("Error updating achievement:", error);
      toast.error(error.response?.data?.message || "Error updating achievement!");
    }
  };

  // Delete achievement
  const deleteAchievementDetail = async (id) => {
    try {
      await resumeAPI.deleteAchievement(id);
      toast.success("Achievement deleted successfully!");
      fetchAchievementData();
    } catch (error) {
      console.error("Error deleting achievement:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => logout(), 1000);
      } else {
        toast.error("Error deleting achievement!");
      }
    }
  };

  // Add new achievement field
  const handleAddAchievements = () => {
    setAchievements((prev) => [
      ...prev,
      { id: Date.now(), title: "", summary: "", link: "" },
    ]);
  };

  // Input change handler
  const handleInputChange = (id, field, value) => {
    setAchievements((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Delete achievement input field
  const handleDeleteAchievements = (id) => {
    setAchievements((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="h-[1000px] overflow-y-auto">
        <div className="pl-4">
          <FormTitle
            title="Achievements"
            description="Include your key achievements and notable projects to enhance your profile."
          />
        </div>

        <ul className="flex flex-col gap-3 items-center">
          {achievementData.map((data) => (
            <ShowAchievementFormDetails
              key={data._id}
              value={data}
              onEdit={getAchievementData}
              onDelete={deleteAchievementDetail}
            />
          ))}
        </ul>

        <div className="mt-8">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="relative">
              <AddAchievements
                achievement={achievement}
                onInputChange={handleInputChange}
              />
              <button
                onClick={() => handleDeleteAchievements(achievement.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                aria-label="Delete achievement"
              >
                <AiOutlineDelete size={24} />
              </button>
            </div>
          ))}
        </div>

        <div
          onClick={handleAddAchievements}
          className="mt-8 flex items-center text-lg gap-2 text-blue-400 font-semibold cursor-pointer hover:underline"
        >
          <IoIosAdd />
          <p>Add Achievement</p>
        </div>

        <div className="m-8 flex justify-end">
          <Button
            text={isEditing ? "Update" : "Save"}
            type="button"
            onClick={isEditing ? updateAchievementData : handleSave}
          />
        </div>

        <div className="flex justify-between items-center p-4 my-4">
          <button
            className="bg-white hover:bg-neutral-800 hover:text-white transition-colors delay-100 border-black border-2 text-black text-sm py-2 px-4 rounded"
            onClick={() => onItemClick("projects")}
          >
            Back
          </button>

          <button
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm py-2 px-4 rounded transition-colors delay-100"
            onClick={() => onItemClick("languages")}
          >
            Continue to Languages
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

AchievementForm.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};

export default AchievementForm;
