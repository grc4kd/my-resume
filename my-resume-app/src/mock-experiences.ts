import { Experience } from "./experience";

export const EXPERIENCES: Experience[] = [
    {
        title: "Software Developer",
        description: `A person who designs and creates software to produce a desired output by composing programs from 
        existing libraries and programming languages, often resulting in the creation of new computer source code.`,
        company: "Mastco",
        startDate: new Date(2001, 0, 1),
        endDate: new Date(2001, 11, 31)
    },
    {
        title: "Line Cook",
        description: `A person who prepares food by applying heat to and measuring the temperature of ingredients and 
        assembles them into a complete meal item as part of a regular assembly line process.`,
        company: "Knuckles' Fast Stop",
        startDate: new Date(2002, 0, 1),
        endDate: new Date(2002, 11, 31)
    },
    {
        title: "Delivery Driver",
        description: `A person who receives and delivers various physical packages and parcels from one location
        to another using an accelerated mode of transport such as an automobile or mail coach.`,
        company: "RJ's Executive Courier",
        startDate: new Date(2003, 0, 1),
        endDate: new Date(2003, 5, 31)
    }
];

