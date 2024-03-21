export class MoodDiaryService {
  private static datesArray: string[] = [];
  private static currentDate: Date | null = null;

  static formatDateWithSuffix(date: Date): string {
    const dateOfMonth = date.getDate();
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
    const monthName = monthNames[date.getMonth()];
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

    return `${monthName} ${dateOfMonth}${suffix}, ${date.getFullYear()}`;
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

    // Prepare currentDate for the next call: Last day of the previous month
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
}
