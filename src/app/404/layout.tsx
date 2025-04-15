import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | E-Commerce Store",
  description: "Page not found",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
