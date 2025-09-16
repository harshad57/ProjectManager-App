import { useState, useEffect, useRef } from "react";
import { useProject } from "../context/projectProvider"
import { useUser } from "../context/userProvider";
import LoaderPage from "../pages/loader";
import SmallLoaderPage from "../pages/smallloader";
import { io } from "socket.io-client";

const backendurl = import.meta.env.VITE_BACKEND_URL;
const socket = io(backendurl);

export const AddComment = () => {
    const { comment, addcomment, selectedproject, loading, setcomment } = useProject();
    const {authuser} = useUser();
    const [message, setmessage] = useState('');

    const bottomRef = useRef(null); 

    useEffect(() => {
    if (!selectedproject) return;

    // listen for new comments
    socket.on("commentAdded", (newComment) => {
      setcomment((prev) => [...prev, newComment]); // append to state
    });

    return () => {
      socket.off("commentAdded");
    };
  }, [selectedproject]);

  const send = async () => {
    if (!message.trim()) return;

    const newComment = await addcomment(selectedproject._id, message, authuser);

    // Emit through socket (with populated user info)
    socket.emit("newComment", {
      ...newComment,
      userId: authuser, // attach current user info so no undefined
    });

    setmessage("");
  };

    useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comment]);

    return (
        <>
            {loading.fetchComment ? (
              <div><LoaderPage /></div>
            ) :
                comment && comment.length > 0 ? (
                    comment
                        .filter((cmnt) => cmnt.projectId === selectedproject._id)
                        .map((cmnt) => (
                            <div key={cmnt._id} className="flex w-64 gap-3 px-4 py-2 bg-gray-100 rounded-lg shadow-sm mb-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
                                    {cmnt.userId?.name?.[0].toUpperCase()}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-gray-800">{cmnt.userId?.name}</p>
                                        <span className="text-xs text-gray-500">
                                            {new Date(cmnt.createdAt).toLocaleString("en-IN", {
                                                dateStyle: "short",
                                                timeStyle: "short",
                                            })}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 mt-1">{cmnt.message}</p>
                                </div>
                            </div>
                        ))
                ) : (
                    <div className="flex flex-col gap-4 justify-center items-center font-medium text-gray-500 text-md">don't have any comment</div>
                )
            }
            <div ref={bottomRef} />
            <div className="fixed bottom-0 left-0 w-full bg-indigo-200 border-t-2 border-indigo-600 px-4 sm:py-6 py-3 flex items-center gap-3 rounded-lg">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setmessage(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 border rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    onClick={send}
                    disabled={loading.addComment}
                    className="px-4 h-11 rounded-lg font-medium text-white transition bg-indigo-600 hover:bg-indigo-700">
                    {loading.addComment ? <SmallLoaderPage /> : "Send"}
                </button>
            </div>

        </>
    )
}