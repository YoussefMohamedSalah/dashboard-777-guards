import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Job } from "types/Job";
import { http } from "utils/Http";

export const getCandidateDetails = async ({ queryKey }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, _params] = queryKey;
  if (_params.id) {
    const { data } = await http.get(ROUTES.CANDIDATES + _params.id);
    return { candidate: { data: data as Job } };
  }
  return null;
};

export const useCandidateQuery = (options: any) => {
  return useQuery([ROUTES.CANDIDATES, options], getCandidateDetails);
};
