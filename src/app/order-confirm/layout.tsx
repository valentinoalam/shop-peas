import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Order Confirmation",
	description: "Order confirmation",
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
