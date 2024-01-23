import { peminjamanType } from "@/type/peminjaman";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = await prisma.peminjaman.findMany()
        return NextResponse.json(response)
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}

export async function POST(request: Request){
    const { BukuID,TanggalPengembalian,UserID }:peminjamanType = await request.json()
    try {
        const response = await prisma.peminjaman.create({
            data: {
                UserID,
                BukuID,
                TanggalPeminjaman: new Date(),
                TanggalPengembalian,
                StatusPinjaman: 'dipinjam'
            }
        })
        return NextResponse.json({msg: 'Buku Berhasil dipinjam!',response})
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}