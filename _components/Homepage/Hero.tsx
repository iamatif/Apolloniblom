import React from 'react';
import Filter from '../Common/Properties/filter';
import { RegionsWidget } from './Regions';
import { motion } from 'framer-motion';
export interface HeroProps {
    video: string,
    title: string,
    subtitle: string,
    search_title: string
}

interface props {
    data: HeroProps;
    Locations: RegionsWidget[];
    Categories?: { id: number; name: string }[];
    selectedLocation: { id: number; name: string }[];
    setSelectedLocation: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
    selectedCategory: { id: number; name: string }[];
    setSelectedCategory: React.Dispatch<React.SetStateAction<{ id: number; name: string }[]>>;
    selectedKeyword: string | null;
    setSelectedKeyword: React.Dispatch<React.SetStateAction<string | null>>;
    openFilter: string | null;
    setOpenFilter: React.Dispatch<React.SetStateAction<string | null>>;
    priceRange: { min: string; max: string };
    setPriceRange: React.Dispatch<React.SetStateAction<{ min: string; max: string }>>;
    onApplyPrice: () => void;
    onResetPrice: () => void;
}
export default function Hero({
    data,
    Locations,
    Categories,
    selectedLocation,
    setSelectedLocation,
    selectedCategory,
    setSelectedCategory,
    selectedKeyword,
    setSelectedKeyword,
    openFilter,
    setOpenFilter,
    priceRange,
    setPriceRange,
    onApplyPrice,
    onResetPrice
}: props) {

    return (
        <div className='relative h-screen lg:rounded-b-[64px] rounded-b-[32px]'>
            <div className=' lg:rounded-b-[64px] rounded-b-[32px] overflow-hidden absolute inset-0'>
                <span className='bg-[#00000066] absolute inset-0 w-full h-full z-10' />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-cover  w-full h-full"
                >
                    <source src={data.video} type="video/mp4" />
                </video>
            </div>

            <div className=' absolute max-w-[1424px] px-4 mx-auto inset-x-0 lg:bottom-[60px] bottom-8 z-20 md:space-y-8 space-y-6'>
                <div className='l:max-w-[560px] space-y-4'>
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className='text-white md:text-[58px] font-semibold md:leading-[75px] text-[42px] md:text-start text-center leading-[55px]' dangerouslySetInnerHTML={{ __html: data.title }} />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.3 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className='text-white font-light md:text-xl text-base md:text-start text-center'>{data.subtitle}</motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='bg-white md:p-8 py-8 px-4 rounded-3xl space-y-6'>
                    <h2 className='md:text-[28px] text-xl md:leading-9 text-primary font-semibold'>{data.search_title}</h2>
                    <Filter
                        Locations={Locations}
                        Categories={Categories}
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedKeyword={selectedKeyword}
                        setSelectedKeyword={setSelectedKeyword}
                        openFilter={openFilter}
                        setOpenFilter={setOpenFilter}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        onApplyPrice={onApplyPrice}
                        onResetPrice={onResetPrice}
                        Conditions={[]}
                        Energies={[]}
                        onGoToProperties
                    />
                </motion.div>
            </div>
        </div>
    )
}
