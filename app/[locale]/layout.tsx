import { NextIntlClientProvider, createTranslator } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import "../globals.css";
import Header from "@/_components/Common/Header/Header";
import Footer from "@/_components/Common/footer/footer";

type Props = {
  children: ReactNode;
  params: { locale: string };
};
async function getMessages(locale: string): Promise<Record<string, string>> {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
    return {}; // Fallback to avoid TS errors
  }
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params; // Ensure params is accessed correctly
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });

  return {
    title: t("home.title"),
    meta: [
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
    ],
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
export default async function RootLayout({ children, params }: Props) {
  const { locale } = params;
  const messages = await getMessages(locale);
  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <head>
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${locale}`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
