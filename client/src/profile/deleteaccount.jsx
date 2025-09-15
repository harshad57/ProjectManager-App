import { useState } from "react";
import Delete from "./delete";

export const DeleteAccount = () => {

  const [model, setmodel] = useState(false);

  return (
    <>
      <div className='lg:p-6 p-2'>
        <h2 className="text-2xl font-bold text-red-600 mb-3">Delete Account</h2>
        <p className="text-gray-600 mb-4 font-medium">
          Deleting your account will also delete all your projects, tasks, and comments. This cannot be undone.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setmodel(true)}
            className="bg-red-600 text-white px-4 py-2 rounded font-semibold cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>
      {model && <Delete setmodel={setmodel}/>}
    </>
  );
};
