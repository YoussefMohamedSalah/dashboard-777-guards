import { Candidate } from "types/Candidate";

interface Props {
  user: Candidate;
}

interface DataArrayType {
  iconClass: string;
  label: string;
  value: any;
}

const UserDetailsCard: React.FC<Props> = ({ user }) => {
  const {
    // avatar,
    name,
    birthday,
    phone_number,
    email,
    address,
    createdAt,
    job,
    date,
    start_date,
  } = user;

  const dataArr: DataArrayType[] = [
    { iconClass: "", label: "Email:", value: email },
    { iconClass: "", label: "Birthday:", value: birthday },
    { iconClass: "", label: "Phone number:", value: phone_number },
    { iconClass: "", label: "Start Date:", value: start_date },
    { iconClass: "", label: "Submit Date:", value: date },
    { iconClass: "", label: "Job:", value: job?.title! },
    { iconClass: "", label: "Address:", value: address },
    { iconClass: "", label: "Submit Date:", value: new Date(createdAt).toLocaleDateString() },
  ];
  return (
    <>
      <div className="card teacher-card mb-3">
        <div className="card-body d-flex teacher-fullDetail">
          <div className="teacher-info ps-xl-4 ps-md-4 ps-sm-4 ps-4 w-100 d-flex flex-column justify-content-evenly">
            <div>
              <h6 className="mb-0 mt-2 fw-bold d-block fs-5">{name}</h6>
              <div className="row g-2 pt-2">
                {dataArr.map((term, index: number) => {
                  return (
                    <div key={index} className="col-xl-5">
                      <div className="d-flex align-items-center">
                        <i className={`${term.iconClass}`} />
                        <span className="ms-2 fs-6 text-muted fw-bold">
                          {term.label} : <span className="text-secondary">{term.value}</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailsCard;
