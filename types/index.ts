// Shared domain types — mirrors the PostgreSQL schema (see supabase/migrations).
export type Role = "guest" | "patient" | "secretary" | "doctor";

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "REJECTED"
  | "RESCHEDULE_REQUESTED"
  | "CANCELLED"
  | "COMPLETED"
  | "NO_SHOW"
  | "EXPIRED";

export type PriceType = "fixed" | "from" | "range" | "call";

export interface Service {
  id: string;
  slug: string;
  title: string;
  category: string;
  short: string;
  full: string;
  durationMin: number;
  priceType: PriceType;
  price?: number; // Toman, integer (never float)
  priceMin?: number;
  priceMax?: number;
  active: boolean;
  bookable: boolean;
  sortOrder: number;
  seoTitle: string;
  metaDescription: string;
}

export interface WorkingDay {
  day: number; // 0=Sunday .. 6=Saturday (JS) — clinic works Sat..Thu
  open: boolean;
  start: string; // "09:00"
  end: string; // "21:00"
  breaks: { start: string; end: string }[];
}

export interface Appointment {
  id: string;
  trackingCode: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  serviceId: string;
  serviceTitle: string;
  date: string; // ISO yyyy-mm-dd (clinic local)
  time: string; // HH:mm
  durationMin: number;
  status: AppointmentStatus;
  notes?: string;
  couponCode?: string;
  createdAt: string;
  history: { status: AppointmentStatus; at: string; by: string; reason?: string }[];
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  birthDate?: string;
  firstVisit: string;
  loyaltyPoints: number;
  level: "Bronze" | "Silver" | "Gold";
}

export interface Coupon {
  id: string;
  title: string;
  code: string;
  type: "percent" | "fixed";
  value: number; // percent (0-100) or Toman
  cap?: number; // max discount for percent type
  startsAt: string;
  expiresAt: string;
  maxUses: number;
  usedCount: number;
  perPatientLimit: number;
  serviceIds: string[]; // empty = all services
  active: boolean;
  conditions: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[];
  status: "draft" | "published";
  publishedAt?: string;
  seoTitle: string;
  metaDescription: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  published: boolean;
  consent: boolean; // documented patient consent required before publishing
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number; // 1..5
  approved: boolean;
}

export interface DentalTooth {
  number: number; // FDI
  status: "healthy" | "check" | "filled" | "root_canal" | "crown" | "extracted" | "implant" | "other";
  note?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  title: string;
  description: string;
  confidential: boolean; // doctor-only note
  visibleToPatient: boolean;
  recommendation?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  at: string;
  read: boolean;
}
