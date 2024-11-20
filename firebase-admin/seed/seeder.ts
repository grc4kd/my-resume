import { Firestore } from "firebase-admin/firestore";
import { experiencesAddData, webLinksAddData } from "./addData";

export class Seeder {
  public constructor(private db: Firestore) {}

  public async PopulateDatabase(): Promise<void> {
    await webLinksAddData(this.db);
    await experiencesAddData(this.db);
  }
}
