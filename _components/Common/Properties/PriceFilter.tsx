'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import ArrowFilter from '@/_components/SVGs/ArrowFilter'
import { useTranslations } from 'next-intl'

interface Props {
    id: string
    open: string | null
    setOpen: (val: string | null) => void
    priceRange: { min: string; max: string }
    setPriceRange: React.Dispatch<React.SetStateAction<{ min: string; max: string }>>
    onApplyPrice: () => void
    onResetPrice: () => void
    Homepage?: boolean;
    fullWidth?: boolean
}

export default function PriceFilter({
    id,
    open,
    setOpen,
    priceRange,
    setPriceRange,
    onApplyPrice,
    onResetPrice,
    Homepage,
    fullWidth
}: Props) {
    const ref = useRef<HTMLDivElement | null>(null)
    const isOpen = open === id
    const t = useTranslations();
    const [isLg, setIsLg] = useState(true);

    // Responsive check fix
    useEffect(() => {
        const handleResize = () => setIsLg(window.innerWidth >= 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Click Outside Fix
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // Agar click dropdown ke andar hai toh kuch mat karo
            if (ref.current && ref.current.contains(event.target as Node)) {
                return;
            }
            // Agar bahar click hua toh band kardo
            setOpen(null);
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, setOpen]);

    return (
        <div ref={ref} className={`${Homepage ? "l:w-[238px] w-full" : `${fullWidth ? "w-full md:w-[238px]" : "w-[238px]"} whitespace-nowrap`} relative`}>
            
            {/* Header Button */}
            <div
                onClick={() => setOpen(isOpen ? null : id)}
                className="space-y-[5px] cursor-pointer border border-Gray20 rounded-md px-5 py-3 flex justify-between items-center bg-white"
            >
                <label className="text-secondary text-base font-medium pointer-events-none">
                    {(priceRange.min || priceRange.max) 
                        ? `${priceRange.min || 0} - ${priceRange.max || '∞'}` 
                        : t("filter.price")}
                </label>
                <span className={`w-6 h-6 my-auto text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    <ArrowFilter />
                </span>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        // Sabse Zarori: onMouseDown par stopPropagation lagana
                        onMouseDown={(e) => e.stopPropagation()} 
                        onClick={(e) => e.stopPropagation()}
                        initial={isLg ? { opacity: 0 } : { opacity: 0, y: 100 }}
                        animate={isLg ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={isLg ? { opacity: 0 } : { opacity: 0, y: 100 }}
                        className={`${
                            isLg 
                            ? "absolute top-full left-0 w-[320px] mt-2 shadow-2xl rounded-xl border border-Gray20" 
                            : "fixed bottom-0 left-0 w-full z-[100] border-t border-Gray20"
                        } bg-white p-6 flex flex-col gap-5`}
                    >
                        
                        {!isLg && <span className="bg-gray-300 w-10 h-1 rounded-full mx-auto mb-2" />}
                        
                        <h4 className="text-lg font-semibold text-primary">{t("filter.set_price")}</h4>

                        <div className="flex gap-2">
                            <div className='flex-1 space-y-2'>
                                <label className='text-[12px] text-secondary font-medium pr-[2px]'>{t("filter.minimum")}</label> 
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={priceRange.min}
                                    onMouseDown={(e) => e.stopPropagation()} // Input par click dropdown band nahi karega
                                    onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                                    className="border border-Gray20 px-3 py-2.5 rounded-md w-full md:w-[60%]  text-primary outline-none focus:border-black text-sm"
                                />
                            </div>
                            <div className='flex-1 space-y-2'>
                                <label className='text-[12px] text-secondary font-medium pr-[5px]'>{t("filter.maximum")}</label> 
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={priceRange.max}
                                    onMouseDown={(e) => e.stopPropagation()} // Input par click dropdown band nahi karega
                                    onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                                    className="border border-Gray20 px-3 py-2.5 rounded-md w-full md:w-[60%]  text-primary outline-none focus:border-black text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between mt-2 gap-3">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onApplyPrice();
                                    setOpen(null);
                                }}
                                className="text-sm w-full font-semibold bg-black text-white rounded-full py-3.5 hover:bg-gray-800"
                            >
                                {t("filter.done")}
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onResetPrice();
                                    setOpen(null);
                                }}
                                className="text-sm w-full font-semibold text-secondary border border-Gray20 rounded-full py-3.5 hover:bg-gray-50"
                            >
                                {t("filter.reset")}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Overlay */}
            {!isLg && isOpen && (
                <div className="fixed inset-0 bg-black/40 z-[90]" onClick={() => setOpen(null)} />
            )}
        </div>
    )
}