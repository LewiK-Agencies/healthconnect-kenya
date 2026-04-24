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
