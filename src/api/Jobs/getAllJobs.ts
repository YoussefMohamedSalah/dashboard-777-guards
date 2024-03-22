import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getAllJobs = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.JOBS);
  return { jobs: { data: data as any } };
};

export const useJobsQuery = (options: any) => {
  return useQuery<{ jobs: { data: any } }, Error>([ROUTES.JOBS, options], getAllJobs);
};
