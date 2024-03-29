import { PAGES } from "constants/pages";
import { lazy } from "react";
import Banners from "screens/Banners/Banners";
import JobDetails from "screens/Jobs/JobDetails";
import JobFormPage from "screens/Jobs/JobFormPage";
import Jobs from "screens/Jobs/Jobs";

const Dashboard = lazy(() => import("../screens/Dashboard/Dashboard"));
const Candidates = lazy(() => import("../screens/Candidates/Candidates"));
const ContactUs = lazy(() => import("../screens/ContactUs/ContactUs"));
const CandidateDetails = lazy(() => import("../screens/Candidates/CandidateDetails"));

export interface PagesRenderProps {
  slug: string | null;
  id?: string;
}

export const PagesRender = ({ slug, id }: PagesRenderProps): React.ReactNode => {
  if (id) {
    switch (slug) {
      case PAGES.JOB_INFO:
        return <JobDetails id={id} />;
      case PAGES.JOB:
        return <JobFormPage id={id} />;
      case PAGES.CANDIDATE_INFO:
        return <CandidateDetails id={id} />;
      case PAGES.CONTACT_US:
        return <ContactUs />;
    }
  } else
    switch (slug) {
      case PAGES.JOBS:
        return <Jobs />;
      case PAGES.JOB:
        return <JobFormPage />;
      case PAGES.CANDIDATES:
        return <Candidates />;
      case PAGES.CONTACT_US:
        return <ContactUs />;
      case PAGES.BANNERS:
        return <Banners />;
      default:
        return <Dashboard />;
    }
};
