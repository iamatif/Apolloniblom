'use client'
import ButtonArrow from '@/_components/SVGs/ButtonArrow'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import React, { useState } from 'react'
import LangSwitcher from './LangSwitcher'
import Search from '@/_components/SVGs/Search'
import BurgerButton from '@/_components/SVGs/BurgerButton'
import BigMenu from './BigMenu'
import { AnimatePresence, motion } from 'framer-motion';
import LightCircle from '@/_components/SVGs/LightCircle'
import Morefilters from '../Properties/Morefilters'

interface HeaderPops {
  logo: {
    src: string,
    alt: string
  },
  hamburger_text: string,
  nav_button: {
    text: string,
    link: string
  },
  video: {
    src: string,
    alt: string
  },
  upper_menu: {
    item: string,
    link: string
  }[],
  menu: {
    item: string,
    link: string
  }[],
  menu_button: {
    text: string,
    link: string
  }
}

export default function DesktopHeader({ data }: { data: HeaderPops }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const t = useTranslations();
  const [selectedKeyword, setSelectedKeyword] = useState('');

  const fixedone = pathname === "/our-services" || pathname === "/ar/our-services"
    || pathname === "/purchasing-process" || pathname === "/ar/purchasing-process"
    || pathname === "/pricing" || pathname === "/ar/pricing"
    || pathname === "/about-us" || pathname === "/ar/about-us" || pathname === "/" || pathname === "/ar"
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && selectedKeyword.trim() !== '') {
      const basePath = locale === 'en' ? '' : '/ar';
      router.push(`${basePath}/properties?keyword=${encodeURIComponent(selectedKeyword)}`);
      setOpenSearch(false); // optional: close the search modal after navigating
    }
  };
  return (
    <>
      <div className={`px-4 w-full ${fixedone ? " absolute inset-x-0 top-0 z-20" : "border-b border-Gray10 py-3"}`}>
        <div className='max-w-[1392px] mx-auto flex items-center w-full justify-between lg:flex-row flex-row-reverse'>
          <div className='flex gap-8 xl:w-[392px] lg:w-[300px] w-fit'>
            <button className={`${fixedone ? "text-white" : "text-black"} w-6 h-6`} onClick={() => setOpen(true)}>
              <BurgerButton />
            </button>
            <Link href={`${locale === "en" ? "" : "/ar"}/properties`} className={`${fixedone ? "text-white" : "text-black"}  text-base font-medium lg:block hidden`}>
              {data.hamburger_text}
            </Link>
          </div>
          <Link href={`${locale === "en" ? "/" : "/ar"}`} className='relative h-[72px] w-[230px] block'>
            <Image
              src={fixedone ? data.logo.src : "/logo.png"}
              alt={data.logo.alt}
              fill
              className=' object-contain'
            />
          </Link>
          <div className='lg:flex items-center gap-6 w-[392px] hidden'>
            <button className={`${fixedone ? "text-white" : "text-black "} w-[28px] h-[28px]`}
              onClick={() => setOpenSearch(!openSearch)}>
              <Search />
            </button>
            <LangSwitcher fixed={fixedone} />
            <Link className={`${fixedone ? "text-black bg-white" : "text-white bg-black"} text-base font-medium flex gap-3  py-3.5 px-[45px] rounded-full overflow-hidden relative`} href={`${locale === "en" ? "" : "/ar"}${data.nav_button.link}`}>
              <span className='w-[52px] h-[52px] absolute start-0 rounded-full overflow-hidden'>
                <LightCircle />
              </span>
              <span className='w-6 h-6'>
                <ButtonArrow />
              </span>
              {data.nav_button.text}
            </Link>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: locale === "en" ? "-100%" : "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: locale === "en" ? "-100%" : "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <BigMenu
              data={data}
              CloseFunction={() => setOpen(false)}
              selectedKeyword={selectedKeyword}
              setSelectedKeywordFunction={(e) => setSelectedKeyword(e.target.value)}
              handleSearch={handleSearch}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Morefilters isOpen={openSearch} CloseFunction={() => setOpenSearch(!openSearch)}>
        <div className='w-1/2 mx-auto flex p-5 border border-gray-300 rounded-md gap-5'>
          <span className='w-6 h-6'>
            <Search />
          </span>
          <input
            type="text"
            placeholder={t("filter.search")}
            className="w-full outline-none text-base font-medium placeholder:text-secondary text-secondary"
            value={selectedKeyword}
            onChange={(e) => setSelectedKeyword(e.target.value)}
            onKeyDown={handleSearch} // ✅ Add this
          />
        </div>

      </Morefilters>
    </>

  )
}
