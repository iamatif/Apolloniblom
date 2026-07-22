import ButtonArrow from '@/_components/SVGs/ButtonArrow';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function GallerySlider({ Images }: {
    Images: {
        src: string,
        alt: string
    }[]
}) {
    const swiperRef = useRef<SwiperType | null>(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const locale = useLocale();

    // Lock body scroll when fullscreen modal is open
    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isLightboxOpen]);

    // Close lightbox on Escape key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsLightboxOpen(false);
            }
        };
        if (isLightboxOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isLightboxOpen]);

    return (
        <>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    // initialize states on mount
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                onSlideChange={(swiper) => {
                    setCurrentIndex(swiper.activeIndex);
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                }}
                className='md:h-[512px] h-[400px] general'
            >
                {Images.map((item, index: number) => (
                    <SwiperSlide key={index} className='relative md:aspect-[1512/820]'>
                        <Image
                            src={item.src}
                            alt={item.alt ?? "Image"}
                            fill
                            className='object-cover'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* ENLARGE BUTTON */}
            <button
                onClick={() => setIsLightboxOpen(true)}
                className='absolute top-4 end-4 z-10 bg-Gray05/85 backdrop-blur-sm p-3 rounded-full hover:bg-Gold hover:text-white transition-all duration-300 shadow-lg group'
                aria-label="Enlarge image"
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300">
                    <path d="M15 3H21M21 3V9M21 3L14 10M9 21H3M3 21V15M3 21L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <div className='absolute bottom-4 start-4 bg-Gray05 py-1 rounded-[30px] px-4 z-10 flex items-start justify-center'>
                <span className='text-base text-primary  leading-[22px]'>
                    {currentIndex + 1}/{Images.length}
                </span>
            </div>

            <div className='absolute bottom-4 end-4 z-10 flex gap-4'>
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className={`bg-Gray05 py-3 px-[18px] rounded-[30px] flex justify-center items-center ${isBeginning ? 'opacity-30 pointer-events-none' : 'hover:text-gold-40'
                        }`}
                >
                    <span className='w-6 h-6 '>
                        {locale === "en" ?
                            <svg className='w-full h-full' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 7L4 11L8 15M4.21045 11L12 11C14.8003 11 16.2004 11 17.27 11.545C18.2108 12.0243 18.9757 12.7892 19.455 13.73C20 14.7996 20 17 20 17" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            : <ButtonArrow />}

                    </span>
                </button>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className={` bg-Gray05 py-3 px-[18px] rounded-[30px] flex justify-center items-center ${isEnd ? 'opacity-30 pointer-events-none' : 'hover:text-gold-40'
                        }`}
                >
                    <span className='w-6 h-6'>
                        {locale === "ar" ?
                            <svg className='w-full h-full' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 7L4 11L8 15M4.21045 11L12 11C14.8003 11 16.2004 11 17.27 11.545C18.2108 12.0243 18.9757 12.7892 19.455 13.73C20 14.7996 20 17 20 17" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            : <ButtonArrow />}
                    </span>
                </button>
            </div>

            {/* FULLSCREEN LIGHTBOX OVERLAY */}
            {isLightboxOpen && (
                <div className='fixed inset-0 z-[9999] bg-black/95 flex flex-col items-center justify-between py-4 px-0 transition-opacity duration-300 animate-fade-in'>
                    {/* Top bar with Close Button and Page Index */}
                    <div className='w-full px-6 md:px-12 flex items-center justify-between text-white z-20'>
                        <span className='text-lg font-light tracking-wide'>
                            {currentIndex + 1} / {Images.length}
                        </span>
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            className='p-2.5 rounded-full bg-white/10 hover:bg-Gold transition-all duration-300'
                            aria-label="Close fullscreen view"
                        >
                            <svg className='w-6 h-6 text-white' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Main Display Area */}
                    <div className='relative w-full flex-1 flex items-center justify-center my-2 z-10'>
                        {/* Left Navigation Arrow */}
                        <button
                            onClick={() => {
                                const newIndex = (currentIndex - 1 + Images.length) % Images.length;
                                setCurrentIndex(newIndex);
                                swiperRef.current?.slideTo(newIndex);
                            }}
                            className='absolute left-4 md:left-8 z-20 p-3 rounded-full bg-black/40 hover:bg-Gold text-white backdrop-blur-sm transition-all duration-300 shadow-md'
                            aria-label="Previous image"
                        >
                            <svg className='w-6 h-6 stroke-2' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Large Active Image */}
                        <div className='relative w-full h-[70vh] md:h-[76vh] flex items-center justify-center px-4 md:px-16'>
                            <img
                                src={Images[currentIndex].src}
                                alt={Images[currentIndex].alt ?? "Fullscreen View"}
                                className='max-w-full max-h-full object-contain shadow-2xl select-none'
                            />
                        </div>

                        {/* Right Navigation Arrow */}
                        <button
                            onClick={() => {
                                const newIndex = (currentIndex + 1) % Images.length;
                                setCurrentIndex(newIndex);
                                swiperRef.current?.slideTo(newIndex);
                            }}
                            className='absolute right-4 md:right-8 z-20 p-3 rounded-full bg-black/40 hover:bg-Gold text-white backdrop-blur-sm transition-all duration-300 shadow-md'
                            aria-label="Next image"
                        >
                            <svg className='w-6 h-6 stroke-2' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Thumbnails strip below */}
                    <div className='w-full px-6 md:px-12 mt-1 z-20'>
                        <div className='flex gap-3 overflow-x-auto py-2 px-2 justify-start md:justify-center scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent'>
                            {Images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setCurrentIndex(idx);
                                        swiperRef.current?.slideTo(idx);
                                    }}
                                    className={`relative w-20 h-14 md:w-28 md:h-[70px] flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                                        idx === currentIndex 
                                        ? 'border-Gold scale-105 shadow-md shadow-Gold/30' 
                                        : 'border-transparent opacity-60 hover:opacity-100'
                                    }`}
                                >
                                    <Image
                                        src={img.src}
                                        alt={img.alt ?? "Thumbnail"}
                                        fill
                                        className='object-cover'
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
