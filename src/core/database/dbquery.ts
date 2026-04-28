import * as sqlite from "sqlite";


export class DBQuery extends sqlite.Statement {
    query : string;

    constructor(qry : string) {
        super(DBQuery.toSQLiteStatement(qry));
        this.query = qry;
    }

    public static toSQLiteStatement(qry: string) : string {}
    public sqlite() : string {
        return DBQuery.toSQLiteStatement(this.query);
    }
}