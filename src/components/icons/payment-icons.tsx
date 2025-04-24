
import { LucideProps } from "lucide-react";
import { CreditCard as CC, Apple, Smartphone } from 'lucide-react'

const PaymentIcons = (props: LucideProps) => {
  switch (props.type) {
    case 'credit-card':
      return <CC className="h-5 w-5" />
    case 'paypal':
      return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
          >
            <path d="M8.5 5.5h5c2.2 0 4 1.8 4 4 0 2.2-1.8 4-4 4h-2l-1 5h-3l2-13z" />
            <path d="M6.5 18.5h-3l2-13h8c1.7 0 3 1.3 3 3 0 1.7-1.3 3-3 3h-3l-1 7h-3z" />
          </svg>)
    case 'apple':
      return <Apple className="h-5 w-5" />
    case 'google':
      return <Smartphone className="h-5 w-5" />
    default:
      return <CreditCard className="h-5 w-5" />
  }
}

export default PaymentIcons

export const CreditCard = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

export const PaypalIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8.5 5.5h5c2.2 0 4 1.8 4 4 0 2.2-1.8 4-4 4h-2l-1 5h-3l2-13z" />
    <path d="M6.5 18.5h-3l2-13h8c1.7 0 3 1.3 3 3 0 1.7-1.3 3-3 3h-3l-1 7h-3z" />
  </svg>
);

export const AppleIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 7c-3 0-4 3-4 5.5 0 3 2 7.5 4 7.5 1.088-.046 1.679-.5 3-.5 1.312 0 1.5.5 3 .5s4-3 4-5c-.028-.01-2.472-.403-2.5-3 0-2.355 2.5-3.5 2.5-3.5-.222-.386-1.333-2-3-2-1.5 0-2.5.5-3 .5-.522 0-1.5-.5-3-.5z" />
    <path d="M12 4a2 2 0 0 0 2-2c0-1.1-.9-2-2-2-1.1 0-2 .9-2 2a2 2 0 0 0 2 2z" />
  </svg>
);

export const GoogleIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    <path d="M15 9l-6 6" />
    <path d="M9 9l6 6" />
  </svg>
);
