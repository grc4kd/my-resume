import { Timestamp } from "firebase/firestore";
import { ExperienceDetail } from "./experience-detail";

export interface Experience {
    author_uid: string;
    title: string;
    description: string;
    company?: string;
    startDate?: Timestamp;
    endDate?: Timestamp;
    detail: ExperienceDetail;
}