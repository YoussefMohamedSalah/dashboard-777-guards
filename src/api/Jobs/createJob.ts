import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "constants/routes";
import { Job } from "types/Job";
import { http } from "utils/Http";

export const useCreateJob = () => {
  return useMutation<any, Error, any>(async (createInput) => {
    console.log(createInput)
    const { data } = await http.post(ROUTES.JOBS, createInput);
    return { job: { data: data as any } };
  });
};

export const jonInput = (data: Job): any => {
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
