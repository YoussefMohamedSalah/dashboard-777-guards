import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { http } from "utils/Http";

export const useUpdateJob = () => {
  return useMutation<any, Error, any>(async (updateInput) => {
    const { data } = await http.put(ROUTES.JOBS + updateInput.id, updateInput.data);
    return { job: { data: data as any } };
  });
};

export const jobUpdateInput = (data: any): any => {
  return {
    title: data.title,
    description: data.description,
    shift: data.shift,
    experience: data.experience,
    education: data.education,
    skills: data.skills,
    salary: data.salary,
    location: data.location,
    duration: data.duration,
    count: data.count,
  } as any;
};
