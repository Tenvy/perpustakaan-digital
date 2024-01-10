'use client';
import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Form = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session) {
    router.push('/');
  }

  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signin = async () => {
    await signIn('credentials', {
      Username: formData?.Username,
      Password: formData?.Password,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <div className="h-screen w-screen flex flex-nowrap justify-center items-center px-3">
      <div className="min-w-fit px-6 min-h-fit w-[40vh] py-5 rounded-xl flex flex-col gap-4 bg-white text-primary-color">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Sign In</h1>
        </div>
        <div>
          <h2 className="text-md font-semibold p-2">Username</h2>
          <input onChange={onChangeInput} type="text" placeholder="Username" name="Username" className="w-full rounded-full py-2 px-4 text-black border" required />
        </div>
        <div>
          <h2 className="text-md font-semibold p-2">Password</h2>
          <input onChange={onChangeInput} type="password" name="Password" placeholder="Secret" className="w-full rounded-full py-2 px-4 text-black border" required />
        </div>
        <div className='flex gap-1 text-sm p-2'>
          <h2>Dont have account?</h2>
          <Link href="/register" className='font-bold'>Register here</Link>
        </div>
        <button onClick={signin} className="bg-primary-color text-secondary-color p-3 rounded-full">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Form;
