'use client'
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import BreadCrumb from '../Common/BreadCrumb';
import NeedHelp, { NeedHelpProps } from '../Common/NeedHelp';
import SingleFaq, { QuestionProps } from '../Common/SingleFaq';

interface Props {
    slug: string;
    extra_content: {
        title: string;
    };
}

export default function Faqs({
    data,
    NeedHelpComp,
    AllFaqsData,
}: {
    data: Props;
    NeedHelpComp: NeedHelpProps;
    AllFaqsData: QuestionProps[];
}) {
    const [openfaq, setOpenfaq] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const t = useTranslations();
    // ✅ Collect unique category names
    const uniqueCategoryNamesSet = new Set<string>();
    AllFaqsData?.forEach((item) => {
        item?.categories?.forEach((cat) => {
            if (cat?.name) uniqueCategoryNamesSet.add(cat.name);
        });
    });

    const categories = ['all', ...Array.from(uniqueCategoryNamesSet)];

    const filteredFAQs =
        selectedCategory === 'all'
            ? AllFaqsData
            : AllFaqsData.filter((item) =>
                item?.categories?.some((cat) => cat?.name === selectedCategory)
            );

    const handleClick = (index: number) => {
        setOpenfaq(index === openfaq ? null : index);
    };

    const BreadCrumbList = [{ title: data.extra_content.title }];

    return (
        <div>
            <div className="bg-Gray05 pt-10 pb-20 px-4">
                <div className="max-w-[1000px] mx-auto">
                    {/* Header */}
                    <div className="flex flex-col items-center gap-2">
                        <BreadCrumb list={BreadCrumbList} />
                        <h1 className="text-primary md:text-[42px] font-semibold md:leading-[55px] text-[28px] md:text-start text-center">
                            {data.extra_content.title}
                        </h1>
                    </div>
                    <div className=' flex lg:justify-center -mx-4 px-4 noScrollBar overflow-x-scroll whitespace-nowrap'>
                        <div className="flex gap-4  md:mt-12 mt-8">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    style={{ boxShadow: selectedCategory === cat ? `0px 1px 4px 0px #00000026` : "none" }}
                                    className={`px-5 py-2 w-fit text-center rounded-md transition-all duration-300
                                    ${selectedCategory === cat
                                            ? 'bg-white text-primary font-medium pointer-events-none'
                                            : 'bg-Gray10 text-secondary'
                                        }`}
                                >
                                    {cat === 'all' ? t("data.all_faqs") : cat}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* FAQ List */}
                    <div className="space-y-8 md:mt-[60px] mt-8">
                        {filteredFAQs.map((item, index) => (
                            <SingleFaq
                                Singlefaq={item}
                                openfaq={openfaq}
                                Lastone={AllFaqsData.length - 1 === index}
                                handleClick={handleClick}
                                key={index}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <NeedHelp data={NeedHelpComp} />
        </div>
    );
}
