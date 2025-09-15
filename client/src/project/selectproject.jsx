import { useState } from "react";
import { useProject } from "../context/projectProvider";
import { AddTask } from "./addtask";
import { AddComment } from "./addcomment";
import { Edittask } from "./edittask";
import Emptytask from "../assets/emptytask.png";
import LoaderPage from "../pages/loader";

export const SelectProject = ({ selectedproject, selectproject }) => {
    const { tasks, deletetask, loading } = useProject();
    const [activeTab, setActiveTab] = useState("tasks"); // tasks | comments
    const [editing, setEditing] = useState(null);
    const [opentask, setOpentask] = useState(false);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString("en-IN", {
            dateStyle: "short",
            timeStyle: "short",
        });
    }

    return (
        <>
            <div className={`fixed inset-0 bg-gradient-to-r from-indigo-50 to-indigo-100 bg-opacity-70 flex items-center justify-center z-50 ${opentask || editing ? "blur-sm brightness-75 pointer-events-none cursor-none" : ""}`}>
                <div className="bg-white w-[90%] h-[90%] relative rounded-xl shadow-lg px-4 sm:px-6 overflow-y-auto">
                    <div className="sticky top-0 bg-white pt-4 lg:pt-6 z-1">
                        {/* Close Button */}
                        <button
                            onClick={() => selectproject(null)}
                            className="absolute right-0 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                        >
                            ✕
                        </button>

                        {/* Project Header */}
                        <div className="flex gap-6 font-medium items-center">
                            <h2 className="text-2xl md:text-3xl font-bold text-indigo-600">
                                {selectedproject?.name}
                            </h2>
                            <p>
                                <span className={`font-medium px-2 py-1 rounded-md text-sm ${selectedproject?.visibility === "public"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-rose-100 text-rose-700"
                                    }`}>
                                    {selectedproject?.visibility}
                                </span>
                            </p>
                        </div>
                        <p className="mt-2 text-gray-600 text-md md:text-lg font-semibold">{selectedproject?.description}</p>

                        {/* Tabs */}
                        <div className="mt-6 flex gap-4 border-b pb-2">
                            <button
                                onClick={() => setActiveTab("tasks")}
                                className={`px-4 py-2 font-medium rounded-t-md cursor-pointer ${activeTab === "tasks"
                                    ? "bg-indigo-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                Tasks
                            </button>
                            <button
                                onClick={() => setActiveTab("comments")}
                                className={`px-4 py-2 font-medium rounded-t-md cursor-pointer ${activeTab === "comments"
                                    ? "bg-indigo-500 text-white"
                                    : "bg-gray-200 text-gray-700"
                                    }`}
                            >
                                Comments
                            </button>
                        </div>
                        <button
                                onClick={() => setOpentask(true)}
                                className={`mt-4 bg-indigo-600 text-white font-medium px-4 py-2 rounded hover:bg-indigo-700 cursor-pointer ${activeTab === "comments" ? "hidden" : ""}`}
                            >
                                + Add Task
                            </button>
                    </div>
                    

                    {/* Task Section */}
                    {activeTab === "tasks" && (
                        <div className="mt-4 space-y-4 -z-1">
                            {loading.fetchTask ? (
                                <div><LoaderPage /></div>
                            ) : tasks && tasks.length > 0 ? (
                                tasks
                                    .filter((task) => task.projectId === selectedproject._id)
                                    .map((task) => (
                                        <div
                                            key={task._id}
                                            className="relative bg-gray-50 rounded-lg shadow px-4 py-3 flex justify-between items-end border"
                                        >
                                            <p className="text-xs text-gray-500 absolute top-2 right-3">
                                                {formatDate(task.createdAt)}
                                            </p>
                                            <div>
                                                <h3 className="text-lg font-bold text-indigo-600">
                                                    {task.title}
                                                </h3>
                                                <p className="text-gray-600 font-medium">{task.description}</p>
                                                <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium text-gray-500">
                                                    <p>
                                                        Status :{" "}
                                                        <span
                                                            className={`px-2 py-0.5 rounded font-medium ${task.status === "completed"
                                                                ? "bg-green-100 text-green-700"
                                                                : task.status === "in-progress"
                                                                    ? "bg-yellow-100 text-yellow-700"
                                                                    : "bg-red-100 text-red-700"
                                                                }`}
                                                        >
                                                            {task.status}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Priority :{" "}
                                                        <span className={`px-2 py-0.5 rounded font-medium  ${task.priority === "low"
                                                            ? "bg-green-100 text-green-700"
                                                            : task.priority === "medium"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-red-100 text-red-700"
                                                            }`}>{task.priority}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setEditing(task)}
                                                    className="bg-yellow-400 text-gray-900 font-medium px-3 py-1 rounded hover:bg-yellow-500 cursor-pointer"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deletetask(task._id)}
                                                    className="bg-red-500 text-white font-medium px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <div className="flex flex-col gap-4 justify-center items-center">
                                    <img src={Emptytask} alt="No tasks" className="w-20" />
                                    <div className="font-medium text-gray-500 text-md">You don't have any task</div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Comment Section */}
                    {activeTab === "comments" && (
                        <div className="mt-4">
                            <p className="text-lg font-semibold text-gray-700 mb-3">
                                Comments
                            </p>
                            <div className="mt-4 sm:pb-15 pb-10">
                                <AddComment />
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Add Task Modal */}
            {opentask && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96">
                        <AddTask setopentask={setOpentask} />
                    </div>
                </div>
            )}

            {/* Edit Task Modal */}
            {editing && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 z-50">
                    <div className="bg-white rounded-lg shadow-lg w-96">
                        <Edittask task={editing} onClose={() => setEditing(null)} />
                    </div>
                </div>
            )}
        </>
    );
};
