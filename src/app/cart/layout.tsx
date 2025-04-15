import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart",
  description: "View your shopping cart",
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
