// Lightweight content store backed by localStorage. The admin panel writes to
// these keys; pages subscribe via useContentStore() to render merged data.
// Defaults always win when no override is present.

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  defaultBlogArticles,
  defaultBookingServices,
  defaultProductCategories,
  defaultProducts,
  defaultServicePlans,
  type BlogArticle,
  type CustomLocation,
  type ServiceItem,
  type ServicePlan,
  type ShopProduct,
} from "./defaults";

const KEYS = {
  servicePlans: "behealth.admin.servicePlans.v1",
  bookingServices: "behealth.admin.bookingServices.v1",
  products: "behealth.admin.products.v1",
  productCategories: "behealth.admin.productCategories.v1",
  blog: "behealth.admin.blog.v1",
  customLocations: "behealth.admin.customLocations.v1",
  auditLog: "behealth.admin.auditLog.v1",
  analytics: "behealth.admin.analytics.v1",
} as const;

const STORE_EVENT = "behealth:content-changed";

const subscribers = new Set<() => void>();

function emit() {
  for (const cb of subscribers) cb();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(STORE_EVENT));
  }
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    emit();
  } catch (err) {
    console.error("contentStore write failed", err);
  }
}

// ============= Public getters =============

export function getServicePlans(): ServicePlan[] {
  return readJson<ServicePlan[]>(KEYS.servicePlans, defaultServicePlans);
}

export function getBookingServices(): ServiceItem[] {
  return readJson<ServiceItem[]>(KEYS.bookingServices, defaultBookingServices);
}

export function getProducts(): ShopProduct[] {
  return readJson<ShopProduct[]>(KEYS.products, defaultProducts);
}

export function getProductCategories(): string[] {
  return readJson<string[]>(KEYS.productCategories, defaultProductCategories);
}

export function getBlogArticles(): BlogArticle[] {
  return readJson<BlogArticle[]>(KEYS.blog, defaultBlogArticles);
}

export function getCustomLocations(): CustomLocation[] {
  return readJson<CustomLocation[]>(KEYS.customLocations, []);
}

// ============= Setters =============

export function setServicePlans(v: ServicePlan[]) {
  const prev = getServicePlans();
  writeJson(KEYS.servicePlans, v);
  diffServicePlans(prev, v).forEach(addAuditEntry);
}
export function setBookingServices(v: ServiceItem[]) {
  const prev = getBookingServices();
  writeJson(KEYS.bookingServices, v);
  diffBookingServices(prev, v).forEach(addAuditEntry);
}
export function setProducts(v: ShopProduct[]) { writeJson(KEYS.products, v); }
export function setProductCategories(v: string[]) { writeJson(KEYS.productCategories, v); }
export function setBlogArticles(v: BlogArticle[]) { writeJson(KEYS.blog, v); }
export function setCustomLocations(v: CustomLocation[]) { writeJson(KEYS.customLocations, v); }

export function resetAll() {
  if (typeof window === "undefined") return;
  Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
  emit();
}

// ============= React subscription =============

function subscribe(cb: () => void) {
  subscribers.add(cb);
  const handler = () => cb();
  window.addEventListener("storage", handler);
  return () => {
    subscribers.delete(cb);
    window.removeEventListener("storage", handler);
  };
}

export function useServicePlans(): ServicePlan[] {
  return useSyncExternalStore(subscribe, getServicePlans, () => defaultServicePlans);
}
export function useBookingServices(): ServiceItem[] {
  return useSyncExternalStore(subscribe, getBookingServices, () => defaultBookingServices);
}
export function useProducts(): ShopProduct[] {
  return useSyncExternalStore(subscribe, getProducts, () => defaultProducts);
}
export function useProductCategories(): string[] {
  return useSyncExternalStore(subscribe, getProductCategories, () => defaultProductCategories);
}
export function useBlogArticles(): BlogArticle[] {
  return useSyncExternalStore(subscribe, getBlogArticles, () => defaultBlogArticles);
}
export function useCustomLocations(): CustomLocation[] {
  return useSyncExternalStore(subscribe, getCustomLocations, () => []);
}

// ============= Export bundle =============

export interface ExportBundle {
  exportedAt: string;
  servicePlans: ServicePlan[];
  bookingServices: ServiceItem[];
  products: ShopProduct[];
  productCategories: string[];
  blog: BlogArticle[];
  customLocations: CustomLocation[];
}

export function exportAll(): ExportBundle {
  return {
    exportedAt: new Date().toISOString(),
    servicePlans: getServicePlans(),
    bookingServices: getBookingServices(),
    products: getProducts(),
    productCategories: getProductCategories(),
    blog: getBlogArticles(),
    customLocations: getCustomLocations(),
  };
}

export function importAll(bundle: Partial<ExportBundle>) {
  if (bundle.servicePlans) setServicePlans(bundle.servicePlans);
  if (bundle.bookingServices) setBookingServices(bundle.bookingServices);
  if (bundle.products) setProducts(bundle.products);
  if (bundle.productCategories) setProductCategories(bundle.productCategories);
  if (bundle.blog) setBlogArticles(bundle.blog);
  if (bundle.customLocations) setCustomLocations(bundle.customLocations);
}

// ============= Admin auth =============

const ADMIN_PASSWORD = "behealth2026"; // simple gate per user request
const ADMIN_AUTH_KEY = "behealth.admin.auth.v1";

export function checkAdminPassword(input: string): boolean {
  return input === ADMIN_PASSWORD;
}

export function setAdminAuthenticated(authed: boolean) {
  if (typeof window === "undefined") return;
  if (authed) {
    window.sessionStorage.setItem(ADMIN_AUTH_KEY, "1");
  } else {
    window.sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }
}

export function useAdminAuth() {
  const [authed, setAuthed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(ADMIN_AUTH_KEY) === "1";
  });

  useEffect(() => {
    const handler = () =>
      setAuthed(window.sessionStorage.getItem(ADMIN_AUTH_KEY) === "1");
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return {
    authed,
    login: (pw: string) => {
      if (checkAdminPassword(pw)) {
        setAdminAuthenticated(true);
        setAuthed(true);
        return true;
      }
      return false;
    },
    logout: () => {
      setAdminAuthenticated(false);
      setAuthed(false);
    },
  };
}

// ============= Audit log (price/service changes) =============

export type AuditAction =
  | "price_changed"
  | "plan_added"
  | "plan_removed"
  | "plan_renamed"
  | "booking_fee_changed"
  | "booking_service_renamed";

export interface AuditEntry {
  id: string;
  at: string; // ISO
  action: AuditAction;
  target: string; // service / plan name
  details: string;
}

const MAX_AUDIT_ENTRIES = 500;

export function getAuditLog(): AuditEntry[] {
  return readJson<AuditEntry[]>(KEYS.auditLog, []);
}

function addAuditEntry(entry: Omit<AuditEntry, "id" | "at">) {
  const log = getAuditLog();
  const next: AuditEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    at: new Date().toISOString(),
  };
  const trimmed = [next, ...log].slice(0, MAX_AUDIT_ENTRIES);
  writeJson(KEYS.auditLog, trimmed);
}

export function clearAuditLog() {
  writeJson(KEYS.auditLog, []);
}

function diffServicePlans(prev: ServicePlan[], next: ServicePlan[]): Array<Omit<AuditEntry, "id" | "at">> {
  const out: Array<Omit<AuditEntry, "id" | "at">> = [];
  const prevByIdx = new Map(prev.map((p, i) => [i, p]));
  // additions
  if (next.length > prev.length) {
    for (let i = prev.length; i < next.length; i++) {
      out.push({ action: "plan_added", target: next[i].name, details: `Added plan "${next[i].name}" at Ksh ${next[i].price}` });
    }
  }
  // removals (any prev index missing in next)
  if (prev.length > next.length) {
    for (let i = next.length; i < prev.length; i++) {
      out.push({ action: "plan_removed", target: prev[i].name, details: `Removed plan "${prev[i].name}"` });
    }
  }
  // edits at common indices
  const commonLen = Math.min(prev.length, next.length);
  for (let i = 0; i < commonLen; i++) {
    const a = prevByIdx.get(i)!;
    const b = next[i];
    if (a.price !== b.price) {
      out.push({
        action: "price_changed",
        target: b.name,
        details: `Plan "${b.name}" price changed Ksh ${a.price} → Ksh ${b.price}`,
      });
    }
    if (a.name !== b.name) {
      out.push({
        action: "plan_renamed",
        target: b.name,
        details: `Plan renamed "${a.name}" → "${b.name}"`,
      });
    }
  }
  return out;
}

function diffBookingServices(prev: ServiceItem[], next: ServiceItem[]): Array<Omit<AuditEntry, "id" | "at">> {
  const out: Array<Omit<AuditEntry, "id" | "at">> = [];
  const prevMap = new Map(prev.map((s) => [s.value, s]));
  for (const b of next) {
    const a = prevMap.get(b.value);
    if (!a) continue;
    if (a.fee !== b.fee) {
      out.push({
        action: "booking_fee_changed",
        target: b.label,
        details: `Booking fee for "${b.label}" changed Ksh ${a.fee} → Ksh ${b.fee}`,
      });
    }
    if (a.label !== b.label) {
      out.push({
        action: "booking_service_renamed",
        target: b.label,
        details: `Booking service renamed "${a.label}" → "${b.label}"`,
      });
    }
  }
  return out;
}

export function useAuditLog(): AuditEntry[] {
  return useSyncExternalStore(subscribe, getAuditLog, () => []);
}

// ============= Analytics (client-side, localStorage) =============

export interface AnalyticsBooking {
  id: string;
  at: string;
  opdNumber: string;
  patientName: string;
  phone: string;
  service: string;
  provider: string;
  fee: number;
  date: string;
  timeSlot: string;
  paid: boolean;
}

interface AnalyticsState {
  visitorId: string;
  firstSeen: string;
  lastSeen: string;
  pageViews: number;
  uniqueVisitorIds: string[]; // distinct IDs seen on this device/browser
  bookings: AnalyticsBooking[];
}

function emptyAnalytics(): AnalyticsState {
  return {
    visitorId: "",
    firstSeen: "",
    lastSeen: "",
    pageViews: 0,
    uniqueVisitorIds: [],
    bookings: [],
  };
}

function getAnalyticsRaw(): AnalyticsState {
  return readJson<AnalyticsState>(KEYS.analytics, emptyAnalytics());
}

const VISITOR_ID_KEY = "behealth.visitor.id";

function ensureVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = window.localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = `v_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    window.localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
}

export function trackPageView() {
  if (typeof window === "undefined") return;
  const id = ensureVisitorId();
  const a = getAnalyticsRaw();
  const now = new Date().toISOString();
  const next: AnalyticsState = {
    ...a,
    visitorId: id,
    firstSeen: a.firstSeen || now,
    lastSeen: now,
    pageViews: a.pageViews + 1,
    uniqueVisitorIds: a.uniqueVisitorIds.includes(id)
      ? a.uniqueVisitorIds
      : [...a.uniqueVisitorIds, id],
  };
  writeJson(KEYS.analytics, next);
}

export function trackBooking(b: Omit<AnalyticsBooking, "id" | "at" | "paid"> & { paid?: boolean }) {
  if (typeof window === "undefined") return;
  const a = getAnalyticsRaw();
  const entry: AnalyticsBooking = {
    ...b,
    paid: b.paid ?? false,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    at: new Date().toISOString(),
  };
  const next: AnalyticsState = { ...a, bookings: [entry, ...a.bookings].slice(0, 1000) };
  writeJson(KEYS.analytics, next);
}

export function markBookingPaid(opdNumber: string) {
  const a = getAnalyticsRaw();
  const next: AnalyticsState = {
    ...a,
    bookings: a.bookings.map((x) => (x.opdNumber === opdNumber ? { ...x, paid: true } : x)),
  };
  writeJson(KEYS.analytics, next);
}

export function getAnalytics() {
  return getAnalyticsRaw();
}

export function useAnalytics(): AnalyticsState {
  return useSyncExternalStore(subscribe, getAnalyticsRaw, emptyAnalytics);
}

export function clearAnalytics() {
  writeJson(KEYS.analytics, emptyAnalytics());
}

// ============= Blog publishing helpers =============

/** True if the article is published OR scheduled with a date in the past/today. */
export function isArticleLive(a: BlogArticle, now: Date = new Date()): boolean {
  const status = a.status ?? "published";
  if (status === "draft") return false;
  if (status === "published") return true;
  // scheduled
  const target = new Date(a.publishedAt + "T00:00:00");
  return target.getTime() <= now.getTime();
}

export function getPublishedBlogArticles(): BlogArticle[] {
  return getBlogArticles().filter((a) => isArticleLive(a));
}

export function usePublishedBlogArticles(): BlogArticle[] {
  return useSyncExternalStore(subscribe, getPublishedBlogArticles, () => defaultBlogArticles);
}

