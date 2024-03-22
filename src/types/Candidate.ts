import { Job } from "./Job";

export interface Candidate {
    id: string;
    name: string;
    birthday: string;
    phone_number: string;
    email: string;
    address: string;
    resource: string;
    start_date: string;
    date: string;
    job: Job;
    createdAt: Date;
    updatedAt: Date;
};
