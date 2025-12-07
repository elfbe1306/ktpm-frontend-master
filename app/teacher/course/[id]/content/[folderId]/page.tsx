"use client";
import { axiosClient } from "@/api/axiosClient";
import { Dropfile } from "@/components/Dropfile"
import { Input } from "@/components/Input"
import { setAlert } from "@/store/alertSlice";
import { addLearningContent } from "@/store/courseSlice";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react"
import { useDispatch } from "react-redux";

export default function ContentPage() {
    const router = useRouter();
    const { id, folderId } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [topic, setTopic] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [linkUrl, setLinkUrl] = useState<string>("");
    const [file, setFile] = useState<File | null>(null); 
    const [fileType, setFileType] = useState<string>("video");
    const dispatch = useDispatch();

    const handleFileSelect = (file: File) => {
        setFile(file);
    
        const ext = file.name.split(".").pop()?.toLowerCase() || "";
    
        if (["doc", "docx"].includes(ext)) {
            setFileType("document");
        } else if (["xls", "xlsx"].includes(ext)) {
            setFileType("excel");
        } else if (ext === "pdf") {
            setFileType("pdf");
        } else {
            setFileType("unknown");
        }
    };

    const handleSave = async () => {
        if (loading) return;

        if (!topic) {
            dispatch(setAlert({ alertMessage: "Vui lòng điền chủ đề", alertType: "warning" }))
            return;
        }

        const finalType = file ? fileType : "video";

        if (finalType === "video" && !linkUrl.trim()) {
            dispatch(setAlert({ alertMessage: "Vui lòng nhập liên kết video", alertType: "warning" }));
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("topic", topic);
            formData.append("description", description);
            formData.append("typeContent", finalType);
            formData.append("url", linkUrl);
            if (file) {
                formData.append("file", file);
            }

            const response = await axiosClient.post(`/course/content/create/${folderId}`, formData);
            dispatch(addLearningContent({ courseId: id as string, folderId: folderId as string, content: response.data.data }));
            router.back();
        } catch(error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="font-display mt-3">
            <p className="text-xl font-semibold text-blue-dark">Tạo bài giảng mới</p>

            <div className="flex justify-center items-center mt-[5vh]">
                <div className="flex-1">
                    <Dropfile onFileSelect={(f) => handleFileSelect(f)}/>
                </div>
                <div className="flex-1">
                    <div className="flex flex-col gap-y-4">
                        <Input 
                            labelPosition={"left"} 
                            placeHolder={""} 
                            textLabel={"Chủ đề"} 
                            type={"text"} 
                            value={topic} 
                            onChange={(e) => setTopic(e.target.value)}
                        />

                        <Input 
                            labelPosition={"left"} 
                            placeHolder={""} 
                            textLabel={"Mô tả"} 
                            type={"textarea"} 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <Input 
                            labelPosition={"left"} 
                            placeHolder={""} 
                            textLabel={"Liên kết"} 
                            type={"textarea"} 
                            value={linkUrl} 
                            onChange={(e) => setLinkUrl(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end mt-8">
                        <button 
                            disabled={loading} 
                            onClick={handleSave} 
                            className={`text-white bg-blue-dark py-2.5 px-10 rounded-lg cursor-pointer ${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                        >
                            {loading ? "Đang xử lý" : "Lưu"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}