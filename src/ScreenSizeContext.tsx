import React, { createContext, useContext, useEffect, useState } from 'react';

const ScreenSizeContext = createContext(false);

export const useMobileScreenSize = () => {
    return useContext(ScreenSizeContext);
};

export const ScreenSizeProvider = ({ children }: { children: React.ReactNode; }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initialize the state

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <ScreenSizeContext.Provider value={isMobile}>
            {children}
        </ScreenSizeContext.Provider>
    );
};