"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Appointment, Article, Coupon, GalleryItem, Patient, Service, Testimonial } from "@/types";
import { seedAppointments, seedArticles, seedCoupons, seedGallery, seedHours, seedHolidays, seedPatients, seedServices, seedTestimonials } from "./seed";
import { isSlotFree, makeTrackingCode } from "@/lib/booking/logic";
import type { WorkingDay } from "@/types";

/**
 * Phase-1 demo store: in-memory + localStorage persistence.
 * Phase 2 replaces this with Supabase (RLS + server actions) — the shape of
 * the state mirrors the DB tables so migration is straightforward.
 */
interface DemoState {
  services: Service[];
  hours: WorkingDay[];
  holidays: string[];
  patients: Patient[];
  appointments: Appointment[];
  coupons: Coupon[];
  articles: Article[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  role: "patient" | "secretary" | "doctor" | null;
  userName: string;
  setRole: (r: "patient" | "secretary" | "doctor" | null, name?: string) => void;
  book: (input: { patientName: string; patientPhone: string; serviceId: string; date: string; time: string; notes?: string; couponCode?: string }) => { ok: boolean; trackingCode?: string; error?: string };
  setAppointmentStatus: (id: string, status: Appointment["status"], by: string, reason?: string) => void;
  saveService: (s: Service) => void;
  saveCoupon: (c: Coupon) => void;
  saveArticle: (a: Article) => void;
  resetDemo: () => void;
}

const Ctx = createContext<DemoState | null>(null);
const KEY = "labkhand-demo-v1";

function load(): Partial<DemoState> | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(seedServices);
  const [hours, setHours] = useState<WorkingDay[]>(seedHours);
  const [holidays, setHolidays] = useState<string[]>(seedHolidays);
  const [patients, setPatients] = useState<Patient[]>(seedPatients);
  const [appointments, setAppointments] = useState<Appointment[]>(seedAppointments);
  const [coupons, setCoupons] = useState<Coupon[]>(seedCoupons);
  const [articles, setArticles] = useState<Article[]>(seedArticles);
  const [gallery, setGallery] = useState<GalleryItem[]>(seedGallery);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(seedTestimonials);
  const [role, setRoleState] = useState<DemoState["role"]>(null);
  const [userName, setUserName] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = load();
    if (saved) {
      if (saved.services) setServices(saved.services);
      if (saved.appointments) setAppointments(saved.appointments);
      if (saved.coupons) setCoupons(saved.coupons);
      if (saved.articles) setArticles(saved.articles);
      if (saved.gallery) setGallery(saved.gallery);
      if (saved.patients) setPatients(saved.patients);
      if (saved.role) setRoleState(saved.role);
      if (saved.userName) setUserName(saved.userName);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ services, appointments, coupons, articles, gallery, patients, role, userName }));
    } catch { /* storage full — ignore in demo */ }
  }, [services, appointments, coupons, articles, gallery, patients, role, userName, hydrated]);

  const value = useMemo<DemoState>(() => ({
    services, hours, holidays, patients, appointments, coupons, articles, gallery, testimonials, role, userName,
    setRole: (r, name) => { setRoleState(r); setUserName(name ?? ""); },
    book: (input) => {
      const svc = services.find((s) => s.id === input.serviceId);
      if (!svc) return { ok: false, error: "خدمت یافت نشد" };
      const check = isSlotFree(input.date, input.time, svc.durationMin, appointments, hours, holidays);
      if (!check.free) return { ok: false, error: check.reason };
      const appt: Appointment = {
        id: "a" + Date.now(), trackingCode: makeTrackingCode(),
        patientId: "p-demo", patientName: input.patientName, patientPhone: input.patientPhone,
        serviceId: svc.id, serviceTitle: svc.title, date: input.date, time: input.time,
        durationMin: svc.durationMin, status: "PENDING", notes: input.notes, couponCode: input.couponCode,
        createdAt: new Date().toISOString(),
        history: [{ status: "PENDING", at: new Date().toISOString(), by: "patient" }],
      };
      setAppointments((prev) => [...prev, appt]);
      return { ok: true, trackingCode: appt.trackingCode };
    },
    setAppointmentStatus: (id, status, by, reason) => {
      setAppointments((prev) => prev.map((a) => a.id === id ? { ...a, status, history: [...a.history, { status, at: new Date().toISOString(), by, reason }] } : a));
    },
    saveService: (s) => setServices((prev) => prev.some((x) => x.id === s.id) ? prev.map((x) => x.id === s.id ? s : x) : [...prev, s]),
    saveCoupon: (c) => setCoupons((prev) => prev.some((x) => x.id === c.id) ? prev.map((x) => x.id === c.id ? c : x) : [...prev, c]),
    saveArticle: (a) => setArticles((prev) => prev.some((x) => x.id === a.id) ? prev.map((x) => x.id === a.id ? a : x) : [...prev, a]),
    resetDemo: () => { localStorage.removeItem(KEY); window.location.reload(); },
  }), [services, hours, holidays, patients, appointments, coupons, articles, gallery, testimonials, role, userName]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDemo(): DemoState {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
