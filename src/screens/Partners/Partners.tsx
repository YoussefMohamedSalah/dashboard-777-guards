import React from "react";
import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import { useState } from "react";
import FormInputs from "components/UI/FormInputs/FormInputs";
import { IField } from "types/Forms/formFields";
import Button from "components/UI/Button";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Partner } from "types/Partner";
import { partnerInput, useCreatePartner } from "api/Partners/createPartner";
import { useDeletePartner } from "api/Partners/deletePartner";
import { usePartnersQuery } from "api/Partners/getAllPartners";
import { getImageUrl } from "utils/Helpers";

interface FileProps {
    name: string;
    url: string;
};

export enum PartnersKeys {
    NAME = "name",
    ADDRESS = "address",
    LOGO = "logo"
}

const Partners: React.FC = () => {
    const [modelData, setModelData] = useState<Partner>({} as Partner);
    const [uploadedLogo, setUploadedLogo] = useState<File>({} as File)
    const { mutateAsync: deleteMutation } = useDeletePartner();
    const { mutateAsync: uploadMutation } = useCreatePartner();
    const { data, error, isLoading } = usePartnersQuery({});
    const { showError, showSuccess } = useUI();


    if (isLoading) return <Loading />;
    if (error) return null;

    let partners: Partner[] = data?.partners?.data! || ([] as Partner[]);


    const handleDelete = async (name: string) => {
        try {
            await deleteMutation(name);
            showSuccess();
        } catch (err: any) {
            showError(handleServerError(err.response));
        }
    };

    const handleModelData = (key: string, value: any) => {
        setModelData({
            ...modelData,
            [key]: value,
        });
    };

    const formFields: IField[] = [
        {
            label: "Partner name",
            width: "col-md-4",
            type: "text",
            key: PartnersKeys.NAME,
            value: modelData?.name!,
            onChange: (value: string) => handleModelData(PartnersKeys.NAME, value),
        },
        {
            label: "Partner address",
            width: "col-md-8",
            type: "text",
            key: PartnersKeys.ADDRESS,
            value: modelData?.address!,
            onChange: (value: string) => handleModelData(PartnersKeys.ADDRESS, value),
        },
        {
            label: "Partner Logo",
            width: "col-md-12",
            type: "file",
            key: "",
            value: modelData.logo,
            onChange: (e: any) => {
                let logo: File = e.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(logo);
                reader.onload = (url) => {
                    setUploadedLogo(logo)
                    handleModelData(PartnersKeys.LOGO, logo);
                };
            },
            placeholder: "upload Partner logo",
        }
    ];

    const handleSubmit = async () => {
        try {
            let uploadInput = partnerInput(modelData);
            await uploadMutation(uploadInput);
            showSuccess();
        } catch (err: any) {
            showError(handleServerError(err.response));
        }
    };


    return (
        <div className="container-xxl">
            <PageHeader headerTitle={"Partners"} isBtnShow={false} btnText={""} />
            <div className="row g-3 pb-3 pb-xl-0">
                <div>
                    <FormInputs formFields={formFields} grid={true} block={true} />
                </div>
                <div className="col-sm d-flex flex-column align-items-center justify-content-center gap-2">
                    <>
                        <Button className="lift" content="Upload" onClick={handleSubmit} />
                        {uploadedLogo && uploadedLogo.name && (
                            <img src={URL.createObjectURL(uploadedLogo)} alt="Uploaded Logo" />
                        )}
                    </>
                </div>
                <div>
                    <CardGroup>
                        {partners.map((partner: Partner, index: number) => {
                            return (
                                <div key={index} className="col-lg-2 col-md-3 col-sm-6 mb-4">
                                    <Card className="p-2 m-1">
                                        <Card.Img variant="top" src={getImageUrl(partner.logo.url)} />
                                        <Card.Body>
                                            <Card.Title className="align-self-center">
                                                {partner.name}
                                            </Card.Title>
                                            <Card.Text>{partner.address}</Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <div className="d-flex align-items-center justify-content-center">
                                                <button className="btn btn-primary p-2" onClick={() => handleDelete(partner.id)}>Delete</button>
                                            </div>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            )
                        })}
                    </CardGroup>
                </div>
            </div>
        </div>
    );
};

export default Partners;
