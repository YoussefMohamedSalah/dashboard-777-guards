import { Candidate } from "types/Candidate";

export const formatNormalCsvOutput = (
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