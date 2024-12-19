import moment from 'moment-jalaali';

function getNext6DaysWithJalali() {
    // روزهای هفته به فارسی
    const daysOfWeekInPersian = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];

    // تاریخ امروز
    const today = moment(); // تاریخ امروز به میلادی

    // آرایه‌ای برای ذخیره روزهای آینده با تاریخ شمسی
    const next6Days = [];

    // محاسبه 6 روز آینده
    for (let i = 1; i <= 6; i++) {
        // تاریخ روز بعد
        const nextDay = today.clone().add(i, 'days');

        // تبدیل تاریخ میلادی به شمسی
        const persianDate = nextDay.format('jYYYY/jMM/jDD'); // تاریخ شمسی

        // گرفتن شماره روز هفته
        const dayOfWeek = nextDay.day();

        // افزودن روز فارسی و تاریخ شمسی به آرایه
        next6Days.push({
            day: daysOfWeekInPersian[dayOfWeek],
            date: persianDate
        });
    }

    return next6Days;
}

export default getNext6DaysWithJalali;