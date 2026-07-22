"use client";
import ArrowFilter from "@/_components/SVGs/ArrowFilter";
import { useMediaQuery } from "@/lib/Query";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef } from 'react';

interface ListFilterProps {
    id: string;
    Title: string;
    uniqueCategoryNamesArray: { name: string; id?: number }[];
    selected: { id: number; name: string }[];
    onToggle: (value: { id: number; name: string } | null) => void;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<string | null>>;
    single?: boolean;
    Homepage?: boolean;
    fullWidth?: boolean
}

export default function ListFilter({
    id,
    Title,
    uniqueCategoryNamesArray,
    selected,
    onToggle,
    open,
    setOpen,
    single,
    Homepage,
    fullWidth
}: ListFilterProps) {
    const isLg = useMediaQuery("(min-width: 1024px)")
    const ref = useRef<HTMLDivElement>(null);
    const t = useTranslations();

    // FIXED: Sirf is useEffect mein tabdeeli ki gayi hai
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // "open" check karna zaroori hai taake sirf khula hua dropdown hi respond kare
            if (open && ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(null);
            }
        }

        // Listener sirf tabhi lagayein jab dropdown khula ho
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, setOpen]); // 'open' ko dependency mein dala gaya hai

    // Selection Label: Agar items select honge toh unke naam dikhayega, warna Title
    const currentLabel = selected.length > 0 
        ? selected.map(item => item.name).join(", ") 
        : Title;

    return (
        <div
            ref={ref}
            className={`${Homepage ? "l:w-[238px] w-full" : `${fullWidth ? "w-full md:w-[238px]" : "w-[238px]"}  whitespace-nowrap`}   relative `} >
            
            {/* Main Selector Button */}
            <div onClick={() => setOpen(open ? null : id)} className='space-y-[5px] cursor-pointer border border-Gray20 rounded-md px-5 py-3 flex justify-between items-center bg-white'>
                {!single &&
                    <label className='text-secondary text-base font-medium truncate max-w-[80%]'>
                        {currentLabel}
                    </label>
                }
                <span className={`w-6 h-6 my-auto text-secondary transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                    <ArrowFilter />
                </span>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={isLg ? { opacity: 0 } : { opacity: 0, y: 100 }}
                        animate={isLg ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={isLg ? { opacity: 0 } : { opacity: 0, y: 100 }}
                        className={`${isLg ? "lg:absolute fixed w-full !mt-2 shadow-xl" : "fixed bottom-0 border-t border-Gray20"} inset-x-0 bg-white rounded-lg p-4 z-[100] flex flex-col gap-4 overflow-y-auto max-h-[300px]`}
                        style={isLg ? { boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" } : {}}
                    >
                        {/* Mobile Handle Bar */}
                        {!isLg && <span className="bg-gray-300 w-10 h-1 rounded-full mx-auto mb-2" />}

                        {/* "All" Option */}
                        {!single && (
                            <p className={`text-base flex justify-between items-center cursor-pointer p-2 rounded-md transition-colors
                                ${selected.length === 0 ? "bg-red-50 text-red-600 font-semibold" : "text-primary hover:bg-gray-50"}
                            `}
                                onClick={() => { onToggle(null); if(single) setOpen(null); }}
                            >
                                {t("data.all")}
                                {selected.length === 0 && (
                                    <span className='w-4 h-4 text-red-600'>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </span>
                                )}
                            </p>
                        )}

                        {/* Dynamic Items */}
                        {uniqueCategoryNamesArray.map((item, index) => {
                            if (typeof item.id !== 'number') return null;
                            const valueObj = { id: item.id, name: item.name };
                            const isActive = selected.some((v) => String(v.id) === String(valueObj.id));

                            return (
                                <p
                                    key={index}
                                    onClick={() => {
                                        onToggle(valueObj);
                                        if (single) setOpen(null);
                                    }}
                                    className={`cursor-pointer p-2 rounded-md flex justify-between items-center text-base transition-all
                                        ${isActive ? "bg-red-50 text-red-600 font-semibold" : "text-primary font-light hover:bg-gray-50"}
                                    `}
                                >
                                    <span className="truncate">{item.name}</span>
                                    {isActive && (
                                        <span className='w-4 h-4 text-red-600'>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </span>
                                    )}
                                </p>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}