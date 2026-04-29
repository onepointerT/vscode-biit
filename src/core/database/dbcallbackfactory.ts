import { DataBase } from "./database";
import { DBDataSet, DBEntry } from "./dbentry";
import { DBQuery } from "./dbquery";


export class DBCallbacks {
    static db : DataBase | undefined = undefined;
    static queries : Array<DBQuery>;
    static query : DBQuery | undefined;
    static result : DBDataSet | undefined;

    constructor(dbpath: string) {
        if ( DBCallbacks.db == undefined ) {
            DBCallbacks.db = new DataBase(dbpath);
            DBCallbacks.queries = new Array<DBQuery>();
            DBCallbacks.query = undefined;
            DBCallbacks.result = undefined;
        }
    }

    public static pushqry(stmt: string) : DBQuery {
        let dbq = new DBQuery(stmt);
        DBCallbacks.queries.push(dbq);
        return dbq;
    }

    public static async nextqry() : Promise<boolean> {
        DBCallbacks.result = undefined;
        let dbq = DBCallbacks.queries.pop();
        if ( dbq != undefined ) {
            DBCallbacks.query = dbq;

            let dbres = new DBDataSet(dbq, DBCallbacks.db);
            DBCallbacks.result = dbres;
            return true;
        }
        return false;
    }

    public static async run() : Promise<number> {
        let n = 0;
        while ( DBCallbacks.nextqry() ) { ++n; }
        return n;
    }

    public static dbEntryToObject(dataset: DBDataSet, attributes: object) : object {
        let dbentry : DBEntry = dataset[0];
        let dbo = dbentry.toObject();
        Object.assign(dbo, attributes);
        return dbo;
    }

    public static async execOnce(stmt : string, attributes: object, _cbfn: (dataset: DBDataSet, attributes: object) => (DBDataSet | object) = DBCallbacks.dbEntryToObject ) : Promise<DBDataSet | object> {
        let qry = DBCallbacks.pushqry(stmt);
        while ( DBCallbacks.query != qry ) { /* async suspend here */ }
        while ( DBCallbacks.result == undefined ) { /* async suspend here */ }
        return _cbfn(DBCallbacks.result, attributes);
    }

    public static dataSetToObject(dataset: DBDataSet, attributes: object) : object {
        /* TODO */
    }

    public static entryToObject(dbentry: DBEntry, attributes: object) : object {
        /* TODO */
    }

    public static findReferences(dbref_values: string, dbref_type: string) : Array<object> {
        /* TOI */
    }
}
