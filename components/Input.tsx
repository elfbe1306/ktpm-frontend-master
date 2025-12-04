
interface InputProps {
    labelPosition: "top" | "left";
    textLabel: string;
    placeHolder: string;
    value: string;
    type: "text" | "password" | "email";
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ labelPosition, textLabel, value, type, placeHolder, onChange }: InputProps) {

    return (
        <div className={`flex gap-y-2 ${labelPosition === "top" ? "flex-col" : "flex-row items-center gap-x-10"}`}>
            <div className="font-display text-blue-dark">{textLabel}</div>
            <input
                className="font-display rounded-3xl border-blue border-solid border px-5 py-2.5 placeholder:text-gray-400 placeholder:font-display"
                type={type} 
                value={value} 
                placeholder={placeHolder} 
                onChange={onChange}
            />
        </div>
    )
}