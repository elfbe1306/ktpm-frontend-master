"use client";
import { SkeletonImage } from "@/components/SkeletonImage";
import { Input } from "@/components/Input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAlert } from "@/store/alertSlice";
import { axiosClient } from "@/api/axiosClient";
import { setUser } from "@/store/userSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        if (loading) return;
            
        if (!email) {
            dispatch(setAlert({ alertMessage: "Vui lòng nhập email", alertType: "warning"}));
            return;
        }

        if (!password) {
            dispatch(setAlert({ alertMessage: "Vui lòng nhập mật khẩu", alertType: "warning" }));
            return;
        }

        try {
            setLoading(true);
            
            const response = await axiosClient.post("/user/login", { email: email, password: password });

            if (response.data.success) {
                localStorage.setItem("token", response.data.data.accessToken);
                dispatch(setUser(response.data.data));
                
                if (response.data.role === "student") {
                    router.push("/");
                } else {
                    router.push("/teacher");
                }
            } else {
                dispatch(setAlert({ alertMessage: response.data.error, alertType: "error" }));
            }
        } catch {
            dispatch(setAlert({ alertMessage: "Đã xảy ra lỗi", alertType: "error" }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex w-6xl gap-10 h-[70vh]">
                <div className="flex-4 flex items-center justify-center">
                    <SkeletonImage src={"/home.png"} alt={"Home Image"}/>
                </div>

                <div className="flex-3 flex justify-center flex-col gap-y-4 pl-15">
                    <p className="font-display font-semibold text-2xl text-blue-dark text-center">Đăng nhập</p>
                    <Input 
                        labelPosition={"top"} 
                        textLabel={"Email"} 
                        type={"email"}
                        value={email}
                        placeHolder={"Nhập email"} 
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input 
                        labelPosition={"top"} 
                        textLabel={"Mật khẩu"} 
                        type={"password"}
                        value={password}
                        placeHolder={"Nhập mật khẩu"} 
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className="text-right font-display text-gray-500">Quên mật khẩu?</p>

                    <button 
                        disabled={loading}
                        className={`
                            font-display self-center text-white bg-blue px-7 py-2.5 rounded-lg transition-all duration-200
                            ${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}
                        `}
                        onClick={handleLogin}
                    >
                        {loading ? "Đang xử lý..." : "Đăng nhập"}
                    </button>
                </div>
            </div>
        </div>
    );
}
