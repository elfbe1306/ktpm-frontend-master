"use client";
import { useAuth } from "@/hooks/useAuth"

export default function Home() {
	const { loading } = useAuth("/auth");

	return (
		<div>
		</div>
	)
}