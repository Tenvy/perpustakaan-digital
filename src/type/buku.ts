import { kategoribuku, peminjaman } from "@prisma/client";

export type bukuType = {
    BukuID: number;
    Judul: string;
    Penulis: string;
    Penerbit: string;
    Deskripsi: string;
    Gambar: string;
    TahunTerbit: number;
    kategoribuku_relasi?: kategoribuku[]
    peminjaman: peminjaman[];
}