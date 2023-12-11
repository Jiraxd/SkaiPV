"use client"
import { useRouter } from "next/navigation";

export const ClearButton = () =>{
    const router = useRouter();
    return (
        <button className="flex items-center gap-1 text-current" onClick={ () => {localStorage.removeItem("lastVisited"); window.location.reload();}}>
            <p className="text-default-600">Clear cookies</p>
        </button>
    )
}