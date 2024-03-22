import PageHeader from "components/Common/PageHeader";
import Loading from "components/UI/Loading";
import { PAGES } from "constants/pages";
import useApp from "hooks/useApp";
import { useJobDetailsQuery } from "api/Jobs/getJobDetails";
import { Job } from "types/Job";

interface Props {
  id: string;
}

const ProjectDetails = ({ id }: Props) => {
  const { push } = useApp();

  const { data, error, isLoading } = useJobDetailsQuery({ id });
  if (id && isLoading) return <Loading />;
  if (id && error) return null;
  let job: Job = data?.job.data! || ({} as Job);


  return (
    <>
      <div className="container-fluid">
        {/* page header */}
        <PageHeader
          headerTitle={`${job.title!} Details`}
          isBtnShow={true}
          isBackBtn={true}
          btnText={"Edit"}
          onClickBtn={() => push("/" + PAGES.JOB + "/" + job.id)}
        />
        {/* Project Details */}
        <div className="row clearfix g-3">
          <div className="col-sm-12">
            {/*  */}
            <div className="row g-3">
              <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                <div className="row g-3 mb-3">
                  <div className={`col-md-4`}>
                    {/* <SmallCard
                      title={"Customer"}
                      value={getShortString(job.customer_details?.name!, 42)}
                      iconClass={"icofont-user-alt-1 fs-2"}
                      onClick={() => push("/" + PAGES.CUSTOMER_INFO + "/" + job.customer_details?.id!)}
                    /> */}
                  </div>
                  <div className={`col-md-4`}>
                    {/* <SmallCard
                      title={"Manager"}
                      value={getShortString(job.manager?.name!, 42)}
                      iconClass={"icofont-user-alt-1 fs-2"}
                      onClick={() => push("/" + PAGES.EMPLOYEE_INFO + "/" + job.manager?.id!)}
                    /> */}
                  </div>
                  <div className={`col-md-4`}>
                    {/* <SmallCard
                      title={"Total Expenses"}
                      value={`${totalProjectExpenses(job).toFixed(2)} SAR`}
                      iconClass={"icofont-riyal fs-2"}
                    /> */}
                  </div>
                  {/* {data.map((item, index: number) => {
                    return (
                      <div className={`col-md-3`} key={index}>
                        <SmallCard
                          title={`${item.label} Expenses`}
                          value={`${Number(item.value).toFixed(2)} SAR`}
                          iconClass={"icofont-riyal fs-2"}
                          onClick={() => console.log("")}
                        />
                      </div>
                    );
                  })} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <ProjectCharts
          projectName={job.name!}
          projectExpensesData={data}
          totalExpenses={`${totalProjectExpenses(job).toFixed(2)} SAR`}
          projectProgressData={projectProgress}
          totalProgress={`${job.total_progress_percentage} %`}
        /> */}
      </div>
    </>
  );
};

export default ProjectDetails;
