import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";

const backendurl = import.meta.env.VITE_BACKEND_URL;

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setprojects] = useState([]);
  const [publicprojects, setpublicprojects] = useState([]);
  const [tasks, settasks] = useState([]);
  const [comment, setcomment] = useState([]);
  const [selectedproject, setselectedproject] = useState(null);

  // ✅ loading state for each action
  const [loading, setLoading] = useState({
    Projects: false,
    fetchPublicProjects: false,
    addProject: false,
    updateProject: false,
    fetchTask: false,
    addTask: false,
    updateTask: false,
    fetchComment: false,
    addComment: false,
  });

  // ✅ helper to update specific loading key
  const setLoadingState = (key, value) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };

  const fetchprojects = async () => {
    try {
      setLoadingState("Projects", true);
      const { data } = await axios.get(`${backendurl}/api/projects`, { withCredentials: true });
      setprojects(data);
      setselectedproject(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingState("Projects", false);
    }
  };

  const addproject = async (projectData) => {
    try {
      setLoadingState("addProject", true);
      const { data } = await axios.post(
        `${backendurl}/api/projects/create`,
        projectData,
        {
          withCredentials: true,
        }
      );
      setprojects((prev) => [...prev, data]);
      if (data.visibility === "public") {
        setpublicprojects((prev) => [...prev, data]);
      }
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingState("addProject", false);
    }
  };

  const fetchpublicprojects = async () => {
    try {
      setLoadingState("fetchPublicProjects", true);
      const { data } = await axios.get(`${backendurl}/api/projects/getpublic`);
      setpublicprojects(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingState("fetchPublicProjects", false);
    }
  };

  const updateproject = async (id, updates) => {
    try {
      setLoadingState("updateProject", true);
      const { data } = await axios.put(
        `${backendurl}/api/projects/update/${id}`,
        updates,
        { withCredentials: true }
      );
      setprojects((prev) => prev.map((p) => (p._id === id ? data : p)));
      setpublicprojects((prev) =>
        prev.map((p) => (p._id === id ? data : p))
      );
      return data;
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingState("updateProject", false);
    }
  };

  const deleteproject = async (id) => {
    try {
      await axios.delete(`${backendurl}/api/projects/delete/${id}`);
      setprojects((prev) => prev.filter((t) => t._id !== id));
      setpublicprojects((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const selectproject = async (project) => {
    setselectedproject(project);
  };

  const fetchtask = async (projectId) => {
    try {
      setLoadingState("fetchTask", true);
      const { data } = await axios.get(
        `${backendurl}/api/tasks/get/${projectId}`
      );
      settasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingState("fetchTask", false);
    }
  };

  const addtask = async (projectId, taskData) => {
    try {
      setLoadingState("addTask", true);
      const { data } = await axios.post(`${backendurl}/api/tasks/add`, {
        ...taskData,
        projectId,
      });
      settasks((prev) => [...prev, data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingState("addTask", false);
    }
  };

  const updatetask = async (id, updates) => {
    try {
      setLoadingState("updateTask", true);
      const { data } = await axios.put(
        `${backendurl}/api/tasks/update/${id}`,
        updates
      );
      settasks((prev) => prev.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingState("updateTask", false);
    }
  };

  const deletetask = async (id) => {
    try {
      await axios.delete(`${backendurl}/api/tasks/delete/${id}`);
      settasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchcomment = async (projectId) => {
    try {
      setLoadingState("fetchComment", true);
      const { data } = await axios.get(
        `${backendurl}/api/comments/get/${projectId}`
      );
      setcomment(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingState("fetchComment", false);
    }
  };

  const addcomment = async (projectId, message, authuser) => {
    try {
      setLoadingState("addComment", true);
      const { data } = await axios.post(`${backendurl}/api/comments/add`, {
        projectId,
        message,
      }, {
        withCredentials: true
      });

      const populatedComment = {
        ...data,
        userId: {
          _id: authuser._id,
          name: authuser.name,
        },
      };

      setcomment((prev) => [...prev, populatedComment]);

      return populatedComment;
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingState("addComment", false);
    }
  };

  useEffect(() => {
    if (selectedproject) {
      (async () => {
        await fetchtask(selectedproject._id);
        await fetchcomment(selectedproject._id);
      })();
    }
  }, [selectedproject]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addproject,
        updateproject,
        deleteproject,
        fetchpublicprojects,
        publicprojects,
        selectedproject,
        selectproject,
        tasks,
        addtask,
        updatetask,
        deletetask,
        comment,
        setcomment,
        addcomment,
        fetchprojects,
        loading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
