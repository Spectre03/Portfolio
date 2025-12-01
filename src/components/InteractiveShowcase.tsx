'use client'

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"

function CopyEmailButton() {
    const [copied, setCopied] = useState(false)
    const email = "obaidullaharshad101@gmail.com"

    const handleCopy = () => {
        navigator.clipboard.writeText(email)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Button
            onClick={handleCopy}
            className="mt-8 w-fit bg-[var(--color-primary)] hover:bg-[var(--color-accent)] text-white font-bold py-6 px-8 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:-translate-y-1"
        >
            {copied ? (
                <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Email Copied!
                </span>
            ) : (
                <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy My Email
                </span>
            )}
        </Button>
    )
}

export function InteractiveShowcase() {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 py-20 relative overflow-hidden">
            {/* Animated Gradient Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-gradient-glow pointer-events-none" style={{
                background: 'radial-gradient(circle, rgba(124, 58, 237, 0.3), rgba(6, 182, 212, 0.3))',
                filter: 'blur(100px)'
            }}></div>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 relative z-10">
                {/* Left content */}
                <motion.div
                    className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text)] mb-6 leading-tight">
                            Let's Build Something <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]">Amazing Together</span>
                        </h2>
                        <p className="text-[var(--color-text-muted)] text-lg md:text-xl leading-relaxed mb-8">
                            I'm always exploring new dimensions of web development.
                            Whether you have a project in mind or just want to say hi, let's combine creativity with technical excellence.
                        </p>

                        <div className="flex justify-center lg:justify-start w-full">
                            <CopyEmailButton />
                        </div>
                    </div>
                </motion.div>

                {/* Right content - Robot with Gradient Glow */}
                <div className="flex-1 relative flex justify-center items-center">
                    <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]">
                        {/* Rotating Gradient Glow */}
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'conic-gradient(from 0deg, rgba(124, 58, 237, 0.4), rgba(6, 182, 212, 0.4), rgba(124, 58, 237, 0.4))',
                                filter: 'blur(40px)',
                            }}
                            animate={{
                                rotate: 360,
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                        />

                        {/* Secondary Glow */}
                        <motion.div
                            className="absolute inset-8 rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent)',
                                filter: 'blur(30px)',
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        {/* Rotating Circles */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-[var(--color-accent)] opacity-30"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-4 rounded-full border border-[var(--color-primary)] opacity-25"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Robot Image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative w-full h-full z-10"
                        >
                            <motion.img
                                src="/robot.png"
                                alt="Futuristic Robot Assistant"
                                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                                animate={{
                                    y: [0, -15, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                whileHover={{ scale: 1.05 }}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes gradient-glow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-gradient-glow {
          animation: gradient-glow 8s ease-in-out infinite;
        }
      `}</style>
        </div>
    )
}
