"use client";
import { Input } from "@/components/Input";
import { useState } from "react";
import { Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { QuestionItem } from "@/components/QuestionItem";
import { AddQuestionModal } from "@/components/AddQuestionModel";
import { useParams, useRouter } from "next/navigation";
import { setAlert } from "@/store/alertSlice";
import { axiosClient } from "@/api/axiosClient";

export default function QuizPage() {
    const { folderId } = useParams();
    const router = useRouter();
    const [topic, setTopic] = useState<string>("");
    const [quizType, setQuizType] = useState<string>("Bài tập");
    const [description, setDescription] = useState<string>("");
    const [isAddQuestionOpen, setAddQuestionOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    const questions = useSelector((state: RootState) => state.createQuestion.questions);

    const [loading, setLoading] = useState<boolean>(false);

    const handleSave = async () => {
        if (loading) return;

        if (!topic) {
            dispatch(setAlert({ alertMessage: "Vui lòng nhập chủ đề", alertType: "warning"}));
            return;
        }
    
        try {
            setLoading(true);

            const response = await axiosClient.post(`/course/quiz/create/${folderId}`, {
                topic,
                description,
                questions
            });
            console.log(response);
        } catch(error: any) {
            console.error("There is an error creating quiz:", error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="font-display mt-3">
            <p className="text-xl font-semibold text-blue-dark">Tạo quiz mới</p>

            <div className="flex justify-center items-center mt-[5vh]">
                <div className="flex-1">

                </div>

                <div className="flex-1">
                    <div className="flex gap-y-4 flex-col">
                        <Input
                            labelPosition={"left"}
                            placeHolder={""}
                            textLabel={"Chủ đề"}
                            type={"text"}
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />

                        <div className="flex items-center gap-x-10">
                            <p className="font-display text-blue-dark w-[5vw]">Loại</p>
                            <Radio.Group
                                onChange={(e) => setQuizType(e.target.value)}
                                value={quizType}
                                buttonStyle={"solid"}
                                options={[
                                    { value: "Bài tập", label: "Bài tập"},
                                    { value: "Bài tập lớn", label: "Bài tập lớn"},
                                    { value: "Bài kiểm tra", label: "Bài kiểm tra"}
                                ]}
                            />
                        </div> 

                        <Input
                            labelPosition={"left"}
                            placeHolder={""}
                            textLabel={"Mô tả"}
                            type={"text"}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <p className="text-lg font-semibold text-blue-dark mb-4">Danh sách câu hỏi</p>
                                
                <div className="flex flex-col gap-y-4">
                    {questions.map((q) => (
                        <QuestionItem key={q.questionNumber} question={q}/>
                    ))}
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={() => setAddQuestionOpen(true)}
                        className="mt-5 bg-blue-dark text-white px-6 py-2 rounded-lg cursor-pointer"
                    >
                        Thêm câu hỏi
                    </button>   
                </div>
            </div>

            <div className="flex justify-center items-center my-5 gap-x-5">
                <button
                    onClick={() => router.back()}
                    className="w-[15vw] text-white bg-blue-dark py-2.5 px-10 rounded-lg cursor-pointer"
                >
                    Quay lại
                </button>
                <button
                    onClick={handleSave}
                    className="w-[15vw] text-white bg-blue-dark py-2.5 px-10 rounded-lg cursor-pointer"
                >
                    Lưu
                </button>
            </div>

            {isAddQuestionOpen && (
                <AddQuestionModal onClose={() => setAddQuestionOpen(false)}/>
            )}
        </div>
    )
}