import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LearningContent {
    id: string,
    topic: string,
    description: string,
    typeContent: string,
    createdAt: string,
    url: string
}

interface QuizMultipleChoice {
    id: number,
    questionNumber: number,
    text: string,
    answerA: string,
    answerB: string,
    answerC: string,
    answerD: string,
    answer: string
}

interface QuizSubmit {
    id: number,
    questionNumber: number,
    text: string,
    url: string
}

interface QuizFolder {
    id: string,
    topic: string,
    description: string,
    createdAt: string,
    minutes: number,
    openTime: string,
    closeTime: string,
    typeQuiz: string,
    quizMultipleChoices: QuizMultipleChoice[],
    quizSubmits: QuizSubmit[]
}

interface LearningContentFolderItem {
    id: string,
    folderName: string,
    contents: LearningContent[],
    quizFolders: QuizFolder[]
}

interface CourseState {
    id: string | null,
    name: string | null,
    className: string | null,
    createdAt: string | null,
    learningContentFolder: LearningContentFolderItem[],
}

const initialState: CourseState[] = [];

const CourseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setCourse(_, action: PayloadAction<CourseState[]>) {
            return action.payload.map(course => ({
                ...course,
                learningContentFolder: course.learningContentFolder ?? []
            }));
        },

        addLearningContentFolder(state, action: PayloadAction<{ courseId: string; folder: LearningContentFolderItem }>) {
            const { courseId, folder } = action.payload;
            const course = state.find(c => c.id === courseId);
        
            if (course) {
                course.learningContentFolder.push(folder);
            }
        },

        updateLearningContentFolder(state, action: PayloadAction<{ courseId: string; folderId: string; folderName: string }>
        ) {
            const { courseId, folderId, folderName } = action.payload;
            const course = state.find(c => c.id === courseId);
        
            if (course) {
                const folder = course.learningContentFolder.find(f => f.id === folderId);
                if (folder) {
                    folder.folderName = folderName;
                }
            }
        },

        removeLearningContentFolder(state, action: PayloadAction<{ courseId: string, folderId: string }>) {
            const { courseId, folderId } = action.payload;
            const course = state.find(c => c.id === courseId);

            if (course) {
                course.learningContentFolder = course.learningContentFolder.filter(lc => lc.id !== folderId);
            }
        },

        setLearningContentFolders(state, action: PayloadAction<{ courseId: string; folders: LearningContentFolderItem[] }>) {
            const { courseId, folders } = action.payload;
            const course = state.find(c => c.id === courseId);

            if (course) {
                course.learningContentFolder = folders;
            }
        },

        addLearningContent(state, action: PayloadAction<{ courseId: string, folderId: string, content: LearningContent }>) {
            const { courseId, folderId, content } = action.payload;
            const course = state.find(c => c.id === courseId);
            const folder = course?.learningContentFolder.find(c => c.id === folderId);

            if (folder) {
                folder.contents.push(content);
            }
        },

        removeLearningContent(state, action: PayloadAction<{ courseId: string; folderId: string; contentId: string }>) {
            const { courseId, folderId, contentId } = action.payload;

            const course = state.find(c => c.id === courseId);
            if (!course) return;
        
            const folder = course.learningContentFolder.find(f => f.id === folderId);
            if (!folder) return;
        
            folder.contents = folder.contents.filter(content => content.id !== contentId);
        },

        addQuizQuestion(state, action: PayloadAction<{ courseId: string, folderId: string, quizFolderId: string, quizType: "multipleChoice" | "submit", quiz: QuizMultipleChoice | QuizSubmit }>) {
            const { courseId, folderId, quizFolderId, quizType, quiz } = action.payload;
            const course = state.find(c => c.id === courseId);
            if (!course) return;

            const folder = course.learningContentFolder.find(f => f.id === folderId)
            if (!folder) return;

            const quizFolder = folder.quizFolders.find(q => q.id === quizFolderId);
            if (!quizFolder) return;

            if (quizType === "multipleChoice") {
                quizFolder.quizMultipleChoices.push(quiz as QuizMultipleChoice);
            } 
            else if (quizType === "submit") {
                quizFolder.quizSubmits.push(quiz as QuizSubmit);
            }        
        },

        updateQuizMultipleChoice(state, action: PayloadAction<{ courseId: string, folderId: string, quizFolderId: string, quiz: QuizMultipleChoice }>) {
            const { courseId, folderId, quizFolderId, quiz } = action.payload;
            const course = state.find(c => c.id === courseId);
            if (!course) return;

            const folder = course.learningContentFolder.find(f => f.id === folderId)
            if (!folder) return;

            const quizFolder = folder.quizFolders.find(q => q.id === quizFolderId);
            if (!quizFolder) return;

            const index = quizFolder.quizMultipleChoices.findIndex(q => q.id === quiz.id);
            if (index !== -1) {
                quizFolder.quizMultipleChoices[index] = quiz;
            }
        },

        updateQuizSubmit(state, action: PayloadAction<{ courseId: string, folderId: string, quizFolderId: string, quiz: QuizSubmit }>) {
            const { courseId, folderId, quizFolderId, quiz } = action.payload;
            const course = state.find(c => c.id === courseId);
            if (!course) return;

            const folder = course.learningContentFolder.find(f => f.id === folderId)
            if (!folder) return;

            const quizFolder = folder.quizFolders.find(q => q.id === quizFolderId);
            if (!quizFolder) return;

            const index = quizFolder.quizSubmits.findIndex(q => q.id === quiz.id);
            if (index !== -1) {
                quizFolder.quizSubmits[index] = quiz;
            }
        }
    }
});

export const { 
    setCourse, setLearningContentFolders, addLearningContentFolder, updateLearningContentFolder, 
    removeLearningContentFolder, addLearningContent, removeLearningContent, addQuizQuestion, 
    updateQuizMultipleChoice, updateQuizSubmit } = CourseSlice.actions;
export default CourseSlice.reducer;