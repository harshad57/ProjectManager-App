import React, { useState } from 'react';
import { useUser } from '../context/userProvider';

function UpdatePassword() {
  const {updatepassword} = useUser();
  const [oldpassword, setoldpassword] = useState('');
  const [newpassword, setnewpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [loading, setloading] = useState(false);

  const submit = async(e) => {
    e.preventDefault();
    setloading(true);
    const res = await updatepassword(oldpassword, newpassword, confirmpassword);
    setloading(false);

    if (res.success) {
      setoldpassword("");
      setnewpassword("");
      setconfirmpassword("");
    }
  };

  return (
    <div className="flex items-center justify-center py-8 lg:px-4">
      <form onSubmit={submit}
        className="bg-white shadow-lg rounded-xl lg:p-8 p-6 w-full max-w-md flex flex-col gap-6 relative"
      >
        <h2 className="text-2xl font-bold text-center text-green-700 mb-2">Update Password</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-md font-medium text-gray-700">Old Password</label>
          <input
            id="name"
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={oldpassword}
            onChange={e => setoldpassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-md font-medium text-gray-700">New Password</label>
          <input
            id="name"
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={newpassword}
            onChange={e => setnewpassword(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-md font-medium text-gray-700">Confirm Password</label>
          <input
            id="name"
            type="text"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={confirmpassword}
            onChange={e => setconfirmpassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-60 cursor-pointer"
        >{loading ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
}

export default UpdatePassword;