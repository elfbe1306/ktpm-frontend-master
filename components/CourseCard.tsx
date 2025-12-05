import { useMemo } from "react";
import { SkeletonImage } from "./SkeletonImage";
import Link from "next/link";

interface CourseProps {
    id: string,
    name: string,
    className: string,
    teachBy: string
}

export function CourseCard({ id, name, className, teachBy }: CourseProps) {
    const bg = useMemo(() => {
        const backgrounds = ["/bluebackground.png", "/darkbluebackground.png"];
        const sum = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
        return backgrounds[sum % backgrounds.length];
    }, [id]);

    return (
        <div className="flex flex-col h-[30vh] w-full bg-white rounded-lg">
            <div className="flex-1">
                <SkeletonImage src={bg} alt={"img"}/>
            </div>
            <Link 
                href={`/teacher/course/${id}`}
                className="p-2.5"
            >
                {name}_{teachBy} {`[${className}]`}
            </Link>
        </div>
    )
}