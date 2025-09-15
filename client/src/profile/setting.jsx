import React, { useState } from "react";
import UpdatePassword from "./updatepassword";
import { DeleteAccount } from "./deleteaccount";

function Setting() {
  const [model, setmodel] = useState(<UpdatePassword />);

  return (
    <div className="bg-white shadow-md rounded-lg lg:p-6 py-6 px-2 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 pl-3 lg:pl-0">⚙️ Settings</h2>

      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={() => setmodel(<UpdatePassword />)}
          className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
            model.type === UpdatePassword
              ? "bg-indigo-500 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Update Password
        </button>

        <button
          onClick={() => setmodel(<DeleteAccount />)}
          className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${
            model.type === DeleteAccount
              ? "bg-red-500 text-white shadow"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Delete Account
        </button>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg lg:p-4 p-2">
        {model && model}
      </div>
    </div>
  );
}

export default Setting;
