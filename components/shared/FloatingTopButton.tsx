'use client';

import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {ArrowUp} from 'lucide-react';

/**
 * FloatingTopButton Component
 * 
 * A floating action button that appears when user scrolls down
 * and smoothly scrolls the page back to top when clicked.
 * 
 * Features:
 * - Appears after scrolling 300px
 * - Smooth scroll animation
 * - Fixed position at bottom-right
 * - Fade in/out transition
 * 
 * Follows SRP - Only handles scroll-to-top functionality.
 */
export function FloatingTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) {
        return null;
    }

    return (
        <Button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 rounded-full w-12 h-12 p-0 shadow-lg bg-teal-600 hover:bg-teal-700 transition-all duration-300"
            aria-label="Volver arriba"
        >
            <ArrowUp className="w-5 h-5"/>
        </Button>
    );
}

export default FloatingTopButton;

