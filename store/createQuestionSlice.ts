import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionMultipleChoice {
    questionNumber: number;
    text: string;
    answerA: string;
    answerB: string;
    answerC: string;
    answerD: string;
    answer: "answerA" | "answerB" | "answerC" | "answerD";
}

interface QuestionSubmit {
    questionNumber: number;
    text: string;
    url: string;
}

interface QuestionState {
    quizMultipleChoice: QuestionMultipleChoice[],
    quizSubmit: QuestionSubmit[]
};

const initialState: QuestionState = {
    quizMultipleChoice: [],
    quizSubmit: []
};

const questionSlice = createSlice({
    name:"question",
    initialState,
    reducers: {
        addQuizMultipleChoice(state, action: PayloadAction<QuestionMultipleChoice>) {
            state.quizMultipleChoice.push(action.payload);
        },

        addQuizSubmit(state, action: PayloadAction<QuestionSubmit>) {
            state.quizSubmit.push(action.payload);
        },

        updateQuizMultipleChoiceQuestion(state, action: PayloadAction<{ questionNumber: number, text: string }>) {
            const { questionNumber, text } = action.payload;
            const question = state.quizMultipleChoice.find(q => q.questionNumber === questionNumber);
            if (question) {
                question.text = text;
            }
        },

        updateQuizSubmitQuestion(state, action: PayloadAction<{ questionNumber: number, text: string }>) {
            const { questionNumber, text } = action.payload;
            const question = state.quizSubmit.find(q => q.questionNumber === questionNumber);
            if (question) {
                question.text = text;
            }
        },

        updateQuizMultipleChoiceOption(state, action: PayloadAction<{ questionNumber: number, text: string, key: "answerA" | "answerB" | "answerC" | "answerD" }>) {
            const { questionNumber, key, text } = action.payload;
            const question = state.quizMultipleChoice.find(q => q.questionNumber === questionNumber);
            if (question) {
                question[key] = text;
            }
        },

        checkCorrectOption(state, action: PayloadAction<{ questionNumber: number, answer: "answerA" | "answerB" | "answerC" | "answerD"}>) {
            const { questionNumber, answer } = action.payload;
            const question = state.quizMultipleChoice.find(q => q.questionNumber === questionNumber);
            if (question) {
                question["answer"] = answer;
            }
        },

        deleteQuestion(state, action: PayloadAction<number>) {
            const questionNumber = action.payload;
            const isMC = state.quizMultipleChoice.some(q => q.questionNumber === questionNumber);
            if (isMC) {
                state.quizMultipleChoice = state.quizMultipleChoice
                    .filter(q => q.questionNumber !== questionNumber)
                    .map((q, index) => ({
                        ...q,
                        questionNumber: index
                    }));
            } else {
                state.quizSubmit = state.quizSubmit
                    .filter(q => q.questionNumber !== questionNumber)
                    .map((q, index) => ({
                        ...q,
                        questionNumber: index
                    }));
            }
        },

        clearQuestions(state) {
            state.quizMultipleChoice = [];
            state.quizSubmit = [];
        }
    }
});


export const { addQuizMultipleChoice, addQuizSubmit, updateQuizMultipleChoiceQuestion, 
    updateQuizSubmitQuestion, updateQuizMultipleChoiceOption, checkCorrectOption, 
    deleteQuestion, clearQuestions } = questionSlice.actions;
export default questionSlice.reducer;
