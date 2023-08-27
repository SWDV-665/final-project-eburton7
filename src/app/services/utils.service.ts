// This is for the requirement "The app utilizes custom Angular services."
// The custom serivce I created is for helping with common tasks such as converting units. 
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  // Format a date to a user-friendly string
  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  // Convert Celsius to Fahrenheit
  convertCelsiusToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
  }

  // Convert Fahrenheit to Celsius
  convertFahrenheitToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * 5/9;
  }
// Formats the cooking time in minutes into a human-readable format.
  formatCookingTime(cookingTimeInMinutes: number): string {
    const hours = Math.floor(cookingTimeInMinutes / 60);
    const minutes = cookingTimeInMinutes % 60;

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
    } else {
      return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }
  }
}
