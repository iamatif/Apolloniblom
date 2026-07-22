'use client';
import { motion } from 'framer-motion';
import NeedHelp, { NeedHelpProps } from '../Common/NeedHelp';
import PagesHero from '../Common/PagesHero';
import Image from 'next/image';

interface Props {
  slug: string,
  extra_content: {
    hero: {
      image: {
        src: string,
        alt: string
      },
      title: string,
      subtitle: string,
      button: {
        link: string,
        text: string
      }
    },
    pricing: {
      title: string,
      subtitle: string,
      items: {
        image: {
          src: string,
          alt: string
        },
        title: string,
        subtitle: string,
        info: {
          title: string,
          content: string
        }[]
      }[]
    }
  }
}

export default function Pricing({ data, NeedHelpComp }: { data: Props, NeedHelpComp: NeedHelpProps }) {

  return (
    <div>
      <PagesHero data={data.extra_content.hero} slug={data.slug} />
      <div className='bg-Gray05 px-4 md:py-[112px] overflow-x-hidden'>
        <div className='max-w-[1392px] mx-auto space-y-20'>
          <div className='text-center max-w-[768px] mx-auto'>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.3, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className='pt-1 pb-3 text-primary md:text-[42px] font-semibold md:leading-[55px] text-[28px]'>{data.extra_content.pricing.title}</motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.4, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className='text-secondary md:text-xl text-sm'>{data.extra_content.pricing.subtitle}</motion.p>
          </div>
          <div className='space-y-8'>
            {data.extra_content.pricing.items.map((item, index) => (
              <div key={index} className={`flex justify-between flex-col gap-y-6  ${index % 2 === 0 ? "md2:flex-row-reverse" : "md2:flex-row"}`}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.1, delay: 0.3, ease: "easeInOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                  className='xl:w-[560px] md2:w-[45%] w-full md2:aspect-auto aspect-square relative rounded-3xl overflow-hidden'>
                  <Image src={item.image.src} alt={item.image.alt ?? "image"} fill className='object-cover' />
                </motion.div>
                <div className={`xl:w-[calc(100%-592px)] md2:w-[calc(55%-30px)] w-full border rounded-3xl lg:space-y-8 space-y-6 xl:p-8 p-6 ${index % 2 === 0 ? "bg-white border-Gray10" : " bg-Gold1 border-Gold2"}`}>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: 0.3, ease: "easeInOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className=' text-primary lg:text-[42px] font-semibold lg:leading-[55px] text-[28px]'>{item.title}</motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.1, delay: 0.4, ease: "easeInOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                    className='text-secondary lg:text-base text-sm'>{item.subtitle}</motion.p>

                  {item.info.map((item2, index2) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.1, delay: 0.5, ease: "easeInOut" }}
                      viewport={{ once: true, amount: 0.3 }}
                      key={index2} className='md:ps-6 ps-4 border-s border-Gold space-y-2'>
                      <h4 className='text-secondary md:text-lg text-base font-medium'>{item2.title}</h4>
                      <div className='text-Gold md:text-lg text-base font-bold' dangerouslySetInnerHTML={{ __html: item2.content }} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <NeedHelp data={NeedHelpComp} />
    </div>
  )
}
