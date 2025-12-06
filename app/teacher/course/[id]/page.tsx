"use client";
import { RootState } from "@/store"
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { LearningContentFolder } from "@/components/LearningContentFolder";

export default function CourseId() {
    const { id } = useParams();
    const courseId = id as string;
    const course = useSelector((state: RootState) => state.course.find(c => c.id === courseId));

    if (!course) return (
        <div></div>
    )

    return (
        <>
            <div className="flex justify-end mt-8">
                <button className="text-white bg-blue-dark p-2.5 rounded-lg cursor-pointer">Tạo folder mới</button>
            </div>

            <div className="flex flex-col gap-y-4 mt-5">
                {course.learningContentFolder.slice().sort((a, b) => a.folderName.localeCompare(b.folderName)).map((c) => {
                    return (
                        <LearningContentFolder key={c.id} folderId={c.id} folderName={c.folderName} contents={c.contents}/>
                    )
                })}
            </div>
        </>
    )
}