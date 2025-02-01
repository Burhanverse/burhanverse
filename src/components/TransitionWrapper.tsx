import { motion } from 'framer-motion';

const pageTransition = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
};

export default function TransitionWrapper({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="min-h-screen bg-gray-950 text-white"
        >
            {children}
        </motion.div>
    );
}
