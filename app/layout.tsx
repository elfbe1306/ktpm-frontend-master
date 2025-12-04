"use client";
import { store } from "@/store";
import "./globals.css";
import { Provider } from "react-redux";
import { AlertDisplay } from "@/components/Alert";
import { ConfigProvider } from "antd";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

	return (
		<Provider store={store}>
			<ConfigProvider
				theme={{
					components: {
						Alert: {
							defaultPadding: "15px 30px"
						},
					},
				}}
			>
				<html lang="en">
					<body>
						<AlertDisplay/>
						{children}
					</body>
				</html>
			</ConfigProvider>
		</Provider>
	);
}
