import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type EventParams = {
  category: string
  action: string
  label?: string
  value?: number
}

export const trackEvent = ({ category, action, label, value }
  : EventParams): void => {
  try {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }

    // Meta Pixel
    if (window.fbq && typeof window.fbq === 'function') {
      window.fbq('track', action, {
        category,
        label,
        value
      });
    }

    // Hotjar
    if (window.hj) {
      window.hj('event', `${category}_${action}`);
    }
  } catch (error) {
    console.error("Error tracking event:", error)
  }
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}