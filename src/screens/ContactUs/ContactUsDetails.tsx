import { useCandidateQuery } from "api/Candidates/getCandidateDetails";
import PageHeader from "components/Common/PageHeader";
import UserDetailsCard from "./ContactUsCard";
import Loading from "components/UI/Loading";

interface Props {
  id?: string;
}

const CandidateDetails = ({ id }: Props) => {
  const { isLoading, error, data } = useCandidateQuery({ id });
  let candidate: any = data?.candidate?.data! || {};
  if (isLoading) return <Loading />;
  if (error) return null;
  return (
    <div>
      <div className="container-xxl">
        <PageHeader headerTitle="Candidate Profile" isBackBtn={true} />
        <div className="row align-item-center row-deck g-3 mb-3">
          <div>
            <UserDetailsCard user={candidate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetails;
