import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon, SearchIcon } from "@/components/icons";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {SearchBar} from "../components/searchBar";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>
					View player profiles for 
				</h1>
				<br /><br />
				<h1 className={title()} style={{ color: 'yellow' }}>Hypixel SkyBlock!</h1>
			</div>
			<br></br><br></br>
				<br></br><br></br>
				<br></br><br></br>
				<SearchBar />
	<ul className="grid grid-cols-2 gap-4 p-4" style={{backgroundColor: 'rgba(20, 20, 20, 0)',borderRadius: '15px', width:625 }}>
  {siteConfig.frontPageItems.map((item) => (
    <div key={item.label}className="p-4 flex" style={{backgroundColor: 'rgba(20, 20, 20, 0.6)',borderRadius: '15px', width:300 }}>	
      <div className="flex items-center">
        <img src={item.pfp} alt="Image 1" className="h-16 w-16" />
      </div>
      <div className="ml-4">
        <h2 className="text-xl font-bold text-white">{item.label}</h2>
        <p className="text-sm font-bold text-gray-300">{item.desc}</p>
      </div>
    </div>
  ))}
</ul>


				<div className="grid grid-cols-2 gap-4">
</div>
		</section>
	);
}
