import { bukuType } from "@/type/buku";

const getBook = async () => {
  const response = await fetch(process.env.NEXTAUTH_URL + `/api/buku`, {
    method: "GET",
    cache: "no-store",
  });
  return response.json();
};

const getBookById = async (id: string) => {
  const response = await fetch(process.env.NEXTAUTH_URL + `/api/buku/${id}`, {
    method: "GET",
    cache: "no-store",
  });
  return response.json();
};

const postBook = async (data: bukuType) => {
  const response = await fetch(process.env.NEXTAUTH_URL + `/api/buku`, {
    method: "POST",
    cache: "no-store",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

const deleteBook = async (id: string) => {
    const response = await fetch(process.env.NEXTAUTH_URL + `/api/buku/${id}`, {
      method: "DELETE",
      cache: "no-store",
    });
    return response.json();
  };

  const patchBook = async (data: bukuType, id: string) => {
    const response = await fetch(process.env.NEXTAUTH_URL + `/api/buku/${id}`, {
      method: "PATCH",
      cache: "no-store",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    return response.json();
  };

export { getBook, getBookById, postBook, deleteBook, patchBook };