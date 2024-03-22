export function filterData(data: any[], selectedTerm: string, searchValue: string): any[] {
  let filtered = data?.filter((row) => {
    if (selectedTerm === "name") {
      if (row.name!) return row?.name?.toLowerCase()!.includes(searchValue?.toLowerCase()!);
      if (row.user?.name!) return row?.user?.name?.toLowerCase()!.includes(searchValue?.toLowerCase()!);
    }
    if (selectedTerm === "job") {
      if (row.job?.title!) return row?.job?.title?.toLowerCase()!.includes(searchValue?.toLowerCase()!);
    }
    if (selectedTerm === "date") return row?.date?.toLowerCase()!.includes(searchValue?.toLowerCase()!);
    return true;
  });
  return filtered;
}
