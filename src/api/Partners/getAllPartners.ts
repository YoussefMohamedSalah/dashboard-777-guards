import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getAllPartners = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.PARTNERS);
  return { partners: { data: data as any } };
};

export const usePartnersQuery = (options: any) => {
  return useQuery<{ partners: { data: any } }, Error>([ROUTES.PARTNERS, options], getAllPartners);
};
