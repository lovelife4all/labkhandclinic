import type { Article, Appointment, Coupon, GalleryItem, Patient, Service, Testimonial, WorkingDay } from "@/types";

// ⚠️ DEMO DATA — all fictional, clearly labeled in the UI. Replace with real
// clinic data only after doctor approval (Phase 2+).

export const CLINIC = {
  name: "کلینیک دندانپزشکی لبخند",
  doctor: "دکتر محمد درخواه",
  slogan: "لبخند زیبای شما، تخصص ماست",
  address: "استان فارس، کازرون، خیابان سلمان فارسی",
  mobile: "09917201400",
  phone: "07142225667",
  instagram: "https://www.instagram.com/dr_dorkhah/",
  instagramHandle: "@dr_dorkhah",
};

export const seedServices: Service[] = [
  { id: "s1", slug: "examination", title: "معاینه و مشاوره", category: "عمومی", short: "بررسی کامل وضعیت دهان و دندان و ارائه طرح درمان", full: "معاینه کامل شامل بررسی دندان‌ها، لثه و فک، عکس‌برداری در صورت نیاز و ارائه طرح درمان شفاف.", durationMin: 30, priceType: "fixed", price: 300000, active: true, bookable: true, sortOrder: 1, seoTitle: "معاینه و مشاوره دندانپزشکی در کازرون", metaDescription: "معاینه و مشاوره دندانپزشکی در کلینیک لبخند کازرون" },
  { id: "s2", slug: "implant", title: "ایمپلنت", category: "جراحی", short: "جایگزینی دندان از دست رفته با ایمپلنت", full: "کاشت ایمپلنت با پایه تیتانیومی و روکش نهایی؛ جایگزینی دائمی و طبیعی دندان از دست رفته.", durationMin: 60, priceType: "call", active: true, bookable: true, sortOrder: 2, seoTitle: "ایمپلنت در کازرون", metaDescription: "ایمپلنت دندان در کازرون — برای اطلاع از هزینه تماس بگیرید" },
  { id: "s3", slug: "composite", title: "کامپوزیت", category: "زیبایی", short: "اصلاح رنگ و فرم دندان با کامپوزیت", full: "باندینگ کامپوزیت برای اصلاح رنگ، فرم و فاصله دندان‌ها با نتیجه طبیعی.", durationMin: 90, priceType: "from", priceMin: 2500000, active: true, bookable: true, sortOrder: 3, seoTitle: "کامپوزیت دندان در کازرون", metaDescription: "کامپوزیت دندان در کازرون — قیمت از مبلغ مشخص" },
  { id: "s4", slug: "laminate", title: "لمینت", category: "زیبایی", short: "پوسته سرامیکی برای لبخندی درخشان", full: "لمینت سرامیکی (ونیر) برای اصلاح طرح لبخند با دوام بالا و ظاهر طبیعی.", durationMin: 90, priceType: "call", active: true, bookable: true, sortOrder: 4, seoTitle: "لمینت دندان در کازرون", metaDescription: "لمینت دندان در کازرون" },
  { id: "s5", slug: "smile-design", title: "اصلاح طرح لبخند", category: "زیبایی", short: "طراحی دیجیتال لبخند متناسب با چهره شما", full: "طراحی لبخند با تحلیل چهره و شبیه‌سازی نتیجه پیش از شروع درمان.", durationMin: 60, priceType: "range", priceMin: 5000000, priceMax: 20000000, active: true, bookable: true, sortOrder: 5, seoTitle: "اصلاح طرح لبخند در کازرون", metaDescription: "اصلاح طرح لبخند در کازرون" },
  { id: "s6", slug: "scaling", title: "جرم‌گیری", category: "عمومی", short: "پاک‌سازی جرم و پلاک دندان", full: "جرم‌گیری و بروساژ برای سلامت لثه و پیشگیری از بیماری‌های پریودنتال.", durationMin: 45, priceType: "fixed", price: 800000, active: true, bookable: true, sortOrder: 6, seoTitle: "جرم‌گیری دندان در کازرون", metaDescription: "جرم‌گیری دندان در کازرون" },
  { id: "s7", slug: "filling", title: "ترمیم دندان", category: "عمومی", short: "ترمیم پوسیدگی با مواد هم‌رنگ دندان", full: "ترمیم دندان با کامپوزیت هم‌رنگ و مقاوم.", durationMin: 45, priceType: "from", priceMin: 900000, active: true, bookable: true, sortOrder: 7, seoTitle: "ترمیم دندان در کازرون", metaDescription: "ترمیم دندان در کازرون" },
  { id: "s8", slug: "root-canal", title: "درمان ریشه", category: "عمومی", short: "عصب‌کشی و درمان ریشه دندان", full: "درمان ریشه با تجهیزات مدرن برای حفظ دندان طبیعی.", durationMin: 60, priceType: "range", priceMin: 1500000, priceMax: 3500000, active: true, bookable: true, sortOrder: 8, seoTitle: "درمان ریشه در کازرون", metaDescription: "درمان ریشه (عصب‌کشی) در کازرون" },
  { id: "s9", slug: "bleaching", title: "سفید کردن دندان", category: "زیبایی", short: "بلیچینگ حرفه‌ای دندان", full: "سفید کردن دندان در مطب با نتیجه محسوس و ایمن.", durationMin: 60, priceType: "fixed", price: 2500000, active: true, bookable: true, sortOrder: 9, seoTitle: "سفید کردن دندان در کازرون", metaDescription: "سفید کردن دندان در کازرون" },
  { id: "s10", slug: "extraction", title: "کشیدن دندان", category: "جراحی", short: "کشیدن دندان و جراحی ساده", full: "کشیدن دندان با بی‌حسی موضعی و مراقبت پس از درمان.", durationMin: 30, priceType: "from", priceMin: 600000, active: true, bookable: true, sortOrder: 10, seoTitle: "کشیدن دندان در کازرون", metaDescription: "کشیدن دندان در کازرون" },
  { id: "s11", slug: "crown", title: "روکش دندان", category: "عمومی", short: "روکش سرامیکی و فلزی", full: "روکش دندان برای محافظت و زیبایی دندان‌های آسیب‌دیده.", durationMin: 60, priceType: "call", active: true, bookable: true, sortOrder: 11, seoTitle: "روکش دندان در کازرون", metaDescription: "روکش دندان در کازرون" },
  { id: "s12", slug: "orthodontics", title: "ارتودنسی", category: "زیبایی", short: "مرتب‌سازی دندان‌ها با ارتودنسی", full: "درمان ارتودنسی ثابت و متحرک برای اصلاح نامرتبی دندان‌ها.", durationMin: 60, priceType: "call", active: true, bookable: true, sortOrder: 12, seoTitle: "ارتودنسی در کازرون", metaDescription: "ارتودنسی در کازرون" },
  { id: "s13", slug: "kids", title: "دندانپزشکی کودکان", category: "کودکان", short: "مراقبت و درمان دندان کودکان", full: "خدمات دندانپزشکی کودکان در محیطی دوستانه و بدون استرس.", durationMin: 30, priceType: "from", priceMin: 400000, active: true, bookable: true, sortOrder: 13, seoTitle: "دندانپزشکی کودکان در کازرون", metaDescription: "دندانپزشکی کودکان در کازرون" },
];

export const seedHours: WorkingDay[] = [
  { day: 6, open: true, start: "09:00", end: "21:00", breaks: [{ start: "13:00", end: "14:00" }] }, // Saturday
  { day: 0, open: true, start: "09:00", end: "21:00", breaks: [{ start: "13:00", end: "14:00" }] },
  { day: 1, open: true, start: "09:00", end: "21:00", breaks: [{ start: "13:00", end: "14:00" }] },
  { day: 2, open: true, start: "09:00", end: "21:00", breaks: [{ start: "13:00", end: "14:00" }] },
  { day: 3, open: true, start: "09:00", end: "21:00", breaks: [{ start: "13:00", end: "14:00" }] },
  { day: 4, open: true, start: "09:00", end: "21:00", breaks: [{ start: "13:00", end: "14:00" }] },
  { day: 5, open: false, start: "09:00", end: "21:00", breaks: [] }, // Friday closed
];

export const seedHolidays: string[] = [];

export const seedPatients: Patient[] = [
  { id: "p1", name: "بیمار نمونه (آزمایشی)", phone: "09120000001", firstVisit: "1403-01-15", loyaltyPoints: 120, level: "Silver" },
  { id: "p2", name: "بیمار نمونه دوم (آزمایشی)", phone: "09120000002", firstVisit: "1403-03-10", loyaltyPoints: 40, level: "Bronze" },
];

export const seedAppointments: Appointment[] = [
  {
    id: "a1", trackingCode: "LB-DEMO1", patientId: "p1", patientName: "بیمار نمونه (آزمایشی)", patientPhone: "09120000001",
    serviceId: "s1", serviceTitle: "معاینه و مشاوره", date: "2026-11-29", time: "10:00", durationMin: 30,
    status: "CONFIRMED", createdAt: "2026-11-20T10:00:00",
    history: [{ status: "PENDING", at: "2026-11-20T10:00:00", by: "patient" }, { status: "CONFIRMED", at: "2026-11-20T11:00:00", by: "secretary" }],
  },
  {
    id: "a2", trackingCode: "LB-DEMO2", patientId: "p2", patientName: "بیمار نمونه دوم (آزمایشی)", patientPhone: "09120000002",
    serviceId: "s6", serviceTitle: "جرم‌گیری", date: "2026-11-29", time: "11:00", durationMin: 45,
    status: "PENDING", createdAt: "2026-11-21T09:00:00",
    history: [{ status: "PENDING", at: "2026-11-21T09:00:00", by: "patient" }],
  },
];

export const seedCoupons: Coupon[] = [
  { id: "c1", title: "تخفیف اولین مراجعه (آزمایشی)", code: "LABKHAND10", type: "percent", value: 10, cap: 500000, startsAt: "2026-01-01T00:00:00", expiresAt: "2027-12-31T00:00:00", maxUses: 100, usedCount: 3, perPatientLimit: 1, serviceIds: [], active: true, conditions: "فقط برای اولین مراجعه؛ مشروط به معاینه پزشک" },
  { id: "c2", title: "تخفیف جرم‌گیری (آزمایشی)", code: "SCALING200", type: "fixed", value: 200000, startsAt: "2026-01-01T00:00:00", expiresAt: "2027-06-30T00:00:00", maxUses: 50, usedCount: 5, perPatientLimit: 2, serviceIds: ["s6"], active: true, conditions: "فقط برای خدمت جرم‌گیری" },
];

export const seedArticles: Article[] = [
  { id: "ar1", slug: "brushing-guide", title: "راهنمای مسواک زدن صحیح", excerpt: "مسواک زدن درست، مهم‌ترین عادت روزانه برای سلامت دندان است.", body: "روزانه دو بار و هر بار دو دقیقه مسواک بزنید. زاویه ۴۵ درجه نسبت به لثه، حرکات ملایم دایره‌ای و تعویض مسواک هر سه ماه از اصول پایه است. خمیردندان حاوی فلوراید را فراموش نکنید.", category: "آموزش", tags: ["بهداشت دهان", "پیشگیری"], status: "published", publishedAt: "2026-11-01", seoTitle: "راهنمای مسواک زدن صحیح", metaDescription: "آموزش مسواک زدن صحیح برای سلامت دندان‌ها" },
  { id: "ar2", slug: "implant-vs-bridge", title: "ایمپلنت یا بریج؟ کدام بهتر است؟", excerpt: "مقایسه دو روش جایگزینی دندان از دست رفته.", body: "ایمپلنت ریشه مصنوعی است که در استخوان قرار می‌گیرد و دندان مستقل روی آن ساخته می‌شود؛ بریج به دندان‌های مجاور متکی است. انتخاب روش به شرایط استخوان، بودجه و نظر پزشک بستگی دارد و پس از معاینه مشخص می‌شود.", category: "درمان", tags: ["ایمپلنت", "بریج"], status: "published", publishedAt: "2026-11-10", seoTitle: "ایمپلنت یا بریج؟", metaDescription: "مقایسه ایمپلنت و بریج دندان" },
  { id: "ar3", slug: "kids-dentist", title: "اولین مراجعه کودک به دندانپزشک", excerpt: "چه زمانی کودک باید به دندانپزشک مراجعه کند؟", body: "اولین مراجعه کودک بهتر است با رویش اولین دندان و حداکثر تا یک‌سالگی انجام شود تا عادت‌های صحیح تغذیه و بهداشت از ابتدا شکل بگیرد.", category: "کودکان", tags: ["کودکان", "پیشگیری"], status: "draft", seoTitle: "دندانپزشکی کودکان", metaDescription: "اولین مراجعه کودک به دندانپزشک" },
];

export const seedGallery: GalleryItem[] = [
  { id: "g1", title: "نمونه‌کار نمایشی ۱ (تصویر آزمایشی)", category: "کامپوزیت", published: true, consent: true },
  { id: "g2", title: "نمونه‌کار نمایشی ۲ (تصویر آزمایشی)", category: "لمینت", published: true, consent: true },
  { id: "g3", title: "نمونه‌کار نمایشی ۳ (تصویر آزمایشی)", category: "بلیچینگ", published: false, consent: false },
];

export const seedTestimonials: Testimonial[] = [
  { id: "t1", name: "مراجع آزمایشی", text: "محیط تمیز و برخورد حرفه‌ای؛ تجربه خوبی بود. (نظر آزمایشی)", rating: 5, approved: true },
  { id: "t2", name: "مراجع آزمایشی", text: "نوبت‌دهی آنلاین راحت بود. (نظر آزمایشی)", rating: 4, approved: true },
];

export const faqs = [
  { q: "چطور نوبت بگیرم؟", a: "از بخش «رزرو نوبت» خدمت و ساعت موردنظر را انتخاب کنید. در نسخه آزمایشی، نوبت‌ها به‌صورت نمایشی ثبت می‌شوند." },
  { q: "هزینه درمان چقدر است؟", a: "تعرفه‌های تقریبی در صفحه تعرفه‌ها آمده است؛ مبلغ نهایی پس از معاینه و تشخیص پزشک مشخص می‌شود." },
  { q: "ساعات کاری کلینیک چیست؟", a: "شنبه تا پنجشنبه ۹ صبح تا ۹ شب (با وقفه ۱۳ تا ۱۴). جمعه‌ها تعطیل است." },
  { q: "آیا برای کودکان هم خدمات دارید؟", a: "بله، خدمات دندانپزشکی کودکان ارائه می‌شود." },
];
