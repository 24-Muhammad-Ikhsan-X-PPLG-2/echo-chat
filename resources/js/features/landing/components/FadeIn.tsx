import { motion } from 'motion/react';
import { FC, ReactNode } from 'react';

type Props = {
    children: ReactNode;
    delay?: number;
    className?: string;
};

/* ─── Utility ─── */
const FadeIn: FC<Props> = ({ children, delay = 0, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;
