"use client";
import { axiosClient } from "@/api/axiosClient";
import { RootState } from "@/store";
import { setLearningContentFolders } from "@/store/courseSlice";
import { useParams } from "next/navigation"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CourseWrapper } from "@/components/CourseWrapper";

export default function CourseIdLayout({ children } : { children: React.ReactNode }) {
    const { id } = useParams();
    const courseId = id as string; 
    const course = useSelector((state: RootState) => state.course.find(c => c.id ===id));
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchLearningContentFolder = async () => {
            if (!course) return;

            if (course.learningContentFolder.length === 0) {
                const response = await axiosClient.get(`/course/folder/${courseId}`);
                dispatch(setLearningContentFolders({ courseId: courseId, folders: response.data.data}));
            }
        }

        fetchLearningContentFolder();
    }, [course, dispatch, courseId]);

    if (!course) return (
        <div></div>
    )

    return (
        <CourseWrapper>
            {children}
        </CourseWrapper>
    )
}