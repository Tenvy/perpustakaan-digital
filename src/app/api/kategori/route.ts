import { kategoriType } from "@/type/kategori";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await prisma.kategoribuku.findMany()
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}

export async function POST(request: Request){
    const data = await request.json()
    try {
        const response = await prisma.kategoribuku.createMany({data})
        return NextResponse.json({msg: 'Kategori Berhasil Dibuat!',response})
    } catch (error) {
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}