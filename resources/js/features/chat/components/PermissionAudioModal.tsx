import { Bell } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

const PermissionAudioModal = () => {
    const [show, setShow] = useState(() => {
        const permission = localStorage.getItem('notification-sound');

        return !permission;
    });

    const handleEnableAudio = async () => {
        const audio = new Audio('/sound/notif_1.mp3');
        audio.volume = 0;

        try {
            await audio.play();
            audio.pause();
            audio.currentTime = 0;
            localStorage.setItem('notification-sound', 'true');
            setShow(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDisableAudio = () => {
        localStorage.setItem('notification-sound', 'false');
        setShow(false);
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed z-9999 flex h-full w-full justify-center bg-black/40"
                >
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        exit={{ y: 20 }}
                        className="mt-10 h-45 w-100 border-2 bg-white p-4"
                    >
                        <div className="flex gap-2 items-center">
                            <Bell size={30} />
                            <p className="text-lg font-bold">Enable Notification Sound</p>
                        </div>
                        <div className='mt-2'>
                            <p>Hear a sound when you receive a new message. You can change this later in Settings.</p>
                        </div>
                        <div className="w-full flex justify-end items-center mt-5 gap-2">
                            <button onClick={handleDisableAudio} className="bg-gray-200 px-5 py-1.5 cursor-pointer hover:bg-gray-400">Not Now</button>
                            <button onClick={handleEnableAudio} className="bg-gray-200 border-2 px-5 py-1.5 cursor-pointer hover:shadow-[5px_5px_0px_#000] transition-all duration-300">Enable</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PermissionAudioModal;
