"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";

const Header = () => {
  const router = useRouter();

  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    getCustomer();
  }, []);

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
  return (
    <div className="h-16 px-4 md:px-6 lg:px-14 xl:px-28 2xl:px-60 relative min-w-[350px]">
      <div className="flex items-center justify-between gap-8 h-full">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/calendarbase.png" alt="" width={24} height={24} />
            <div className="md:text-2xl tracking-wide text-lg">
              CalendarBase
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="text-sm md:text-base">
            Welcome{" "}
            <span className="text-purple-400">
              {profile?.username ? profile.username : ""}
            </span>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              router.push("/profile");
            }}
          >
            <Image src="/avatar.png" alt="" width={30} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
