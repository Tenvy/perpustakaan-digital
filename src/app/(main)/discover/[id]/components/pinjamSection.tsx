'use client'
import { CreatePinjaman } from "@/services/peminjaman"
import { peminjamanType } from "@/type/peminjaman"
import { ChangeEvent, useState } from "react"
import { getSession } from "next-auth/react"

const PinjamSection = ({ BukuID }: peminjamanType) => {

    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState<peminjamanType>({
        UserID: 0,
        BukuID: 0,
        PeminjamanID: 0,
        StatusPinjaman: '',
        TanggalPeminjaman: new Date(),
        TanggalPengembalian: new Date()
    }) 

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: new Date(value),
        }));
    };
    
    const pinjamBuku = async () => {
        setLoading(true)
        try {
            const session:any = await getSession();
            await CreatePinjaman({
                ...values,
                UserID: session?.user?.UserID,
                BukuID,
            })
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="">
            <div className="mb-2">
                <div className="text-xl text-center mb-1">
                    Ingin meminjam Buku?
                </div>
                <div className="text-sm text-center">
                    isi form di bawah ini!
                </div>
            </div>
            <div className="mb-4">
                <div>
                    <p>Tanggal Pengembalian</p>
                    <input type="date" name="TanggalPengembalian" onChange={handleInputChange} className="bg-transparent border-b my-1" min={new Date().toISOString().split('T')[0]}/>
                </div>
            </div>
            <button onClick={pinjamBuku} className={`p-4 w-full rounded-md text-primary-color text-center ${loading ? "bg-gray-300" : "bg-white"} font-semibold`}>
                {loading ? "Meminjam" : "Pinjam Buku +"}
            </button>
        </div>
    )
}

export default PinjamSection