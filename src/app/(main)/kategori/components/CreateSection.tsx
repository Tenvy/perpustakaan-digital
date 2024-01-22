'use client'
import Modal from '@/components/elements/modal';
import { createCategory } from '@/services/kategori';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";


export const CreateCategory = () => {
    const maxInputCount = 5;
    const router = useRouter();

    const [values, setValues] = useState<string[]>(['']);
    const [Loading, setLoading] = useState(false)
    const [modalCreate, setModalCreate] = useState(false)

    const addInput = () => {
        if (values.length < maxInputCount) {
            setValues((prevValues) => [...prevValues, '']);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        setValues((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues[index] = e.target.value;
            return updatedValues;
        });
    };

    const deleteInput = (index: number) => {
        setValues((prevValues) => {
            const updatedValues = [...prevValues];
            updatedValues.splice(index, 1);
            return updatedValues;
        });
    };

    useEffect(() => {
        if (values.length === 0) {
            setValues(['']);
        }
    }, []);

    const handleSave = async () => {
        setLoading(true)
        try {
            const b = values.map(item => ({
                NamaKategori: item
            }));
            console.log(b)
            await createCategory(b)
            setModalCreate(false)
        } catch (error) {
            console.error('Error saving data:', error);
        } finally {
            router.refresh();
            setValues([''])
            setLoading(false)
        }
    }

    return (
        <>
            <button onClick={() => setModalCreate(true)} className="bg-green-600 text-secondary-color py-2 px-4 rounded-md flex gap-2 items-center">
                Create Book <FaPlus />
            </button>
            <Modal className={`${!modalCreate && "!hidden"}`}>
                <div className='flex flex-col gap-4'>
                    {values.map((value, index) => (
                        <div key={index} className='flex flex-col text-sm'>
                            <label className='text-xs mb-1'>Book Category {index + 1}</label>
                            <div className='flex flex-nowrap gap-1 justify-center items-center'>
                                <input
                                    onChange={(e) => handleChange(e, index)}
                                    value={value}
                                    className='border-black py-1 w-[15vw] px-2 border rounded-lg'
                                />
                                <button
                                    className='bg-red-500 py-1 px-2 rounded-lg text-white font-bold'
                                    onClick={() => deleteInput(index)}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    ))}
                    <button onClick={addInput} className='font-semibold text-white bg-blue-500 py-1 rounded-lg mb-4' disabled={values.length >= maxInputCount}>
                        Add new input
                    </button>
                </div>
                <div className='mt-2 flex gap-2 flex-nowrap'>
                    <button onClick={() => setModalCreate(false)} className='bg-red-500 p-2 rounded-lg w-fit text-white font-semibold text-sm'>
                        Close Modal
                    </button>
                    <button onClick={() => handleSave()} className={`bg-green-500 p-2 rounded-lg w-fit text-white font-semibold text-sm ${Loading && "!cursor-not-allowed"}`}>
                        {Loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </Modal>
        </>
    );
};