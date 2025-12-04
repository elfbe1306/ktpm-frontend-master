"use client";
import { axiosClient } from "@/api/axiosClient";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


export function useAuth(redirectTo: string) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axiosClient.get("/user/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                dispatch(setUser(response.data));
                
                if (response.data.role === "student") {
                    router.push("/student");
                } else {
                    router.push("/teacher");
                }
            } catch {
                localStorage.removeItem("token");
                router.push(redirectTo);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [dispatch, router, redirectTo])

    return { loading };
}