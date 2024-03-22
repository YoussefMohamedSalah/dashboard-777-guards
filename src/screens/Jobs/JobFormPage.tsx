import PageHeader from "components/Common/PageHeader";
import Button from "components/UI/Button";
import FormInputs from "components/UI/FormInputs/FormInputs";
import Loading from "components/UI/Loading";
import { PAGES } from "constants/pages";
import { useUI } from "contexts/UIContext";
import useApp from "hooks/useApp";
import { useEffect, useState } from "react";
import { IField } from "types/Forms/formFields";
import { handleServerError } from "utils/HandlingServerError";
import { jonInput, useCreateJob } from "api/Jobs/createJob";
import { jobUpdateInput, useUpdateJob } from "api/Jobs/updateJob";
import { useJobDetailsQuery } from "api/Jobs/getJobDetails";
import { Job } from "types/Job";

interface Props {
  id?: string;
}

export enum JobKeys {
  TITLE = "title",
  DESCRIPTION = "description",
  SHIFT = "shift",
  EXPERIENCE = "experience",
  EDUCATION = "education",
  SKILLS = "skills",
  SALARY = "salary",
  LOCATION = "location",
  DURATION = "duration",
  COUNT = "count"
}


const JobFormPage = ({ id }: Props) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(id ? true : false);
  // -----
  const [modelData, setModelData] = useState<Job>({} as Job);
  // -----
  const { mutateAsync: createMutation } = useCreateJob();
  const { mutateAsync: updateMutation } = useUpdateJob();
  // -----
  const { showError, showSuccess } = useUI();
  const { push } = useApp();

  const { data: jobData, error: jobError, isLoading: jobIsLoading } = useJobDetailsQuery({ id });

  // !Check if this is CREATE OR EDIT Modal
  useEffect(() => {
    if (!initialized) {
      if (id) setIsEdit(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // !Assuming this is CREATE Modal
  useEffect(() => {
    if (!isEdit) {
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // !Assuming this is EDIT Modal
  useEffect(() => {
    if (!initialized && jobData) {
      let job: Job = jobData?.job?.data!;
      setModelData({ ...job });
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobData]);

  if ((id && jobIsLoading)) return <Loading />;
  if ((id && jobError)) return null;

  const handleModelData = (key: string, value: any) => {
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const formFields: IField[] = [
    {
      label: "Job Title",
      type: "text",
      width: "col-md-3",
      key: JobKeys.TITLE,
      value: modelData?.title,
      onChange: (value: string) => handleModelData(JobKeys.TITLE, value),
      placeholder: "Enter Job Title",
      required: true,
    },
    {
      label: "Shift",
      width: "col-md-3",
      type: "number",
      key: JobKeys.SHIFT,
      value: modelData?.shift!,
      onChange: (value: string) => handleModelData(JobKeys.SHIFT, value),
      required: true,
    },
    {
      label: "Required experience",
      width: "col-md-3",
      type: "number",
      key: JobKeys.EXPERIENCE,
      value: modelData?.experience!,
      onChange: (value: string) => handleModelData(JobKeys.EXPERIENCE, value),
      required: true,
    },
    {
      label: "Education",
      width: "col-md-3",
      type: "text",
      key: JobKeys.EDUCATION,
      value: modelData?.education!,
      onChange: (value: string) => handleModelData(JobKeys.EDUCATION, value),
      required: true,
    },
    {
      label: "Skills",
      width: "col-md-3",
      type: "text",
      key: JobKeys.SKILLS,
      value: modelData?.skills!,
      onChange: (value: string) => handleModelData(JobKeys.SKILLS, value),
      required: true,
    },
    {
      label: "Salary",
      width: "col-md-3",
      type: "text",
      key: JobKeys.SALARY,
      value: modelData?.salary!,
      onChange: (value: string) => handleModelData(JobKeys.SALARY, value),
      required: true,
    },
    {
      label: "Location",
      width: "col-md-3",
      type: "text",
      key: JobKeys.LOCATION,
      value: modelData?.location!,
      onChange: (value: string) => handleModelData(JobKeys.LOCATION, value),
      required: true,
    },
    {
      label: "Duration",
      width: "col-md-3",
      type: "number",
      key: JobKeys.DURATION,
      value: modelData?.duration!,
      onChange: (value: string) => handleModelData(JobKeys.DURATION, value),
      required: true,
    },
    {
      label: "Count",
      width: "col-md-3",
      type: "number",
      key: JobKeys.COUNT,
      value: modelData?.count!,
      onChange: (value: string) => handleModelData(JobKeys.COUNT, value),
      required: true,
    },
    {
      type: "textarea",
      label: "Project Description",
      key: JobKeys.DESCRIPTION,
      value: modelData?.description,
      onChange: (value: string) => handleModelData(JobKeys.DESCRIPTION, value),
      placeholder: "Enter Description",
    }
  ];

  // MAIN ACTIONS
  const handleCreate = async () => {
    try {
      let createInput = jonInput(modelData);
      await createMutation(createInput);
      // push("/" + PAGES.JOBS);
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  const handleEdit = async () => {
    try {
      let createInput = jobUpdateInput(modelData);
      await updateMutation({
        id: modelData.id,
        data: createInput,
      });
      showSuccess();
      push("/" + PAGES.JOBS);
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  if (!initialized) return <></>;
  return (
    <div className="container-xxl">
      <PageHeader headerTitle={""} isBtnShow={false} btnText={""} isBackBtn={true} />
      <div className="row g-3 pb-3 pb-xl-0">
        <div>
          <FormInputs formFields={formFields} grid={true} block={true} />
        </div>
        <div className="col-sm d-flex align-items-center justify-content-center gap-2">
          {isEdit && (
            <>
              <Button
                className="lift"
                content="Cancel"
                onClick={() => push("/" + PAGES.JOBS)}
                variant="secondary"
              />
            </>
          )}
          {isEdit ? (
            <>
              <Button className="lift" content="Edit" onClick={handleEdit} />
            </>
          ) : (
            <>
              <Button className="lift" content="Create" onClick={handleCreate} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobFormPage;
