import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Website } from "types/Website";
import { http } from "utils/Http";

export const getWebsiteDetails = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  if (_params.identifier) {
    const { data } = await http.get(ROUTES.WEBSITE + _params.identifier);
    return { website: { data: data as Website } };
  }
  return null;
};

export const useWebsiteDetailsQuery = (options: any) => {
  return useQuery([ROUTES.WEBSITE, options], getWebsiteDetails);
};
