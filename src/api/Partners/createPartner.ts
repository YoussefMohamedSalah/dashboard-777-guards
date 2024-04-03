import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Partner } from "types/Partner";
import { http } from "utils/Http";

export const useCreatePartner = () => {
  return useMutation<any, Error, any>(async (createInput) => {
    const { data } = await http.post(ROUTES.PARTNERS, createInput, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { partner: { data: data as any } };
  });
};

export const partnerInput = (data: Partner): any => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("address", data.address);
  if (!data.logo) return formData;
  formData.append("logo", data.logo);
  return formData;
};
