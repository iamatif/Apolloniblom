'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import ArrowFilter from '@/_components/SVGs/ArrowFilter'
import { useTranslations } from 'next-intl'

interface Props {
    id: string
    open: string | null
    setOpen: (val: string | null) => void
    selectedBedrooms?: number[]
    setSelectedBedrooms?: React.Dispatch<React.SetStateAction<number[]>>
    selectedBathrooms?: number[]
    setSelectedBathrooms?: React.Dispatch<React.SetStateAction<number[]>>
    fullWidth?: boolean
}

export default function BedBathFilter({
    id,
    open,
    setOpen,
    selectedBedrooms,
    setSelectedBedrooms,
    selectedBathrooms,
    setSelectedBathrooms,
    fullWidth
}: Props) {
    const ref = useRef<HTMLDivElement | null>(null)
    const isLg = typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
    const isOpen = open === id
    const t = useTranslations();
    // local helpers that default to safe values
    const selBeds = selectedBedrooms ?? []
    const selBaths = selectedBathrooms ?? []
    const safeSetBeds = setSelectedBedrooms
    const safeSetBaths = setSelectedBathrooms

    const toggleSelection = (setFn: React.Dispatch<React.SetStateAction<number[]>> | undefined, num: number) => {
        if (!setFn) return // nothing to do if no setter provided
        setFn((prev: number[] | undefined) => {
            const prevArr = prev ?? []
            const newArr = prevArr.includes(num) ? prevArr.filter((n) => n !== num) : [...prevArr, num]
            return newArr
        })
    }

    const handleApply = () => {
        // only dispatch event and close; state already updated via setter above
        window.dispatchEvent(new Event('filter-updated'));
        setOpen(null);
    };

    const handleReset = () => {
        if (safeSetBeds) safeSetBeds([]);
        if (safeSetBaths) safeSetBaths([]);
        window.dispatchEvent(new Event('filter-updated'));
    };

    return (
        <div className={`${fullWidth ? "w-full md:w-[238px]" : "w-[238px]"} relative whitespace-nowrap`}>
            <div
                onClick={() => setOpen(isOpen ? null : id)}
                className="space-y-[5px] cursor-pointer border border-Gray20 rounded-md px-5 py-3 flex justify-between items-center"
            >
                <label className="text-secondary text-base font-medium">
                    {t("filter.bed_bath")}
                </label>
                <span className="w-6 h-6 my-auto text-secondary">
                    <ArrowFilter />
                </span>
            </div>

            <AnimatePresence>
                {isLg ? (
                    isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.05, ease: 'easeInOut' }}
                            ref={ref}
                            style={{ boxShadow: "0px 0px 4px 0px #00000026" }}
                            className="lg:absolute w-[355px] start-0 bg-white rounded-lg p-4 mt-2 flex flex-col gap-4 z-20"
                        >
                            {/* Bedrooms */}
                            <div>
                                <h4 className="text-lg font-semibold text-primary mb-2">{t("filter.bedrooms")}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => toggleSelection(safeSetBeds, num)}
                                            className={`w-[46px] h-[34px] rounded-full border text-base transition ${selBeds.includes(num)
                                                ? 'border-Gold text-Gold bg-Gold1'
                                                : 'border-secondary text-secondary'
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Bathrooms */}
                            <div>
                                <h4 className="text-lg font-semibold text-primary mb-2">{t("filter.bathroom")}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => toggleSelection(safeSetBaths, num)}
                                            className={`w-[46px] h-[34px] rounded-full border text-base transition ${selBaths.includes(num)
                                                ? 'border-Gold text-Gold bg-Gold1'
                                                : 'border-secondary text-secondary'
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-between mt-4 gap-2.5">
                                <button
                                    onClick={handleApply}
                                    className="text-base w-[50%] font-medium bg-black text-Gray10 rounded-full px-3 py-2.5"
                                >
                                    {t("filter.done")}
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="text-base w-[50%] font-medium text-secondary  rounded-full px-3 py-2.5"
                                >
                                    {t("filter.reset")}
                                </button>

                            </div>
                        </motion.div>
                    )
                ) : (
                    // Mobile sheet version
                    isOpen && (
                        <>
                            <span
                                className="bg-black opacity-30 fixed inset-0 w-full h-full z-20"
                                onClick={() => setOpen(null)}
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 100 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                ref={ref}
                                className="fixed w-full bottom-0 bg-white rounded-t-lg p-4 inset-x-0 z-30 flex flex-col gap-6 border border-Gray20"
                            >
                                <h4 className="text-base font-medium text-center">Bedrooms & Bathrooms</h4>

                                <div className="flex flex-col gap-4">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Bedrooms</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                                                <button
                                                    key={num}
                                                    onClick={() => toggleSelection(safeSetBeds, num)}
                                                    className={`w-10 h-10 rounded-full border text-base transition ${selBeds.includes(num)
                                                        ? 'border-Gold text-Gold bg-Gold1'
                                                        : 'border-secondary text-secondary'
                                                        }`}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Bathrooms</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {Array.from({ length: 8 }, (_, i) => i + 1).map((num) => (
                                                <button
                                                    key={num}
                                                    onClick={() => toggleSelection(safeSetBaths, num)}
                                                    className={`w-10 h-10 rounded-full border text-base transition ${selBaths.includes(num)
                                                        ? 'border-Gold text-Gold bg-Gold1'
                                                        : 'border-secondary text-secondary'
                                                        }`}
                                                >
                                                    {num}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between mt-4 gap-2.5">
                                    <button
                                        onClick={handleApply}
                                        className="text-base w-[50%] font-medium bg-black text-Gray10 rounded-full px-3 py-2.5"
                                    >
                                        Done
                                    </button>
                                    <button
                                        onClick={handleReset}
                                        className="text-base w-[50%] font-medium text-secondary  rounded-full px-3 py-2.5"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )
                )}
            </AnimatePresence>
        </div>
    )
}
