export const getFiltersFromURL = (
  searchParams: URLSearchParams
): Record<string, string> => Object.fromEntries(searchParams.entries());

export const updateSearchParams = (
  filters: Record<string, string>
): URLSearchParams => new URLSearchParams(filters as Record<string, string>);
