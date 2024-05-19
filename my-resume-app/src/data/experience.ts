import { Timestamp } from "firebase/firestore";
import { ExperienceDetail } from "./experience-detail";

export interface Experience {
    title: string;
    description: string;
    company: string | null;
    startDate: Timestamp | null;
    endDate: Timestamp | null;
    detail: ExperienceDetail;
}