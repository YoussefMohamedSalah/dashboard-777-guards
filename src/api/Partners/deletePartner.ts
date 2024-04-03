import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useDeletePartner = () => {
  return useMutation<any, Error, string>(async (id) => {
    const { data } = await http.delete(ROUTES.PARTNERS + id);
    return { data: { data: data as any } };
  });
};
