"use client";

import Link from "next/link";
import Image from "next/image";

const Header = () => {
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
            Welcome <span className="text-purple-400">User</span>
          </div>
          <div className="cursor-pointer">
            <Image src="/avatar.png" alt="" width={30} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
