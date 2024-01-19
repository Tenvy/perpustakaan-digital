const getBook = async () => {
    const response = await fetch( process.env.NEXTAUTH_URL + `/api/buku`, { method: 'GET', cache: "no-store"})
    return response.json()
}

const getBookById = async (id: string) => {
    const response = await fetch(process.env.NEXTAUTH_URL + `/api/buku/${id}`, {method: 'GET', cache: 'no-store'})
    return response.json()
}

export { getBook, getBookById }