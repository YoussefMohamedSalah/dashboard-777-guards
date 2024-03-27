import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();


export const useUploadBanner = () => {
    return useMutation<any, Error, any>(async (updateInput) => {
        const { data } = await http.post(ROUTES.BANNERS + "777-guards", updateInput, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return { banner: { data: data as any } };
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["banners"]);
            },
        }
    );
};

export const addBannerInput = (banner: File): any => {
    const formData = new FormData();
    if (!banner) return formData;
    formData.append("banner", banner);
    return formData;
};