import axios from "axios";

const BASE_URL = "https://apolloniblom.awareness-profiling.com/api/properties";

interface Filters {
  locationIds?: number[];
  bedroomMin?: number;
  bedroomMax?: number;
  bathroomMin?: number;
  bathroomMax?: number;
  categoryIds?: number[];
  conditionIds?: number[];
  energyIds?: number[];
  code?: string;
  title?: string;
  isFeatured?: boolean;
  priceMin?: number;
  priceMax?: number;
  surfaceMin?: number;
  surfaceMax?: number;
  landMin?: number;
  landMax?: number;
  sort?: string;
  language?: string;
}

export async function fetchFilteredProperties(filters: Filters) {
  const params = new URLSearchParams();

  if (filters.locationIds?.length)
    params.append("filter[location_id]", filters.locationIds.join(","));

  if (filters.bedroomMin)
    params.append("filter[bedrooms][min]", String(filters.bedroomMin));

  if (filters.bedroomMax && filters.bedroomMax < 999999999)
    params.append("filter[bedrooms][max]", String(filters.bedroomMax));

  if (filters.bathroomMin)
    params.append("filter[bathrooms][min]", String(filters.bathroomMin));

  if (filters.bathroomMax && filters.bathroomMax < 999999999)
    params.append("filter[bathrooms][max]", String(filters.bathroomMax));

  if (filters.categoryIds?.length)
    params.append("filter[category_id]", filters.categoryIds.join(","));

  if (filters.conditionIds?.length)
    params.append("filter[condition_id]", filters.conditionIds.join(","));

  if (filters.energyIds?.length)
    params.append("filter[energy_id]", filters.energyIds.join(","));

  if (filters.priceMin)
    params.append("filter[price][min]", String(filters.priceMin));

  if (filters.priceMax && filters.priceMax < 99999999)
    params.append("filter[price][max]", String(filters.priceMax));

  if (filters.surfaceMin)
    params.append("filter[surface][min]", String(filters.surfaceMin));

  if (filters.surfaceMax && filters.surfaceMax < 99999999)
    params.append("filter[surface][max]", String(filters.surfaceMax));

  if (filters.landMin)
    params.append("filter[land][min]", String(filters.landMin));

  if (filters.landMax && filters.landMax < 999999999)
    params.append("filter[land][max]", String(filters.landMax));

  if (filters.code)
    params.append("filter[code]", filters.code);

  if (filters.title)
    params.append("filter[title]", filters.title);

  if (filters.isFeatured)
    params.append("filter[is_featured]", "1");

  if (filters.sort)
    params.append("sort", filters.sort);

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Language": filters.language || "en",
  };

  const response = await axios.get(`${BASE_URL}?${params.toString()}`, {
    headers,
  });

  return response.data;
}
