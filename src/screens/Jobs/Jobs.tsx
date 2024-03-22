import { useEffect, useState } from "react";
import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import { useDeleteJob } from "api/Jobs/deleteJob";
import { useJobsQuery } from "api/Jobs/getAllJobs";
import JobCard from "./JobCard";

const Projects: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const { mutateAsync: deleteMutation } = useDeleteJob();
  const { data, error, isLoading } = useJobsQuery({});
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  useEffect(() => {
    if (data && data.jobs && data.jobs.data) {
      setJobs(data.jobs.data);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (error) return null;

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation(id);
      showSuccess();
      setJobs((prevProjects) => prevProjects.filter((project) => project.id !== id));
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={"Jobs"}
          isBtnShow={true}
          btnText={"Create Job"}
          onClickBtn={() => push("/" + PAGES.JOB)}
        />
        {/* table data */}
        <div className="test">
          {jobs.map((job: any) => (
            <div key={job.id}>
              <JobCard job={job} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
