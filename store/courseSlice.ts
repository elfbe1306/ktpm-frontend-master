import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LearningContentFolderItem {
    id: string,
    folderName: string
}

interface CourseState {
    id: string | null,
    name: string | null,
    className: string | null,
    createdAt: string | null,
    learningContentFolder: LearningContentFolderItem[]
}

const initialState: CourseState[] = [];

const CourseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setCourse(_, action: PayloadAction<CourseState[]>) {
            return action.payload.map(course => ({
                ...course,
                learningContentFolder: [],
            }));
        },

        setLearningContentFolders(state, action: PayloadAction<{ courseId: string; folders: LearningContentFolderItem[] }>) {
            const { courseId, folders } = action.payload;
            const course = state.find(c => c.id === courseId);

            if (course) {
                course.learningContentFolder = folders;
            }
        },
    }
});

export const { setCourse, setLearningContentFolders } = CourseSlice.actions;
export default CourseSlice.reducer;