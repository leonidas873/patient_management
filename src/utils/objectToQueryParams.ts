export const objectToQueryParams = (
  params: Record<string, number | string>
): string => {
  return Object.entries(params)
    .filter(
      ([, value]) => value !== undefined && value !== null && value !== ''
    )
    .map(([key, value]) =>
      Array.isArray(value)
        ? value
            .map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`)
            .join('&')
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');
};
