"use client";
import { RootState } from "@/store";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { CourseCard } from "@/components/CourseCard";

export default function CoursePage() {
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const user = useSelector((state: RootState) => state.user.user);
    const courses = useSelector((state: RootState) => state.course);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 1000);

        return () => clearTimeout(timer);
    }, [search]);

    const filteredCourses = courses.filter((c) => {
        const s = debouncedSearch.toLowerCase();
        return (
            c.name?.toLowerCase().includes(s) ||
            c.className?.toLowerCase().includes(s)
        );
    });

    return (
        <div className="font-display">
            <div className="flex justify-center items-center mt-[8vh]">
                <div className="flex items-center w-[60vw] bg-white rounded-xl shadow-md px-5 py-2">
                    <input
                        type="text"
                        placeholder="Tìm kiếm khoá học của bạn"
                        className="flex-1 border-none outline-none focus:outline-none focus:ring-0 text-lg"
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    />

                    <button className="bg-blue-dark text-white font-semibold px-6 py-2 rounded-xl cursor-pointer">
                        Tìm kiếm
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-x-6 mx-[10vw] mt-[4vh] bg-gray-200 p-5">
                {filteredCourses.map((c) => (
                    <CourseCard 
                        key={c.id}
                        id={c.id ?? ""}
                        name={c.name ?? ""}
                        className={c.className ?? ""}
                        teachBy={user?.name ?? ""}
                    />
                ))}
            </div>
        </div>
    )
}