'use client';
import React, { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'

const Form = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    if(session) {
        router.push('/')
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
      <div className="min-w-fit px-5 min-h-fit w-[40%] py-5 rounded-xl flex flex-col gap-10 border-white">
        <div>
          <h2 className="text-xl font-bold p-3">Email</h2>
          <input onChange={onChangeInput} type="Username" placeholder="Username" name="Username" className="w-full rounded-full p-3 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-bold p-3">Password</h2>
          <input onChange={onChangeInput} type="Password" name="Password" placeholder="Password" className="w-full rounded-full p-3 text-black" />
        </div>
        <button onClick={signin} className="bg-hover text-hover p-3 rounded-full">
          Login
        </button>
      </div>
    </div>
  );
};

export default Form;
