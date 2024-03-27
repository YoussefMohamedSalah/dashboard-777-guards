import Loading from "components/UI/Loading";
import PageHeader from "components/Common/PageHeader";
import { useUI } from "contexts/UIContext";
import { handleServerError } from "utils/HandlingServerError";
import { useBannersQuery } from "api/Banners/getAllBanners";
import { useDeleteBanner } from "api/Banners/deleteBanner";
import { useState } from "react";
import FormInputs from "components/UI/FormInputs/FormInputs";
import { IField } from "types/Forms/formFields";
import Button from "components/UI/Button";
import { addBannerInput, useUploadBanner } from "api/Banners/uploadBanner";
import { getImageUrl } from "utils/Helpers";

interface FileProps {
    name: string;
    url: string;
};

const Banners: React.FC = () => {
    const { mutateAsync: deleteMutation } = useDeleteBanner();
    const { mutateAsync: uploadMutation } = useUploadBanner();

    const { data, error, isLoading } = useBannersQuery({ identifier: "777-guards" });
    const [banner, setBanner] = useState<File>({} as File);
    const { showError, showSuccess } = useUI();

    if (isLoading) return <Loading />;
    if (error) return null;

    let banners: FileProps[] = data?.banners?.data! || ([] as FileProps[]);

    const handleModelData = (value: any) => {
        setBanner(value);
    };

    const handleDelete = async (name: string) => {
        try {
            await deleteMutation(name);
            showSuccess();
        } catch (err: any) {
            showError(handleServerError(err.response));
        }
    };

    const formFields: IField[] = [
        {
            label: "Main banner",
            width: "col-md-12",
            type: "file",
            key: "",
            value: banner,
            onChange: (e: any) => {
                let banner: File = e.target.files[0];
                let reader = new FileReader();
                reader.readAsDataURL(banner);
                reader.onload = (url) => {
                    handleModelData(banner);
                };
            },
            placeholder: "upload banner",
        }
    ];

    const handleSubmit = async () => {
        try {
            let uploadInput = addBannerInput(banner);
            await uploadMutation(uploadInput);
            showSuccess();
        } catch (err: any) {
            showError(handleServerError(err.response));
        }
    };

    return (
        <div className="container-xxl">
            <PageHeader headerTitle={"Banners"} isBtnShow={false} btnText={""} />
            <div className="row g-3 pb-3 pb-xl-0">
                <div>
                    <FormInputs formFields={formFields} grid={true} block={true} />
                </div>
                <div className="col-sm d-flex align-items-center justify-content-center gap-2">
                    <>
                        <Button className="lift" content="Upload" onClick={handleSubmit} />
                    </>
                </div>
                <div>
                    {banners.map((banner: FileProps, index: number) => {
                        console.log(getImageUrl(banner.url))
                        return (
                            <div key={index} className="container w-100 py-3">
                                {/* <img src={getImageUrl(banner.url)} alt="Lights" /> */}
                                <section id="header" className="jumbotron text-end" style={{ minHeight: "50vh", background: `url(${getImageUrl(banner.url)}) center center / contain no-repeat` }}>
                                    <button className="btn btn-primary p-2" onClick={() => handleDelete(banner.name)}>DELETE</button>
                                </section>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Banners;
