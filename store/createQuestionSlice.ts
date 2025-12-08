import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BaseQuestion {
    questionNumber: number;
    text: string;
    type: "multipleChoice" | "fileSubmit";
};

interface QuestionMultipleChoice extends BaseQuestion {
    type: "multipleChoice";
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    answer: "answerA" | "answerB" | "answerC" | "answerD";
}

interface QuestionFileSubmit extends BaseQuestion {
    type: "fileSubmit";
    url: string;
}

export type Question = QuestionMultipleChoice | QuestionFileSubmit;

interface QuestionState {
    questions: Question[];
};

const initialState: QuestionState = {
    questions: []
};

const questionSlice = createSlice({
    name:"question",
    initialState,
    reducers: {
        addQuestion(state, action: PayloadAction<Question>) {
            state.questions.push(action.payload);
        },

        updateQuestion(state, action: PayloadAction<{ questionNumber: number, text: string }>) {
            const { questionNumber, text } = action.payload;
            const question = state.questions.find(q => q.questionNumber === questionNumber);
            if (question) {
                question.text = text;
            }
        },

        updateQuestionOption(state, action: PayloadAction<{ questionNumber: number, text: string, key: "answerA" | "answerB" | "answerC" | "answerD" }>) {
            const { questionNumber, key, text } = action.payload;
            const question = state.questions.find(q => q.questionNumber === questionNumber);
            if (question && question.type === "multipleChoice") {
                question[key] = text;
            }
        },

        checkCorrectOption(state, action: PayloadAction<{ questionNumber: number, answer: "answerA" | "answerB" | "answerC" | "answerD"}>) {
            const { questionNumber, answer } = action.payload;
            const question = state.questions.find(q => q.questionNumber === questionNumber);
            if (question && question.type === "multipleChoice") {
                question["answer"] = answer;
            }
        },

        deleteQuestion(state, action: PayloadAction<number>) {
            const idToRemove = action.payload;
            state.questions = state.questions.filter(q => q.questionNumber !== idToRemove);

            state.questions = state.questions.map((q, index) => ({
                ...q,
                questionNumber: index
            }));
        }
    }
});


export const { addQuestion, updateQuestion, updateQuestionOption, deleteQuestion, checkCorrectOption } = questionSlice.actions;
export default questionSlice.reducer;
