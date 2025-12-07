import { CloseIcon } from "@/assests/CloseIcon";

interface LayoutModalProps {
    children: React.ReactNode,
    onClose: () => void,
    title: string
}

export function LayoutModal({ children, onClose, title }: LayoutModalProps) {

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1">
            <div className="font-display bg-white rounded-xl p-6 shadow-xl min-w-xl">
                <div className="flex justify-end">
                    <button className="cursor-pointer" onClick={onClose}><CloseIcon width={24} height={24} fill={"black"}/></button>
                </div>

                <p className="text-center text-lg font-semibold text-blue-dark">{title}</p>
                {children}
            </div>
        </div>
    )
}