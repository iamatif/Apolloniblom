'use client'
import { motion } from "framer-motion";
import Minus from "../SVGs/Minus";
import Plus from "../SVGs/Plus";




export interface QuestionProps {
    question: string,
    answer: string,
    categories?: {
        name: string
    }[]
}
interface SingleFaqProps {
    Singlefaq: QuestionProps;
    index: number;
    openfaq: number | null;
    Lastone: boolean;
    handleClick: (index: number) => void;
}

export default function SingleFaq({
    Singlefaq,
    index,
    openfaq,
    Lastone,
    handleClick,
}: SingleFaqProps) {


    return (

        <div className={`${Lastone ? "" : "md:pb-6 pb-5 border-b border-black2 "}`}
            onClick={() => handleClick(index)}

        >
            <h3 className={` md:text-lg text-sm font-medium flex justify-between items-center gap-2 cursor-pointer`}>
                <p className="w-[calc(100%-24px-8px)] text-pretty">
                    {Singlefaq.question}
                </p>
                <span className="text-Gold w-6 h-6">
                    {openfaq === index ?
                        <Minus />
                        :
                        <Plus />
                    }
                </span>

            </h3>
            <motion.div
                initial={false}
                animate={openfaq === index ? { height: "auto" } : { height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={` text-secondary md:text-base text-xs overflow-hidden`}
            >
                <div dangerouslySetInnerHTML={{ __html: Singlefaq.answer }}
                    className="pt-2"
                />
            </motion.div>

        </div>
    );
}
