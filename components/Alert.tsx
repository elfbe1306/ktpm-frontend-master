import { RootState } from "@/store";
import { clearAlert } from "@/store/alertSlice";
import { Alert } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function AlertDisplay() {
    const alertMessage = useSelector((state: RootState) => state.alert.alertMessage);
    const alertType = useSelector((state: RootState) => state.alert.alertType);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!alertMessage) return;

        const timer = setTimeout(() => {
            dispatch(clearAlert());
        }, 2000);

        return () => clearTimeout(timer);
    }, [alertMessage, dispatch]);

    if (!alertMessage) return null;

    return (
        <div className="fixed top-5 right-5 z-50">
            <Alert 
                title={alertMessage}
                type={alertType}
                showIcon
            />
        </div>
    )
}