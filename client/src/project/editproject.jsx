import { useState } from "react";
import { useProject } from "../context/projectProvider";
import SmallLoaderPage from "../pages/smallloader";
import toast from "react-hot-toast";

export const EditProject = ({ project, onClose }) => {
  const { fetchprojects, updateproject, loading } = useProject();

  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [visibility, setVisibility] = useState(project.visibility);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
    await updateproject(project._id, { name, description, visibility });
    fetchprojects();
    toast.success('changes saved');
    onClose();
    } catch {
      toast.error('failed to save changes');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Project</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full rounded focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder="Project Name"
      /> 

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full rounded resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
        placeholder="Description"
      />

      <select
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
        className="border p-2 w-full rounded focus:ring-2 focus:ring-indigo-500 outline-none"
      >
        <option value="private">🔒 Private</option>
        <option value="public">🔓 Public</option>
      </select>

      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-indigo-700 text-white px-4 h-11 rounded flex-1 font-semibold cursor-pointer" disabled={loading.updateProject}>
          {loading.updateProject ? <SmallLoaderPage /> : 'Save'}
        </button>
        <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 h-11 rounded flex-1 font-semibold cursor-pointer">
          Cancel
        </button>
      </div>
    </form>
  );
};
