import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getAllCandidates = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.CANDIDATES);
  return { candidates: { data: data as any } };
};

export const useCandidatesQuery = (options: any) => {
  return useQuery<{ candidates: { data: any } }, Error>([ROUTES.CANDIDATES, options], getAllCandidates);
};
