"use client";
import { useAuth } from "@/hooks/useAuth"

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
    const { loading } = useAuth("/auth");

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div>
            {children}
        </div>
    )
}