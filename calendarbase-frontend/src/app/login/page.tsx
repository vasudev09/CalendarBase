"use client";

import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
}

export default function LoginPage() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState(MODE.LOGIN);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated === true) {
      router.push("/dashboard");
    }
  }, [isAuthenticated]);

  const formTitle =
    mode === MODE.LOGIN
      ? "Welcome Back"
      : mode === MODE.REGISTER
      ? "Register"
      : "Reset Your Password";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Sign in"
      : mode === MODE.REGISTER
      ? "Register"
      : "Reset";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (mode === MODE.REGISTER) {
      const data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("password", password);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/register/`,
          {
            method: "POST",
            body: data,
          }
        );
        const content = await res.json();
        if (res.ok) {
          setIsAuthenticated(true);
          router.push("/dashboard");
        } else {
          setError(content.message);
        }
      } catch (err) {
        console.log(err);
        setError("Something went wrong!");
      }
    }
    if (mode === MODE.LOGIN) {
      const data = new FormData();
      data.append("email", email);
      data.append("password", password);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/login/`,
          {
            method: "POST",
            credentials: "include",
            body: data,
          }
        );
        const content = await res.json();
        if (res.ok) {
          setIsAuthenticated(true);
          router.push("/dashboard");
        } else {
          setError(content.message);
        }
      } catch (err) {
        console.log(err);
        setError("Something went wrong!");
      }
    }
    setIsLoading(false);
  };
  return (
    <LoadingSpinner>
      <div className="flex w-full h-screen">
        <div className="w-full flex items-center justify-center lg:w-1/2">
          <div className=" w-11/12 max-w-[500px] px-8 py-12 rounded-3xl bg-white border-2 border-gray-100">
            <form onSubmit={handleSubmit}>
              <h1 className="text-3xl font-semibold">{formTitle}</h1>
              <p className="font-medium text-gray-500 mt-2">
                Welcome{mode === MODE.LOGIN ? " back" : ""}! Please enter your
                details.
              </p>
              <div className="mt-6">
                {mode === MODE.REGISTER && (
                  <div className="flex flex-col">
                    <label className="font-semibold">Username</label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                )}
                <div className="flex flex-col mt-4">
                  <label className="font-semibold">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                    placeholder="Enter your email"
                    required
                    type="email"
                  />
                </div>
                {mode !== MODE.RESET_PASSWORD && (
                  <div className="flex flex-col mt-4">
                    <label className="font-semibold">Password</label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border-2 border-gray-100 rounded-xl p-2 mt-1 bg-transparent"
                      placeholder="Enter your password"
                      type={"password"}
                      required
                    />
                  </div>
                )}
                <div className="mt-4 flex justify-between items-center">
                  {mode !== MODE.RESET_PASSWORD && (
                    <div>
                      <input type="checkbox" id="remember" />
                      <label
                        className="ml-2 font-medium text-base"
                        htmlFor="remember"
                      >
                        Remember for 30 days
                      </label>
                    </div>
                  )}
                  {mode === MODE.LOGIN && (
                    <button
                      onClick={() => {
                        setMode(MODE.RESET_PASSWORD);
                        setError("");
                      }}
                      className="font-medium text-base text-violet-500"
                    >
                      Forgot password
                    </button>
                  )}
                </div>
                <div className="mt-4 flex flex-col gap-y-4">
                  <button
                    type="submit"
                    className="flex items-center justify-center active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold"
                  >
                    {isLoading ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="animate-spin"
                      >
                        <path
                          d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                          fill="white"
                        />
                      </svg>
                    ) : (
                      buttonTitle
                    )}
                  </button>
                  {mode !== MODE.RESET_PASSWORD && (
                    <button className="flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold border-2 border-gray-100 ">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                          fill="#EA4335"
                        />
                        <path
                          d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                          fill="#34A853"
                        />
                        <path
                          d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                          fill="#4A90E2"
                        />
                        <path
                          d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                          fill="#FBBC05"
                        />
                      </svg>
                      {mode === MODE.LOGIN ? "Sign in" : "Sign up"} with Google
                    </button>
                  )}
                </div>
                {error && (
                  <div className="text-center pt-2 text-red-600">{error}</div>
                )}
                {mode === MODE.LOGIN && (
                  <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">
                      Don&apos;t have an account?
                    </p>
                    <button
                      onClick={() => {
                        setMode(MODE.REGISTER);
                        setError("");
                      }}
                      className="ml-2 font-medium text-base text-violet-500"
                    >
                      Sign up
                    </button>
                  </div>
                )}
                {mode === MODE.REGISTER && (
                  <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">
                      Already have an account?
                    </p>
                    <button
                      onClick={() => {
                        setMode(MODE.LOGIN);
                        setError("");
                      }}
                      className="ml-2 font-medium text-base text-violet-500"
                    >
                      Sign in
                    </button>
                  </div>
                )}
                {mode === MODE.RESET_PASSWORD && (
                  <div className="mt-8 flex justify-center items-center">
                    <p className="font-medium text-base">Go back to</p>
                    <button
                      onClick={() => {
                        setMode(MODE.LOGIN);
                        setError("");
                      }}
                      className="ml-2 font-medium text-base text-violet-500"
                    >
                      Sign in
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
          <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin" />
          <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
        </div>
      </div>
    </LoadingSpinner>
  );
}
