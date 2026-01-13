// Telegram WebApp obyektini yuklash
const tg = window.Telegram.WebApp;

// Ilovani to'liq ekranga yoyish
tg.expand();

// Telegram ranglariga moslashish
tg.setHeaderColor('secondary_bg_color');
tg.setBackgroundColor('bg_color');

/**
 * Tugma bosilganda ishlaydigan asosiy funksiya
 * @param {string} action - amal turi (masalan: 'pdf', 'ai_quiz')
 */
function handleAction(action) {
    // 1. Tebranish effekti (Haptic Feedback)
    // Foydalanuvchi tugma bosilganini sezishi uchun
    tg.HapticFeedback.impactOccurred('medium');

    // 2. Vizual effekt: Bosilgan tugmani biroz xiralashtirish
    const clickedElement = event.currentTarget;
    clickedElement.style.opacity = '0.5';
    clickedElement.style.transform = 'scale(0.95)';

    // 3. Botga ma'lumot yuborish
    // Eslatma: tg.sendData ishlatilganda Telegram Mini ilovani avtomatik yopadi
    // Bu standart xavfsizlik qoidasi.
    
    setTimeout(() => {
        try {
            // Ma'lumotni JSON formatida yuborish (Ai.py buni taniydi)
            const data = JSON.stringify({ action: action });
            tg.sendData(data);
            
            // Agar sendData ishlamasa (masalan, ilova KeyboardButton orqali ochilmagan bo'lsa)
            // Ilovani yopish
            tg.close();
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
            tg.showAlert("Xatolik: Botga ma'lumot yuborib bo'lmadi.");
        }
    }, 200); // 200ms animatsiya uchun kutish
}

// 4. Foydalanuvchi tasodifan yopib yubormasligi uchun tasdiqlash
tg.enableClosingConfirmation();

// 5. Telegram interfeysini foydalanuvchi ranglariga moslash (ixtiyoriy)
document.documentElement.style.setProperty('--bg-color', tg.backgroundColor);
document.documentElement.style.setProperty('--text-main', tg.textColor);

console.log("QuizPilot AI ilovasi tayyor!");