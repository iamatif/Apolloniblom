import React from 'react'
import NeedHelp, { NeedHelpProps } from '../Common/NeedHelp'
import PagesHero from '../Common/PagesHero'
import Steps, { StepsProps } from '../Common/Achievements'
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
                text: string,
                link: string
            }
        },
        journey: StepsProps

    }

}

export default function PurchasingProcess({ data, NeedHelpComp }: { data: Props, NeedHelpComp: NeedHelpProps }) {
    return (
        <div>
            <PagesHero data={data.extra_content.hero} slug={data.slug} />
            <Steps data={data.extra_content.journey} />
            <NeedHelp data={NeedHelpComp} />
        </div>
    )
}
