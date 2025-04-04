"use client";

import React, { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightProps {
    children: ReactNode; // Accepts any JSX content
}

const Spotlight = ({ children }: SpotlightProps) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
        currentTarget,
        clientX,
        clientY,
    }: ReactMouseEvent<HTMLDivElement>) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const background = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(225, 128, 186, 0.2), rgba(0,0, 0, 0.6))`;

    return (
        <div
            className="group relative w-auto h-auto rounded-xl border border-gray-400/20 bg-gradient-to-tr px-8 py-8 shadow-lg my-10 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{ background }}
            />
            <div className="text-gray-700">{children}</div>
        </div>
    );
};


export default Spotlight;