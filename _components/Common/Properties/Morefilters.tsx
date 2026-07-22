'use client'
import Close from '@/_components/SVGs/Close'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

export default function Morefilters({ children, isOpen, CloseFunction }: { children: React.ReactNode, isOpen: boolean, CloseFunction: () => void }) {
    return (
        <>
            <AnimatePresence mode="wait">
                {isOpen &&
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className='fixed inset-x-0 top-0 z-40 bg-white'
                        style={{ boxShadow: "0px 0px 4px 0px #00000026" }}
                    >
                        <div className='max-w-[1424px] px-4 mx-auto py-20 relative'>
                            <button
                                onClick={CloseFunction}
                                className='text-primary w-5 h-5 absolute top-5 end-5 block cursor-pointer z-30'>
                                <Close />
                            </button>
                            {children}
                        </div>

                    </motion.div>
                }

            </AnimatePresence >
            {isOpen &&
                <span className='bg-black/55 absolute inset-0 w-full h-full z-30 cursor-pointer' onClick={CloseFunction} />
            }
        </>


    )
}
