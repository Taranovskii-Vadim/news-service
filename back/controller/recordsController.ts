import { db } from "../db";
import { records } from "../test/records";

export class RecordsController {
  async all() {
    try {
      //   TODO: postgres наевся и спит, косяк с паролем позже глянуть
      //   const ans = await db.query("SELECT * FROM records");
      const result = [...records];
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}
