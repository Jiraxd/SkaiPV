import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}	
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
				<div className="relative flex flex-col h-screen">
  <div style={{ background: 'url(bg.jpg)', backgroundSize: 'cover', backgroundAttachment: 'fixed', minWidth:"100%", minHeight: "100%" }}>
						<Navbar />
						<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
							{children}
						</main>
						<footer className="fixed bottom-0 w-full text-white text-center p-4">
							<Link
								isExternal
								className="flex items-center gap-1 text-current"
								href="https://github.com/Jiraxd"
								title="J1R4 github"
							>
								<span className="text-default-600">Created by</span>
								<p className="text-primary">J1R4</p>
							</Link>
						</footer>
					</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
