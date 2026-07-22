import ButtonArrow from '@/_components/SVGs/ButtonArrow'
import Close from '@/_components/SVGs/Close'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'
import LangSwitcherNew from './LangSwitcherNew'
import Image from 'next/image'
import Search from '@/_components/SVGs/Search'
interface props {
    upper_menu: {
        item: string,
        link: string
    }[],
    menu: {
        item: string,
        link: string
    }[],
    video: {
        src: string,
        alt: string
    },
    nav_button: {
        text: string,
        link: string
    },
}
interface BigMenuProps {
    data: props
    CloseFunction: () => void
    selectedKeyword: string
    setSelectedKeywordFunction: (e: React.ChangeEvent<HTMLInputElement>) => void // ✅ typed properly
    handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void // ✅ typed properly
}
export default function BigMenu({
    data,
    CloseFunction,
    selectedKeyword,
    setSelectedKeywordFunction,
    handleSearch,
}: BigMenuProps) {
    const locale = useLocale();
    const t = useTranslations();

    return (
        <div className='fixed inset-0 w-full h-full z-40 flex'>
            <div className='2xl:w-[calc(100%-971px)] md:w-[40%] w-full bg-black lg:p-[60px] md:p-10 sm:p-6 p-4 md:space-y-20 space-y-8'>
                <div className='flex items-center justify-between'>
                    <div className='relative w-[230px] h-[70px] md:hidden block'>
                        <Image
                            src={"/log.png"}
                            alt='logo'
                            fill
                        />
                    </div>
                    <button className='w-6 h-6 text-white' onClick={CloseFunction}>
                        <Close />
                    </button>
                </div>
                <div className='w-full bg-Gray90 mx-auto md:hidden flex p-2 rounded-md gap-2.5'>
                    <span className='w-[28px] h-[28px] text-white'>
                        <Search />
                    </span>
                    <input
                        type="text"
                        placeholder={t("filter.search")}
                        className="w-full outline-none text-base font-medium placeholder:text-secondary text-white bg-transparent"
                        value={selectedKeyword}
                        onChange={setSelectedKeywordFunction}
                        onKeyDown={(e) => {
                            handleSearch(e);
                            if (e.key === 'Enter') CloseFunction();
                        }}

                    />
                </div>

                <div>
                    <div className='md:space-y-8 space-y-6 md:pb-8 pb-6 border-b border-Gray80'>
                        {data.upper_menu.map((item, index) => (
                            <Link onClick={CloseFunction} key={index} href={`${locale === "en" ? "" : "/ar"}${item.link}`} className='text-white md:text-[32px] sm:text-2xl text-xl block'>
                                {item.item}
                            </Link>
                        ))}
                    </div>
                    <div className='md:space-y-8 space-y-6 md:pt-8 pt-6'>
                        {data.menu.map((item, index) => (
                            <Link
                                onClick={CloseFunction}
                                key={index} href={`${locale === "en" ? "" : "/ar"}${item.link}`} className='text-white md:text-2xl sm:text-xl text-sm block'>
                                {item.item}
                            </Link>
                        ))}
                        <Link onClick={CloseFunction} className='text-black text-base font-medium flex gap-3 bg-white py-3.5 px-[45px] rounded-full md:w-fit w-full justify-center' href={`${locale === "en" ? "" : "/ar"}${data.nav_button.link}`}>
                            <span className='w-6 h-6'>
                                <ButtonArrow />
                            </span>
                            {data.nav_button.text}
                        </Link>
                    </div>
                </div>
                <LangSwitcherNew />

            </div>
            <div className='2xl:w-[971px] w-[60%] aspect-video md:block hidden '>
                <video
                    className="w-full h-full object-cover"
                    src={data.video.src}
                    autoPlay
                    playsInline
                    muted
                />
            </div>
        </div>
    )
}
