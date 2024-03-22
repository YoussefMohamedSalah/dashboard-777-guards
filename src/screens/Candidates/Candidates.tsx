import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import NormalTable from "components/Common/NormalTable";
import TableActionBtn from "components/Common/TableActionBtn";
import { useDeleteCandidate } from "api/Candidates/deleteCandidate";
import { useCandidatesQuery } from "api/Candidates/getAllCandidates";
import { Candidate } from "types/Candidate";

const Candidates: React.FC = () => {
  const { mutateAsync: deleteMutation } = useDeleteCandidate();
  const { data, error, isLoading } = useCandidatesQuery({});
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  if (isLoading) return <Loading />;
  if (error) return null;

  let candidates: Candidate[] = data?.candidates?.data! || ([] as Candidate[]);

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation(id);
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  let columnT: any[] = [
    {
      name: "NAME",
      selector: (row: any) => { },
      sortable: true,
      cell: (row: any) => (
        <span onClick={() => push(`/${PAGES.CANDIDATE_INFO}/${row.id}`)} className="fw-bold text-secondary pointer">
          {row.name}
        </span>
      ),
    },
    {
      name: "Birthday",
      selector: (row: any) => row.birthday!,
      sortable: true,
    },
    {
      name: "PHONE NUMBER",
      selector: (row: any) => row.phone_number!,
      sortable: true,
    },
    {
      name: "EMAIL",
      selector: (row: any) => row.email,
      sortable: false,
    },
    {
      name: "ADDRESS",
      selector: (row: any) => row.address!,
      sortable: true,
    },
    {
      name: "START DATE",
      selector: (row: any) => row.start_date!,
      sortable: true,
    },
    {
      name: "JOB",
      selector: (row: any) => row.job?.title!,
      sortable: true,
    },
    {
      name: "SUBMIT DATE",
      selector: (row: any) => row.date!,
      sortable: true,
    },
    {
      name: "ACTION",
      width: "120px",
      selector: (row: any) => { },
      sortable: false,
      cell: (row: any) => (
        <TableActionBtn
          id={row.id!}
          title={row.name!}
          onDelete={handleDelete}
          onClickEdit={() => push("/" + PAGES.CANDIDATE + "/" + row?.id!)}
        />
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Candidates"}
          isBtnShow={false}
          isBackBtn={true}
        />
        {/* table data */}
        <div className="test">
          <NormalTable<Candidate>
            title={"Candidates"}
            columns={columnT}
            data={candidates}
            renderSearch={true}
            renderDownload={true}
            filterOptions={["name", "job", "date"]}
          />
        </div>
      </div>
    </>
  );
};

export default Candidates;
