import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import FormInput from "../../base/FormInput";
import FormButton from "../../base/FormButton";
import { auth } from "../../../lib/config/Firebase";
import SignUpForm from "./SignupForm";

interface LoginFormProps {
  onAuthChange: (isAuthenticated: boolean, userEmail?: string | null) => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onAuthChange, onClose }) => {
  const [error, setError] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = loginData;

    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in: ", userCredential.user);
      onAuthChange(true, userCredential.user.email);
      onClose();
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
      console.error("Login error: ", err.message);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseSignup = () => {
    setIsSignup(false);
  };

  return (
    <>
      {!isSignup ? (
        <div className="bg-black fixed top-0 bottom-0 w-full left-0 flex justify-center items-center">
          <div className="bg-white w-[420px] min-h-[270px] gap-5 flex flex-col justify-center items-start p-5 rounded-2xl">
            <h1 className="text-2xl font-bold">Login</h1>
            <form
              onSubmit={handleLogin}
              className="flex flex-col justify-center gap-5 w-full"
            >
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <FormInput
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleOnChange}
                placeholder="Email"
                className="border-black border py-2 px-2"
              />
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <FormInput
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleOnChange}
                placeholder="Password"
                className="border-black border py-2 px-2"
              />
              {error && <p className="text-red-500">{error}</p>}
              <FormButton
                label="Login"
                className="py-3 bg-black w-full text-white rounded-lg"
                type="submit" // Ensure button type is submit
              />
            </form>
            <h1
              onClick={() => setIsSignup(true)}
              className="text-sm text-blue-600 underline font-semibold cursor-pointer"
            >
              Signup
            </h1>
          </div>
        </div>
      ) : (
        <SignUpForm onClose={handleCloseSignup} />
      )}
    </>
  );
};

export default LoginForm;
