import { TrashCanIcon } from "@/assests/TrashCanIcon";
import { checkCorrectOption, deleteQuestion, updateQuizMultipleChoiceOption, updateQuizMultipleChoiceQuestion, updateQuizSubmitQuestion } from "@/store/createQuestionSlice";
import { Radio } from "antd";
import { useDispatch } from "react-redux";

interface QuestionMultipleChoice {
    questionNumber: number;
    text: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    answer: "answerA" | "answerB" | "answerC" | "answerD";
    type: "multipleChoice"
}

interface QuestionSubmit {
    questionNumber: number;
    text: string;
    url: string;
    type: "submit"
}

interface QuestionItemCreateProps {
    question: QuestionMultipleChoice | QuestionSubmit
}

export function QuestionItemCreate({ question }: QuestionItemCreateProps) {
    const dispatch = useDispatch();

    return (
        <div className="border p-4 rounded-lg border-gray-300">
            <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">Câu hỏi {question.questionNumber + 1}</p>
                <button 
                    className="cursor-pointer"
                    onClick={() => dispatch(deleteQuestion(question.questionNumber))}
                >
                    <TrashCanIcon width={24} height={24} fill={"red"}/>
                </button>
            </div>

            {question.type === "multipleChoice" ? (
                <input
                    className="border p-2 rounded w-full mb-3 border-gray-300"
                    value={question.text}
                    placeholder="Nhập câu hỏi..."
                    onChange={(e) => dispatch(updateQuizMultipleChoiceQuestion({ questionNumber: question.questionNumber, text: e.target.value }))}
                />
            ) : (
                <input
                    className="border p-2 rounded w-full mb-3 border-gray-300"
                    value={question.text}
                    placeholder="Nhập câu hỏi..."
                    onChange={(e) => dispatch(updateQuizSubmitQuestion({ questionNumber: question.questionNumber, text: e.target.value }))}
                />
            )}

            <div className="mt-2">
                {question.type === "multipleChoice" ? (
                    <Radio.Group
                        vertical
                        value={question.answer}
                        onChange={(e) => dispatch(checkCorrectOption({ questionNumber: question.questionNumber, answer: e.target.value }))}
                        options={[
                            { value: "answerA", label: (
                                <input type="text" value={question["answerA"]}
                                    onChange={(e) => dispatch(updateQuizMultipleChoiceOption({ 
                                        questionNumber: question.questionNumber,
                                        text: e.target.value,
                                        key: "answerA"
                                    }))}
                                />
                            )},
                            { value: "answerB", label: (
                                <input type="text" value={question["answerB"]}
                                    onChange={(e) => dispatch(updateQuizMultipleChoiceOption({ 
                                        questionNumber: question.questionNumber,
                                        text: e.target.value,
                                        key: "answerB"
                                    }))}
                                />
                            )},
                            { value: "answerC", label: (
                                <input type="text" value={question["answerC"]}
                                    onChange={(e) => dispatch(updateQuizMultipleChoiceOption({ 
                                        questionNumber: question.questionNumber,
                                        text: e.target.value,
                                        key: "answerC"
                                    }))}
                                />
                            )},
                            { value: "answerD", label: (
                                <input type="text" value={question["answerD"]}
                                    onChange={(e) => dispatch(updateQuizMultipleChoiceOption({ 
                                        questionNumber: question.questionNumber,
                                        text: e.target.value,
                                        key: "answerD"
                                    }))}
                                />
                            )},
                        ]}
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}