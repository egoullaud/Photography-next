import React from "react";

function dashboard() {
  return (
    <div className="flex h-[100vh]">
      <div className=" flex flex-col w-[20%] border-r-2">
        <h1 className="uppercase text-2xl text-center my-[1rem] tracking-wider">
          Welcome, Raine!
        </h1>
        <button>Upload Photos</button>
        <ul className="text-center">
          Edit Galleries
          <li>Architecture</li>
          <li>Events</li>
          <li>Portraits</li>
          <li>Nature</li>
          <li>Light</li>
          <li>Videography</li>
        </ul>
      </div>
      <div></div>
    </div>
  );
}

export default dashboard;
