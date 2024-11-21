import { Firestore } from "firebase-admin/firestore";
import { EXPERIENCES } from "../../my-resume-app/src/data/mock-experiences";
import { WEBLINK } from "../../my-resume-app/src/data/mockWebLinks";

export async function webLinksAddData(db: Firestore) {
  const webLinksRef = db.collection("web-links");

  try {
    await webLinksRef.doc("github").set(WEBLINK);
  } catch (err) {
    console.error(`Error writing web links: ${err}`);
  }

  return webLinksRef.id;
}

export async function experiencesAddData(db: Firestore) {
  const batch = db.batch();

  EXPERIENCES.forEach((experience) => {
    const startDateRef = transformDate(new Date(experience.startDate));
    const endDateRef = transformDate(new Date(experience.endDate));
    const companyRef = experience.company?.toLowerCase().replace(' ', '-');
    const titleRef = experience.title?.toLowerCase().replace(' ', '-');

    const experienceRef = db
      .collection("experiences")
      .doc(`${startDateRef}_${endDateRef}_${companyRef}_${titleRef}`);

    batch.set(experienceRef, experience);
  });

  await batch.commit();

  function transformDate(date: Date): string {
    // replace all / symbols with an underscore for Firebase collection ID
    return date.toLocaleDateString("en-US").replace(/\//g,"_");
  }
}
