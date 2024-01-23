'use client'
import Modal from '@/components/elements/modal';
import { useEdgeStore } from '@/provider/AuthProvider';
import { postBook } from '@/services/book';
import { getCategory } from '@/services/kategori';
import { bukuType } from '@/type/buku';
import { kategoriType } from '@/type/kategori';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { FaPlus } from "react-icons/fa";

const CreateSection = () => {
    const router = useRouter();
    const { edgestore } = useEdgeStore()

    const [values, setValues] = useState<bukuType>({
        BukuID: 0,
        Judul: '',
        Penulis: '',
        Penerbit: '',
        Deskripsi: '',
        Gambar: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
        TahunTerbit: 1999,
        kategoribuku_relasi: [],
        peminjaman: []
    });
    const [Loading, setLoading] = useState(false)
    const [modalCreate, setModalCreate] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [categoryData, setCategoryData] = useState<kategoriType[]>([])

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const numericValue = name === 'TahunTerbit' ? parseInt(value, 10) : value;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: numericValue,
        }));
    };

    const handleSave = async () => {
        setLoading(true)
        try {
            if (selectedFile) {
                const res = await edgestore.publicImages.upload({
                    file: selectedFile,
                })

                setValues((prevValues) => ({
                    ...prevValues,
                    Gambar: res.url
                }))

                const response = await postBook({
                    ...values,
                    Gambar: res.url,
                    kategoribuku_relasi: dataList2
                })
                return response
            }
            const response = await postBook(values)
            return response
        } catch (error) {
            console.log(error)
        } finally {
            setValues({
                BukuID: 0,
                Judul: '',
                Penulis: '',
                Penerbit: '',
                Deskripsi: '',
                Gambar: 'https://edit.org/images/cat/book-covers-big-2019101610.jpg',
                TahunTerbit: 0,
                kategoribuku_relasi: [],
                peminjaman: []
            })
            setLoading(false)
            router.refresh();
        }
    };

    const getCategoryData = async () => {
        const response = await getCategory()
        setCategoryData(response)
    }

    useEffect(()=>{
        getCategoryData()
    }, [])

    const [dataList2, setDataList2] = useState<kategoriType[]>([]);

    const moveDataToSecondList = (selectedData: kategoriType) => {
        const updatedList1 = categoryData.filter(item => item !== selectedData);
        setCategoryData(updatedList1);

        const updatedList2 = [...dataList2, selectedData];
        setDataList2(updatedList2);
    };

    const moveDataToFirstList = (selectedData: kategoriType) => {
        const updatedList2 = dataList2.filter(item => item !== selectedData);
        setDataList2(updatedList2);

        const updatedList1 = [...categoryData, selectedData];
        setCategoryData(updatedList1);
    };

    console.log(dataList2)

    return (
        <div className="pb-2">
            <button onClick={() => setModalCreate(true)} className="bg-green-600 text-secondary-color py-2 px-4 rounded-md flex gap-2 items-center">
                Create Book <FaPlus />
            </button>
            <Modal className={`${!modalCreate && "!hidden"}`}>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col items-center gap-2'>
                        <Image src={selectedFile ? URL.createObjectURL(selectedFile) : ""} alt="Book Image" width={140} height={240} className="border border-dashed" />
                        <div className='flex justify-center'>
                            <input type="file" className='hidden' name='file-input' onChange={handleFileChange} id='file-input' />
                            <label htmlFor="file-input" className='py-2 px-4 bg-primary-color rounded-md text-secondary-color cursor-pointer'>Select Cover Image</label>
                        </div>
                    </div>
                    <div className=''>
                        <div>
                            Judul
                        </div>
                        <input type="text" name='Judul' value={values.Judul} onChange={handleInputChange} className='border w-full' />
                    </div>
                    <div className='flex gap-2'>
                        <div>
                            <div>
                                Penulis
                            </div>
                            <input type="text" className='border' value={values.Penulis} name='Penulis' onChange={handleInputChange} />
                        </div>
                        <div>
                            <div>
                                Penerbit
                            </div>
                            <input type="text" className='border' value={values.Penerbit} name='Penerbit' onChange={handleInputChange} />
                        </div>
                        <div className='w-[20%]'>
                            <div className=''>
                                Tahun Terbit
                            </div>
                            <input type="number" value={values.TahunTerbit} placeholder='YYYY' min={1999} max={2099} maxLength={4} className='border w-[12vh]' name='TahunTerbit' onChange={handleInputChange} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h2>Kategori yang ada</h2>

                            <div className='flex gap-2 flex-wrap border h-[42px]'>
                                {categoryData.map((item, index) => (
                                    <button key={index} className='bg-green-500 text-secondary-color py-2 px-4 rounded-md' onClick={() => moveDataToSecondList(item)}>{item.NamaKategori}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h2>Kategori yang dipilih</h2>
                            <div className='flex gap-2 flex-wrap border h-[42px]'>
                                {dataList2.map((item, index) => (
                                    <button key={index} className='bg-green-500 text-secondary-color py-2 px-4 rounded-md' onClick={() => moveDataToFirstList(item)}>{item.NamaKategori}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            Deskripsi
                        </div>
                        <textarea className='border w-full max-h-[200px]' value={values.Deskripsi} name="Deskripsi" onChange={handleInputChange} />
                    </div>
                </div>
                <div className='mt-2 flex gap-2 flex-nowrap'>
                    <button onClick={() => setModalCreate(false)} className='bg-red-500 p-2 rounded-lg w-fit text-white font-semibold text-sm'>
                        Close Modal
                    </button>
                    <button onClick={handleSave} className={`bg-green-500 p-2 rounded-lg w-fit text-white font-semibold text-sm ${Loading && "!cursor-not-allowed"}`}>
                        {Loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default CreateSection