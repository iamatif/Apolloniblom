'use client'
import { locales } from '@/navigation';
import { useLocale } from 'next-intl';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
const { useRouter, usePathname } = createSharedPathnamesNavigation({ locales });
export default function LangSwitcher({ fixed }: { fixed: boolean }) {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const onLocaleChange = (e: "en" | "ar" | undefined) => {
        const newLocale = e;
        router.replace(pathname, { locale: newLocale });
    };
    return (
        <div>
            {
                locale === "en" ?
                    <p
                        onClick={() => onLocaleChange("ar")}
                        className={`${fixed ? "text-white" : "text-black"} flex items-center gap-1 xl:text-base text-sm  hover:text-yellow transition-all duration-500 cursor-pointer ArabicFont`}>تصفح بالعربية
                    </p>
                    :
                    <p
                        onClick={() => onLocaleChange("en")}
                        className={`${fixed ? "text-white" : "text-black"} flex items-center gap-1 xl:text-base text-sm  hover:text-yellow transition-all duration-500 cursor-pointer EnglishFont`}>English
                    </p>
            }
        </div>
    )
}
