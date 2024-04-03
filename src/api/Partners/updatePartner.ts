import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useUpdatePartner = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { data } = await http.put(ROUTES.PARTNERS + updateInput.id, updateInput.data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return { partner: { data: data as any } };
  });
};

export const partnerUpdateInput = (data: any): any => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("address", data.address);
  if (!data.logo) return formData;
  formData.append("logo", data.logo);
  return formData;
};
