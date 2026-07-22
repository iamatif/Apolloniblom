'use client'
import { motion } from 'framer-motion';
import { Variants } from "framer-motion";
import Image from 'next/image';
export interface StepsProps {
  title: string,
  subtitle: string,
  steps: {
    image: {
      src: string,
      alt: string
    },
    title: string,
    content: string
  }[]
}

export default function Steps({ data }: { data: StepsProps }) {


  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const stepVariants: Variants = {
    hidden: (index: number) => ({
      opacity: 0,
      x: index % 2 === 0 ? 50 : -50,
    }),
    show: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for "easeOut"
      },
    }),
  };

  const lineVariants: Variants = {
    hidden: { scaleY: 0 },
    show: {
      scaleY: 1,
      transition: {
        duration: 1.2,
        ease: [0.42, 0, 0.58, 1], // "easeInOut"
      },
    },
  };


  return (
    <div className='bg-Gray05 px-4 md:py-[112px] overflow-x-hidden'>
      <div className='max-w-[1392px] mx-auto md:space-y-[60px] space-y-8'>
        <div className='text-center max-w-[768px] mx-auto'>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.3, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className='pt-1 pb-3 text-primary md:text-[42px] font-semibold md:leading-[55px] text-[28px]'>{data.title}</motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.4, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className='text-secondary md:text-xl text-sm'>{data.subtitle}</motion.p>
        </div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          {data.steps.map((item, index: number) => (
            <motion.div
              key={index}
              custom={index}
              variants={stepVariants}
              className={`relative w-full flex justify-between py-6  z-10 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
            >
              {/* Text Side */}
              <div
                className={` xl:w-[calc(50%-48px)] md:w-[calc(50%-50px)] w-[calc(100%-40px)] md:ms-0 ms-auto md:space-y-8 space-y-4`}
              >
                <div className='flex justify-between items-start md:flex-row flex-col gap-y-4'>
                  <motion.span
                    className={`absolute md:inset-x-0 start-[9px] w-fit mx-auto top-6 py-2 bg-Gray05`}
                  // variants={circleVariants}
                  >
                    <span className="w-[15px] h-[15px] bg-Gold rounded-full block bg-yellow" />
                  </motion.span>
                  <div className='relative md:w-[260px] w-full h-[200px] rounded-3xl overflow-hidden'>
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      className=' object-cover'
                    />
                  </div>
                  <span className='md:text-[140px] text-Gold4 md:leading-[182px] text-7xl'>
                    0{index + 1}
                  </span>
                </div>
                <div className='w-[calc(100%-34px)] space-y-6'>
                  <h3 className="text-[32px] leading-6 font-semibold text-primary  ">
                    {item.title}
                  </h3>
                  <div className='text-base font-medium text-secondary' dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>

              </div>

              <span className="md:block hidden xl:w-[calc(50%-48px)] md:w-[calc(50%-50px)] w-[100%-100px]" />
            </motion.div>
          ))}
          <motion.div
            className="bg-primary w-[3px] absolute md:inset-x-0 start-[15px] end-auto inset-y-0 m-auto border border-primary origin-top"
            variants={lineVariants}
          />
        </motion.div>

      </div>
    </div>
  )
}
