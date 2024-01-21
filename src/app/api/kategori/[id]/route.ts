import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { id: string } } ) {
    const id = context.params.id
    try {
        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            return NextResponse.json({ msg: 'Invalid ID provided.' });
        }

        const response = await prisma.kategoribuku.findFirst({
            where: {
                KategoriID: parsedId
            }
        })
        if (!response) return NextResponse.json({msg: 'Kategori Tidak Ada!'})
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

        const check = await prisma.kategoribuku.findFirst({
            where: {
                KategoriID: parsedId
            }
        })

        if (!check) return NextResponse.json({msg: 'Kategori Tidak Ada!'})
        const response = await prisma.kategoribuku.delete({
            where: {
                KategoriID: parsedId
            }
        })
        return NextResponse.json({msg: 'Kategori Berhasil Terhapus!', response})
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}

export async function PATCH(request: Request, context: { params: { id: string } } ){
    const { NamaKategori } = await request.json()
    const id = context.params.id
    
    try {
        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            return NextResponse.json({ msg: 'Invalid ID provided.' });
        }

        const check = await prisma.kategoribuku.findFirst({
            where: {
                KategoriID: parsedId
            }
        })

        if (!check) return NextResponse.json('Kategori Tidak ada!')
        const response = await prisma.kategoribuku.update({
            where: {
                KategoriID: parsedId
            },
            data: {
                NamaKategori,
            }
        })
        return NextResponse.json({msg: 'Kategori Berhasil Diperbarui!', response})
    } catch (error) {
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}