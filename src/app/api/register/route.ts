import prisma from "@/utils/db"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { signIn } from "next-auth/react"

export async function GET() {
    try {
        const response = await prisma.user.findMany()
        return NextResponse.json(response) 
    } catch (error) {
        
    }
}

export async function POST(request: Request) {
    const { username, password, email, namaLengkap, alamat } = await request.json()
    try {
        const check = await prisma.user.findUnique({
            where: {
                Username: username
            }
        })
        if (check) return NextResponse.json({msg: "Username Already Exists!"})

        const encryptedPass = await bcrypt.hash(password, 5)

        const response = await prisma.user.create({
            data: {
                Username: username,
                Password: encryptedPass,
                Email: email,
                Nama_lengkap: namaLengkap,
                Alamat: alamat
            }
        })
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({msg: "Something went wrong.", error})
    }
}