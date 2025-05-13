import React from "react";

const Profile = () => {
  return (
    <div className=" min-h-screen flex flex-col">
      <div className=" flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col mf:flex-row md:space-x-6 space-y-5 md:space-y-0">
          {/* left */}
          <div className=" w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className=" text-2xl font-bold md:text-3xl mb-4">John</h1>
            <p className="text-lg text-gray-600 mb-4">test@gmail</p>
            <button className=" w-full bg-red-500 text-white py-3 px-2 rounded-lg hover:bg-red-600 ">
              {" "}
              Logout{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
