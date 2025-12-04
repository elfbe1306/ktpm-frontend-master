"use client";
import { axiosClient } from "@/api/axiosClient";
import { RootState } from "@/store";
import { setUser } from "@/store/userSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export function useAuth(redirectTo: string) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                router.push(redirectTo);
                setLoading(false);
                return;
            }
            
            try {
                if (user) {
                    setLoading(false);
                    return;
                }

                const response = await axiosClient.get("/user/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                dispatch(setUser(response.data));
                
                if (response.data.role === "student") {
                    router.push("/");
                } 

                if (response.data.role === "teacher" && !pathname.startsWith("/teacher")) {
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
    }, [dispatch, router, redirectTo, pathname, user])

    return { loading };
}