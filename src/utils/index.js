import millify from "millify";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatNumber(number, decimal = 2) {
  if (number !== undefined && number !== null) {
    return millify(Number(number), { precision: decimal });
  }
  return 0;
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
