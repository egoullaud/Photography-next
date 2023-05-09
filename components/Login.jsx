import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

function Login() {
  //form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  const onSubmit = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        route.push("/admin");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  useEffect(() => {
    if (user) {
      route.push("/admin");
    } else {
      console.log("login");
    }
  }, [user]);

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
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border-2 border-[#363636] p-3 shadow-lg mb-8 w-[100%] tracking-wide"
          type="password"
          name="Password"
          id="password"
          placeholder="*******"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={onSubmit}
          className="p-2 px-4 w-[12rem] mb-[8rem] uppercase shadow-md bg-[#363636] hover:bg-[#4c4c4c] text-white hover:transition-all hover:duration-500 focus:text-white focus:bg-[#363636] ease-out duration-500 tracking-wide"
          type="button"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
