"use client";
import { RootState } from "@/store";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";


export function CourseWrapper({ children }: { children: React.ReactNode }) {
    const { id } = useParams();
    const user = useSelector((state: RootState) => state.user.user);
    const course = useSelector((state: RootState) => state.course.find(c => c.id === id));

    if (!course) {
        return (
            <div>Hi</div>
        )
    }

    return (
        <div className="font-display px-[5vw] pt-[5vh]">
            <p className="text-blue-dark text-2xl font-bold">{course.name}_{user?.name}{`[${course.className}]`}</p>
            {children}
        </div>
    )
}