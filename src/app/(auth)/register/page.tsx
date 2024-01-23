'use client';
import React, { useState } from 'react';
import { CreateUser } from '@/services/register';
import { userType } from '@/type/user';

const Form = () => {
  const [formData, setFormData] = useState<userType>({
    username: '',
    password: '',
    email: '',
    namaLengkap: '',
    alamat: '',
    peminjaman: []
  });
  const [confirm, setConfirm] = useState<Boolean>()

  const register = async () => {
    try {
        if (!confirm) return null
      await CreateUser(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const checkPassword = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    if(formData.password === value) setConfirm(true)
    else setConfirm(false)
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="h-screen w-screen flex flex-nowrap justify-center items-center px-3">
      <div className="min-w-fit px-6 min-h-fit w-[40vh] py-5 rounded-xl flex flex-col gap-4 bg-white text-primary-color">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
        </div>
        <div>
          <h2 className="text-md font-semibold p-2">Full Name</h2>
          <input onChange={onChangeInput} type="text" placeholder="John Doe" name="namaLengkap" className="w-full rounded-full py-2 px-4 text-black border" required />
        </div>
        <div>
          <h2 className="text-md font-semibold p-2">Username</h2>
          <input onChange={onChangeInput} type="text" placeholder="Username" name="username" className="w-full rounded-full py-2 px-4 text-black border" required />
        </div>
        <div>
          <h2 className="text-md font-semibold p-2">Email</h2>
          <input onChange={onChangeInput} type="email" placeholder="name@example.com" name="email" className="w-full rounded-full py-2 px-4 text-black border" required />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div>
            <h2 className="text-md font-semibold p-2">Password</h2>
            <input onChange={onChangeInput} type="password" name="password" placeholder="Secret" className="w-full rounded-full py-2 px-4 text-black border" required />
          </div>
          <div>
            <h2 className={`text-md font-semibold p-2 ${!confirm && `after:content-['*'] after:text-red-700`}`}>Confirm Password</h2>
            <input onChange={checkPassword} type="password" placeholder="Secret" className="w-full rounded-full py-2 px-4 text-black border" required />
          </div>
        </div>
        <button onClick={register} className="bg-primary-color text-secondary-color p-3 rounded-full">
          Register
        </button>
      </div>
    </div>
  );
};

export default Form;
