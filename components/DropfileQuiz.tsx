"use client";
import { useState } from "react";
import mammoth from "mammoth";
import { useDispatch } from "react-redux";
import { addQuizMultipleChoice } from "@/store/createQuestionSlice";

export function DropfileQuiz() {
    const [dragging, setDragging] = useState(false);
    const dispatch = useDispatch();

    const parseQuestions = (text: string) => {
        const lines = text
            .split("\n")
            .map(l => l.trim())
            .filter(l => l.length > 0);
    
        const questions: string[][] = [];
        let current: string[] = [];
    
        lines.forEach(line => {
            if (/^\d+\./.test(line)) {
                if (current.length > 0) questions.push(current);
                current = [line];
            } else {
                current.push(line);
            }
        });
    
        if (current.length > 0) questions.push(current);
    
        questions.forEach((qLines, index) => {
            const qText = qLines[0].replace(/^\d+\.\s*/, "");
    
            const A = qLines.find(l => /^A\./.test(l))?.slice(2).trim() || "";
            const B = qLines.find(l => /^B\./.test(l))?.slice(2).trim() || "";
            const C = qLines.find(l => /^C\./.test(l))?.slice(2).trim() || "";
            const D = qLines.find(l => /^D\./.test(l))?.slice(2).trim() || "";
    
            const ansLine = qLines.find(l => /^ANSWER/i.test(l));
            const answerLetter = ansLine?.split(":")[1]?.trim() || "A";
            const answerKey = `answer${answerLetter}` as
                "answerA" | "answerB" | "answerC" | "answerD";
    
            dispatch(addQuizMultipleChoice({
                questionNumber: index,
                text: qText,
                answerA: A,
                answerB: B,
                answerC: C,
                answerD: D,
                answer: answerKey
            }));
        });
    };    

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const arrayBuffer = await file.arrayBuffer();

        const result = await mammoth.extractRawText({ arrayBuffer });
        parseQuestions(result.value);

        e.target.value = "";
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files[0];
        if (!file) return;

        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });

        parseQuestions(result.value);
    };

    return (
        <div>
            <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDrop={handleDrop}
                onDragLeave={() => setDragging(false)}
                className={`
                    w-full max-w-xl h-[30vh] rounded-3xl border-2 border-dashed 
                    flex flex-col justify-center items-center text-blue-dark text-center
                    transition bg-gray-50 cursor-pointer
                    ${dragging ? "border-blue-dark bg-blue-50" : "border-blue-dark/30"}
                `}
                onClick={() => document.getElementById("fileInput")?.click()}
            >
                <input
                    id="fileInput"
                    type="file"
                    accept=".doc,.docx"
                    className="hidden"
                    onChange={handleFileInput}
                />

                <div className="flex justify-center items-center flex-col">
                    <p className="text-xl text-blue-dark">Kéo & thả để tải lên</p>
                    <p className="underline text-blue-dark/60 mt-1">hoặc từ thiết bị</p>
                    <p className="text-blue-dark/60 text-sm mt-1">
                        chỉ hỗ trợ: .doc, .docx
                    </p>
                </div>
            </div>
        </div>
    );
}
