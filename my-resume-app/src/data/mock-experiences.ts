import { Timestamp } from "firebase/firestore";
import { Experience } from "./experience";

export const EXPERIENCES: Experience[] = [
    {
        company: "Mastco",
        description: `A person who designs and creates software to produce a desired output by composing programs from 
        existing libraries and programming languages, often resulting in the creation of new computer source code.`,
        endDate: Timestamp.fromDate(new Date(2001, 11, 31)),
        id: 'delivery_driver_20010101_20011231',
        startDate: Timestamp.fromDate(new Date(2001, 0, 1)),
        title: "Software Developer",
    },
    {
        company: "Knuckles' Fast Stop",
        description: `A person who prepares food by applying heat to and measuring the temperature of ingredients and 
        assembles them into a complete meal item as part of a regular assembly line process.`,
        endDate: Timestamp.fromDate(new Date(2002, 11, 31)),
        id: 'line_cook_20020101_20021231',
        startDate: Timestamp.fromDate(new Date(2002, 0, 1)),
        title: "Line Cook",
    },
    {
        company: "RJ's Executive Courier",
        description: `A person who receives and delivers various physical packages and parcels from one location
        to another using an accelerated mode of transport such as an automobile or mail coach.`,
        endDate: Timestamp.fromDate(new Date(2003, 5, 31)),
        id: 'delivery_driver_20030101_20030431',
        startDate: Timestamp.fromDate(new Date(2003, 0, 1)),
        title: "Delivery Driver",
    }
];

