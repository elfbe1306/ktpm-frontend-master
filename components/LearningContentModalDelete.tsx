import { useState } from "react";
import { LayoutModal } from "./LayoutModal";
import { axiosClient } from "@/api/axiosClient";
import { useDispatch } from "react-redux";
import { removeLearningContent } from "@/store/courseSlice";
import { useParams } from "next/navigation";
import { setAlert } from "@/store/alertSlice";

interface LearningContentModalDeleteProps {
    onClose: () => void;
    title: string;
    learningContentId: string;
    folderId: string;
    typeContent: string;
    topic: string;
}

export function LearningContentModalDelete({ title, onClose, learningContentId, folderId, typeContent, topic }: LearningContentModalDeleteProps) {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleDelete = async () => {
        if (loading) return;

        try {
            setLoading(true);

            const response = await axiosClient.delete(`/course/content/delete/${learningContentId}`, {data: { typeContent }});
            dispatch(removeLearningContent({ courseId: id as string, folderId: folderId, contentId: response.data.data }));
            dispatch(setAlert({ alertMessage: "Xoá thành công", alertType: "error" }));
            onClose();
        } catch (error: any) {
            console.error("There is an error deleting learning content:", error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <LayoutModal onClose={onClose} title={title}>
            <p className="text-center mt-5">Bạn chắc có muốn xoá <span className="text-blue-dark font-semibold">{topic}</span> </p>

            <div className="flex justify-center items-center gap-x-[3vw] mt-[3vh]">
                <button onClick={handleDelete} className={`w-[10vw] text-white bg-blue-dark py-2.5 px-10 rounded-lg cursor-pointer ${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`} >
                    {loading ? "Đang xử lý" : "Có"}
                </button>
                <button onClick={onClose} className="w-[10vw] text-white bg-blue-dark py-2.5 px-10 rounded-lg cursor-pointer">Không</button>
            </div>
        </LayoutModal>
    )
}