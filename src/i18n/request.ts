import { getRequestConfig } from 'next-intl/server';
import acceptLanguage from 'accept-language';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
  acceptLanguage.languages(['en-US', 'ja']);
  const headerMap = await headers();
  const language = acceptLanguage.get(headerMap.get('Accept-Language'));
  const locale = language?.split('-')[0];

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
