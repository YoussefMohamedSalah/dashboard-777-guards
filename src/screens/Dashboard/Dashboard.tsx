import { IField } from "types/Forms/formFields";
import { useEffect, useState } from "react";
import PageHeader from "components/Common/PageHeader";
import FormInputs from "components/UI/FormInputs/FormInputs";
import Button from "components/UI/Button";
import { handleServerError } from "utils/HandlingServerError";
import { useUI } from "contexts/UIContext";
import { useWebsiteDetailsQuery } from "api/Website/getWebsiteDetails";
import Loading from "components/UI/Loading";
import { Website } from "types/Website";
import { useUpdateWebsite, WebsiteUpdateInput } from "api/Website/updateWebsite";


export enum WebsiteKeys {
  NAME = "name",
  DESCRIPTION = "description",
  LAND_LINE = "land_line",
  PHONE_NUMBER_1 = "phone_number_1",
  PHONE_NUMBER_2 = "phone_number_2",
  WHATSAPP_NUMBER = "whatsapp_number",
  AR_ADDRESS = "ar_address",
  EN_ADDRESS = "en_address",
  EMAIL = "email",
  FACEBOOK = "facebook",
  INSTAGRAM = "instagram",
  LINKEDIN = "linkedin",
}

const Dashboard: React.FC = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const [modelData, setModelData] = useState<Website>({} as Website);
  const { showError, showSuccess } = useUI();

  const { mutateAsync: updateMutation } = useUpdateWebsite();
  const { data, error, isLoading } = useWebsiteDetailsQuery({ identifier: "777-guards" });

  useEffect(() => {
    if (!initialized && data) {
      let website: Website = data?.website?.data!;
      setModelData({ ...website });
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (error) return null;
  if (isLoading) return <Loading />;

  const handleModelData = (key: string, value: any) => {
    setModelData({
      ...modelData,
      [key]: value,
    });
  };

  const formFields: IField[] = [
    {
      label: "Email",
      width: "col-md-4",
      type: "text",
      key: WebsiteKeys.EMAIL,
      value: modelData?.email!,
      onChange: (value: string) => handleModelData(WebsiteKeys.EMAIL, value),
    },
    {
      label: "Land line",
      width: "col-md-2",
      type: "text",
      key: WebsiteKeys.LAND_LINE,
      value: modelData?.land_line!,
      onChange: (value: string) => handleModelData(WebsiteKeys.LAND_LINE, value),
    },
    {
      label: "1# Phone number",
      width: "col-md-2",
      type: "text",
      key: WebsiteKeys.PHONE_NUMBER_1,
      value: modelData?.phone_number_1!,
      onChange: (value: string) => handleModelData(WebsiteKeys.PHONE_NUMBER_1, value),
    },
    {
      label: "2# Phone number",
      width: "col-md-2",
      type: "text",
      key: WebsiteKeys.PHONE_NUMBER_2,
      value: modelData?.phone_number_2!,
      onChange: (value: string) => handleModelData(WebsiteKeys.PHONE_NUMBER_2, value),
    },
    {
      label: "Whatsapp number",
      width: "col-md-2",
      type: "text",
      key: WebsiteKeys.WHATSAPP_NUMBER,
      value: modelData?.whatsapp_number!,
      onChange: (value: string) => handleModelData(WebsiteKeys.WHATSAPP_NUMBER, value),
    },
    {
      label: "Arabic Address",
      type: "text",
      width: "col-md-12",
      key: WebsiteKeys.AR_ADDRESS,
      value: modelData?.ar_address,
      onChange: (value: string) => handleModelData(WebsiteKeys.AR_ADDRESS, value),
    },
    {
      label: "English Address",
      type: "text",
      width: "col-md-12",
      key: WebsiteKeys.EN_ADDRESS,
      value: modelData?.en_address,
      onChange: (value: string) => handleModelData(WebsiteKeys.EN_ADDRESS, value),
    },
    {
      label: "Facebook",
      width: "col-md-4",
      type: "text",
      key: WebsiteKeys.FACEBOOK,
      value: modelData?.facebook!,
      onChange: (value: string) => handleModelData(WebsiteKeys.FACEBOOK, value),
    },
    {
      label: "Instagram",
      width: "col-md-4",
      type: "text",
      key: WebsiteKeys.INSTAGRAM,
      value: modelData?.instagram!,
      onChange: (value: string) => handleModelData(WebsiteKeys.INSTAGRAM, value),
    },
    {
      label: "Linkedin",
      width: "col-md-4",
      type: "text",
      key: WebsiteKeys.LINKEDIN,
      value: modelData?.linkedin!,
      onChange: (value: string) => handleModelData(WebsiteKeys.LINKEDIN, value),
    }
  ];


  const handleSubmit = async () => {
    try {
      let updateInput = WebsiteUpdateInput(modelData);
      await updateMutation(updateInput);
      showSuccess();
    } catch (err: any) {
      showError(handleServerError(err.response));
    }
  };

  return (
    <div className="container-xxl">
      <PageHeader headerTitle={"Website Main Info"} isBtnShow={false} btnText={""} />
      <div className="row g-3 pb-3 pb-xl-0">
        <div>
          <FormInputs formFields={formFields} grid={true} block={true} />
        </div>
        <div className="col-sm d-flex align-items-center justify-content-center gap-2">
          <>
            <Button className="lift" content="Submit" onClick={handleSubmit} />
          </>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
