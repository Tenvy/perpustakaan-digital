
interface kategori {
    NamaKategori: string;
}

const createCategory = async (data: any) => {
  const response = await fetch(`/api/kategori`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    return errorData.msg;
  }
  return response.json();
};

const getCategory = async () => {
  const response = await fetch(`/api/kategori`, {
    cache: "no-store",
  });
  if (!response.ok) {
    const errorData = await response.json();
    return errorData.msg;
  }
  return response.json();
};

const getCategoryServer = async () => {
  const response = await fetch(process.env.NEXTAUTH_URL + `/api/kategori`, {
    cache: "no-store",
  });
  if (!response.ok) {
    const errorData = await response.json();
    return errorData.msg;
  }
  return response.json();
};

const deleteCategory = async (id: string) => {
  const response = await fetch(`/api/kategori/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });
  if (!response.ok) {
    const errorData = await response.json();
    return errorData.msg;
  }
  return response.json();
};

const patchCategory = async (data: kategori, id: string) => {
  const response = await fetch(`/api/kategori/${id}`, {
    method: "PATCH",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    return errorData.msg;
  }
  return response.json();
};

export { deleteCategory, patchCategory, createCategory, getCategory, getCategoryServer }
