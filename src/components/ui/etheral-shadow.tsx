'use client';

import React, { useId } from 'react';
import type { CSSProperties } from 'react';

// Type definitions
interface AnimationConfig {
    preview?: boolean;
    scale: number;
    speed: number;
}

interface NoiseConfig {
    opacity: number;
    scale: number;
}

interface ShadowOverlayProps {
    sizing?: 'fill' | 'stretch';
    color?: string;
    animation?: AnimationConfig;
    noise?: NoiseConfig;
    style?: CSSProperties;
    className?: string;
    showText?: boolean;
}

// Lightweight CSS-only version - removed framer-motion dependency for better performance
export function Component({
    sizing = 'fill',
    color = 'rgba(128, 128, 128, 1)',
    animation,
    noise,
    style,
    className,
    showText = false
}: ShadowOverlayProps) {
    const id = useId().replace(/:/g, "");
    const animationEnabled = animation && animation.scale > 0;
    
    // Map animation speed to CSS duration (higher speed = faster animation)
    const animationDuration = animation ? Math.max(2, 20 - (animation.speed / 10)) : 10;

    return (
        <div
            className={className}
            style={{
                overflow: "hidden",
                position: "relative",
                width: "100%",
                height: "100%",
                ...style
            }}
        >
            {/* Animated gradient background using CSS only */}
            <div
                className="etheral-shadow-bg"
                style={{
                    position: "absolute",
                    inset: "-50px",
                    background: `radial-gradient(ellipse at 30% 20%, ${color} 0%, transparent 50%),
                                 radial-gradient(ellipse at 70% 80%, ${color} 0%, transparent 50%),
                                 radial-gradient(ellipse at 50% 50%, ${color.replace('1)', '0.5)')} 0%, transparent 60%)`,
                    filter: "blur(60px)",
                    animation: animationEnabled ? `etheral-morph-${id} ${animationDuration}s ease-in-out infinite` : "none",
                }}
            />
            
            {/* Secondary layer for more depth */}
            <div
                style={{
                    position: "absolute",
                    inset: "-30px",
                    background: `radial-gradient(ellipse at 60% 40%, ${color.replace('1)', '0.3)')} 0%, transparent 40%)`,
                    filter: "blur(80px)",
                    animation: animationEnabled ? `etheral-morph-reverse-${id} ${animationDuration * 1.5}s ease-in-out infinite` : "none",
                }}
            />

            {showText && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                        zIndex: 10
                    }}
                >
                    <h1 className="md:text-7xl text-6xl lg:text-8xl font-bold text-center text-foreground relative z-20">
                        Etheral Shadows
                    </h1>
                </div>
            )}

            {/* CSS-generated noise pattern instead of external image */}
            {noise && noise.opacity > 0 && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px),
                                          repeating-linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px)`,
                        backgroundSize: `${noise.scale * 4}px ${noise.scale * 4}px`,
                        opacity: noise.opacity / 2,
                        pointerEvents: "none"
                    }}
                />
            )}

            {/* Inject keyframes for this instance */}
            <style>{`
                @keyframes etheral-morph-${id} {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    25% { transform: scale(1.1) rotate(2deg); }
                    50% { transform: scale(0.95) rotate(-1deg); }
                    75% { transform: scale(1.05) rotate(1deg); }
                }
                @keyframes etheral-morph-reverse-${id} {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    33% { transform: scale(1.08) rotate(-2deg); }
                    66% { transform: scale(0.92) rotate(2deg); }
                }
            `}</style>
        </div>
    );
}
