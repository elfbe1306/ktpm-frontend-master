"use client";
import Image from "next/image";
import { useState } from "react";

interface SkeletonImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function SkeletonImage({ src, alt, width, height }: SkeletonImageProps) {
	const [loaded, setLoaded] = useState(false);

	const useFill = !width && !height;

	return (
		<div 
			className={useFill ? "w-full h-full relative rounded-lg overflow-hidden" : "relative rounded-lg overflow-hidden"}
			style={useFill ? undefined : { width: `${width}px`, height: `${height}px` }}
		>
			{!loaded && (
				<div className="absolute inset-0 bg-gray-400 animate-pulse"></div>
			)}

			<Image 
				src={src} 
				alt={alt}
				fill
				style={{ objectFit: "cover" }}
				className={`absolute inset-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
				onLoad={() => setLoaded(true)}
			/>
		</div>
	);
}
