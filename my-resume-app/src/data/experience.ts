import { Timestamp } from "firebase/firestore";

export interface Experience {
    id: string,
    title: string,
    description: string,
    company: string;
    startDate: Timestamp;
    endDate: Timestamp;
}