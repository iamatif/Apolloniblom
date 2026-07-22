'use client'
import ArabicFlag from '@/_components/SVGs/ArabicFlag';
import EnglishFlag from '@/_components/SVGs/EnglishFlag';
import { locales } from '@/navigation';
import { useLocale } from 'next-intl';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
const { useRouter, usePathname } = createSharedPathnamesNavigation({ locales });
export default function LangSwitcherNew() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const onLocaleChange = (e: "en" | "ar" | undefined) => {
        const newLocale = e;
        router.replace(pathname, { locale: newLocale });
    };
    return (
        <div className='bg-Gray70 p-1 rounded flex items-center w-fit gap-1'>
            <button onClick={() => onLocaleChange("en")} className={` ${locale === "en" ? " pointer-events-none bg-Gray80" : ""} flex items-center p-1 gap-1 text-white `}>
                <span className='w-[22px] h-4'>
                    <EnglishFlag />
                </span>
                <span className='text-sm block'>
                    EN
                </span>
            </button>
            <button onClick={() => onLocaleChange("ar")} className={` ${locale === "ar" ? " pointer-events-none bg-Gray80" : ""} flex items-center p-1 gap-1 text-white`}>
                <span className='w-[22px] h-4'>
                    <ArabicFlag />
                </span>
                <span className='text-sm block'>
                    العربية

                </span>

            </button>
        </div>
    )
}
