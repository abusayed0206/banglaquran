import { useEffect } from "react";

interface AyahViewProps {
    ayahData: {
        img: string;
    };
    ayahNumber: number;
    isPlaying: boolean;
    isActive: boolean;
    onPlay: () => void;
}

const AyahView = ({
    ayahData,
    ayahNumber,
    isPlaying,
    isActive,
    onPlay,
}: AyahViewProps) => {
    const ayahElementId = `ayah-${ayahNumber}`;

    useEffect(() => {
        // Auto-scroll when the current ayah is playing
        if (isPlaying) {
            const ayahElement = document.getElementById(ayahElementId);
            if (ayahElement) {
                // Scroll the element into the center of the page
                ayahElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center', // This aligns the element in the middle
                    inline: 'nearest', // Ensures the element stays within the visible area horizontally
                });
            }
        }
    }, [isPlaying, ayahNumber, ayahElementId]); // Re-run when isPlaying, ayahNumber, or ayahElementId changes

    const convertToBengaliNumerals = (num: number) => {
        const bnNumerals = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
        return num
            .toString()
            .split('')
            .map(digit => bnNumerals[parseInt(digit, 10)])
            .join('');
    };

    return (
        <div id={ayahElementId} className="w-full max-w-5xl mx-auto p-4 mb-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center justify-center gap-2 mb-4">
                <div className="px-4 py-1 rounded-full bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-600 text-sm font-medium">
                        আয়াত নাম্বারঃ {convertToBengaliNumerals(ayahNumber)}
                    </p>
                </div>
            </div>
            <div className={`p-4 ${isActive ? 'bg-blue-50' : 'bg-white'} rounded-lg`}>
                <div className="flex justify-center">
                    <div className="relative w-full flex justify-center items-center">
                        <div className="bg-white p-2 rounded-lg" onClick={onPlay}>
                            <img
                                src={ayahData.img}
                                alt={`Ayah ${ayahNumber}`}
                                className="h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AyahView;
