import { MapStrKey } from "../../util/map_str_key";
import type { DataBase } from "./database";
import { DBID } from "./dbid";
import * as sqlite_level from "sqlite-level";
import type { DBQuery } from "./dbquery";
import { Bookmark } from '../bookmark';
import type { DBOject } from "./dbobject";
import type { MarkdownString } from "vscode";



export class DBEntry extends MapStrKey<string> implements DBOject<DBEntry> {
    id : DBID;

    constructor() {
        super();
        this.id = new DBID(this.get("id")?.toString());
    }

    newInstanceFromObj(obj: object): DBEntry {
        return DBEntry.newInstanceFromObject(obj);
    }
    newInstance(dbentry: DBEntry): DBEntry {
        return DBEntry.newInstance(dbentry);
    }

    public static newInstanceFromObject(obj: object) : DBEntry {
        let dbentry : DBEntry = new DBEntry();
        Object.entries(obj).forEach((value, index, array) => {
            dbentry.add(value[0], value[1]);
        });
        return dbentry;
    }

    public static newInstance(dbentry: DBEntry) : DBEntry {
        dbentry.id = new DBID(dbentry.getValue("id").toString());
        return dbentry;
    }

    toHTML(obj: object): HTMLElement {
        throw new Error("Method not implemented.");
    }
    toMarkdown(obj: object): MarkdownString {
        throw new Error("Method not implemented.");
    }

    public toObject() : object {
        let o = {};
        for (const elem in this) {
            Object.defineProperty(o, elem[0], elem[1]);
        }
        return o;
    }

    public static fromObject(obj: object) : DBEntry {
        let dbentry = new DBEntry();
        
        for (const elem in Object.entries(obj)) {
            dbentry.add(elem[0], elem[1].toString());
            if ( elem[0].localeCompare("id") == 0 )
                dbentry.id = new DBID(elem[1].toString());
        }

        return dbentry;
    }

    public getAsInstance<T>(appendEntries: Array<DBEntry>
                , createInst_fn: (o: object, dbentries: Array<DBEntry>
                            , postCreate_fn: (original: object, dbe: Array<DBEntry>) => T)
                    => T
                , modifications_fn : (original: object, dbe: Array<DBEntry>) => T) : T {
        let o = this.toObject();
        return createInst_fn(o, appendEntries, modifications_fn);
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

    public toObject() : object {
        let o = { dataset : new Array<object>() };

        this.forEach((value, index, array) => {
            let dsobj = value.toObject();
            o.dataset.push(dsobj);
        });

        return o;
    }

    public query(db: DataBase) : Array<DBEntry> {
        return DBDataSet.queryDatabase(this.db_query, db);
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