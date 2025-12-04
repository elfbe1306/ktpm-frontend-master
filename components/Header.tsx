import { usePathname } from "next/navigation";
import { SkeletonImage } from "./SkeletonImage";
import { Dropdown, MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/store/userSlice";
import { RootState } from "@/store";
import Link from "next/link";

export function Header() {
    const pathname = usePathname();
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();

    const navItems = [
        { label: "Bảng điều khiển", href: "/teacher" },
        { label: "Các khoá học", href: "/teacher/course" },
        { label: "Khác", href: "/teacher/other" },
    ];

    const profileItems: MenuProps["items"] = [
        { key: "1", label: "Hồ sơ" },
        { key: "2", label: "Đăng xuất" },
    ];

    const profileItemsClick : MenuProps["onClick"] = ({ key }) => {
        if (key === "2") dispatch(clearUser());
    };

    return (
        <div className="bg-blue-light h-[60px] flex justify-between items-center px-2.5">
            <div className="flex flex-row gap-x-[5vw]">
                <SkeletonImage src={"/logo.png"} alt={"logo"} height={60} width={60}/>
                <div className="flex flex-row items-center">
                    {navItems.map((item) => {
                        const isActive = item.href === pathname;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`font-display h-full flex items-center justify-center px-5 ${isActive ? "bg-blue-dark text-white" : ""}`}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div className="flex justify-center mr-5">
                <Dropdown
                    placement={"bottomRight"}
                    menu={{ items: profileItems, onClick: profileItemsClick}}
                >
                    {user?.name}
                </Dropdown>
            </div>
        </div>
    )
}