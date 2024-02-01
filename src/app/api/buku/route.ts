import { bukuType } from "@/type/buku";
import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await prisma.buku.findMany({
            include: {
                kategoribuku_relasi: {
                    include: {
                        kategoribuku: true
                    }
                }
            }
        })
        return NextResponse.json(response)
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}

export async function POST(request: Request){
    const { Judul, Penulis, Penerbit, TahunTerbit, Deskripsi, Gambar, kategoribuku }:bukuType = await request.json()
    try {
        const check = await prisma.buku.findUnique({
            where: {
                Judul
            }
        })
        if (check) return NextResponse.json('Buku sudah ada!')

        const categorySet = new Set(kategoribuku?.map((Kategori) => Kategori.KategoriID));
        if (kategoribuku && kategoribuku.length !== categorySet.size) {
            return NextResponse.json({ msg: "Duplicate values in Category" });
        }

        const response = await prisma.buku.create({
            data: {
                Judul,
                Penulis,
                Penerbit,
                TahunTerbit,
                Deskripsi,
                Gambar,
                kategoribuku_relasi: {
                    create: kategoribuku?.map(kategori => ({
                        kategoribuku: {
                            connect: {
                                KategoriID: kategori.KategoriID
                            }
                        }
                    }))
                }
            }
        })

        // if(kategoribuku) {
        //     await prisma.kategoribuku_relasi.createMany({
        //             data: kategoribuku.map((res) => ({
        //                 BukuID: response.BukuID,
        //                 KategoriID: res.KategoriID
        //             }))
        //     })
        // }

        return NextResponse.json({msg: 'Buku Berhasil Dibuat!',response})
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({msg: 'Something went wrong.', error})
    }
}