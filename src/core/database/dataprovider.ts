import { TreeItem, TreeView } from "vscode";
import { DataBase } from "./database";
import { DBDataSet, DBEntry } from "./dbentry";
import { DBQuery } from "./dbquery";



export class DataProvider {
    db: DataBase;

    constructor(dbpath: string) {
        this.db = new DataBase(dbpath);
    }

    public get(stmt : string) : DBDataSet {
        let dbq = new DBQuery(stmt);
        return new DBDataSet(dbq, this.db);
    }

    /*public getTreeView(stmt : string) : TreeView<TreeItem> {
        let tv : TreeView<TreeItem> = new TreeView<TreeItem>();



        return tv;
    }*/
};