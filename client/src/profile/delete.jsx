import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userProvider";

function Delete({ setmodel }) {
  const { deleteaccount } = useUser();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const success = await deleteaccount();
    if (success) {
      navigate("/register");
    }
  };

  return (
    <div className="fixed inset-0 bg-red-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          ⚠️ Delete Account
        </h2>
        <p className="text-gray-600 mb-6 font-medium
        ">
          Are you sure you want to delete account ?{" "}
          <span className="font-semibold">This action cannot be undone.</span>
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition cursor-pointer"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setmodel(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded font-medium transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
