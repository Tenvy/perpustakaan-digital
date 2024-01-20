import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { bukuType } from "@/type/buku";

export async function GET(request: Request, context: { params: { id: string } } ) {
    const id = context.params.id
    try {
        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            return NextResponse.json({ msg: 'Invalid ID provided.' });
        }

        const response = await prisma.buku.findFirst({
            where: {
                BukuID: parsedId
            }
        })
        if (!response) return NextResponse.json({msg: 'Buku Tidak Ada!'})
        return NextResponse.json(response)
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}

export async function DELETE(request: Request, context: { params: { id: string } } ) {
    const id = context.params.id
    try {
        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            return NextResponse.json({ msg: 'Invalid ID provided.' });
        }

        const check = await prisma.buku.findFirst({
            where: {
                BukuID: parsedId
            }
        })

        if (!check) return NextResponse.json({msg: 'Buku Tidak Ada!'})
        const response = await prisma.buku.delete({
            where: {
                BukuID: parsedId
            }
        })
        return NextResponse.json({msg: 'Buku Berhasil Terhapus!', response})
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}

export async function PATCH(request: Request, context: { params: { id: string } } ){
    const { Judul, Penulis, Penerbit, TahunTerbit, Deskripsi, Gambar }:bukuType = await request.json()
    const id = context.params.id
    
    try {
        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            return NextResponse.json({ msg: 'Invalid ID provided.' });
        }

        const check = await prisma.buku.findFirst({
            where: {
                BukuID: parsedId
            }
        })

        if (!check) return NextResponse.json('Buku Tidak ada!')
        const response = await prisma.buku.update({
            where: {
                BukuID: parsedId
            },
            data: {
                Judul,
                Penulis,
                Penerbit,
                TahunTerbit,
                Deskripsi,
                Gambar,
            }
        })
        return NextResponse.json({msg: 'Buku Berhasil Diperbarui!', response})
    } catch (error) {
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}