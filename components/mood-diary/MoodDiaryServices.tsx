import { Mood } from "../../models/mood-models";

export class MoodDiaryService {
  private static datesArray: string[] = [];
  private static currentDate: Date | null = null;

  static formatDateWithSuffix(date: Date): string {
    const dateOfMonth = date.getDate();
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayName = dayNames[date.getDay()];
    const monthName = monthNames[date.getMonth()];
    let formattedDate = "";

    let suffix = "th";
    switch (dateOfMonth) {
      case 1:
      case 21:
      case 31:
        suffix = "st";
        break;
      case 2:
      case 22:
        suffix = "nd";
        break;
      case 3:
      case 23:
        suffix = "rd";
        break;
    }

    formattedDate = `${monthName} ${dayName}, ${dateOfMonth}${suffix}`;

    return formattedDate;
  }

  static addDatesForMonth(): void {
    if (!MoodDiaryService.currentDate) {
      MoodDiaryService.currentDate = new Date();
      MoodDiaryService.currentDate.setHours(0, 0, 0, 0);
    }

    const startOfMonth = new Date(
      MoodDiaryService.currentDate.getFullYear(),
      MoodDiaryService.currentDate.getMonth(),
      1
    );
    let loopDate = new Date(MoodDiaryService.currentDate);

    while (loopDate >= startOfMonth) {
      MoodDiaryService.datesArray.push(
        MoodDiaryService.formatDateWithSuffix(loopDate)
      );
      loopDate = new Date(loopDate.setDate(loopDate.getDate() - 1));
    }

    if (startOfMonth.getMonth() === 0) {
      MoodDiaryService.currentDate = new Date(
        startOfMonth.getFullYear() - 1,
        11,
        31
      );
    } else {
      MoodDiaryService.currentDate = new Date(
        startOfMonth.getFullYear(),
        startOfMonth.getMonth() - 1,
        0
      );
    }
  }

  static getDatesArray(): string[] {
    return MoodDiaryService.datesArray;
  }

  private static convertDateStringToDate(dateStr: string): Date {
    const monthMap: Record<string, number> = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };

    const parts = dateStr.split(" ");
    const monthName = parts[0];
    let day = parts[2].replace(/\D/g, "");

    const month = monthMap[monthName];
    if (month === undefined) {
      throw new Error(`Invalid month name: ${monthName}`);
    }

    const year = new Date().getFullYear();

    const date = new Date(year, month, parseInt(day));

    return date;
  }

  static displayMonthHeader(stringDate: string): string | null {
    const monthFullNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const strAbbreviation = stringDate.substring(0, 3);

    const date = this.convertDateStringToDate(stringDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const isLastDayOfMonth = date.getDate() === nextMonth.getDate();
    const isToday = date.getTime() === today.getTime();
    if (isLastDayOfMonth || isToday) {
      for (const month of monthFullNames) {
        if (month.startsWith(strAbbreviation)) {
          return month;
        }
      }
    }
    return null;
  }
}
