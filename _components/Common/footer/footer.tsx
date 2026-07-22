import { getServerSideProps } from '@/_components/api/general'
import MainFooter from './MainFooter'

export default async function Footer({ locale }: { locale: string }) {
  const data = await getServerSideProps("components/footer", locale)

  return (
    <footer>
      {/* <MainFooter data={data?.props?.data?.data?.extra_content || {}} /> */}
      <MainFooter data={data.props.data.data.extra_content} />
      <div className='bg-Gray80 py-2 px-4'>
        <p className='text-Gray60 text-center text-sm'>© 2025 Apolloniblom . All Right Reserved</p>
      </div>
    </footer>
  )
}
