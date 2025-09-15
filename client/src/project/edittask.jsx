import { useState } from "react";
import { useProject } from "../context/projectProvider";
import SmallLoaderPage from "../pages/smallloader";
import toast from 'react-hot-toast';

export const Edittask = ({ task, onClose }) => {
  const { updatetask, loading } = useProject();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatetask(task._id, { title, description, status, priority });
    toast.success('changes saved');
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md w-full"
    >
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Edit Task
        </h1>

      {/* Task Title */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Task title"
          required
        />
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          placeholder="Task description"
          rows={3}
        />
      </div>

      {/* Status */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
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
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
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
          disabled={loading.updateTask}
          className="bg-indigo-700 text-white px-4 h-11 rounded flex-1 font-semibold cursor-pointer"
        >
          {loading.updateTask ? <SmallLoaderPage /> : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-black px-4 h-11 rounded flex-1 font-semibold cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
