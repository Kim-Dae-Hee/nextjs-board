"use client";

import Link from "next/link";
import LoginAndOutButton from "./LoginAndOutButton";
import { useSession, signIn, signOut } from "next-auth/react";
import ProfileImage from "../context/ProfileImage";
import { usePathname } from "next/navigation";
import NewPostIcon from "./icons/NewPostIcon";
import NewFillPostIcon from "./icons/NewFillPostIcon";

const newPostInfo = {
  href: "/new",
  noClickedIcon: <NewPostIcon />,
  clickedIcon: <NewFillPostIcon />,
};

export default function Navbar() {
  const { data: session } = useSession();
  const pathName = usePathname();
  const user = session?.user;

  return (
    <div className="flex justify-between px-10 py-4 items-center">
      <Link href="/">
        <h1 className="text-4xl font-bold hover:scale-110 transition-all">
          Board
        </h1>
      </Link>
      <nav>
        <ul className="flex gap-2 items-center">
          <li className="text-3xl mr-4 z-auto hover:scale-110 transition-all">
            <Link href={newPostInfo.href}>
              {pathName === newPostInfo.href
                ? newPostInfo.clickedIcon
                : newPostInfo.noClickedIcon}
            </Link>
          </li>
          <li>
            {user && (
              <div className="mr-4">
                <ProfileImage image={user.image} size='small' />
              </div>
            )}
          </li>
          <li>
            <div>
              {session ? (
                <LoginAndOutButton text="Log Out" btnClick={() => signOut()} />
              ) : (
                <LoginAndOutButton text="Log In" btnClick={() => signIn()} />
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
