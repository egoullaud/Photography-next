import React from "react";

function Form() {
  return (
    <div className="lg:w-[50%] xl:w-[30%] md:w-[60%] w-[90%]">
      <form
        className="flex flex-col justify-center items-center my-4 w-[100%]"
        action="#"
      >
        <input
          className="border-2 border-[#363636] p-3 shadow-lg mb-2 w-[100%] tracking-wide"
          type="text"
          name="Name"
          id="name"
          placeholder="Jane Doe"
          required
        />
        <input
          className="border-2 border-[#363636] p-3 shadow-lg mb-2 w-[100%] tracking-wide"
          type="email"
          name="Email Address"
          id="email"
          placeholder="janedoe@gmail.com"
          required
        />
        <input
          className="border-2 border-[#363636] p-3 shadow-lg mb-2 w-[100%] tracking-wide"
          type="text"
          id="phone"
          name="Phone Number"
          placeholder="(555)-555-5555"
        />
        <textarea
          className="border-2 border-[#363636] p-3 shadow-lg mb-2 w-[100%] tracking-wide"
          type="text"
          name="Message"
          id="message"
          rows="4"
          placeholder="How can I help?"
          required
        ></textarea>
        <button
          className="border-2 border-[#363636] p-2 shadow-lg my-2 w-[60%] lg:w-[45%] hover:bg-[#363636] hover:text-white hover:transition-all hover:duration-1000 tracking-wide"
          type="submit"
        >
          Let's Connect
        </button>
      </form>
    </div>
  );
}

export default Form;
