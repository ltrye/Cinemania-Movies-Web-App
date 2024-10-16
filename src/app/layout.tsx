import "./globals.scss";
import { Inter } from "next/font/google";
import NavigationBar from "./global-components/NavigationBar";
import { Roboto } from "next/font/google";
import { Footer } from "./global-components/Footer";
import { UserProvider } from "@/context/UserContext";
// import "@fontsource/roboto";

export const metadata = {
  title: "Cinemania",
  description: "Hello from Trye",
};

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <NavigationBar />
          {children}
          {/* <Footer /> */}
        </UserProvider>
      </body>
    </html>
  );
}
