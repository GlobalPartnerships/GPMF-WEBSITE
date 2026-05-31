import { Inter, Playfair_Display, IM_Fell_Great_Primer_SC } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import "flag-icons/css/flag-icons.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});
const fell = IM_Fell_Great_Primer_SC({
  variable: "--font-fell",
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${fell.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        {children}
        <Toaster position="bottom-center" duration={10000} richColors />
      </body>
    </html>
  );
}
