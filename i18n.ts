import { getRequestConfig } from 'next-intl/server';
import { unstable_setRequestLocale } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // Use `await requestLocale` and provide a default value
  const locale = (await requestLocale) || 'en'; // Default to 'en' if undefined

  // Set the locale for the request
  unstable_setRequestLocale(locale);

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    locale,
  };
});