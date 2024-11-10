import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formDataToObject(formData: FormData) {
  const obj = {};
  formData.forEach((value, key) => {
    // If the key already exists, convert it to an array or add to existing array
    if (obj.hasOwnProperty(key)) {
      // If it's not an array, convert to array
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(value); // Add new value to the array
    } else {
      obj[key] = value; // Assign new key-value
    }
  });
  return obj;
}
