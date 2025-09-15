import React, { useState } from 'react';
import { useUser } from '../context/userProvider';

function UpdateProfile({setupdatemodel}) {
  const { authuser, editusername } = useUser();
  const [name, setName] = useState(authuser?.name || '');
  const [loading, setloading] = useState(false);

  const submit = async(e) => {
    e.preventDefault();
    setloading(true);

    await editusername({name});
    setloading(false);
    setupdatemodel(false);
  }

  return (
    <div className="absolute left-1/2 top-30 transform -translate-x-1/2">
      <form onSubmit={submit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-6 relative"
      >
        <button className='absolute right-5 top-5 text-xl font-bold cursor-pointer' onClick={() => setupdatemodel(false)}>X</button>
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-2">Update Name</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-60 cursor-pointer"
        >{loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
}

export default UpdateProfile;