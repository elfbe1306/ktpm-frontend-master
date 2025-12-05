"use client";
import { axiosClient } from "@/api/axiosClient";
import { RootState } from "@/store";
import { setCourse } from "@/store/courseSlice";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";


export default function CourseLayout({ children } : { children: React.ReactNode }) {
    const courses = useSelector((state: RootState) => state.course);
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCourse = async () => {
            if (!user) return;

            if (courses.length > 0) return;

            try {
                const response = await axiosClient.get(`/course/${user.userId}`);
                dispatch(setCourse(response.data.data));
            } catch {
                console.error("There is an error fetching courses")
            }
        }

        fetchCourse();
    }, [courses, user, dispatch]);

    return (
        <div>
            {children}
        </div>
    )
}