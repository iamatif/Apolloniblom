'use client';
import { useTranslations } from 'next-intl';
import NeedHelp, { NeedHelpProps } from '../Common/NeedHelp';
import BreadCrumb from '../Common/BreadCrumb';

interface Props {
  id: number,
  title: string,
  slug: string,
  content: string
}

export default function PrivacyPolicy({ data, NeedHelpComp }: { data: Props, NeedHelpComp: NeedHelpProps }) {
  const t = useTranslations();
  const BreadCrumbList = [
    {
      title: t(`data.${data.slug}`)
    }
  ]
  return (
    <div>
      <div className='py-20 bg-Gray90 '>
        <div className='max-w-[792px] mx-auto text-center space-y-1 flex flex-col items-center'>
          <BreadCrumb list={BreadCrumbList} light />
          <h1 className='text-Gold md:text-[58px] md:leading-[75px] text-[32px] font-semibold'>{t(`data.${data.slug}`)}</h1>
        </div>
      </div>
      <div className='max-w-[835px] md:py-20 py-10 md:px-8 px-4 mx-auto termscontent '>
        <div className='space-y-3' dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
      <NeedHelp data={NeedHelpComp} />
    </div >
  )
}
