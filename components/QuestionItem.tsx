import { Radio } from "antd";
import { TrashCanIcon } from "@/assests/TrashCanIcon";
import { useState } from "react";
import { PencilIcon } from "@/assests/PencilIcon";
import { ViewQuestionEditModal } from "./ViewQuestionEditModal";

interface QuizMultipleChoice {
    id: number,
    questionNumber: number,
    text: string,
    answerA: string,
    answerB: string,
    answerC: string,
    answerD: string,
    answer: string,
    type: "multipleChoice"
}

interface QuizSubmit {
    id: number,
    questionNumber: number,
    text: string,
    url: string,
    type: "submit"
}

interface QuestionItemProps {
    typeQuestionItem: "view" | "edit";
    question: QuizMultipleChoice | QuizSubmit
}

export function QuestionItem ({ typeQuestionItem, question }: QuestionItemProps) {
    const [isEdit, setEdit] = useState<boolean>(false);

    return (
        <div className="border p-4 rounded-lg border-gray-300">
            <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">Câu hỏi {question.questionNumber + 1}</p>
                <div className="flex items-center gap-x-5">
                    <button
                        className="cursor-pointer"
                        onClick={() => setEdit(!isEdit)}
                    >
                        <PencilIcon width={24} height={24} fill={"green"}/>
                    </button>
                    <button 
                        className="cursor-pointer"
                    >
                        <TrashCanIcon width={24} height={24} fill={"red"}/>
                    </button>
                </div>
            </div>

            { typeQuestionItem === "view" ? (
                <p>{question.text}</p>
            ) : (
                <input
                    className="border p-2 rounded w-full mb-3 border-gray-300"
                    value={question.text}
                    placeholder="Nhập câu hỏi..."
                />
            )} 

            <div className="mt-2">
                {question.type === "multipleChoice" ? (
                    <Radio.Group
                        vertical
                        value={question.answer}
                        options={[
                            { value: "answerA", label: question["answerA"] },
                            { value: "answerB", label: question["answerB"] },
                            { value: "answerC", label: question["answerC"] },
                            { value: "answerD", label: question["answerD"] },
                        ]}
                    />
                ) : (
                    <div></div>
                )}
            </div>

            {isEdit && (
                <ViewQuestionEditModal question={question} onClose={() => setEdit(false)}/>
            )}
        </div>
    )
}