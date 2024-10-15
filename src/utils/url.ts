export const paramsToQueryString = (params: Record<string, string>): string => {
  return Object.entries(params)
    .reduce<string[]>((prev, [key, value]) => [...prev, `${key}=${value}`], [])
    .join('&');
};

export const queryStringToParams = (query: string): Record<string, string> => {
  return query.split('&').reduce((agg, param) => {
    const entry = param.split('=');
    return {
      ...agg,
      [entry[0]]: entry[1]
    };
  }, {});
};
