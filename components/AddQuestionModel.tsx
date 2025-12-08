import { useDispatch, useSelector } from "react-redux";
import { LayoutModal } from "./LayoutModal"
import { RootState } from "@/store";
import { addQuestion } from "@/store/createQuestionSlice";

interface AddQuestionModalProps {
    onClose: () => void;
}

export function AddQuestionModal({ onClose }: AddQuestionModalProps ) {
    const dispatch = useDispatch();
    const questions = useSelector((state: RootState) => state.createQuestion.questions);

    const handleAddQuestion = (typeQuestion: "multipleChoice" | "fileSubmit") => {
        if (typeQuestion === "multipleChoice") {
            dispatch(addQuestion({
                questionNumber: questions.length,
                text: "",
                type: "multipleChoice",
                answerA: "Tuỳ chọn 1",
                answerB: "Tuỳ chọn 2",
                answerC: "Tuỳ chọn 3",
                answerD: "Tuỳ chọn 4",
                answer: "answerA",
            }));
        } else {
            dispatch(addQuestion({
                questionNumber: questions.length,
                text: "",
                type: "fileSubmit",
                url: ""
            }));
        }
        onClose();
    }

    return (
        <LayoutModal onClose={onClose} title={"Tạo câu hỏi"}>
            <div className="flex items-center justify-center gap-x-5 mt-5">
                <button 
                    onClick={() => handleAddQuestion("multipleChoice")}
                    className="w-[15vw] text-white bg-blue-dark py-2.5 px-10 rounded-lg cursor-pointer"
                >
                    Trắc nghiệm
                </button>
                <button 
                    onClick={() => handleAddQuestion("fileSubmit")}
                    className="w-[15vw] text-white bg-blue-dark py-2.5 px-10 rounded-lg cursor-pointer"
                >
                    Nộp file
                </button>
            </div>
        </LayoutModal>
    )
}