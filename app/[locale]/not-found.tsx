import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";




export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <div className=" py-20 px-4 bg-Gray90">
      <div className="relative w-[246px] h-[217px] mx-auto">
        <Image
          src={'/Match-not-found.png'}
          alt="Match-not-found"
          fill
        />
      </div>
      <h1 className="text-Gold text-[180px] font-semibold text-center">404</h1>
      <p className="text-white text-center text-lg font-medium">{t("notfoundPage.title")}</p>
      <Link href={`${locale === "en" ? "/" : "/ar"}`} className="bg-Gold text-white block rounded-full text-center mt-8 w-[338px] mx-auto py-3 text-base font-light">
        {t("notfoundPage.button_text")}
      </Link>
    </div>
  );
}
