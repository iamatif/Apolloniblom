'use client';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NeedHelp, { NeedHelpProps } from '../Common/NeedHelp';
import PagesHero from '../Common/PagesHero';
import Share from '../SVGs/Share';
import { motion } from 'framer-motion';

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
    services: {
      title: string,
      image: {
        src: string,
        alt: string
      },
      overview: string,
      approach: string,
      outcome: string
    }[],
    entertainment: {
      image: {
        src: string,
        alt: string
      },
      title: string,
      subtitle: string,
      links: {
        title: string,
        link: string
      }[]
    }
  }
}

export default function Services({ data, NeedHelpComp }: { data: Props, NeedHelpComp: NeedHelpProps }) {
  const t = useTranslations()
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const locale = useLocale();

  useEffect(() => {
    const handleScroll = () => {
      // 👇 Change 100vh or specific section ID if needed
      const firstSection = document.querySelector('.first-section')
      const sectionHeight = firstSection ? firstSection.clientHeight : window.innerHeight

      if (window.scrollY > sectionHeight - 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  // ✅ IntersectionObserver to detect which section is visible
  useEffect(() => {
    const sections = document.querySelectorAll("[id^='item-']")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.id.replace("item-", ""))
            setActiveSection(index)
          }
        })
      },
      {
        root: null,
        threshold: 0.5, // section must be 50% visible
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (activeSection !== null) {
      const activeButton = document.querySelector(
        `.nav-buttons button:nth-child(${activeSection + 1})`
      );
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [activeSection]);
  return (
    <div>
      <PagesHero data={data.extra_content.hero} slug={data.slug} />

      <div className={`${scrolled ? " fixed top-0 " : ""} inset-x-0 w-full z-50 transition-all duration-500 bg-black px-4`}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className='nav-buttons max-w-[1392px] mx-auto flex md:gap-[56px] gap-5 flex-nowrap overflow-x-scroll noScrollBar'>
          {data.extra_content.services.map((item, index) => (
            <button
              onClick={() => handleNav(`item-${index}`)}
              key={index} className={`  ${activeSection === index ? "text-Gold border-Gold" : "text-Gray30 hover:text-Gold border-black"}  border-b-[3px] transition-all duration-500  text-base font-medium py-3 whitespace-nowrap noScrollBar`}>
              {item.title}
            </button>
          ))}

        </motion.div>
      </div>
      {data.extra_content.services.map((item, index) => {
        const bgColors = ["#F5F5F5", "#FFFFFF", "#000000"];
        const bgColor = bgColors[index % 3];
        const isBlackBg = bgColor === "#000000";

        return (
          <div
            key={index}
            id={`item-${index}`}
            className="py-[60px] px-4"
            style={{ backgroundColor: bgColor, color: isBlackBg ? "#FFFFFF" : "#000000" }}
          >
            <div className="max-w-[1392px] mx-auto md:space-y-8 space-y-6">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className={`md:text-[42px] font-semibold md:leading-[55px] text-[28px] flex justify-between items-center ${isBlackBg ? "text-white" : "text-black"
                  }`}
              >
                {item.title}
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  whileInView={{ opacity: 1, width: "47%" }}
                  transition={{ duration: 0.2, delay: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="md2:block hidden w-[47%] h-[2px] bg-Gold" />
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-[903px] space-y-2">
                <h3
                  className={`text-2xl font-semibold ${isBlackBg ? "text-Gold" : "text-Gold"
                    }`}
                >
                  {t("data.overview")}
                </h3>
                <p className="text-base font-medium">{item.overview}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative w-full lg:h-[498px] md:h-[350px] md:aspect-auto aspect-square rounded-[32px] overflow-hidden">
                <Image src={item.image.src} alt={item.image.alt ?? "Image"} fill className='object-cover' />
              </motion.div>

              <div className="flex md:flex-row flex-col gap-y-4">
                <motion.div
                  initial={{ opacity: 0, x: locale === "en" ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="md:w-[calc(50%)] w-full md:pe-[60px] md:border-e border-Gray2 space-y-2">
                  <h3 className="text-2xl font-semibold text-Gold">{t("data.approach")}</h3>
                  <p className="text-base font-medium">{item.approach}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: locale === "en" ? 10 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                  className="md:w-[calc(50%)] w-full md:ps-[60px] space-y-2">
                  <h3 className="text-2xl font-semibold text-Gold">{t("data.outcome")}</h3>
                  <p className="text-base font-medium">{item.outcome}</p>
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}
      <div className='px-4 lg:py-[121px] py-[60px] overflow-hidden'>
        <div className='max-w-[1392px] mx-auto space-y-8 flex justify-between items-end md:flex-row flex-col'>
          <motion.div
            initial={{ opacity: 0, x: locale === "en" ? -10 : 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className='xl:w-[698px] sm:w-[50%] w-full md:mx-0 mx-auto lg:h-[498px] lg:aspect-auto aspect-square relative rounded-[32px] overflow-hidden'>
            <Image src={data.extra_content.entertainment.image.src} alt={data.extra_content.entertainment.image.alt ?? "Image"} fill className='object-cover' />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: locale === "en" ? 10 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className='xl:w-[calc(100%-758px)] md:w-[calc(50%-50px)] w-full space-y-4'>
            <h2 className='text-Gold font-semibold md:text-2xl text-xl'>{data.extra_content.entertainment.title}</h2>
            <p className='text-primary font-medium text-base'>{data.extra_content.entertainment.subtitle}</p>
            {data.extra_content.entertainment.links.map((item, index) => (
              <div key={index}>
                <h3 className='text-primary md:text-xl text-base font-semibold'>
                  {item.title}
                </h3>
                <Link className='text-secondary md:text-xl text-base font-semibold flex gap-2 ' href={item.link.startsWith('/') ? item.link : item.link.startsWith('https://') ? item.link : `https://${item.link}`} target='_blank'>
                  {item.link} <span className='w-[28px] h-[28px]'><Share /></span>
                </Link>

              </div>
            ))}


          </motion.div>
        </div>
      </div>
      <NeedHelp data={NeedHelpComp} />

    </div>
  )
}
