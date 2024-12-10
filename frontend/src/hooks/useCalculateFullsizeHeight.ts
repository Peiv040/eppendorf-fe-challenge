import { RefObject, useEffect, useState } from "react";

const useCalculateRemainingHeight = (
    ref: RefObject<HTMLElement>,
    dependencies: React.DependencyList,
    defaultHeight?: number
) => {
    const [height, setHeight] = useState<number>(defaultHeight || 0);

    useEffect(() => {
        const calculateHeight = () => {
            if (ref.current) {
                const elementTop = ref.current.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                const reservedSpace = 60
                const remainingHeight = windowHeight - elementTop - reservedSpace;

                setHeight(remainingHeight);
            }
        }

        calculateHeight();     

        window.addEventListener('resize', calculateHeight);

        return () => window.removeEventListener('resize', calculateHeight);
    }, dependencies)

    return height;
}

export default useCalculateRemainingHeight;