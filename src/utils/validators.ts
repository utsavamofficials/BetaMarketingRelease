import { z } from 'zod';

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number');

export const emailSchema = z.string().trim().email('Enter a valid email address');

export const organizerRegisterSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter the full name'),
  mandalName: z.string().trim().min(2, 'Enter the mandal name'),
  city: z.string().trim().min(2, 'Enter the city'),
  phone: phoneSchema,
  email: emailSchema,
  planId: z.enum(['base', 'satisfy']),
});
export type OrganizerRegisterInput = z.infer<typeof organizerRegisterSchema>;

export const eventSetupSchema = z.object({
  eventName: z.string().trim().min(2, 'Enter an event name'),
  startDate: z.string().min(1, 'Select a start date'),
  endDate: z.string().min(1, 'Select an end date'),
  address: z.string().trim().min(4, 'Enter a venue address'),
  brandColor: z.string().min(4),
});
export type EventSetupInput = z.infer<typeof eventSetupSchema>;

export const collectorFormSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter the collector name'),
  phone: phoneSchema,
  pin: z
    .string()
    .trim()
    .regex(/^\d{4}$/, 'PIN must be exactly 4 digits'),
});
export type CollectorFormInput = z.infer<typeof collectorFormSchema>;

export const collectorLoginSchema = z.object({
  phone: phoneSchema,
  pin: z.string().trim().regex(/^\d{4}$/, 'Enter the 4-digit PIN'),
});
export type CollectorLoginInput = z.infer<typeof collectorLoginSchema>;

export const donorEntrySchema = z.object({
  donorName: z.string().trim().min(2, "Enter the donor's name"),
  amount: z.coerce
    .number()
    .positive('Amount must be greater than 0')
    .max(1_000_000, 'That amount looks too large — please double-check'),
  contact: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter the donor's 10-digit mobile number"),
});
export type DonorEntryInput = z.infer<typeof donorEntrySchema>;

export const feedbackSchema = z.object({
  rating: z.coerce.number().min(1, 'Pick a rating').max(5),
  liked: z.string().trim().min(1, 'Tell us what stood out'),
  improve: z.string().trim().optional().default(''),
  contactEmail: z.union([emailSchema, z.literal('')]).optional(),
});
export type FeedbackInput = z.infer<typeof feedbackSchema>;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Enter your name'),
  email: emailSchema,
  phone: z.union([phoneSchema, z.literal('')]).optional(),
  mandalName: z.string().trim().optional().default(''),
  message: z.string().trim().min(10, 'Tell us a little more (min 10 characters)'),
});
export type ContactInput = z.infer<typeof contactSchema>;
