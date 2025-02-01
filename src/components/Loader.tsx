import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-950">
            <motion.div
                className="w-12 h-12 rounded-full border-t-4 border-purple-500"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            ></motion.div>
            <p className="text-white mt-4">Loading...</p>
        </div>
    );
}
