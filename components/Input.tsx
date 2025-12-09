
interface InputProps {
    labelPosition: "top" | "left";
    textLabel: string;
    placeHolder: string;
    value: string;
    type: "text" | "password" | "email" | "textarea";
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function Input({ labelPosition, textLabel, value, type, placeHolder, onChange }: InputProps) {
    const baseClass = "flex-1 font-display rounded-3xl border-blue border-solid border px-5 py-2.5 placeholder:text-gray-400 placeholder:font-display";

    return (
        <div className={`flex gap-y-2 ${labelPosition === "top" ? "flex-col" : "flex-row items-center gap-x-10"}`}>
            <p className="font-display text-blue-dark w-[8vw]">{textLabel}</p>

            {type === "textarea" ? (
                <textarea
                    className={`${baseClass} h-32 resize-none`}
                    value={value}
                    placeholder={placeHolder}
                    onChange={onChange}
                />
            ) : (
                <input
                    className={baseClass}
                    type={type} 
                    value={value} 
                    placeholder={placeHolder} 
                    onChange={onChange}
                />
            )} 

        </div>
    )
}