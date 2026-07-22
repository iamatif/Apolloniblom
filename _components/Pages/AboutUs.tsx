'use client';
import Image from 'next/image';
import NeedHelp, { NeedHelpProps } from '../Common/NeedHelp';
import PagesHero from '../Common/PagesHero';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

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
    overview: {
      title: string,
      content: string
    },
    stats: {
      image: {
        src: string,
        alt: string
      },
      items: {
        counter: string,
        title: string
      }[]
    },
    info: {
      title: string,
      content: string,
      image: {
        src: string,
        alt: string
      }
    }[],
    why_choose_us: {
      image: {
        src: string,
        alt: string
      },
      title: string,
      services: {
        title: string,
        content: string,
      }[]
    },
    final_section: {
      title: string,
      content: string,
      image: {
        src: string,
        alt: string
      }
    }
  }
}

export default function AboutUs({ data, NeedHelpComp }: { data: Props, NeedHelpComp: NeedHelpProps }) {
  const locale = useLocale();
  return (
    <div>
      <PagesHero data={data.extra_content.hero} slug={data.slug} />
      <div className='bg-Gray05 md:py-[172px] py-[60px] px-4'>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.5 }}
          className='max-w-[1192px] mx-auto md:space-y-6 space-y-3'>
          <h2 className='text-center text-primary md:text-xl text-lg font-semibold'>{data.extra_content.overview.title}</h2>
          <div
            className="gradient-text md:text-[32px] md:leading-[45px] text-xl text-center text-pretty"
            dangerouslySetInnerHTML={{ __html: data.extra_content.overview.content }}
          />
        </motion.div>

      </div>
      <div className='bg-Gold6 md:py-[172px] py-[60px] px-4 overflow-hidden'>
        <div className='max-w-[1392px] mx-auto flex justify-between items-center md2:flex-row flex-col gap-y-6'>
          <motion.div
            initial={{ opacity: 0, x: locale === "en" ? -10 : 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className='relative xl:w-[622px] md:w-[45%] w-full md:aspect-[622/520] aspect-square'>
            <Image src={data.extra_content.stats.image.src} alt={data.extra_content.stats.image.alt ?? "Image"} fill />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: locale === "en" ? 10 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className='xl:w-[calc(100%-664px)] md2:w-[calc(55%-30px)] w-full flex gap-4 flex-wrap'>
            {data.extra_content.stats.items.map((item, index) => (
              <div key={index} className='xl:p-[42px] md:p-8 p-4 rounded-3xl bg-Gold3 md:space-y-6 space-y-4 w-[calc(50%-8px)] '>
                <h3 className='font-extralight xl:text-[72px] lg:text-6xl text-4xl'>{item.counter}</h3>
                <p className='text-Gold lg:text-xl md:text-base text-sm font-semibold'>{item.title}</p>
              </div>
            ))}
          </motion.div>

        </div>

      </div>
      <div className='bg-Gray05 md:py-[100px] py-[60px] overflow-hidden px-4'>
        <div className='max-w-[1392px] mx-auto space-y-[60px]'>
          {data.extra_content.info.map((item, index) => (
            <div key={index} className={`flex justify-between items-center flex-col-reverse gap-y-6 ${index % 2 === 0 ? "md2:flex-row" : "md2:flex-row-reverse"}`}>
              <motion.div
                initial={{ opacity: 0, x: index % 2 != 0 ? locale === "en" ? 10 : -10 : locale === "en" ? -10 : 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className='xl:w-[calc(100%-737px)] md2:w-[calc(50%-30px)] w-full md:space-y-8 space-y-4'>
                <h2 className='text-primary lg:text-[42px] lg:leading-[55px] md:text-4xl text-2xl text-pretty font-semibold lg:w-[calc(100%-52px)]'>{item.title}</h2>
                <div className='lg:text-lg text-base font-medium text-secondary' dangerouslySetInnerHTML={{ __html: item.content }} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: index % 2 != 0 ? locale === "en" ? -10 : 10 : locale === "en" ? 10 : -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
                viewport={{ once: true, amount: 0.5 }}
                className='xl:w-[670px] md:w-[50%] relative md:h-[520px] w-full md:aspect-auto aspect-square rounded-[18px] overflow-hidden'>
                <Image
                  src={item.image.src}
                  alt={item.image.alt ?? "Image"}
                  fill
                  className='object-cover'
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-black md:py-[170px] py-[60px] overflow-hidden px-4'>
        <div className='max-w-[1392px] mx-auto flex justify-between md2:flex-row flex-col-reverse gap-y-6'>
          <motion.div
            initial={{ opacity: 0, x: locale === "en" ? -10 : 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className='l:w-[calc(100%-582px)] md2:w-[calc(50%-30px)] w-full md:px-8 px-4 xl:py-[60px] py-10 bg-white rounded-3xl space-y-8'>
            <h2 className='text-primary lg:text-[42px] lg:leading-[55px] md:text-4xl text-2xl text-pretty font-semibold'>{data.extra_content.why_choose_us.title}</h2>
            {data.extra_content.why_choose_us.services.map((item, index) => (
              <div key={index} className='space-y-2 ps-6 border-s border-Gold'>
                <h3 className='text-Gold text-lg font-bold'>{item.title}</h3>
                <p className='text-secondary text-lg font-medium'>{item.content}</p>
              </div>
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: locale === "en" ? 10 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.5 }}
            className='relative l:w-[550px] sm:w-[50%] w-full h-[520px] rounded-[18px] overflow-hidden md2:mx-0 mx-auto'>
            <Image
              src={data.extra_content.why_choose_us.image.src}
              alt={data.extra_content.why_choose_us.image.alt ?? "Image"}
              fill
              className='object-cover'
            />
          </motion.div>
        </div>
      </div>
      <div className='bg-Gray05  md:py-[100px] py-[60px] px-4'>
        <div className='max-w-[1392px] mx-auto space-y-8'>
          <div className='max-w-[968px] mx-auto text-center'>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.3, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className='pt-1 pb-3 text-primary md:text-[42px] font-semibold md:leading-[55px] text-[28px]'>{data.extra_content.final_section.title}</motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.4, ease: "easeInOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className='text-secondary md:text-xl text-sm'>{data.extra_content.final_section.content}</motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.5, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className='w-full relative rounded-[32px] overflow-hidden h-[498px]'>
            <Image
              src={data.extra_content.final_section.image.src}
              alt={data.extra_content.final_section.image.alt ?? "Image"}
              fill
              className='object-cover'
            />
          </motion.div>
        </div>
      </div>
      <NeedHelp data={NeedHelpComp} />
    </div >
  )
}
