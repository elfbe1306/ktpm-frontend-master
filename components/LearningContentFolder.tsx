
interface LearningContentFolderProps {
    id: string,
    folderName: string
}

export function LearningContentFolder({ id, folderName }: LearningContentFolderProps) {

    return (
        <div>
            {folderName}
        </div>
    )
}