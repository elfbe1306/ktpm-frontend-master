"use client";
import { useCallback, useState } from "react";


export function Dropfile({ onFileSelect }: { onFileSelect?: (file: File) => void }) {
    const [dragging, setDragging] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>("");

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (!file) return;

        setFileName(file.name);
        onFileSelect?.(file);
    }, [onFileSelect]);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        onFileSelect?.(file);
    }, [onFileSelect]);

    return (
        <div>
            <div 
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`
                    w-full max-w-xl h-[50vh] rounded-3xl border-2 border-dashed 
                    flex flex-col justify-center items-center text-blue-dark text-center
                    transition bg-gray-50 cursor-pointer
                    ${dragging ? "border-blue-dark bg-blue-50" : "border-blue-dark/30"}
                `}
                onClick={() => document.getElementById("fileInput")?.click()}
            >
                <input
                    id="fileInput"
                    type="file"
                    accept=".doc,.docx,.xls,.xlsx,.pdf"
                    className="hidden"
                    onChange={handleFileInput}
                />

                {!fileName ? (
                    <div className="flex justify-center items-center flex-col">
                        <p className="text-xl text-blue-dark">Kéo & thả để tải lên</p>
                        <p className="underline text-blue-dark/60 mt-1">hoặc từ thiết bị</p>
                        <p className="text-blue-dark/60 text-sm mt-1">
                            chỉ hỗ trợ: .docs, .excel, .pdf
                        </p>
                    </div>
                ) : (
                    <p className="text-blue-dark font-medium mt-2">{fileName}</p>
                )}
            </div>
        </div>
    )
}