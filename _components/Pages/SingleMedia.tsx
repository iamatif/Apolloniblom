import { useLocale, useTranslations } from 'next-intl'
import BlogWidget, { BlogWidgetProps } from '../Common/BlogWidget'
import BreadCrumb from '../Common/BreadCrumb'
import Image from 'next/image'
import ShareButtons from '../Common/ShareButtons'
import Link from 'next/link'
import Arrowtwo from '../SVGs/Arrowtwo'

interface Props {
    data: {
        id: number,
        slug: string,
        title: string,
        blog_image: {
            src: string,
            alt: string
        },
        front_image: {
            src: string,
            alt: string
        },
        content: string,
        categories: {
            id: number,
            name: string
        }[],
        created_at: string

    },
    Blogs: BlogWidgetProps[]
}
export default function SingleMedia({ data, Blogs }: Props) {
    const t = useTranslations();
    const locale = useLocale();
    const BreadCrumbList = [
        {
            title: t("data.blog"),
            link: "/blogs"
        },
        {
            title: data.title
        }
    ];
    return (
        <>
            <div className='bg-Gray05 pt-10 pb-20 px-4'>
                <div className='max-w-[1392px] mx-auto space-y-8'>
                    <div className="flex flex-col items-center gap-2 max-w-[808px] mx-auto pb-8">
                        <BreadCrumb list={BreadCrumbList} />
                        <h1 className="text-primary md:text-[42px] font-semibold md:leading-[55px] text-[28px] md:text-start text-center">
                            {data.title}
                        </h1>
                        <span className='text-secondary block text-base font-semibold'>
                            {data.created_at}
                        </span>
                        <div className='flex gap-2'>
                            {data.categories.map((item, index) => (
                                <span key={index} className={`text-white capitalize text-xs font-medium p-0.5 ${item.id === 1 ? "bg-Gold" : "bg-Green"}`}>
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className='relative w-full h-[420px] rounded-[18px] overflow-hidden'>
                        <Image
                            src={data.front_image.src}
                            alt={data.front_image.alt ?? "image"}
                            fill
                            className=' object-cover'
                        />
                    </div>

                    <div className='max-w-[668px] mx-auto'>
                        <div className='space-y-3  content ' dangerouslySetInnerHTML={{ __html: data.content }} />
                        <div className='mt-8 pt-8 border-t border-Gold'>
                            <ShareButtons url={`${locale === "en" ? "" : "/ar"}/blogs/${data.slug}`} />
                        </div>

                    </div>

                </div>

            </div>
            <div className='bg-Gray10 py-[60px] px-4'>
                <div className='max-w-[1392px] mx-auto'>
                    <div className='flex justify-between items-center'>
                        <h2 className=' text-primary md:text-[42px] font-semibold md:leading-[55px] text-[28px]'>{t("home.read_also")}</h2>
                        <Link className='md:flex hidden gap-3 items-center text-base font-medium transition-all duration-500 text-Gold hover:text-primary' href={`${locale === "en" ? "" : "/ar"}/blogs`}>
                            {t("buttons.explore_all")}
                            <span className='w-4 h-4 rtl:rotate-180'>
                                <Arrowtwo />
                            </span>
                        </Link>
                    </div>
                    <div className='flex gap-4 md:mt-[60px] mt-4 lg:flex-nowrap flex-wrap'>
                        {Blogs.map((item, index) => (
                            <div key={index} className='lg:w-[calc(100%/3-11px)] md:w-[calc(100%/2-8px)] w-full'>
                                <BlogWidget data={item} />
                            </div>
                        ))}
                    </div>
                    <Link className='md:hidden flex justify-center mt-10 gap-3 items-center text-base font-medium transition-all duration-500 text-Gold hover:text-primary' href={`${locale === "en" ? "" : "/ar"}/blogs`}>
                       {t("buttons.explore_all")}
                        <span className='w-4 h-4 rtl:rotate-180'>
                            <Arrowtwo />
                        </span>
                    </Link>
                </div>
            </div>
        </>

    )
}
