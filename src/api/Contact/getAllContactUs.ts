import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const getAllContactUs = async ({ queryKey }: any) => {
  const { data } = await http.get(ROUTES.CONTACT_US);
  return { contact_us: { data: data as any } };
};

export const useContactUsQuery = (options: any) => {
  return useQuery<{ contact_us: { data: any } }, Error>([ROUTES.CONTACT_US, options], getAllContactUs);
};
