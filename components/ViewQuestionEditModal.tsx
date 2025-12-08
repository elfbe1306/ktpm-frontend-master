import { useState } from "react";
import { LayoutModal } from "./LayoutModal"
import { Radio } from "antd";
import { axiosClient } from "@/api/axiosClient";
import { useDispatch } from "react-redux";
import { updateQuizMultipleChoice, updateQuizSubmit } from "@/store/courseSlice";
import { useParams } from "next/navigation";

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

interface ViewQuestionEditModalProps {
    onClose: () => void;
    question: QuizMultipleChoice | QuizSubmit
}

export function ViewQuestionEditModal({ onClose, question }: ViewQuestionEditModalProps) {
    const { id, folderId, quizFolderId } = useParams();
    const dispatch = useDispatch();
    const [text, setText] = useState<string>(question.text);
    const [answer, setAnswer] = useState(question.type === "multipleChoice" ? question.answer : "");
    const [answerA, setAnswerA] = useState(question.type === "multipleChoice" ? question.answerA : "");
    const [answerB, setAnswerB] = useState(question.type === "multipleChoice" ? question.answerB : "");
    const [answerC, setAnswerC] = useState(question.type === "multipleChoice" ? question.answerC : "");
    const [answerD, setAnswerD] = useState(question.type === "multipleChoice" ? question.answerD : "");
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        if (loading) return;

        try {
            setLoading(true);

            if (question.type === "multipleChoice") {
                const MCresponse = await axiosClient.put(`/course/quiz/multiplechoice/update/${question.id}`, {
                    Text: text,
                    QuestionNumber: question.questionNumber,
                    AnswerA: answerA,
                    answerB: answerB,
                    answerC: answerC,
                    answerD: answerD,
                    answer: answer
                });

                const updatedQuestion = { ...MCresponse.data.data, id: question.id };
                dispatch(updateQuizMultipleChoice({ courseId: id as string, folderId: folderId as string, quizFolderId: quizFolderId as string, quiz: updatedQuestion }));
            } else {
                const Sresponse = await axiosClient.put(`/course/quiz/submit/update/${question.id}`, {
                    Text: text,
                    QuestionNumber: question.questionNumber
                });

                const updatedQuestion = { ...Sresponse.data.data, id: question.id };
                dispatch(updateQuizSubmit({  courseId: id as string, folderId: folderId as string, quizFolderId: quizFolderId as string, quiz: updatedQuestion }));
            }

            onClose();
        } catch(error: any) {
            console.log("There is an error updating question:", error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <LayoutModal onClose={onClose} title={"Sửa câu hỏi"}>
            <div className="flex flex-col gap-y-3 mt-3">
                <p className="font-semibold">Câu hỏi {question.questionNumber + 1}</p>

                <input
                    className="border p-2 rounded w-full border-gray-300"
                    value={text}
                    placeholder="Nhập câu hỏi..."
                    onChange={(e) => setText(e.target.value)}
                />
                
                {question.type === "multipleChoice" ? (
                    <Radio.Group
                        vertical
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        options={[
                            { value: "answerA", label: (
                                <input className="border p-2 rounded w-full mb-3 border-gray-300" value={answerA} onChange={(e) => setAnswerA(e.target.value)}/>
                            )},
                            { value: "answerB", label: (
                                <input className="border p-2 rounded w-full mb-3 border-gray-300" value={answerB} onChange={(e) => setAnswerB(e.target.value)}/>
                            )},
                            { value: "answerC", label: (
                                <input className="border p-2 rounded w-full mb-3 border-gray-300" value={answerC} onChange={(e) => setAnswerC(e.target.value)}/>
                            )},
                            { value: "answerD", label: (
                                <input className="border p-2 rounded w-full mb-3 border-gray-300" value={answerD} onChange={(e) => setAnswerD(e.target.value)}/>
                            )},
                        ]}
                    />
                ) : (
                    <div></div>
                )}

                <div className="flex justify-center">
                    <button 
                        disabled={loading} 
                        onClick={handleUpdate}
                        className={`w-[20vw] text-white bg-blue-dark py-2.5 px-10 rounded-lg cursor-pointer ${loading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                    >
                        {loading ? "Đang xử lý" : "Lưu"}
                    </button>
                </div>
            </div>

        </LayoutModal>
    )
}