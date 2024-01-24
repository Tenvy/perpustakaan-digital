"use client";
import Card from "@/components/elements/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { kembalikanBuku } from "@/services/peminjaman";
import { useEffect, useState } from "react";
import { getUserById } from "@/services/user";
import { dateConverter } from "@/components/dateConverter";
import cover from "@/../public/coverDefault.png";

const BookCard = ({
  UserID,
  BukuID,
  Gambar,
  Judul,
  Penulis,
  Penerbit,
  TahunTerbit,
  Deskripsi,
  PeminjamanID,
  TanggalPeminjaman,
  TanggalPengembalian,
}: any) => {
  const router = useRouter();

  const [show, setShow] = useState(true);
  const [user, setUser] = useState("");

  const deleteData = async (id: string): Promise<void> => {
    try {
      if (!id) return;

      await kembalikanBuku(id);
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  const getUser = async () => {
    const response = await getUserById(UserID);
    setUser(response.Username);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {show ? (
        <div
          className={
            show
              ? `fixed w-screen h-screen bg-white z-50 top-0 left-0 text-black`
              : `hidden`
          }
        >
          <div>
            <div className="w-full flex pl-20 py-4">
              <div className="font-bold text-3xl">E-Library</div>
            </div>
          </div>
          <div className="flex flex-col pl-20 border-black border-t">
            <div className="p-2">
              <div className="flex gap-2">
                Pengguna bernama:
                <div className="font-bold">{user}</div>
              </div>
            </div>
            <div className="p-2">
              <div>
                Meminjam buku {Judul}, dengan ID {BukuID}
              </div>
            </div>
            <div className="p-2">
              <div>
                Pada tanggal {dateConverter(TanggalPeminjaman)} dan harus di
                kembalikan pada tanggal {dateConverter(TanggalPengembalian)}
              </div>
              <div className="h-[50px]"></div>
            </div>
          </div>
        </div>
      ) : null}
      <Card className="!bg-primary-color px-4 py-2 !text-secondary-color">
        <div className="flex gap-4">
          <div className="min-w-[140px]">
            {Gambar ? (
              <Image
                src={Gambar}
                alt={Judul}
                width={140}
                height={240}
                className="border"
              />
            ) : (
              <Image
                src={cover}
                alt={Judul}
                width={140}
                height={240}
                className="border"
              />
            )}
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <div className="text-2xl font-bold my-2">{Judul}</div>
              <div className="mb-2">
                <div>Penulis: {Penulis}</div>
                <div>Penerbit: {Penerbit}</div>
                <div>Tahun Terbit: {TahunTerbit}</div>
              </div>
              <div>{Deskripsi}</div>
            </div>
            <div className="flex items-center gap-2 py-2">
              <button
                onClick={() => deleteData(PeminjamanID)}
                className="bg-green-600 py-2 px-4 rounded-md"
              >
                Print Laporan
              </button>
              <div>peminjam: {user}</div>
              <div>Tanggal Peminjaman: {dateConverter(TanggalPeminjaman)}</div>
              <div>
                Tanggal Pengembalian: {dateConverter(TanggalPengembalian)}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default BookCard;
