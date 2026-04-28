import { DBEntry } from "./dbentry";
import * as sqlite from "sqlite";
import * as sqlite_keyv from "@keyv/sqlite";
import * as sqlite_vec from "sqlite-vec";
import * as sqlite_level from "sqlite-level";
import { Config } from '../config';


class DataBaseCursor {
    attributes: object;
    place: object;
    current : sqlite_level.SqliteLevel;

    constructor(crs_attrs: object = {}) {
        this.attributes = crs_attrs;
        this.place = {
            table : "",
            query_ds : "",
            line : 0,
            column : 0,
            queryidx : -1,
            entrykey : ""
        };
    }
}


export class DataBase extends DataBaseCursor implements sqlite_vec.Db {
    dbpath : string;
    dbcursor : DataBaseCursor;
    db : sqlite.Database;
    dbconf : sqlite.ISqlite.Config


    constructor(db_path: string = "${workspaceFolder}/.vscode/biit.db") {
        super();
        this.dbpath = db_path;
        this.dbcursor = new DataBaseCursor();

        /*this.dbconf = new sqlite.ISQLite.Config();
        this.db = new sqlite.Database();*/
    }

    loadExtension(file: string, entrypoint?: string | undefined): void {
        throw new Error("Method not implemented.");
    }
}
