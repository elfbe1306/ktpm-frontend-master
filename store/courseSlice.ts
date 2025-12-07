import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LearningContent {
    id: string,
    topic: string,
    description: string,
    typeContent: string,
    createdAt: string,
    url: string
}

interface LearningContentFolderItem {
    id: string,
    folderName: string,
    contents: LearningContent[]
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
        }
    }
});

export const { setCourse, setLearningContentFolders, addLearningContentFolder, updateLearningContentFolder, addLearningContent, removeLearningContent } = CourseSlice.actions;
export default CourseSlice.reducer;