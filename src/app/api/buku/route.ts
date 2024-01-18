import { bukuType } from "@/type/buku";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await prisma.buku.findMany()
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}

export async function POST(request: Request){
    const { Judul, Penulis, Penerbit, TahunTerbit, Deskripsi, Gambar }:bukuType = await request.json()
    try {
        const check = await prisma.buku.findUnique({
            where: {
                Judul
            }
        })
        if (check) return NextResponse.json('Buku sudah ada!')
        const response = await prisma.buku.create({
            data: {
                Judul,
                Penulis,
                Penerbit,
                TahunTerbit,
                Deskripsi,
                Gambar,
            }
        })
        return NextResponse.json({msg: 'Buku Berhasil Dibuat!',response})
    } catch (error) {
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}