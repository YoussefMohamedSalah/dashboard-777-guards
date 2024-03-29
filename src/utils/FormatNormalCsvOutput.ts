import { Candidate } from "types/Candidate";
import { ContactUs } from "types/ContactUs";

export const formatCandidateCsvOutput = (
  data: Candidate[],
): any[] => {
  if (!data || data.length === 0) return [];
  return formatCandidateData(data as Candidate[]);
};

function formatCandidateData(data: Candidate[]): any[] {
  if (!data || data.length === 0) return [];
  return [
    ["Name", "Submit Date", "Birthday", "Phone Number", "Email", "Address", "Resource", "Start Date", "Job"],
    ...data.map(({ name, date, birthday, phone_number, email, address, resource, start_date, job }) => [
      name || '',
      date,
      birthday || '',
      phone_number,
      email || "",
      address || "",
      resource || "",
      start_date || "",
      job?.title || ""
    ]),
  ];
}


export const formatContactUsCsvOutput = (
  data: ContactUs[],
): any[] => {
  if (!data || data.length === 0) return [];
  return formatContactUsData(data as ContactUs[]);
};

function formatContactUsData(data: ContactUs[]): any[] {
  if (!data || data.length === 0) return [];
  return [
    ["Full name", "Email", "Phone Number", "Subject", "Details", "Date"],
    ...data.map(({ full_name, email, phone_number, subject, info, createdAt }) => [
      full_name || '',
      email || '',
      phone_number || '',
      subject || '',
      info || "",
      createdAt || ""
    ]),
  ];
}