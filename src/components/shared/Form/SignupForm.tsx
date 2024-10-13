import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import FormInput from "../../base/FormInput";
import FormButton from "../../base/FormButton";
import { auth } from "../../../lib/config/Firebase";
import ScrollTop from "../../../lib/ScrollTop";

interface SignUpFormProps {
  onClose: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginData;

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created: ", userCredential.user);
      onClose(); 
    } catch (err: any) {
      setError(err.message);
      console.error("Sign up error: ", err.message);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className=" backdrop-blur-lg bg-black absolute top-0 h-screen w-full left-0 flex justify-center items-center ">
      <ScrollTop/>
      <div className=" bg-gradient-to-b from-gray-400 to-gray-900 w-[420px] h-[290px] gap-5 flex flex-col justify-center items-start p-5 rounded-2xl">
        <h1 className="text-2xl font-bold text-white">SignUp</h1>
        <form
          onSubmit={handleSignUp}
          className="flex flex-col justify-center gap-5  w-full"
        >
          <FormInput
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleOnChange}
            placeholder="Email"
            className="border-black border bg-black  py-2 px-2"
          />
          <FormInput
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleOnChange}
            placeholder="Password"
            className="border-black bg-black border  py-2 px-2"
          />
          {error && <p className="text-red-500">{error}</p>}
          <FormButton label="Sign Up" className="bg-green-600 text-white w-full py-3 rounded-lg"/>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
