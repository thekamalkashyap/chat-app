import React from 'react';
import { useAuth } from '../context/AuthContext';
import googleLogo from '../../public/google.png';
import Image from 'next/image';

function Login() {
  const { signInWithGoogle, error } = useAuth();
  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      {error && (
        <div className=" text-red-600 border border-rose-500 mb-10 py-2 px-5">
          {error.message}
        </div>
      )}
      <button
        onClick={signInWithGoogle}
        className="flex items-center bg-gray-100 py-2 pr-3 border border-gray-500 shadow-black shadow-sm text-blue-500 font-bold rounded-full cursor-pointer"
      >
        <div className=" relative h-7 w-7 mx-2">
          <Image src={googleLogo} alt="Google" layout="fill" priority />
        </div>
        Sign in With Google
      </button>
    </div>
  );
}

export default Login;
