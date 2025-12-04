"use client";
import { useAuth } from "@/hooks/useAuth"

export default function Home() {
	const { loading } = useAuth("/auth");

	if (loading) {
        return (
            <div>Loading...</div>
        )
    }

	return (
		<div>
			This Student Home Page
		</div>
	)
}