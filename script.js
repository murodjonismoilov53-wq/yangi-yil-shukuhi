function switchTab(tabId) {
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    
    const activeBtn = Array.from(document.querySelectorAll('.nav-btn'))
        .find(btn => btn.getAttribute('onclick').includes(tabId));
        
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// Soat elementlarini olish va bosilganda taymerni yuritish
let clockTimer = null;
let isClockRunning = false;

document.addEventListener('DOMContentLoaded', () => {
    const clockElement = document.querySelector('.analog-clock');
    if (clockElement) {
        clockElement.addEventListener('click', startClockAnimation);
    }
});

function startClockAnimation() {
    if (isClockRunning) return; // Allaqachon ishlayotgan bo'lsa qayta yurgizmaydi
    isClockRunning = true;

    let minute = 55;
    const digitalTimer = document.getElementById('digitalTimer');
    const festiveCard = document.getElementById('festiveCard');
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');

    digitalTimer.innerText = "23:55";
    festiveCard.classList.remove('show-image');
    minuteHand.style.transform = "rotate(330deg)";
    hourHand.style.transform = "rotate(357.5deg)";

    if (clockTimer) clearInterval(clockTimer);

    clockTimer = setInterval(() => {
        minute++;
        
        if (minute < 60) {
            digitalTimer.innerText = `23:${minute < 10 ? '0' + minute : minute}`;
            
            const minDegree = (minute / 60) * 360;
            const hourDegree = 330 + (minute / 60) * 30;
            
            minuteHand.style.transform = `rotate(${minDegree}deg)`;
            hourHand.style.transform = `rotate(${hourDegree}deg)`;
        } else {
            clearInterval(clockTimer);
            digitalTimer.innerText = "00:00";
            
            minuteHand.style.transform = "rotate(360deg)";
            hourHand.style.transform = "rotate(360deg)";

            // 00:00 bo'lganda bolalar.jpg rasmi animatsiya bilan chiqadi
            setTimeout(() => {
                festiveCard.classList.add('show-image');
            }, 400);
        }
    }, 1000);
}