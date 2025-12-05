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
        <div>
            {course.learningContentFolder.slice().sort((a, b) => a.folderName.localeCompare(b.folderName)).map((c) => {
                
                return (
                    <LearningContentFolder key={c.id} id={c.id} folderName={c.folderName}/>
                )
            })}
        </div>
    )
}