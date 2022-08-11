import React from 'react';
import { useAuth } from '../context/AuthContext';
import googleLogo from '../../public/google.png';
import Image from 'next/image';

function Login() {
  const { signInWithGoogle, error } = useAuth();
  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      {error && (
        <div className=" text-rose-600 border rounded-lg border-rose-500 mb-10 py-2 px-5">
          {error.message}
        </div>
      )}
      <button
        onClick={signInWithGoogle}
        className="flex items-center py-2 pr-3 border border-gray-500 shadow-black shadow-sm text-blue-500 font-bold rounded-lg cursor-pointer"
      >
        <div className=" relative h-7 w-7 mx-2">
          <Image src={googleLogo} alt="G" layout="fill" priority />
        </div>
        Sign in With Google
      </button>
    </div>
  );
}

export default Login;
