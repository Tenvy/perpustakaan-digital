import prisma from "@/utils/db";
import { NextResponse } from "next/server";

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