let tg = window.Telegram.WebApp;

// Ilovani tayyorlash
tg.expand();
tg.enableClosingConfirmation();

/**
 * Tugmalar bosilganda ishlaydigan asosiy funksiya
 * @param {string} actionType - Botga yuboriladigan buyruq nomi
 */
function handleAction(actionType) {
    // 1. Haptik aloqa (vibratsiya)
    tg.HapticFeedback.impactOccurred('medium');

    // 2. Tugmani bosilganini vizual ko'rsatish (ixtiyoriy)
    // event.currentTarget orqali bosilgan elementni olish mumkin
    
    // 3. Botga ma'lumot yuborish
    // Ai.py dagi @dp.message(F.web_app_data) buni tutib oladi
    tg.sendData(actionType);

    // 4. Ilovani yopish
    // sendData chaqirilganda Telegram avtomatik yopishi mumkin, 
    // lekin kafolat uchun tg.close() qolgani yaxshi.
    setTimeout(() => {
        tg.close();
    }, 100);
}

// Ranglarni Telegram mavzusiga moslashtirish (ixtiyoriy)
document.documentElement.style.setProperty('--bg-color', tg.backgroundColor || '#0d0d0f');
document.documentElement.style.setProperty('--text-main', tg.textColor || '#ffffff');