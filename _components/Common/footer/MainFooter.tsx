import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NewsLetterForm from '../form/NewsletterForm'
import LangSwitcherNew from '../Header/LangSwitcherNew'

interface MeniItem {
    title: string,
    link: string
}
interface FooterMenuItem {
    menu_title: string,
    menu_items: MeniItem[]
}
interface Data {
    logo: {
        src: string,
        alt: string
    },
    content: string,
    footer_menu: FooterMenuItem[],
    lower_menu: MeniItem[],
    social: {
        icon: {
            src: string,
            alt: string
        },
        link: string
    }[],
    contacts: {
        icon: {
            src: string,
            alt: string
        },
        value: string
    }[],
    newsletter: {
        title: string,
        subtitle: string
    }

}
export default function MainFooter({ data }: { data: Data }) {
    const locale = useLocale();
    return (
        <div className='bg-black px-4 py-20'>
            <div className='max-w-[1392px] mx-auto flex justify-between md2:flex-row flex-col mdw:gap-y-0 gap-y-[62px]'>
                <div className='xl:w-[456px] lg:w-[400px] md2:w-[300px] w-full'>
                    <div className='space-y-4 md2:border-b border-Gray20 md2:pb-4 md2:mb-4'>
                        <Link href={`${locale === "en" ? "/" : "/ar"}`}
                            className='w-[230px] h-[71px] relative block md2:m-0 mx-auto'
                        >
                            <Image src={data.logo.src} alt={data.logo.alt} fill />
                        </Link>
                        <p className='text-Gray20 sm:text-base text-sm'>{data.content}</p>
                    </div>
                    <div className='space-y-4 md2:block hidden '>
                        <div className=' flex items-center gap-[18px]'>
                            {data.social.map((item, index) => (
                                <Link key={index} href={item.link} className=' relative w-[26px] h-[26px]'>
                                    <Image
                                        src={item.icon.src}
                                        alt={item.icon.alt ?? "Image"}
                                        fill
                                    />
                                </Link>
                            ))}
                        </div>
                        {data.contacts.map((item, index) => (
                            <Link key={index}
                                style={{ direction: item.value.startsWith('+') ? "ltr" : undefined }}
                                href={item.value.startsWith('info') ? `mailto:${item.value}` : item.value.startsWith('+') ? `tel:${item.value}` : item.value}
                                className={`${item.value.startsWith('+') ? "rtl:flex-row-reverse" : ""} flex items-center gap-2 text-Gray20 text-base`}>
                                <Image
                                    src={item.icon.src}
                                    alt={item.icon.alt ?? "Image"}
                                    width={28}
                                    height={28}
                                />
                                <span>
                                    {item.value}
                                </span>

                            </Link>
                        ))}
                    </div>
                </div>
                <div className='xl:w-[calc(100%-528px)] lg:w-[calc(100%-450px)] md2:w-[calc(100%-350px)] w-full flex xl:gap-[62px] lg:gap-10 gap-8  md2:flex-row flex-col'>
                    <div className='flex xl:gap-[62px] lg:gap-10 md2:gap-8 sm:gap-20 gap-[62px] md2:justify-start justify-center sm:flex-row flex-col '>
                        {data.footer_menu.map((item, index) => (
                            <div key={index} className='space-y-2 sm:w-[152px]'>
                                <h3 className='text-white text-lg font-medium'>{item.menu_title}</h3>
                                {item.menu_items.map((links, ind) => (
                                    <Link className='text-Gray20 text-base block' key={ind}
                                        href={`${locale === "en" ? "" : "/ar"}${links.link}`}>
                                        {links.title}
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col justify-between gap-y-[62px] md2:gap-y-0'>
                        <div className='bg-Gray90 p-6 rounded-[18px] space-y-4'>
                            <div>
                                <h3 className='text-lg font-medium text-white'>{data.newsletter.title}</h3>
                                <p className='text-Gray20 text-base'>{data.newsletter.subtitle}</p>
                            </div>
                            <NewsLetterForm />

                        </div>
                        <div className='space-y-4 md2:hidden block '>
                            <div className=' flex items-center gap-[18px]'>
                                {data.social.map((item, index) => (
                                    <Link key={index} href={item.link} className=' relative w-[26px] h-[26px]'>
                                        <Image
                                            src={item.icon.src}
                                            alt={item.icon.alt ?? "Image"}
                                            fill
                                        />
                                    </Link>
                                ))}
                            </div>
                            {data.contacts.map((item, index) => (
                                <Link key={index}
                                    href={item.value.startsWith('info') ? `mailto:${item.value}` : item.value.startsWith('+') ? `tel:${item.value}` : item.value}
                                    className='flex items-center gap-2 text-Gray20 text-base'>
                                    <Image
                                        src={item.icon.src}
                                        alt={item.icon.alt ?? "Image"}
                                        width={28}
                                        height={28}
                                    />
                                    <span>
                                        {item.value}
                                    </span>

                                </Link>
                            ))}
                        </div>
                        <div className='flex md:flex-row flex-col gap-5 items-center'>
                            <div className='flex gap-5'>
                                {data.lower_menu.map((links, ind) => (
                                    <Link className='text-Gray20 text-base block' key={ind}
                                        href={`${locale === "en" ? "" : "/ar"}${links.link}`}>
                                        {links.title}
                                    </Link>
                                ))}
                            </div>

                            <LangSwitcherNew />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
