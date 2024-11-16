import { Timestamp } from 'firebase/firestore';
import { Experience } from './experience';

export const EXPERIENCES: Experience[] = [
  {
    company: 'Mastco',
    description:
      'A person who designs and creates software to produce a desired output by composing programs from ' +
      'existing libraries and programming languages, often resulting in the creation of new computer source code.',
    endDate: Timestamp.fromMillis(Date.parse('2001-12-31T00:00:00.000-06:00')),
    startDate: Timestamp.fromMillis(
      Date.parse('2001-01-01T00:00:00.000-06:00')
    ),
    title: 'Software Developer',
    detail: {
      title: 'Software Developer Detail',
      subtitle: 'Full-Stack Developer',
      description:
        'A full-stack developer is a type of software developer that has deep understanding of both front and back-end systems.',
    },
  },
  {
    company: "Sam's Fast Stop",
    description:
      'A person who prepares food by applying heat to and measuring the temperature of ingredients and ' +
      'assembles them into a complete meal item as part of a regular assembly line process.',
    endDate: Timestamp.fromMillis(Date.parse('2002-12-31T00:00:00-06:00')),
    startDate: Timestamp.fromMillis(
      Date.parse('2002-01-01T00:00:00.000-06:00')
    ),
    title: 'Line Cook',
    detail: {
      description: [
        'grill',
        'fryer',
        'fridge',
        'freezer',
        'bathrooms',
        'salads',
        'make',
        'expeditite',
        'steamer',
        'stock-out',
        'clean',
      ],
      subtitle: "Don't forget to wash your hands!",
      title: 'Responsibilities',
    },
  },
  {
    company: "RJ's Executive Courier",
    description:
      'A person who delivers various packages from one location to another using an accelerated mode of transport.',
    endDate: Timestamp.fromMillis(Date.parse('2003-05-31T00:00:00.000-05:00')),
    startDate: Timestamp.fromMillis(
      Date.parse('2003-01-01T00:00:00.000-06:00')
    ),
    title: 'Delivery Driver',
    detail: {
      description: [
        'Picking up packages',
        'Delivering packages',
        'Filling out delivery log',
        'Getting signature if possible and endorsing if not available',
        'Coordinating with housekeeping at delivery point',
        'Contacting dispatch',
      ],
      title: 'Courier Job Description',
      subtitle: '',
    },
  },
  {
    company: 'Acme Corporation',
    description: 'Software Engineer',
    endDate: Timestamp.fromMillis(Date.parse('2004-12-31T00:00:00.000-06:00')),
    startDate: Timestamp.fromMillis(
      Date.parse('2004-01-01T00:00:00.000-06:00')
    ),
    title: 'Software Engineer',
    detail: {
      description: [
        'Developed and maintained a web application using Python and JavaScript.',
        'Collaborated with cross-functional teams to deliver high-quality software.',
        'Presented technical solutions to stakeholders and clients.',
      ],
      title: 'Software Engineer Detail',
      subtitle: 'HR / Business Software',
    },
  },
  {
    company: 'TechCorp Solutions',
    description: 'Software Engineer',
    endDate: Timestamp.fromDate(new Date('2023-01-01')),
    startDate: Timestamp.fromDate(new Date('2023-06-01')),
    title: 'Senior Java Programmer',
    detail: {
      description: [
        'Developed and maintained complex software applications',
        'Collaborated with cross-functional teams to deliver high-quality solutions',
        'Implemented new features and enhancements',
        'Resolved technical issues and ensured smooth operation',
      ],
      title: 'Details',
      subtitle: 'Lead Engineer',
    },
  },
];
