const getUserById = async (id: string) => {
    const response = await fetch(`/api/user/${id}`, {
        method: "GET",
        cache: "no-store",
      });
      return response.json();
}

export { getUserById }