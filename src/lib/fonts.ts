import { Pacifico } from "next/font/google";
import localFont from "next/font/local";

//  使用谷歌字体
export const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
  display: "swap",
});

// 使用本地字体
// export const myFont = localFont({
//   src: "./fonts/Pacifico-Regular.ttf",
//   variable: "--font-local",
//   display: "swap",
// })
