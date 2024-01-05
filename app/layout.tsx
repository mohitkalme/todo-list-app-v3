import type { Metadata } from "next";
import "./globals.css";

//Clerk.js Authentication
import { ClerkProvider } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Next.js Todo List App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
// appearance={{
//   baseTheme: dark,
// }}
// className="dark"
