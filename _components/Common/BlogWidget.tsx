import Image from 'next/image'
import Link from 'next/link'
import LongArrow from '../SVGs/LongArrow'
import { useLocale } from 'next-intl'

export interface BlogWidgetProps {
    slug: string,
    title: string,
    front_image: {
        src: string,
        alt: string
    },
    short_content: string,
    categories: {
        id: number,
        name: string
    }[],
    created_at: string
}

export default function BlogWidget({ data }: { data: BlogWidgetProps }) {
    const locale = useLocale()
    return (
        <Link href={`${locale === "en"?"":"/ar"}/blogs/${data.slug}`} className='bg-white border border-Gray40 rounded-[28px] p-4 flex flex-col gap-6 group hover:bg-Gray10 transition-all duration-500'>
            <div className='relative w-full md:h-[256px] md:aspect-auto aspect-square rounded-[18px] overflow-hidden'>
                <Image src={data.front_image.src} alt={data.front_image.alt ?? "Image"} fill />
            </div>
            <div className='space-y-2'>
                <div className='flex gap-2'>
                    {data.categories.map((item, index) => (
                        <span key={index} className={`text-white capitalize text-xs font-medium p-0.5 ${item.id === 1 ? "bg-Gold" : "bg-Green"}`}>
                            {item.name}
                        </span>
                    ))}
                </div>


                <span className='text-secondary text-sm font-semibold block'>{data.created_at}</span>
                <h3 className='lg:text-xl text-base font-semibold md:min-h-[56px]'>{data.title}</h3>
                <div className='flex justify-between'>
                    <p className='max-w-[307px] line-clamp-2 text-base text-secondary'>
                        {data.short_content}
                    </p>
                    <span className='flex items-center justify-center bg-Gray05 py-3 px-[18px] rounded-[30px]'>
                        <span className='w-[26px] h-[26px] rtl:-rotate-90 rtl:group-hover:-rotate-[135deg] ltr:group-hover:rotate-45  transition-all duration-500'>
                            <LongArrow />
                        </span>
                    </span>
                </div>
            </div>

        </Link>
    )
}
