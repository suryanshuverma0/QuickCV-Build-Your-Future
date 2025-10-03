// import PropTypes from "prop-types";
// import FormTitle from "../components/FormTitle";
// import { IoIosAdd } from "react-icons/io";
// import { useState, useContext, useEffect } from "react";
// import AddAchievements from "../components/AddAchievements";
// import { AuthContext } from "../contexts/AuthContext";
// import { AiOutlineDelete } from "react-icons/ai";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Button from "../components/Button";
// import ShowAchievementFormDetails from "../components/ShowAchievementFormDetails";

// const AchievementForm = ({ onItemClick }) => {
//   const { logout, decodedToken } = useContext(AuthContext);

//   const [achievements, setAchievements] = useState([
//     {
//       id: Date.now(),
//       title: "",
//       summary: "",
//       link: "",
//     },
//   ]);

//   const [isEditing, setIsEditing] = useState(false);
//   const [achievementIdToUpdate, setAchievementIdToUpdate] = useState(null);
//   const [achievementData, setAchievementData] = useState([]);

//   const getAchievementData = async (id) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/get-achievement-detail/${id}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       setAchievements([
//         {
//           title: data.title,
//           summary: data.summary,
//           link: data.link,
//         },
//       ]);
//       setAchievementIdToUpdate(data._id);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const updateAchievementData = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/update-achievement-detail/${achievementIdToUpdate}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(achievements[0]),
//         }
//       );

//       if (!response.status === 200) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();

//       setIsEditing(false);
//       if (response.status === 200) {
//         toast.success("Data updated successfully!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       } else if (response.status === 401) {
//         toast.error("Data did not save. Please try again!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//         setTimeout(() => {
//           logout();
//         }, 1000);
//       } else if (response.status === 500) {
//         toast.error("Internal server error!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       }
//       setAchievements([
//         {
//           id: Date.now(),
//           title: "",
//           summary: "",
//           link: "",
//         },
//       ]);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   const deleteAchievementDetail = async (id) => {
//     try {
//       const response = await fetch(
//         `http://localhost:3000/api/delete-achievement-detail/${id}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (!response.status === 200) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log("I am data that you fetched from backend experience", data);
//       if (response.status === 200) {
//         toast.success("Data deleted successfully!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       } else if (response.status === 401) {
//         toast.error("Data did not delete. Please try again!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//         setTimeout(() => {
//           logout();
//         }, 1000);
//       } else if (response.status === 500) {
//         toast.error("Internal server error!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//   }
// };

//   const fetchAchievementData = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/get-achievement-form-details",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       if (!response.status === 200) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }

//       const data = await response.json();
//       console.log("I am data of achievement fetched from backend ", data);
//       setAchievementData(data);
//       console.log("I am achievement data state", achievementData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleAddAchievements = () => {
//     setAchievements([
//       ...achievements,
//       {
//         id: Date.now(),
//         title: "",
//         summary: "",
//         link: "",
//       },
//     ]);
//   };

//   useEffect(() => {
//     if (decodedToken) {
//       fetchAchievementData();
//     }
//   }, []);

//   const handleInputChange = (id, field, value) => {
//     setAchievements((prevAchievements) =>
//       prevAchievements.map((achievement) =>
//         achievement.id === id ? { ...achievement, [field]: value } : achievement
//       )
//     );
//   };

//   const handleDeleteAchievements = (id) => {
//     setAchievements((prevAchievements) =>
//       prevAchievements.filter((achievement) => achievement.id !== id)
//     );
//   };

//   const handleSave = async () => {
//     if (achievements.length === 0) {
//       toast.error("Please add projects to save!", {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//       return;
//     }

//     console.log("achievements", achievements);
//     try {
//       const response = await fetch(
//         "http://localhost:3000/api/create-achievement-form",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify({ achievements }),
//         }
//       );

//       const data = await response.json();
//       console.log("data from that achievements form", data);
//       console.log(
//         "i want to see my response status now in achievement",
//         response.status
//       );
//       if (response.status === 201) {
//         toast.success("Data saved successfully!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//         setAchievements([
//           {
//             id: Date.now(),
//             title: "",
//             summary: "",
//             link: "",
//           },
//         ]);
//       } else if (response.status === 401) {
//         toast.error("Data did not save. Please try again!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//         setTimeout(() => {
//           logout();
//         }, 1000);
//       } else if (response.status === 400) {
//         toast.error("Error saving data!", {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//         });
//       }
//     } catch (error) {
//       console.error("Error saving data:", error);
//       toast.error("Error saving data!", {
//         position: "top-right",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   };

//   return (
//     <>
//       <div className="h-[1000px] overflow-y-auto">
//         <div className="pl-4">
//           <FormTitle
//             title="Achievements"
//             description="Include your key achievements and notable projects to enhance your profile."
//           />
//         </div>

//         <ul className="flex flex-col gap-3 items-center">
//           {achievementData &&
//             achievementData.map((data) => {
//               return (
//                 <ShowAchievementFormDetails
//                   key={achievementData._id}
//                   value={data}
//                   onEdit={getAchievementData}
//                   setIsEditing={setIsEditing}
//                   onDelete = {deleteAchievementDetail}
//                 />
//               );
//             })}
//         </ul>

//         <div className="mt-8">
//           {achievements.map((achievement) => (
//             <div key={achievement.id} className="relative">
//               <AddAchievements
//                 achievement={achievement}
//                 onInputChange={handleInputChange}
//               />
//               <button
//                 onClick={() => handleDeleteAchievements(achievement.id)}
//                 className="absolute top-4 right-4 text-red-500 hover:text-red-700"
//                 aria-label="Delete experience"
//               >
//                 <AiOutlineDelete size={24} />
//               </button>
//             </div>
//           ))}
//         </div>

//         <div
//           onClick={handleAddAchievements}
//           className="mt-8 flex items-center text-lg gap-2 text-blue-400 font-semibold cursor-pointer hover:underline"
//         >
//           <span>
//             <IoIosAdd />
//           </span>
//           <p>Add Achievements</p>
//         </div>

//         <div className="m-8 flex justify-end">
//           <Button
//             text={isEditing ? "Update" : "Save"}
//             type="button"
//             onClick={
//               isEditing ? () => updateAchievementData() : () => handleSave()
//             }
//           />
//         </div>

//         <div className="flex justify-between items-center p-4 my-4">
//           <button
//             className="bg-white hover:bg-neutral-800 hover:text-white transition-colors delay-100 border-black border-2 text-black text-sm py-2 px-4 rounded"
//             onClick={() => onItemClick("skills")}
//           >
//             Back
//           </button>

//           <button
//             className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm py-2 px-4 rounded transition-colors delay-100"
//             onClick={() => onItemClick("languages")}
//           >
//             Continue to Languages
//           </button>
//         </div>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };
// AchievementForm.propTypes = {
//   onItemClick: PropTypes.func.isRequired,
// };
// export default AchievementForm;



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
