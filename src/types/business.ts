import * as z from "zod";

const addressSchema = z.object({
  street: z.string().min(3, { message: "Street address must be at least 3 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  postalCode: z.string().regex(/^\d{5}(?:[-\s]\d{4})?$/, { message: "Invalid postal code" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }).default("USA"), //Default country
  apartment: z.string().optional().nullable(),
});

export const businessFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  address: addressSchema,
  contact: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" }).optional().nullable(), // optional phone number,
  website: z.string()
    .min(4, "Website must be at least 4 characters")
    .url("Please enter a valid website URL")
    // .regex(
    //   /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    //   "Please enter a valid website URL"
    // )
    .optional()
});

export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  position: [number, number]; // [latitude, longitude]
  address: string;
  contact: string;
  website?: string;
  createdAt: Date;
}

export type NewBusiness = Omit<Business, 'id' | 'createdAt'>
export interface Place {
  id: string;
  name: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
}