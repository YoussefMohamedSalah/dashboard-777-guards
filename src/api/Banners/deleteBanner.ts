import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useDeleteBanner = () => {
  return useMutation<any, Error, string>(async (name) => {
    const { data } = await http.delete(ROUTES.BANNERS + "777-guards/" + name);
    return { data: { data: data as any } };
  });
};
