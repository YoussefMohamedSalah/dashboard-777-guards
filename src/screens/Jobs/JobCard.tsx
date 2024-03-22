import React, { useState } from "react";
import useApp from "hooks/useApp";
import { PAGES } from "constants/pages";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteModal from "components/Modals/DeleteModal";
import {
  GroupsOutlinedIcon,
  DeleteIcon,
  AccessTimeOutlinedIcon,
  EditOutlinedIcon,
  LocationOnIcon
} from "components/Icons/MuiIcons";
import { projectStatusBg } from "utils/ProjectsUtils";

interface Props {
  job: any;
  onDelete: (id: string) => void;
}

const JobCard = ({ job, onDelete }: Props) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const { push } = useApp();
  return (
    <div className="grey-bg container-fluid p-0 pb-1">
      <section id="projects">
        <div className="row ">
          <div className="col-xl-12 col-sm-6 col-12">
            <div className="card">
              <div className="card-content">
                {/*  */}
                <div className="card-body d-flex flex-column">
                  <div className="media row">
                    <div className="col-xl-5 col-12">
                      <div
                        className="d-flex gap-3 align-items-center pointer"
                        onClick={() => push("/" + PAGES.JOB_INFO + "/" + job.id)}>
                        <h3 className="primary">{job.title}</h3>
                        <span
                          className={`small ${projectStatusBg(job?.project_status!)} py-1 px-2 rounded align-self-start`}>
                          {job?.project_status! || ""}
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="d-flex gap-2 flex-wrap">
                        <Button
                          size="small"
                          variant="contained"
                          className="bg-primary text-white"
                          startIcon={<GroupsOutlinedIcon />}>
                          {job?.candidates?.length! || 0}
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          className="bg-secondary text-white"
                          startIcon={<LocationOnIcon />}>
                          {job?.location!}
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          className="bg-success text-white"
                          startIcon={<AccessTimeOutlinedIcon />}>
                          {job?.duration! || 0} Month
                        </Button>
                      </div>
                    </div>
                    <div className="col-xl-1 col-12 text-end">
                      <IconButton aria-label="delete" size="medium" color="error" onClick={() => setIsModal(true)}>
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        size="medium"
                        color="primary"
                        onClick={() => push("/" + PAGES.JOB + "/" + job.id)}>
                        <EditOutlinedIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  </div>
                  <div className="pb-2">
                    <h6 className="mb-0 mt-2">{job?.description!}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <DeleteModal
        show={isModal}
        onClose={() => setIsModal(false)}
        onDelete={() => {
          setIsModal(false);
          onDelete(job.id);
        }}
        message={`Are you sure you want to delete this job ?`}
        modalHeader={`Delete ${job.title}`}
      />
    </div>
  );
};

export default JobCard;
