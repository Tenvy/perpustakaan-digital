'use client'
import { signOut } from "next-auth/react"

const LogOut = () => {
    return <button className="hover:bg-primary-color mx-4 rounded-md hover:text-secondary-color py-2" onClick={() => signOut()}>Sign out</button>
}

export default LogOut