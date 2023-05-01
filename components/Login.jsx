import React from "react";

function Login() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1
        className="uppercase text-3xl text-center pt-[2rem]  tracking-wider
         pb-5 "
      >
        Log In
      </h1>
      <form
        className="flex flex-col justify-center items-center my-4 w-[20%]"
        action="#"
      >
        <input
          className="border-2 border-[#363636] p-3 shadow-lg mb-8 w-[100%] tracking-wide"
          type="email"
          name="Email Address"
          id="email"
          placeholder="youremail@gmail.com"
          required
        />
        <input
          className="border-2 border-[#363636] p-3 shadow-lg mb-8 w-[100%] tracking-wide"
          type="password"
          name="Password"
          id="password"
          placeholder="password"
          required
        />
        <button
          className="p-2 px-4 w-[12rem] mb-[8rem] uppercase shadow-md bg-[#363636] hover:bg-[#4c4c4c] text-white hover:transition-all hover:duration-500 focus:text-white focus:bg-[#363636] ease-out duration-500 tracking-wide"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
