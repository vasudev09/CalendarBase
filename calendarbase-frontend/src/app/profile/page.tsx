"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ProfileType } from "../types";

const ProfilePage = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [changePasswordInput, setChangePasswordInput] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isAuthenticated == false) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getCustomer();
  }, []);

  async function handleLogout() {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/logout/`,
        {
          credentials: "include",
          cache: "no-cache",
        }
      );
      // const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(false);
        router.push("/login");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function getCustomer() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/profile/`,
        {
          cache: "no-cache",
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function changePassword() {
    setMessage("");
    if (password.length > 7) {
      try {
        setLoading(true);
        const data = new FormData();
        data.append("password", password);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/change-password/`,
          {
            method: "POST",
            credentials: "include",
            body: data,
          }
        );
        if (res.ok) {
          setMessage("Password Change Successfull!");
          setPassword("");
          setChangePasswordInput(false);
        } else {
          setMessage("Something went wrong while updating password.");
        }
      } catch (e) {
        console.log(e);
        setMessage("Something went wrong while updating password.");
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("Please enter atleast 8 characters.");
    }
  }

  return (
    <LoadingSpinner addCondition={"authFalse"}>
      <div className="flex flex-col md:flex-row justify-between items-start relative pt-8 pb-28 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="order-2 md:order-1 w-full md:w-[25%] border font-medium md:font-normal rounded-md md:border-none">
          <div
            className={`cursor-pointer p-3 text-center md:text-left rounded-md bg-gray-200 hover:bg-gray-200`}
          >
            Profile
          </div>
          <div
            className="cursor-pointer p-3 text-center md:text-left text-violet-500 rounded-md hover:bg-gray-100"
            onClick={() => handleLogout()}
          >
            Logout
            {loading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
                className="inline-block ml-4"
              >
                <path
                  fill="#4a90e2"
                  d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
                >
                  <animateTransform
                    attributeName="transform"
                    dur="0.75s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 12 12;360 12 12"
                  />
                </path>
              </svg>
            )}
          </div>
        </div>
        <div className="order-1 md:order-2 w-full md:w-[70%]">
          <div className="bg-white w-full min-h-screen md:min-h-0 rounded-md md:border">
            {message && <div className="py-2 text-center">{message}</div>}
            <div className="relative w-32 h-32 mx-auto">
              <Image src="/user.png" fill alt="" className="object-contain" />
            </div>
            <div className="pt-16 md:pl-[10%]">
              <div className="mb-8 px-4 flex flex-col md:flex-row">
                <div className="min-w-36 mb-1 font-semibold">Username :</div>
                <div className="">
                  {profile?.username ? profile.username : "**username**"}
                </div>
              </div>
              <div className="mb-10 px-4 flex flex-col md:flex-row">
                <div className="min-w-36 mb-1 font-semibold">Email :</div>
                <div className="">
                  {profile?.email ? profile.email : "**email**"}
                </div>
              </div>
              <div className="mb-10 px-4 flex flex-col md:flex-row">
                <div className="min-w-36 mb-1 font-semibold">Password :</div>
                {changePasswordInput ? (
                  <div className="flex flex-col items-start gap-4 md:flex-row">
                    <input
                      type="text"
                      name="password"
                      placeholder="Enter new password"
                      className="ring-1 ring-gray-300 rounded-md p-1.5"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div>
                      <button
                        type="button"
                        className="cursor-pointer bg-violet-500 text-white rounded-md py-1.5 px-2 relative"
                        onClick={() => changePassword()}
                        disabled={loading}
                      >
                        {loading ? <span>...</span> : "Update"}
                      </button>
                      <button
                        type="button"
                        className="cursor-pointer rounded-md py-1.5 px-2"
                        onClick={() => {
                          setChangePasswordInput(false);
                          setPassword("");
                          setMessage("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="leading-8 align-middle">********</span>
                    <span
                      className="ml-6 cursor-pointer text-violet-500"
                      onClick={() => setChangePasswordInput(true)}
                    >
                      change
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadingSpinner>
  );
};

export default ProfilePage;
