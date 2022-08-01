import React from 'react';
import Link from 'next/link';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';
function Header() {
  const { currentUser, logout } = useAuth();
  return (
    <>
      <div className=" sticky top-0 p-3 flex justify-between items-center">
        <Link href="/">
          <span className=" font-bold cursor-pointer ">Gosheep</span>
        </Link>
        <button
          disabled={currentUser ? false : true}
          className=" disabled:opacity-60"
          onClick={() => {
            document.getElementById('portal').classList.toggle('hidden');
          }}
        >
          <DotsVerticalIcon className="w-5 h-5" />
        </button>
      </div>
      <div
        id="portal"
        onClick={() => {
          document.getElementById('portal').classList.toggle('hidden');
        }}
        className=" hidden absolute right-3 shadow-sm shadow-white bg-slate-100 text-black p-3 "
      >
        {currentUser && (
          <>
            <div className="flex flex-col mb-7">
              <div className=" relative h-9 w-9">
                <Image
                  src={currentUser.photoURL}
                  alt="avatar"
                  layout="fill"
                  className=" rounded-full"
                />
              </div>
              <div>
                <h1>{currentUser.email}</h1>
                <h2 className="text-gray-600">{currentUser.displayName}</h2>
              </div>
            </div>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </>
  );
}

export default Header;
