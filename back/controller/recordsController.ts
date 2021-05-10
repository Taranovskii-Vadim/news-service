import { Request } from "express";

import { db } from "../db";

export class RecordsController {
  async all() {
    try {
      const dbResponse = await db.query("SELECT * FROM records");
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
      return await Promise.all(dbRecords);
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
      return {
        ...dbResponse.rows[0],
        editorData: JSON.parse(dbResponse.rows[0].editorData),
      };
    } catch (e) {
      console.log(e);
    }
  }

  async remove(req: Request) {
    const id = req.params.id;
    try {
      await db.query("DELETE FROM records where id = $1", [id]);
      return "success";
    } catch (e) {
      console.log(e);
    }
  }

  async save(req: Request) {
    const {
      record: { title, description, editorData },
      userId,
    } = req.body;

    try {
      const record = await db.query(
        `INSERT INTO records
        (title, description, "authorId", "editorData")
        VALUES ($1, $2, $3, $4);`,
        [title, description, userId, JSON.stringify(editorData)]
      );
      return record;
    } catch (e) {
      console.log(e);
    }
  }
}
