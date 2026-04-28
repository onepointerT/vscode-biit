import { MapStrKey } from "../../util/map_str_key";
import type { DataBase } from "./database";
import { DBID } from "./dbid";
import * as sqlite_level from "sqlite-level";
import type { DBQuery } from "./dbquery";



export class DBEntry extends sqlite_level.SqliteLevel {
    id : DBID;

    constructor() {
        super();
        this.id = new DBID(this.get("id")?.toString());
    }
}


export class DBDataSet extends Array<DBEntry> {
    db_query: DBQuery;

    constructor(dbquery: DBQuery, db: DataBase) {
        super();
        this.db_query = dbquery;
        let ds = this.query(db);
        ds.forEach((value, idx, array) => {
            this.push(value);
        });
    }

    public query(db: DataBase) : Array<DBEntry> {
        return DataSet.queryDatabase(this.db_query, db);
    }

    public static queryDatabase(query: DBQuery, db: DataBase) : Array<DBEntry> {

        let res = new Array<DBEntry>();

        db.db.each<Array<string>>(query.sqlite(), (err, row) => {
            let dbe = new DBEntry();
            
            row.forEach((value, index, arr) => {
                
                dbe.add(arr.keys.name, value);
                
            });

            res.push(dbe);
        });

        return res;
    }
}