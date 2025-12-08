"use client";
import { QuestionItem } from "@/components/QuestionItem";
import { RootState } from "@/store";
import { useRouter, useParams } from "next/navigation"
import { useSelector } from "react-redux";

export default function ReviewQuizPage() {
    const router = useRouter();
    const { id, folderId, quizFolderId} = useParams();
    const course = useSelector((state: RootState) => state.course.find(c => c.id === id));
    const folder = course?.learningContentFolder.find(l => l.id === folderId);
    const quizFolder = folder?.quizFolders.find(q => q.id === quizFolderId);
    
    if (!quizFolder) return (
        <div></div>
    );

    const sortedQuizMultipleChoice = quizFolder.quizMultipleChoices
        .map(q => ({ ...q, type: "multipleChoice" as const }))
        .sort((a, b) => a.questionNumber - b.questionNumber);

    const sortedQuizSubmit = quizFolder.quizSubmits
        .map(q => ({ ...q, type: "submit" as const }))
        .sort((a, b) => a.questionNumber - b.questionNumber);

    const mergedQuestions = [...sortedQuizMultipleChoice, ...sortedQuizSubmit].sort(
        (a, b) => a.questionNumber - b.questionNumber
    );

    return (
        <div className="my-10">
            <p className="text-lg font-semibold text-blue-dark mb-4">Danh sách câu hỏi</p>

            <div className="flex flex-col gap-y-4">
                {mergedQuestions.map((q) => (
                    <QuestionItem key={q.id} typeQuestionItem="view" question={q}/>
                ))}
            </div>

            <div className="flex justify-center items-center my-5 gap-x-5">
                <button
                    onClick={() => router.back()}
                    className="w-[15vw] text-white bg-blue-dark py-2.5 px-10 rounded-lg cursor-pointer"
                >
                    Quay lại
                </button>
            </div>
        </div>
    )
}