import PropTypes from "prop-types";
import FormTitle from "../components/FormTitle";
import { IoIosAdd } from "react-icons/io";
import AddProjects from "../components/AddProjects";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AiOutlineDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";
import ShowProjectDetails from "../components/ShowProjectDetails";
import { resumeAPI } from "../api/apiService";
const ProjectForm = ({ onItemClick }) => {
  const { logout, decodedToken } = useContext(AuthContext);
  const [projects, setProjects] = useState([
    {
      id: Date.now(),
      title: "",
      summary: "",
      link: "",
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [projectIdToUpdate, setProjectIdToUpdate] = useState(null);

  const fetchProjectDetail = async (id) => {
    try {
      const response = await resumeAPI.getProjectDetail(id)

      const data = await response.data;
      setProjects([
        {
          title: data.title,
          summary: data.summary,
          link: data.link,
        },
      ]);
      setProjectIdToUpdate(data._id);
    } catch (error) {
      console.log(error);
    }
  };

  const [projectData, setProjectData] = useState([]);

  const fetchProjectData = async () => {
    try {
      const response = await resumeAPI.getProjects();

      if (!response.status === 200) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.data;
      console.log("I am data that you fetched from backend projects", data);
      setProjectData(data);
      console.log("I am project data", projectData);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (decodedToken) {
      fetchProjectData();
    }
  }, []);

  const handleAddProjects = () => {
    setProjects((prevProjects) => [
      ...prevProjects,
      {
        id: Date.now(),
        title: "",
        summary: "",
        link: "",
      },
    ]);
  };

  const handleInputChange = (id, field, value) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      )
    );
  };

  const handleDeleteProjects = (id) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
  };

  const updateProjectDetail = async () => {
    try {
      const response = await resumeAPI.updateProject(projectIdToUpdate, projects[0]);

      if (!response.status === 200) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.data;
      console.log("I am data to update on projects", data);
      setIsEditing(false);
      if (response.status === 200) {
        toast.success("Data updated successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (response.status === 401) {
        toast.error("Data did not save. Please try again!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          logout();
        }, 1000);
      } else if (response.status === 500) {
        toast.error("Internal server error!", {
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
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProjectDetail = async (id) => {
    try {
      const response = await resumeAPI.deleteProject(id);

      if (!response.status === 200) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.data;
      console.log("I am data to delete on projects", data);
      if (response.status === 200) {
        toast.success("Data deleted successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (response.status === 401) {
        toast.error("Data did not delete. Please try again!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          logout();
        }, 1000);
      } else if (response.status === 500) {
        toast.error("Internal server error!", {
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    if (projects.length === 0) {
      toast.error("Please add projects to save!", {
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

    console.log("projects", projects);
    try {
      const response = await resumeAPI.addProject({ projects } );

      const data = await response.data;
      console.log("data from that projects form", data);
      if (response.status === 201) {
        toast.success("Data saved successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setProjects([
          {
            id: Date.now(),
            title: "",
            summary: "",
            link: "",
          },
        ]);
      } else if (response.status === 401) {
        toast.error("Data did not save. Please try again!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          logout();
        }, 1000);
      } else {
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
            title="Projects"
            description="List your projects to showcase.
"
          />
        </div>

        <ul className="flex flex-col gap-3 items-center">
          {projectData &&
            projectData.map((data) => {
              return (
                <ShowProjectDetails
                  key={data._id}
                  value={data}
                  onEdit={fetchProjectDetail}
                  setIsEditing={setIsEditing}
                  onDelete={deleteProjectDetail}
                />
              );
            })}
        </ul>

        <div className="mt-8">
          {projects.map((project) => (
            <div key={project.id} className="relative">
              <AddProjects
                project={project}
                onInputChange={handleInputChange}
              />
              <button
                onClick={() => handleDeleteProjects(project.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                aria-label="Delete "
              >
                <AiOutlineDelete size={24} />
              </button>
            </div>
          ))}
        </div>

        <div
          onClick={handleAddProjects}
          className="mt-8 flex items-center text-lg gap-2 text-blue-400 font-semibold cursor-pointer hover:underline"
        >
          <span>
            <IoIosAdd />
          </span>
          <p>Add Projects</p>
        </div>

        <div className="m-8 flex justify-end">
          <Button
            text={isEditing ? "Update" : "Save"}
            type="button"
            onClick={
              isEditing ? () => updateProjectDetail() : () => handleSave()
            }
          />
        </div>

        <div className="flex justify-between items-center p-4 my-4">
          <button
            className="bg-white hover:bg-neutral-800 hover:text-white transition-colors delay-100 border-black border-2 text-black text-sm py-2 px-4 rounded"
            onClick={() => onItemClick("experience")}
          >
            Back
          </button>

          <button
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-sm py-2 px-4 rounded transition-colors delay-100"
            onClick={() => onItemClick("skills")}
          >
            Continue to Skills
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

ProjectForm.propTypes = {
  onItemClick: PropTypes.func.isRequired,
};
export default ProjectForm;
