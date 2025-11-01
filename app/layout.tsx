import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Was kann ich damit machen?",
  description:
    "Interaktive Ideenwerkstatt, die dir zeigt, was du aus deinem neuen Projekt herausholen kannst.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
