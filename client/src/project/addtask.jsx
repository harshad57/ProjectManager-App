import { useState } from "react";
import { useProject } from "../context/projectProvider";
import SmallLoaderPage from "../pages/smallloader";
import toast from "react-hot-toast";

export const AddTask = ({ setopentask }) => {
  const { addtask, selectedproject, loading } = useProject();
  const [formdata, setformdata] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformdata((prev) => ({ ...prev, [name]: value }));
  };

  const create = async (e) => {
    e.preventDefault();
    if (!selectedproject) return alert("Please select a project first");

    const cleandata = {
      title: formdata.title.trim(),
      description: formdata.description.trim(),
      status: formdata.status,
      priority: formdata.priority,
    };

    try {
      const res = await addtask(selectedproject, cleandata);
      toast.success('task added');
      setformdata({ title: "", description: "", status: "todo", priority: "medium" });
      setopentask(false);
    } catch (err) {
      console.log(err);
      toast.error('failed to add task');
    }
  };

  return (
    <form
      onSubmit={create}
      className="flex flex-col gap-4 py-6 px-8 bg-white rounded-lg shadow-md"
    >
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Add New Task
        </h1>

      {/* Task Title */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formdata.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
          className="mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={formdata.description}
          onChange={handleChange}
          placeholder="Task details..."
          rows={3}
          className="mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
        />
      </div>

      {/* Status */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          name="status"
          value={formdata.status}
          onChange={handleChange}
          className="mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="todo">📝 Todo</option>
          <option value="in-progress">⚡ In Progress</option>
          <option value="completed">✅ Completed</option>
        </select>
      </div>

      {/* Priority */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Priority</label>
        <select
          name="priority"
          value={formdata.priority}
          onChange={handleChange}
          className="mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          disabled={loading.addTask}
          className="bg-indigo-700 text-white px-4 h-11 rounded flex-1 font-semibold cursor-pointer"
        >
          {loading.addTask ? <SmallLoaderPage /> : "Add Task"}
        </button>
        <button
          type="button"
          onClick={() => setopentask(false)}
          className="bg-gray-300 text-black px-4 h-11 rounded flex-1 font-semibold cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
