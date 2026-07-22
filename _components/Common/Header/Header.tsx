import React from 'react'
import DesktopHeader from './DesktopHeader'
import { getServerSideProps } from '@/_components/api/general'

export default async function Header({ locale }: { locale: string }) {
  const data = await getServerSideProps("components/header", locale)

  return (
    <header>
      <DesktopHeader data={data.props.data.data.extra_content} />
      {/* <DesktopHeader data={data?.props?.data?.data?.extra_content || {}} /> */}
    </header>
  )
}
