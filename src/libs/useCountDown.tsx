import { useState, useEffect, useRef, useCallback } from 'react';

// Define return type for formatted time
interface FormattedTime {
    minutes: number;
    seconds: number;
    formatted: string;
}

// Define return type for the hook
interface CountdownHookReturn {
    seconds: number;
    isActive: boolean;
    isComplete: boolean;
    startCountdown: () => void;
    pauseCountdown: () => void;
    resetCountdown: (newInitialSeconds?: number) => void;
    formattedTime: FormattedTime;
}

/**
 * Custom hook for countdown timer functionality
 * @param initialSeconds - Initial countdown time in seconds
 * @param onComplete - Callback function to execute when countdown reaches zero
 * @param autoStart - Whether to start the countdown automatically (default: true)
 * @returns Countdown state and control functions
 */
export const useCountdown = (
    initialSeconds = 60,
    onComplete: (() => void) | null = null,
    autoStart = true
): CountdownHookReturn => {
    const [seconds, setSeconds] = useState<number>(initialSeconds);
    const [isActive, setIsActive] = useState<boolean>(autoStart);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const intervalRef = useRef<number | null>(null);

    // Clear the interval when component unmounts or when needed
    const clearCountdownInterval = useCallback((): void => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    // Start or resume the countdown
    const startCountdown = useCallback((): void => {
        if (!isActive) {
            setIsActive(true);
            setIsComplete(false);
        }
    }, [isActive]);

    // Pause the countdown
    const pauseCountdown = useCallback((): void => {
        setIsActive(false);
    }, []);

    // Reset the countdown to initial value
    const resetCountdown = useCallback((newInitialSeconds: number = initialSeconds): void => {
        clearCountdownInterval();
        setSeconds(newInitialSeconds);
        setIsComplete(false);
        setIsActive(autoStart);
    }, [initialSeconds, autoStart, clearCountdownInterval]);

    // Format time as MM:SS
    const formatTime = useCallback((totalSeconds: number): FormattedTime => {
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;
        return {
            minutes,
            seconds: remainingSeconds,
            formatted: `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
        };
    }, []);

    // Handle the countdown logic
    useEffect(() => {
        if (isActive) {
            intervalRef.current = window.setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds <= 1) {
                        clearCountdownInterval();
                        setIsActive(false);
                        setIsComplete(true);
                        if (onComplete && typeof onComplete === 'function') {
                            onComplete();
                        }
                        return 0;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        } else {
            clearCountdownInterval();
        }

        // Cleanup on unmount
        return clearCountdownInterval;
    }, [isActive, onComplete, clearCountdownInterval]);

    return {
        seconds,
        isActive,
        isComplete,
        startCountdown,
        pauseCountdown,
        resetCountdown,
        formattedTime: formatTime(seconds)
    };
};

