import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getAllBanners = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.BANNERS + "777-guards");
  return { banners: { data: data as any } };

};

export const useBannersQuery = (options: any) => {
  return useQuery({ queryKey: ["banners"], queryFn: getAllBanners });
};
