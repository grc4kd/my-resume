import { Firestore } from "firebase-admin/firestore";
import { EXPERIENCES } from "../../my-resume-app/src/data/mock-experiences";
import { WEBLINK } from "../../my-resume-app/src/data/mockWebLinks";

export async function webLinksAddData(db: Firestore) {
  const webLinksRef = db.collection("web-links");

  try {
      await webLinksRef.doc("github").set(WEBLINK);
  } catch(err) {
    console.error(`Error writing web links: ${err}`)
  }

  return webLinksRef.id;
}

export async function experiencesAddData(db: Firestore) {
  const batch = db.batch();

  EXPERIENCES.forEach((experience) => {
    const experienceRef = db
      .collection("experiences")
      .doc(
        `${experience.startDate}_${experience.endDate}_${experience.company
          ?.toLowerCase()
          .replace(" ", "-")}_${experience.title
          ?.toLowerCase()
          .replace(" ", "-")}`
      );

    batch.set(experienceRef, experience);
  });

  await batch.commit();
}
