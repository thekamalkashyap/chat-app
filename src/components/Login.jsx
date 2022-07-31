import React from 'react';
import { useAuth } from '../context/AuthContext';
import googleLogo from '../../public/google.png';
import Image from 'next/image';

function Login() {
  const { signInWithGoogle } = useAuth();
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={signInWithGoogle}
        className="flex items-center bg-gray-100 py-2 px-1 border border-gray-500 shadow-black shadow-sm text-blue-500 font-bold rounded-full"
      >
        <div className=" relative h-7 w-7 mr-2">
          <Image src={googleLogo} alt="Google" layout="fill" />
        </div>
        Sign in With Google
      </button>
    </div>
  );
}

export default Login;
