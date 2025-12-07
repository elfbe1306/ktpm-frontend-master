"use client";
import { useParams } from "next/navigation";
import { Input } from "./Input";
import { LayoutModal } from "./LayoutModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import { axiosClient } from "@/api/axiosClient";
import { updateLearningContentFolder } from "@/store/courseSlice";


interface LearningContentFolderModalProps {
    onClose: () => void;
    title: string;
    folderId: string;
}

export function LearningContentFolderModelUpdate({ folderId, onClose, title}: LearningContentFolderModalProps) {
    const { id } = useParams();
    const course = useSelector((state: RootState) => state.course.find(c => c.id === id));
    const folder = course?.learningContentFolder.find(c => c.id === folderId);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(false);
    const originalName = folder?.folderName ?? "";
    const [folderName, setFolderName] = useState(originalName);

    const handleUpdate = async () => {
        if (loading || folderName === originalName) return;

        try {
            setLoading(true);

            const response = await axiosClient.put(`/course/folder/${folderId}/update`, { folderName });
            dispatch(updateLearningContentFolder({ courseId: id as string, folderId: folderId, folderName: response.data.data.folderName }));
            onClose();
        } catch(error: any) {
            console.error("There is an error updating learning folder content: ", error.message);
        } finally {
            setLoading(false);
        }
    }

    const isDisabled = loading || folderName.trim() === "" || folderName === originalName;

    return (
        <LayoutModal onClose={onClose} title={title}>
            <div className="mt-5">
                <Input type={"text"} labelPosition="left" placeHolder="Tên thư mục" textLabel="Thư mục" value={folderName} onChange={(e) => setFolderName(e.target.value)}/>
            </div>

            <div className="flex justify-end mt-5">
                <button 
                    disabled={isDisabled} 
                    onClick={handleUpdate}
                    className={`text-white bg-blue-dark py-2.5 px-10 rounded-lg cursor-pointer ${isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                >
                    {loading ? "Đang xử lý" : "Lưu"}
                </button>
            </div>
        </LayoutModal>
    )
}