
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Checkout",
    description: "Complete your purchase",
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
