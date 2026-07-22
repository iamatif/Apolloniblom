'use client'
import { useTranslations } from 'next-intl';
import BlogWidget, { BlogWidgetProps } from '../Common/BlogWidget';
import BreadCrumb from '../Common/BreadCrumb';
import NeedHelp, { NeedHelpProps } from '../Common/NeedHelp';

interface Props {
    slug: string;
    extra_content: {
        title: string;
        subtitle: string
    };
}

export default function Blogs({
    data,
    NeedHelpComp,
    AllBlogsData,
}: {
    data: Props;
    NeedHelpComp: NeedHelpProps;
    AllBlogsData: BlogWidgetProps[];
}) {
    const t = useTranslations();

    const BreadCrumbList = [{ title: t("data.blog") }];

    return (
        <div>
            <div className="bg-Gray05 pt-10 pb-20 px-4">
                <div className="max-w-[1392px] mx-auto">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-2 max-w-[808px] mx-auto">
                        <BreadCrumb list={BreadCrumbList} />
                        <h1 className="text-primary md:text-[42px] font-semibold md:leading-[55px] text-[28px]">
                            {data.extra_content.title}
                        </h1>
                        <p className='md:text-xl text-base text-secondary text-center'>{data.extra_content.subtitle}</p>
                    </div>
                    <div className='flex flex-wrap gap-4 md:mt-[60px] mt-10'>
                        {AllBlogsData.map((item, index) => (
                            <div key={index} className='lg:w-[calc(100%/3-11px)] md:w-[calc(100%/2-8px)] w-full'>
                                <BlogWidget data={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <NeedHelp data={NeedHelpComp} />
        </div>
    );
}
