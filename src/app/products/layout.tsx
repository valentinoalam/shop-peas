import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our product catalog",
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
