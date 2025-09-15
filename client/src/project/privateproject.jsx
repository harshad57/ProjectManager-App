import { useEffect, useState } from "react";
import { useProject } from "../context/projectProvider.jsx";
import { SelectProject } from "./selectproject.jsx";
import { useNavigate } from "react-router-dom";
import { EditProject } from "./EditProject.jsx";
import { useUser } from "../context/userProvider.jsx";
import Emptyproject from "../assets/emptyproject.png";
import LoaderPage from "../pages/loader.jsx";

export const PrivateProject = () => {
  const {
    projects,
    fetchprojects,
    loading,
    selectproject,
    selectedproject,
    deleteproject,
  } = useProject();
  const [editingProject, setEditingProject] = useState(null);
  const [openProjectId, setOpenProjectId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchprojects();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest(".dropdown-container")) {
        setOpenProjectId(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      dateStyle: "short",
      timeStyle: "short",
    });
  }

  return (
    <>
      <div
        className={`py-6 lg:px-12 px-6 bg-gradient-to-r from-indigo-50 to-indigo-100 min-h-screen ${
          editingProject
            ? "blur-sm brightness-75 pointer-events-none cursor-none"
            : ""
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Private Projects</h1>
          <button
            onClick={() => navigate("/projects")}
            className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded cursor-pointer font-medium transition"
          >
            Back
          </button>
        </div>

        {/* Add Project Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/addproject")}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-medium cursor-pointer transition"
          >
            + Add Project
          </button>
        </div>

        {/* Loader / Project Grid */}
        {loading.Projects ? (
          <LoaderPage />
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="relative flex flex-col bg-white shadow-md border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Dropdown */}
                <div className="flex justify-end p-6 absolute right-0 dropdown-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenProjectId((prev) =>
                        prev === project._id ? null : project._id
                      );
                    }}
                    className="inline-block text-gray-500 hover:bg-gray-100 
                    dark:hover:bg-gray-200 border-0 focus:outline-none rounded-lg text-sm p-1.5"
                    type="button"
                  >
                    <span className="sr-only">Open dropdown</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                  </button>

                  {openProjectId === project._id && (
                    <div className="absolute right-3 top-13 z-50 text-base bg-white border border-gray-200 rounded-lg shadow-lg w-44">
                      <ul className="py-2">
                        <li>
                          <button
                            onClick={() => {
                              setEditingProject(project);
                              setOpenProjectId(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => {
                              deleteproject(project._id);
                              setOpenProjectId(null);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div
                  className="mb-4 cursor-pointer flex-1 p-6"
                  onClick={() => selectproject(project)}
                >
                  <div
                    className={`mb-4 rounded-md py-1 px-3 text-xs font-medium inline-block text-center ${
                      project.visibility === "public"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {project.visibility}
                  </div>

                  <h6 className="mb-2 text-gray-800 text-xl font-semibold">
                    {project.name}
                  </h6>
                  <p className="text-gray-600 leading-normal text-sm line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-4 border-t rounded-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center">
                    <div className="w-9 h-9 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                      {project.owner?.name?.[0]?.toUpperCase() || "U"}
                    </div>
                    <div className="flex flex-col ml-3 text-sm">
                      <span className="text-gray-800 font-semibold">
                        {project.owner?.name || "Unknown"}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {formatDate(project.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center absolute top-92 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <img src={Emptyproject} alt="No project" className="w-96" />
            <div className="font-medium text-gray-500 text-lg whitespace-nowrap">
              You don't have any project !
            </div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedproject && (
        <SelectProject
          selectedproject={selectedproject}
          selectproject={selectproject}
        />
      )}

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <EditProject
              project={editingProject}
              onClose={() => setEditingProject(null)}
            />
          </div>
        </div>
      )}
    </>
  );
};
