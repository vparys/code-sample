import { type RegionKey, regionList } from "@/src/constants/geo";
import { logErrorDebounced } from "@/src/services/logging/honeybadger/logger";
import type {
  GeocodeResult,
  GeocodeResultEntity,
} from "@/src/services/mapycz/types/geocode";
import type { IFormattedSuggestion } from "@/src/types/interfaces";
import { fetchWithQueryParams } from "@/src/utils/fetching/fetchWithQueryParams";

export async function getFormattedMapSuggestions(
  query: string
): Promise<IFormattedSuggestion[] | null> {
  const suggestions = await getMapSuggestions(query);

  if (!suggestions) {
    return null;
  }

  return suggestions.map((suggestion: GeocodeResultEntity) => {
    const { regionalStructure, position, zip } = suggestion;
    let street = "";
    let address = "";
    let city = "";
    let region: RegionKey | undefined = undefined;

    for (const regionalProperty of regionalStructure) {
      switch (regionalProperty.type) {
        case "regional.municipality":
          city = regionalProperty.name;
          break;
        case "regional.region":
          // mapycz for some reason returns both "okres" and "kraj" under same key
          if (regionalProperty.name.toLowerCase().includes("kraj")) {
            const regionResult = findRegionKey(regionalProperty.name);
            if (regionResult) {
              region = regionResult;
            }
          }
          break;
        case "regional.street":
          street = regionalProperty.name;
          break;
        case "regional.address":
          address = regionalProperty.name;
          break;
        default:
          break;
      }
    }
    if (!region) {
      throw new Error("Mapy.cz API did not return region");
    }

    return {
      label: `${suggestion.name} ${suggestion.location}`,
      streetAddress: `${street} ${address}`.trim(),
      city,
      region,
      ...position,
      zip,
    };
  });
}

function findRegionKey(region: string): RegionKey | undefined {
  return regionList.find((r) => r.mapyCzKey === region)?.key;
}

async function getMapSuggestions(
  query: string
): Promise<GeocodeResultEntity[] | null> {
  try {
    if (!process.env.NEXT_PUBLIC_MAPYCZ_API_KEY) {
      throw new Error("Mapy.cz API key is not set");
    }
    const response = await fetchWithQueryParams(
      "https://api.mapy.cz/v1/suggest",
      {
        query,
        lang: "cs",
        apikey: process.env.NEXT_PUBLIC_MAPYCZ_API_KEY,
        limit: "5",
        locality: "cz",
        type: "regional.address",
      }
    );
    const suggestions: GeocodeResult = await response.json();

    return suggestions.items;
  } catch (error) {
    logErrorDebounced(error, "error fetching map suggestions");
    return null;
  }
}
