import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Website } from "types/Website";
import { http } from "utils/Http";

export const useUpdateWebsite = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { data } = await http.put(ROUTES.WEBSITE + "777-guards", { ...updateInput });
    return { website: { data: data as any } };
  });
};

export const WebsiteUpdateInput = (data: Website): any => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    land_line: data.land_line,
    phone_number_1: data.phone_number_1,
    phone_number_2: data.phone_number_2,
    en_address: data.en_address,
    ar_address: data.ar_address,
    facebook: data.facebook,
    instagram: data.instagram,
    linkedin: data.linkedin,
  } as Website;
};
