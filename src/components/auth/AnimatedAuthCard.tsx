"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface AnimatedAuthCardProps {
    /** Unique key for AnimatePresence transitions */
    motionKey: string;
    children: ReactNode;
}

const cardTransition = { duration: 0.3, ease: "easeOut" as const };

/**
 * Reusable animated wrapper for auth card transitions.
 * Eliminates the repeated motion.div boilerplate in LoginView.
 */
export function AnimatedAuthCard({ motionKey, children }: AnimatedAuthCardProps) {
    return (
        <motion.div
            key={motionKey}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={cardTransition}
        >
            {children}
        </motion.div>
    );
}
