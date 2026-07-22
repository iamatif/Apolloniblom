import Link from 'next/link'
import PropertyWidget, { PropertiesWidget } from '../Common/Properties/PropertyWidget'
import ButtonArrow from '../SVGs/ButtonArrow'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'

export interface PropertiesProps {
    title: string,
    subtitle: string,
    button: {
        text: string,
        link: string
    }
}

export default function Properties({ data, PropertiesWidgets }: { data: PropertiesProps, PropertiesWidgets: PropertiesWidget[] }) {
    const locale = useLocale();
    // Words split logic fix: split(' ') use karein taake poore shabd milein
    const words = data.title.split(' ');

    return (
        <div className='py-[60px] px-4 overflow-hidden'>
            <div className='max-w-[1392px] mx-auto md:space-y-10 space-y-8 '>
                <div className='flex items-center md2:justify-between justify-center gap-4'>
                    <div className='md2:text-start text-center'>
                        <h3 className='text-primary md:text-[42px] font-semibold md:leading-[55px] text-[28px]'>
                            {words.map((part, index) => (
                                <motion.span
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    className='inline-block mr-2'
                                >
                                    {part}
                                </motion.span>
                            ))}
                        </h3>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.8 }}
                            viewport={{ once: true, amount: 0.3 }}
                            className='md:text-xl text-sm text-secondary mt-2' 
                            dangerouslySetInnerHTML={{ __html: data.subtitle }} 
                        />
                    </div>
                    
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className='md2:block hidden shrink-0'>
                        <Link href={`${locale === "en" ? "" : "/ar"}${data.button.link?.startsWith('/') ? data.button.link : `/${data.button.link}`}`} className='flex py-[14px] px-6 gap-3 text-black border border-black rounded-full hover:bg-black hover:text-white transition-all justify-center items-center'>
                            <span className='w-5 h-5'>
                                <ButtonArrow />
                            </span>
                            <span className='whitespace-nowrap'>{data.button.text}</span>
                        </Link>
                    </motion.div>
                </div>

                {/* Properties Grid/Scroll Fix */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.5 }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='flex gap-6 overflow-x-auto noScrollBar pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap lg:flex-nowrap'
                >
                    {PropertiesWidgets.map((item, index) => (
                        <div key={index} className='min-w-[280px] md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0'>
                            <PropertyWidget data={item} />
                        </div>
                    ))}
                </motion.div>

                {/* Mobile Button */}
                <Link href={`${locale === "en" ? "" : "/ar"}${data.button.link?.startsWith('/') ? data.button.link : `/${data.button.link}`}`} className='md2:hidden flex py-[14px] gap-3 text-black border border-black rounded-full w-full justify-center items-center'>
                    <span className='w-6 h-6'>
                        <ButtonArrow />
                    </span>
                    <span>{data.button.text}</span>
                </Link>
            </div>
        </div>
    )
}