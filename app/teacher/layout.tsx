"use client";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
    const { loading } = useAuth("/auth");

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header/>

            <div className="flex-1">
                {children}
            </div>
            
            <Footer/>
        </div>
    )
}