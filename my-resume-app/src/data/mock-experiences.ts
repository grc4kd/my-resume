import { Timestamp } from "firebase/firestore";
import { Experience } from "./experience";
import { ExperienceDetail } from "./experience-detail";

export const EXPERIENCES: Experience[] = [
    {
        company: "Mastco",
        description: `A person who designs and creates software to produce a desired output by composing programs from 
        existing libraries and programming languages, often resulting in the creation of new computer source code.`,
        endDate: Timestamp.fromDate(new Date(2001, 11, 31)),
        startDate: Timestamp.fromDate(new Date(2001, 0, 1)),
        title: "Software Developer",
        detail: {
            title: "Software Developer Detail",
            subtitle: "Full-Stack Developer",
            description: `A full-stack developer is a type of software developer that specializes in broad knowledge about 
            multiple software layers. This type of developer can typically be found delving deeply into a few subjects at a 
            time, while also prioritizing total business value above specific implementation details. However, this doesn't 
            mean that they aren't aware of the risks and benefits of clean code. On the contrary, sometimes their most 
            pressing responsibility is deciding where to expend the most effort and discipline.`
        }
    },
    {
        company: "Knuckles' Fast Stop",
        description: `A person who prepares food by applying heat to and measuring the temperature of ingredients and 
        assembles them into a complete meal item as part of a regular assembly line process.`,
        endDate: Timestamp.fromDate(new Date(2002, 11, 31)),
        startDate: Timestamp.fromDate(new Date(2002, 0, 1)),
        title: "Line Cook",
        detail: {} as ExperienceDetail
    },
    {
        company: "RJ's Executive Courier",
        description: `A person who receives and delivers various physical packages and parcels from one location
        to another using an accelerated mode of transport such as an automobile or mail coach.`,
        endDate: Timestamp.fromDate(new Date(2003, 5, 31)),
        startDate: Timestamp.fromDate(new Date(2003, 0, 1)),
        title: "Delivery Driver",
        detail: {} as ExperienceDetail
    }
];

