import { Metadata } from "next";

// export const ImageURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/`

export async function getServerSideProps(endpoint: string, lang: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${endpoint}`, {
    method: 'GET',
    headers: {
      'accept': 'application-json',
      'Content-Language': lang
    },
  });

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export async function getSEOMetadata(
  endPoint: string,
  lang: string
): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/${endPoint}/seo`, {
      method: 'GET',
      headers: {
        'accept': 'application-json',
        'Content-Language': lang
      },
    });
    if (!res.ok) {
      console.error(`getSEOMetadata: Failed with status ${res.status}`);
      throw new Error("Failed to fetch SEO metadata");
    }

    const json = await res.json();
    const realData = json.data;

    if (!realData) {
      return {
        title: "AjilPay",
        description: "AjilPay",
      };
    }

    return {
      title: realData.seo_title ?? "Ajilpay",
      description: realData.seo_description,
      keywords: realData.seo_keywords[0],
      openGraph: {
        title: realData.seo_title ?? "Ajilpay",
        description: realData.seo_description,
        images: [
          {
            url: realData.og_image ?? "",
          },
        ],
      },
    };
  } catch (error) {
    console.error("getSEOMetadata error:", error);
    return {
      title: "AjilPay",
      description: "The page not found",
    };
  }
}
