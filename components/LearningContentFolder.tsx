"use client";
import { ArrowRightIcon } from "@/assests/ArrowRightIcon"
import { LinkIcon } from "@/assests/LinkIcon";
import { useState } from "react"
import Link from "next/link";
import { useParams } from "next/navigation";
import { PdfIcon } from "@/assests/PdfIcon";
import { PencilIcon } from "@/assests/PencilIcon";
import { TrashCanIcon } from "@/assests/TrashCanIcon";
import { LearningContentFolderModelUpdate } from "./LearningContentFolderModelUpdate";
import { LearningContentModalDelete } from "./LearningContentModalDelete";
import { LearningContentFolderModalDelete } from "./LearningContentFolderModalDelete";

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
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [deleteLCOpen, setDeleteLCOpen] = useState<boolean>(false);
    const [deleteLCFOpen, setDeleteLCFOpen] = useState<boolean>(false);

    return (
        <>
            <div className="bg-blue-light rounded-lg">
                <div className="flex p-5 items-center gap-x-5">
                    <button 
                        onClick={() => setOpen(!open)} 
                        className={`bg-blue p-2.5 rounded-4xl transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"}`}
                    >
                        <ArrowRightIcon width={24} height={24} fill={"white"}/>
                    </button>
                    <div className="flex items-center justify-between flex-1">
                        <div className="flex items-center flex-row gap-x-5">
                            <p className="text-xl">{folderName}</p>
                            <div className="flex items-center flex-row gap-x-5">
                                <button className="cursor-pointer" onClick={() => setEditOpen(true)}><PencilIcon width={24} height={24} fill={"rgb(15, 76, 117)"}/></button>
                                <button className="cursor-pointer" onClick={() => setDeleteLCFOpen(true)}><TrashCanIcon width={24} height={24} fill={"red"}/></button>
                            </div>
                        </div>
                        {open && (
                            <div className="flex gap-x-3">
                                <Link href={`/teacher/course/${id}/quiz/${folderId}`} className="bg-blue-dark rounded-lg text-white p-2.5 cursor-pointer">Tạo bài tập mới</Link>
                                <Link href={`/teacher/course/${id}/content/${folderId}`} className="bg-blue-dark rounded-lg text-white p-2.5 cursor-pointer">Tạo nội dung mới</Link>
                            </div>
                        )}
                    </div>
                </div>

                {open && (
                    <div className="font-display flex flex-col mx-[3vw]">
                        {contents.map((c) => (
                            <div key={c.id} className="flex flex-row justify-between border-t border-blue-dark py-5">
                                <div className="flex flex-row gap-x-3">
                                    <div className="w-10 flex justify-center"> 
                                        {c.typeContent === "video" ? (
                                            <LinkIcon width={24} height={24} fill={"orange"} />
                                        ) : (
                                            <PdfIcon width={36} height={36} fill={"none"} />
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-y-2">
                                        <Link className="text-lg" href={c.url} target="_blank" rel="noopener noreferrer">{c.topic}</Link>
                                        <p>{c.description}</p>
                                    </div>
                                </div>

                                <button onClick={() => setDeleteLCOpen(true)} className="cursor-pointer"><TrashCanIcon width={24} height={24} fill={"red"}/></button>

                                {deleteLCOpen && (
                                    <LearningContentModalDelete onClose={() => setDeleteLCOpen(false)} title={"Xoá nội dung"} topic={c.topic} typeContent={c.typeContent} folderId={folderId} learningContentId={c.id}/>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {editOpen && (
                <LearningContentFolderModelUpdate folderId={folderId} title={"Sửa thư mục"} onClose={() => setEditOpen(false)}/>
            )}

            {deleteLCFOpen && (
                <LearningContentFolderModalDelete onClose={() => setDeleteLCFOpen(false)} title={"Xoá thư mục"} folderId={folderId} folderName={folderName}/>
            )}
        </>
    )
}