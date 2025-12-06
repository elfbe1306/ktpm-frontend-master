"use client";
import { ArrowRightIcon } from "@/assests/ArrowRightIcon"
import { LinkIcon } from "@/assests/LinkIcon";
import { useState } from "react"
import Link from "next/link";
import { useParams } from "next/navigation";

interface LearningContent {
    id: string,
    topic: string,
    description: string,
    typeContent: string,
    createdAt: string,
    url: string
}

interface LearningContentFolderProps {
    folderId: string,
    folderName: string,
    contents: LearningContent[]
}

export function LearningContentFolder({ folderId, folderName, contents }: LearningContentFolderProps) {
    const { id } = useParams();
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="bg-blue-light rounded-lg">
            <div className="flex p-5 items-center gap-x-5">
                <button 
                    onClick={() => setOpen(!open)} 
                    className={`bg-blue p-2.5 rounded-4xl transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"}`}
                >
                    <ArrowRightIcon width={24} height={24} fill={"white"}/>
                </button>
                <div className="flex items-center justify-between flex-1">
                    <p className="text-xl">{folderName}</p>
                    {open && (
                        <div className="flex gap-x-3">
                            <Link href={`/teacher/course/${id}/quiz/${folderId}`} className="bg-blue-dark rounded-lg text-white p-2.5 cursor-pointer">Tạo bài tập mới</Link>
                            <Link href={`/teacher/course/${id}/content/${folderId}}`} className="bg-blue-dark rounded-lg text-white p-2.5 cursor-pointer">Tạo nội dung mới</Link>
                        </div>
                    )}
                </div>
            </div>

            {open && (
                <div className="font-display flex flex-col gap-y-3 border-t mx-[3vw] py-5 border-blue-dark">
                    {contents.map((c) => (
                        <div key={c.id} className="flex flex-row gap-x-3">
                            {c.typeContent === "video" ? (
                                <LinkIcon width={24} height={24} fill={"orange"}/>
                            ) : (
                                <div></div>
                            )}
                            <div className="flex flex-col gap-y-2">
                                <Link className="text-lg" href={c.url} target="_blank" rel="noopener noreferrer">{c.topic}</Link>
                                <p>{c.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}