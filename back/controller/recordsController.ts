import { Request } from "express";
import { db } from "../db";
import { records } from "../test/records";

export class RecordsController {
  async all() {
    try {
      const dbResponse = await db.query("SELECT * FROM records");
      // TODO: временный костыль, нужно найти как делать populate в postgre
      const dbRecords = dbResponse.rows.map(async item => {
        const userResponse = await db.query(
          "SELECT * FROM users where id = $1",
          [item.authorId]
        );

        return {
          ...item,
          authorEmail: userResponse.rows[0].email,
        };
      });
      //////////////////////////////////////
      return records.concat(await Promise.all(dbRecords));
    } catch (e) {
      console.log(e);
    }
  }

  async one(req: Request) {
    const recordId = req.params.id;
    try {
      const dbResponse = await db.query("SELECT * FROM records where id = $1", [
        recordId,
      ]);
      return dbResponse.rows[0];
    } catch (e) {
      console.log(e);
    }
  }
}
