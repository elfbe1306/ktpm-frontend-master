"use client";
import { useState } from "react";
import { LayoutModal } from "./LayoutModal"
import { axiosClient } from "@/api/axiosClient";
import { useDispatch } from "react-redux";
import { removeLearningContentFolder } from "@/store/courseSlice";
import { useParams } from "next/navigation";
import { setAlert } from "@/store/alertSlice";

interface LearningContentFolderModalDeleteProps {
    onClose: () => void;
    title: string;
    folderId: string;
    folderName: string;
}

export function LearningContentFolderModalDelete({ onClose, title, folderId, folderName }: LearningContentFolderModalDeleteProps) {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleDelete = async () => {
        if (loading) return;

        try {
            setLoading(true);

            const response = await axiosClient.delete(`/course/folder/${folderId}/delete`);
            dispatch(removeLearningContentFolder({ courseId: id as string, folderId: response.data.data }));
            dispatch(setAlert({ alertMessage: "Xoá thành công", alertType: "success" }));
            onClose();
        } catch(error: any) {
            console.error("There is an error deleting learning content folder:", error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <LayoutModal onClose={onClose} title={title}>
            <p className="text-center mt-5">Bạn chắc có muốn xoá <span className="text-blue-dark font-semibold">{folderName}</span> </p>

            <div className="flex justify-center items-center gap-x-[3vw] mt-[3vh]">
                <button onClick={handleDelete} className={`w-[15vw] text-white bg-blue-dark py-2.5 px-10 rounded-lg cursor-pointer ${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`} >
                    {loading ? "Đang xử lý" : "Có"}
                </button>
                <button onClick={onClose} className="w-[15vw] text-white bg-blue-dark py-2.5 px-10 rounded-lg cursor-pointer">Không</button>
            </div>
        </LayoutModal>
    )
}