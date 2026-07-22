'use client'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import BreadCrumb from '../Common/BreadCrumb'
import ContactUsForm from '../Common/form/ContactUsForm'
import { motion } from 'framer-motion'

interface Props {
    slug: string
    extra_content: {
        hero: {
            title: string,
            content: string
        },
        form: {
            title: string
            subtitle: string
        },
        contacts: {
            phone: string,
            email: string,
            location: string,
            map_link: string
        }
    }
}

export default function ContactUs({ data }: { data: Props }) {
    const t = useTranslations();
    const locale = useLocale();
    const BreadCrumbList = [
        {
            title: t(`data.${data.slug}`)
        }
    ]
    const Contacts = [
        {
            title: t("data.email"),
            Value: data.extra_content.contacts.email,
            email: true
        },
        {
            title: t("data.mobile"),
            Value: data.extra_content.contacts.phone,
            phone: true
        },
        {
            title: t("data.office"),
            Value: data.extra_content.contacts.location,
            Maplink: data.extra_content.contacts.map_link
        }

    ]
    return (
        <div>
            <div className='flex md2:flex-row flex-col overflow-hidden'>
                <div className='md2:w-[50%] w-full md:py-[100px] py-10 bg-Gray90 xl:pe-[155px] md2:pe-20 pe-5 ps-5 space-y-2 flex flex-col justify-center md2:items-start items-center'>
                    <motion.div
                        initial={{ opacity: 0, x: locale === "en" ? -10 : 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <BreadCrumb list={BreadCrumbList} light />
                        <h1 className='text-white  md:text-start text-center md:text-[42px] font-semibold md:leading-[55px] text-[28px]'>{data.extra_content.hero.title}</h1>
                        <p className='text-Gray20 text-base md:text-start text-center'>{data.extra_content.hero.content}</p>
                    </motion.div>
                </div>
                <div
                    className='md2:w-[50%] w-full md:py-[100px] py-10 bg-Gold xl:pe-[155px] pe-4 md2:ps-10 ps-4 '>
                    <motion.div
                        initial={{ opacity: 0, x: locale === "en" ? 10 : -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
                        viewport={{ once: true, amount: 0.5 }}
                        className='space-y-4'>
                        <div className='space-y-3'>
                            <h2 className='text-white text-[28px] font-semibold'>
                                {data.extra_content.form.title}
                            </h2>
                            <p className='text-base text-Gray05'>
                                {data.extra_content.form.subtitle}
                            </p>
                        </div>
                        <ContactUsForm />
                    </motion.div>

                </div>
            </div>
            <div className='bg-Gold6 px-4 lg:py-[160px] py-[60px]'>
                <div className='max-w-[1392px] mx-auto flex gap-4 md2:flex-nowrap flex-wrap'>
                    {Contacts.map((item, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05, ease: "easeInOut" }}
                            viewport={{ once: true, amount: 0.5 }}
                            key={index} className='bg-Gold3 rounded-3xl lg:p-10 p-5 md2:w-[calc(100%/3)] w-full space-y-6'>
                            <h3 className='text-xl text-Gold font-semibold'>{item.title}</h3>
                            {item.Maplink ?
                                <div className='flex gap-3 flex-wrap'>
                                    <p className='text-primary text-lg font-medium'>{item.Value}</p> <a href={`${item.Maplink.startsWith('www') ? "https://" : ""}${item.Maplink}`} className='text-Gold text-lg font-medium underline'>{t("buttons.get_direction")}</a>
                                </div>
                                :
                                <Link
                                    style={{ direction: item.email ? undefined : "ltr" }}
                                    className={`${item.Value.startsWith('+') ? "rtl:flex-row-reverse rtl:text-right" : ""}  text-primary text-lg font-medium block  text-start`} href={`${item.email ? "mailto:" : "tel:"}${item.Value}`} >
                                    {item.Value}
                                </Link>
                            }
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
