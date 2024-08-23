/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Coordinates */
export interface Coordinates {
  /**
   * Location longitude
   * Location longitude in degrees (decimal point is "."). Positive means east, negative west.
   * @min -180
   * @max 180
   * @example 14.42212
   */
  lon: number;
  /**
   * Location latitude
   * Location latitude in degrees (decimal point is "."). Positive means north, negative south.
   * @min -90
   * @max 90
   * @example 50.08861
   */
  lat: number;
}

/**
 * GeocodeEntityType
 * An enumeration.
 */
export enum GeocodeEntityType {
  Regional = "regional",
  RegionalCountry = "regional.country",
  RegionalRegion = "regional.region",
  RegionalMunicipality = "regional.municipality",
  RegionalMunicipalityPart = "regional.municipality_part",
  RegionalStreet = "regional.street",
  RegionalAddress = "regional.address",
  Poi = "poi",
  Coordinate = "coordinate",
}

/**
 * GeocodeResult
 * Ordered list of matching geographical entities
 * @example {"items":[{"name":"Týnská ulička 610/7","label":"Adresa","position":{"lon":14.42212,"lat":50.08861},"type":"regional.address","location":"Praha 1 - Staré Město, Česko","regionalStructure":[{"name":"610/7","type":"regional.address"},{"name":"Týnská ulička","type":"regional.street"},{"name":"Staré město 1","type":"regional.municipality_part"},{"name":"Praha 1","type":"regional.municipality_part"},{"name":"Praha","type":"regional.municipality"},{"name":"Okres Hlavní město Praha","type":"regional.region"},{"name":"Hlavní město Praha","type":"regional.region"},{"name":"Česko","type":"regional.country","isoCode":"CZ"}],"zip":"15000"}],"locality":[{"Brno":"BOX(16.428,49.1099,16.7278,49.2944)"},{"Praha":"BOX(14.2244,49.9419,14.7068,50.1774)"}]}
 */
export interface GeocodeResult {
  /** Items */
  items: GeocodeResultEntity[];
  /**
   * Locality
   * Bboxes for localities used in param `locality`
   * @default []
   */
  locality?: object[];
}

/** GeocodeResultEntity */
export interface GeocodeResultEntity {
  /**
   * Name
   * @example "Praha"
   */
  name: string;
  /**
   * Label
   * @example "Hlavní město"
   */
  label: string;
  position: Coordinates;
  /** @example "poi" */
  type: GeocodeEntityType;
  /**
   * Location
   * Short label for locality of resolved entity
   * @example "Praha 1 - Staré Město, Česko"
   */
  location?: string;
  /**
   * Regionalstructure
   * Ordered list of parent administrative entities (smallest first).
   * @minItems 1
   */
  regionalStructure: RegionalEntity[];
  /**
   * Zip
   * Postal code, available only in some areas and only for entity type `reg_address`)
   */
  zip?: string;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/**
 * Language
 * An enumeration.
 */
export enum Language {
  Cs = "cs",
  De = "de",
  El = "el",
  En = "en",
  Es = "es",
  Fr = "fr",
  It = "it",
  Nl = "nl",
  Pl = "pl",
  Pt = "pt",
  Ru = "ru",
  Sk = "sk",
  Tr = "tr",
  Uk = "uk",
}

/** RegionalEntity */
export interface RegionalEntity {
  /** Name */
  name: string;
  /** An enumeration. */
  type: GeocodeEntityType;
  /**
   * Isocode
   * Iso code by ISO 3166-1 alpha-2, only for regional.country
   */
  isoCode?: string;
}

/**
 * RgeoEntityType
 * An enumeration.
 */
export enum RgeoEntityType {
  Regional = "regional",
  RegionalCountry = "regional.country",
  RegionalRegion = "regional.region",
  RegionalMunicipality = "regional.municipality",
  RegionalMunicipalityPart = "regional.municipality_part",
  RegionalStreet = "regional.street",
  RegionalAddress = "regional.address",
}

/**
 * RgeocodeResult
 * @example {"items":[{"name":"Týnská ulička 610/7","label":"Adresa","position":{"lon":14.42212,"lat":50.08861},"type":"regional.address","location":"Praha 1 - Staré Město, Česko","regionalStructure":[{"name":"610/7","type":"regional.address"},{"name":"Týnská ulička","type":"regional.street"},{"name":"Staré město 1","type":"regional.municipality_part"},{"name":"Praha 1","type":"regional.municipality_part"},{"name":"Praha","type":"regional.municipality"},{"name":"Okres Hlavní město Praha","type":"regional.region"},{"name":"Hlavní město Praha","type":"regional.region"},{"name":"Česko","type":"regional.country","isoCode":"CZ"}],"zip":"15000"}]}
 */
export interface RgeocodeResult {
  /** Items */
  items: RgeocodeResultEntity[];
  /**
   * Location Boxes
   * @default {}
   */
  location_boxes?: Record<string, number[]>;
}

/** RgeocodeResultEntity */
export interface RgeocodeResultEntity {
  /**
   * Name
   * @example "Praha"
   */
  name: string;
  /**
   * Label
   * @example "Hlavní město"
   */
  label: string;
  position: Coordinates;
  /** @example "regional.municipality" */
  type: RgeoEntityType;
  /**
   * Location
   * Short label for locality of resolved entity
   * @example "Praha 1 - Staré Město, Česko"
   */
  location?: string;
  /**
   * Regionalstructure
   * Ordered list of parent administrative entities (smallest first).
   * @minItems 1
   */
  regionalStructure: RegionalEntity[];
  /**
   * Zip
   * Postal code, available only in some areas and only for entity type `reg_address`)
   */
  zip?: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api.mapy.cz/";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key]
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title REST API Mapy.cz geocoding methods
 * @version 1.0.0
 * @baseUrl https://api.mapy.cz/
 *
 * Get coordinates and location for given geographic entity (e.g. address, city, WGS coordinates)
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * @description Reverse geocode - get regional entities for given location coordinates. Rate limit is 200 requests per second per API key.
     *
     * @tags geocoding
     * @name ApiRgeocodeV1RgeocodeGet
     * @summary Get regional entities for coordinates
     * @request GET:/v1/rgeocode
     * @secure
     */
    apiRgeocodeV1RgeocodeGet: (
      query: {
        /**
         * Location longitude
         * Location longitude in degrees (decimal point is "."). Positive means east, negative west.
         * @min -180
         * @max 180
         * @example 14.42212
         */
        lon: number;
        /**
         * Location latitude
         * Location latitude in degrees (decimal point is "."). Positive means north, negative south.
         * @min -90
         * @max 90
         * @example 50.08861
         */
        lat: number;
        /**
         * Preferred language for result entity names
         * @default "cs"
         */
        lang?: Language;
      },
      params: RequestParams = {}
    ) =>
      this.request<RgeocodeResult, HTTPValidationError | void>({
        path: `/v1/rgeocode`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Obtains coordinates and additional information (like surrounding regional structure) based on textual location query (addresses, streets, cities, ...). Rate limit is 100 requests per second per API key
     *
     * @tags geocoding
     * @name ApiGeocodeV1GeocodeGet
     * @summary Find entities for given search query
     * @request GET:/v1/geocode
     * @secure
     */
    apiGeocodeV1GeocodeGet: (
      query?: {
        /**
         * Query
         * Geographic entity name or coordinates to resolve.
         * @default ""
         * @example "Praha"
         */
        query?: string;
        /**
         * Preferred language for result entity names
         * @default "cs"
         */
        lang?: Language;
        /**
         * Limit
         * Maximum number of results (default 5, upper limit 15)
         * @exclusiveMax 16
         * @default 5
         */
        limit?: number;
        /**
         * Return selected entity types only
         * @default ["regional","poi"]
         */
        type?: GeocodeEntityType[];
        /**
         * Locality
         * Return results only from these localities.
         * It may be in form of comma-separated locality names (e. g. `Praha 5`, `Lhota u Kolína`), country codes (cz, gb, us, ...)
         * or rectangles `BOX({minLon},{minLat},{maxLon},{maxLat})` or a mix of them.
         * Location names (except country codes) are internally converted to bounding boxes,
         * so using box arguments is preferred to avoid ambiguities - resolved boxes for locality names are returned in response
         * (or "Not found!" for unknown localities) to help with this. On the other hand, country codes are preferred over their
         * bounding boxes, because they allow precise filtering and avoid ege-cases near the date-line.
         * @pattern BOX\(([+-]?\d*(.\d*)?,){3}[+-]?\d*(.\d*)?\)|^(?!BOX\().*
         */
        locality?: string[];
        /**
         * Preferbbox
         * Prefer results from this box (not a filter). Conflicts with `near`. If neither `box` nor `near` is specified, defaults to Czech Republic. Format `{minLon},{minLat},{maxLon},{maxLat}`
         * @maxItems 4
         * @minItems 4
         */
        preferBBox?: number[];
        /**
         * Prefernear
         * Prefer results near this position (not a filter). Conflicts with `box`. If neither `box` nor `near` is specified, defaults to Czech Republic. Format `{lon}, {lat}`
         * @maxItems 2
         * @minItems 2
         */
        preferNear?: number[];
        /**
         * Prefernearprecision
         * Precision of parameter `near` in meters (use to prefer results from a circle)
         * @min 0
         */
        preferNearPrecision?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GeocodeResult, HTTPValidationError>({
        path: `/v1/geocode`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Suggest works similarly to geocoding, but it accounts for incomplete queries, so it can be used to suggest matching entities while user is writing the location query. Rate limit is 100 requests per second per API key
     *
     * @tags geocoding
     * @name ApiSuggestV1SuggestGet
     * @summary Suggest entities while typing a query
     * @request GET:/v1/suggest
     * @secure
     */
    apiSuggestV1SuggestGet: (
      query?: {
        /**
         * Query
         * Geographic entity name or coordinates to resolve.
         * @default ""
         * @example "Praha"
         */
        query?: string;
        /**
         * Preferred language for result entity names
         * @default "cs"
         */
        lang?: Language;
        /**
         * Limit
         * Maximum number of results (default 5, upper limit 15)
         * @exclusiveMax 16
         * @default 5
         */
        limit?: number;
        /**
         * Return selected entity types only
         * @default ["regional","poi"]
         */
        type?: GeocodeEntityType[];
        /**
         * Locality
         * Return results only from these localities.
         * It may be in form of comma-separated locality names (e. g. `Praha 5`, `Lhota u Kolína`), country codes (cz, gb, us, ...)
         * or rectangles `BOX({minLon},{minLat},{maxLon},{maxLat})` or a mix of them.
         * Location names (except country codes) are internally converted to bounding boxes,
         * so using box arguments is preferred to avoid ambiguities - resolved boxes for locality names are returned in response
         * (or "Not found!" for unknown localities) to help with this. On the other hand, country codes are preferred over their
         * bounding boxes, because they allow precise filtering and avoid ege-cases near the date-line.
         * @pattern BOX\(([+-]?\d*(.\d*)?,){3}[+-]?\d*(.\d*)?\)|^(?!BOX\().*
         */
        locality?: string[];
        /**
         * Preferbbox
         * Prefer results from this box (not a filter). Conflicts with `near`. If neither `box` nor `near` is specified, defaults to Czech Republic. Format `{minLon},{minLat},{maxLon},{maxLat}`
         * @maxItems 4
         * @minItems 4
         */
        preferBBox?: number[];
        /**
         * Prefernear
         * Prefer results near this position (not a filter). Conflicts with `box`. If neither `box` nor `near` is specified, defaults to Czech Republic. Format `{lon}, {lat}`
         * @maxItems 2
         * @minItems 2
         */
        preferNear?: number[];
        /**
         * Prefernearprecision
         * Precision of parameter `near` in meters (use to prefer results from a circle)
         * @min 0
         */
        preferNearPrecision?: number;
      },
      params: RequestParams = {}
    ) =>
      this.request<GeocodeResult, HTTPValidationError>({
        path: `/v1/suggest`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
