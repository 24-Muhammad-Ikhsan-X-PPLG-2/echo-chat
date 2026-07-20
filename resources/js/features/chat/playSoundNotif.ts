const audio = new Audio('/sound/notif_1.mp3');
let audioUnlocked = false;

export function playNotificationSound() {
    if (localStorage.getItem('notification-sound') !== 'true') {
        return;
    }

    audio.currentTime = 0;
    audio.play().catch((err) => console.error(err));
}

export const unlockAudio = async () => {
    if (audioUnlocked) return;

    const audio = new Audio('/sound/notif_1.mp3');
    audio.volume = 0;

    try {
        await audio.play();
        audio.pause();
        audio.currentTime = 0;
        audioUnlocked = true;
    } catch (err) {
        console.error(err);
    }
};
