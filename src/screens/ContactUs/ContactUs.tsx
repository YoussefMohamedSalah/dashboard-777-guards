import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import TableActionBtn from "components/Common/TableActionBtn";
import { useDeleteContactUs } from "api/Contact/deleteContactUs";
import { ContactUs } from "types/ContactUs";
import ContactUsTable from "components/Common/ContactUsTable";
import { useContactUsQuery } from "api/Contact/getAllContactUs";

const ContactRequests: React.FC = () => {
  const { mutateAsync: deleteMutation } = useDeleteContactUs();
  const { data, error, isLoading } = useContactUsQuery({});
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  if (isLoading) return <Loading />;
  if (error) return null;

  let contact_us: ContactUs[] = data?.contact_us?.data! || ([] as ContactUs[]);

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
      name: "FULL NAME",
      selector: (row: any) => { },
      sortable: true,
      cell: (row: any) => (
        <span className="fw-bold text-secondary pointer">
          {row.full_name}
        </span>
      ),
    },
    {
      name: "EMAIL",
      selector: (row: any) => row.email,
      sortable: false,
    },
    {
      name: "PHONE NUMBER",
      selector: (row: any) => row.phone_number!,
      sortable: true,
    },
    {
      name: "subject",
      selector: (row: any) => row.subject!,
      sortable: true,
    },
    {
      name: "DETAILS",
      selector: (row: any) => row.info!,
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row: any) => row.createdAt!,
      sortable: true,
    },
    {
      name: "DELETE",
      width: "120px",
      selector: (row: any) => { },
      sortable: false,
      cell: (row: any) => (
        <TableActionBtn
          id={row.id!}
          title={"Contact Request"}
          onDelete={handleDelete}
          onClickEdit={() => push("/")}
        />
      ),
    },
  ];

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Contact Requests"}
          isBtnShow={false}
          isBackBtn={true}
        />
        {/* table data */}
        <div className="test">
          <ContactUsTable<ContactUs>
            title={"Contact Requests"}
            columns={columnT}
            data={contact_us}
            renderSearch={true}
            renderDownload={true}
            filterOptions={["name", "job", "date"]}
          />
        </div>
      </div>
    </>
  );
};

export default ContactRequests;
