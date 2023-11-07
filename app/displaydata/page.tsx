'use client'
import { title } from "@/components/primitives";
import { useSearchParams  } from "next/navigation";
import { useState, useEffect } from 'react'
import { UserDisplay } from '@/models/userDisplay';


export default function AboutPage() {
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const [data, setData] = useState(null)
	const [isLoading, setLoading] = useState(true)
	const searchParams = useSearchParams();
	const search = searchParams.get('search');

	
   
	useEffect(() => {
		const fetchData = async () => {
			const data = await fetch(`https://sky.shiiyu.moe/api/v2/profile/${search}`);
			const json = data.json();
			return json;
		  }
	  fetchData()
		.then((data) => {
		  setData(data)
		  setLoading(false)
		})
	}, [])
   
	if (isLoading) return <p>Loading...</p>
	if(data === null || data["profiles"] === null) return <p>No profile data</p>
	console.log(data);
	const strg = localStorage.getItem("lastVisited");
const arrayx: UserDisplay[] = JSON.parse((strg as string));
const currentProfile = Object.values(data["profiles"]).find((profile) => (profile as any)["current"] === true);

const newProfile = new UserDisplay(`${(currentProfile as any)["data"]["display_name"]}`, `Skyblock level: ${(currentProfile as any)["data"]["skyblock_level"]["level"]}`, `https://minotar.net/avatar/${(currentProfile as any)["data"]["display_name"]}.png`);

if (arrayx === null || arrayx.length === 0) {
  localStorage.setItem("lastVisited", JSON.stringify([newProfile]));
} else {
	if(arrayx.find(f => f.label == newProfile.label) == null){
  arrayx.push(newProfile);

  if (arrayx.length > 4) {
    arrayx.shift();
  }

  localStorage.setItem("lastVisited", JSON.stringify(arrayx));
}
}

	return (
<div
  className="fixed top-10 right-0 w-3/4 mx-auto h-full p-4"
  style={{
	backgroundColor: 'rgba(20, 20, 20, 0.8)',borderRadius: '15px'
  }}
>
<br />
    <br />
  <div className="">
    <h1 className={title()}>Currently viewing </h1>
    <h1 className={title()} style={{ color: 'yellow' }}>
       {(currentProfile as any)["data"]["display_name"]}'s 
    </h1>
    <h1 className={title()}> profile on         <span
          style={{ color: 'purple' }}
          onMouseEnter={() => setIsMenuVisible(true)}
          onMouseLeave={() => setIsMenuVisible(false)}
        >{(currentProfile as any)["cute_name"]}{isMenuVisible && (
            <div className="absolute top-8 p-4 space-y-2" style={{
				backgroundColor: 'rgba(20, 20, 20, 0.8)',
				borderRadius: '20px',
				color: "white",
				fontSize: "90%",
				display: "flex",
				justifyContent: "flex-start",
				right: "39.5%",
				paddingRight: 50,
				paddingLeft: 23
			  }}>
				<div>
              {Object.values(data["profiles"]).map((profile, index) => {
                if (profile !== currentProfile) {
                  return (
                    <div key={index} className="cursor-pointer hover:text-grey-200">
                      {(profile as any)["cute_name"]}
                    </div>
                  );
                }
              })}
			  </div>
            </div>
          )}</span></h1>
	<br />
    <br />
    <div>
	
    </div>
  </div>
</div>
	);
}