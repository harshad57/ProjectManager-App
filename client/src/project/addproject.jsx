import { useState } from "react";
import { useProject } from "../context/projectProvider";
import { useNavigate } from "react-router-dom";
import SmallLoaderPage from "../pages/smallloader";
import toast from "react-hot-toast";

export const AddProject = () => {
  const { addproject, loading } = useProject();
  const [formdata, setformdata] = useState({
    name: "",
    description: "",
    visibility: "private",
  });

  const navigate = useNavigate();

  const create = async (e) => {
    e.preventDefault();

    const cleandata = {
      name: formdata.name.trim(),
      description: formdata.description.trim(),
      visibility: formdata.visibility,
    };

    if (!cleandata) return alert("alert");

    try {
      const res = await addproject(cleandata);
      toast.success("project created");
      setformdata({ name: "", description: "", visibility: "private" });
      navigate("/privateprojects");
    } catch (err) {
      console.log(err);
      toast.error(err);
;    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-[400px]">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create a New Project
        </h1>

        <form method="post" onSubmit={create} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={formdata?.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={formdata?.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />

          <select
            name="visibility"
            value={formdata?.visibility}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="private">🔒 Private</option>
        <option value="public">🔓 Public</option>
          </select>

          <div className="flex gap-2 mt-4">
          <button
            type="submit"
            disabled={loading.addProject}
            className="w-full px-4 h-11 rounded text-white font-semibold transition flex-1 cursor-pointer bg-indigo-600 hover:bg-indigo-700">
            {loading.addProject ? <SmallLoaderPage /> : "Create Project"}
          </button>
          <button type="button" onClick={() => navigate(-1)} className="bg-gray-300 text-black px-4 h-11 rounded flex-1 font-semibold cursor-pointer">
          Cancel
        </button>
        </div>
        </form>
      </div>
    </div>
  );
};
