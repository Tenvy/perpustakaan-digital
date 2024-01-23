import { peminjamanType } from "@/type/peminjaman"

interface userType {
    UserID: number
}

const CreatePinjaman = async (data: peminjamanType) => {
    const response = await fetch(`/api/peminjaman`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

const getPeminjaman = async () => {
    const response = await fetch(process.env.NEXTAUTH_URL + `/api/peminjaman/` , {method: "GET", cache: "no-store"})
    return response.json()
}

const getPeminjamanByUserId = async (id: string) => {
    const response = await fetch(process.env.NEXTAUTH_URL + `/api/peminjaman/${id}` , {method: "GET", cache: "no-store"})
    return response.json()
}

const kembalikanBuku = async (id: string) => {
    const response = await fetch(`/api/peminjaman/${id}`, {
        method: "PATCH",
    })
    return response.json()
}

export { CreatePinjaman, getPeminjamanByUserId, kembalikanBuku, getPeminjaman }