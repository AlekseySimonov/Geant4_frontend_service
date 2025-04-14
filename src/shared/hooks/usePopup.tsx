import { useState } from 'react';

export const usePopup = () => {
    const [isVisible, setIsVisible] = useState(false);

    const openPopup = () => setIsVisible(true);
    const closePopup = () => setIsVisible(false);

    return {
        isVisible,
        openPopup,
        closePopup,
    };
};