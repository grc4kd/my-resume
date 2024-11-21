import { ExperienceDetail } from "./experience-detail";

export interface Experience {
    author_uid: string;
    title: string;
    description: string;
    company: string;
    startDate: string;
    endDate: string;
    detail: ExperienceDetail;
}