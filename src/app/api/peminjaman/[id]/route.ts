import { NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function GET(req: Request, context: { params: { id: string } } ) {
    const id = context.params.id
    try {
        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            return NextResponse.json({ msg: 'Invalid ID provided.' });
        }
        
        if(id) {
            const response = await prisma.peminjaman.findMany({
                where: {
                    UserID: parsedId
                }
            })
            return NextResponse.json(response)
        }
        const response = await prisma.peminjaman.findMany()
        return NextResponse.json(response)
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}

export async function PATCH(request: Request, context: { params: { id: string } } ){
    const id = context.params.id
    
    try {
        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId)) {
            return NextResponse.json({ msg: 'Invalid ID provided.' });
        }

        const check = await prisma.peminjaman.findFirst({
            where: {
                PeminjamanID: parsedId
            }
        })

        if (!check) return NextResponse.json('Data Peminjaman Tidak ada!')
        const response = await prisma.peminjaman.update({
            where: {
                PeminjamanID: parsedId
            },
            data: {
                StatusPinjaman: "Dikembalikan",
            }
        })
        return NextResponse.json({msg: 'Data Berhasil Diperbarui!', response})
    } catch (error) {
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}