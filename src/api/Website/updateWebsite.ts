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
    facebook: data.facebook,
    instagram: data.instagram,
    tiktok: data.tiktok,
  } as Website;
  // if (!data.logo?.size) {
  // }

  // const formData = new FormData();
  // formData.append("name", data?.name!);
  // formData.append("email", data?.email!);
  // formData.append("land_line", `${data?.land_line!}`);
  // formData.append("phone_number_1", `${data?.phone_number_1!}`);
  // formData.append("phone_number_2", `${data?.phone_number_2!}`);
  // formData.append("facebook", `${data?.facebook!}`);
  // formData.append("instagram", `${data?.instagram!}`);
  // formData.append("tiktok", `${data?.tiktok!}`);
  // if (!data.logo) return formData;
  // formData.append("thumbnail", data.logo);
  // return formData;
};
