const getBook = async () => {
    const response = await fetch( process.env.NEXTAUTH_URL + `/api/buku`, { method: 'GET', cache: "no-store"})
    return response.json()
}

export { getBook }