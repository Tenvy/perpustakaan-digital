import { peminjaman } from "@prisma/client";

export type userType = {
    username: string;
    password: string;
    email: string;
    namaLengkap: string;
    alamat: string;
    peminjaman: peminjaman[];
}