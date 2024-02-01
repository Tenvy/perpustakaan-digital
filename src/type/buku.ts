import { kategoribuku, kategoribuku_relasi, peminjaman } from "@prisma/client";

export type kategori_bukuRelasiWithName = {
    kategoribuku_relasi?: kategoribuku_relasi
    kategoribuku: kategoribuku
}

export type bukuType  = {
    BukuID: number;
    Judul: string;
    Penulis: string;
    Penerbit: string;
    Deskripsi: string;
    Gambar: string;
    TahunTerbit: number;
    kategoribuku?: kategoribuku[];
    kategoribuku_relasi?: kategori_bukuRelasiWithName[];
    peminjaman: peminjaman[];
}
