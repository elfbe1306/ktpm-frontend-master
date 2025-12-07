"use client";
import { LayoutModal } from "./LayoutModal"
import { Input } from "./Input";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setAlert } from "@/store/alertSlice";
import { axiosClient } from "@/api/axiosClient";
import { addLearningContentFolder } from "@/store/courseSlice";

interface LearningContentFolderModalProps {
    onClose: () => void;
    title: string;
}

export function LearningContentFolderModal({ onClose, title }: LearningContentFolderModalProps) {
    const { id } = useParams();
    const [folderName, setFolderName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleCreate = async () => {
        if (loading) return;

        if (!folderName) {
            dispatch(setAlert({ alertMessage: "Vui lòng nhập tên thư mục", alertType: "warning" }));
            return;
        }

        try {
            setLoading(true);

            const response = await axiosClient.post(`/course/folder/${id}/create`, { folderName });

            dispatch(addLearningContentFolder({
                courseId: id as string,
                folder: response.data.data
            }));
    
            onClose(); 
        } catch(error: any) {
            console.error("There is an error creating learning content folder:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LayoutModal onClose={onClose} title={title}>
            <div className="mt-5">
                <Input type={"text"} labelPosition="left" placeHolder="Tên thư mục" textLabel="Thư mục" value={folderName} onChange={(e) => setFolderName(e.target.value)}/>
            </div>

            <div className="flex justify-end mt-5">
                <button 
                    disabled={loading} 
                    onClick={handleCreate}
                    className={`text-white bg-blue-dark py-2.5 px-10 rounded-lg cursor-pointer ${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                >
                    {loading ? "Đang xử lý" : "Lưu"}
                </button>
            </div>
        </LayoutModal>
    )
}