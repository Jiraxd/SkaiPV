"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import {frontPageItems, UserDisplay} from "@/models/userDisplay";

export const ButtonRedirect = () => {
  const router = useRouter();
  const [valuestoloopthru, setValuestoloopthru] = useState(frontPageItems);
  const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {const volenemamnervyarray = localStorage.getItem('lastVisited');
    if (volenemamnervyarray !== null) {
      const parsedData : UserDisplay[] = JSON.parse(volenemamnervyarray);
      setValuestoloopthru(parsedData);
    }
    setIsLoading(false);
  }, []);
  
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-2 gap-4 p-4" style={{backgroundColor: 'rgba(20, 20, 20, 0)',borderRadius: '15px', width:625 }}>
          {valuestoloopthru.map((item: UserDisplay) => (
            <button onClick={() => router.push(`/displaydata?search=${item.label}`)}>
              <div key={item.label} className="p-4 flex" style={{backgroundColor: 'rgba(20, 20, 20, 0.6)',borderRadius: '15px', width:300 }}>
                <div className="flex items-center">
                  <img src={item.pfp} alt="Image 1" className="h-16 w-16" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-white">{item.label}</h2>
                  <p className="text-sm font-bold text-gray-300">{item.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
};
