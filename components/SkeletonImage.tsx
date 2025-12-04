"use client";
import Image from "next/image";
import { useState } from "react";

interface SkeletonImageProps {
  src: string;
  alt: string;
}

export function SkeletonImage({ src, alt }: SkeletonImageProps) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className="w-full h-full relative rounded-lg overflow-hidden">
				{!loaded && (
					<div className="absolute inset-0 bg-gray-400 animate-pulse"></div>
				)}

				<Image 
					src={src} 
					alt={alt} 
					fill
					style={{ objectFit: "cover" }}
					className={`absolute inset-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
					onLoadingComplete={() => setLoaded(true)}
				/>
		</div>
	);
}
