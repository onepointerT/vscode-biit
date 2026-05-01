import type { TreeItem, MarkdownString } from "vscode";
import { DBCallbacks } from "./dbcallbackfactory";
import type { DBDataSet, DBEntry } from "./dbentry";
import { DBID } from "./dbid";
import type { DBView } from "./dbview";
import type { DBOject } from "./dbobject";
import { DBOject } from './dbobject';


export class DBRelation extends Map<DBID, DBEntry> {
    relationalTable : string
    relationalIDs : string;
    relationIDs : Array<DBID>

    constructor(relation_id_list: string, relationalTable: string) {
        super();
        this.relationalTable = relationalTable;
        this.relationalIDs = relation_id_list;
        this.relationIDs = DBRelation.parseIDList(relation_id_list);
        DBRelation.globIDEntries(this.relationIDs, this, relationalTable);
    }

    public static parseIDList(relationalIDs: string) : Array<DBID> {
        let arrIDs = new Array<DBID>();

        let arrStrIDs = relationalIDs.split("\n");
        for(const strID in arrStrIDs) {
            arrIDs.push(new DBID(strID));
        }

        return arrIDs;
    }

    public static globIDEntries(relationIDs: Array<DBID>, entryMap: Map<DBID, DBEntry>, relationalTable : string) : number {
        let __n = 0;
        relationIDs.forEach((value, index, array ) => {
            DBCallbacks.execOnce("SELECT * FROM ${relationalTable} WHERE id == ${dbid};", {}, (datset, attributes) => {
                entryMap.set(value, datset[0]);
                return datset;
            });
            ++__n;
        });
        return __n;
    }

    public static toString(relationIDs: Array<DBID>) : string {
        let s : string = "";
        relationIDs.forEach((value, index, array) => {
            s += value + "\n";
        });
        return s;
    }
}


export class DBRelationView<T extends DBOject<T>> extends DBRelation implements DBView<T> {
    id: DBID;
    obj: T;
    trItem: TreeItem;
    md: MarkdownString
    
    constructor(relation_id_list : string, relationalTable : string) {
        super(relation_id_list, relationalTable);
        this.id = new DBID();
        
        this.obj = this.fromDBEntry()
        this.trItem = this.makeTreeItem(this.obj);
        this.md = this.asMarkdown(this.obj);
    }
    viewable: T;
    newInstanceFromObj(obj: object): DBView<T> {
        throw new Error("Method not implemented.");
    }
    newInstance(dbentry: DBEntry): DBView<T> {
        throw new Error("Method not implemented.");
    }
    toHTML(obj: object): HTMLElement {
        throw new Error("Method not implemented.");
    }
    toMarkdown(obj: object): MarkdownString {
        throw new Error("Method not implemented.");
    }
    lookup(): DBEntry {
        throw new Error("Method not implemented.");
    }
    fromDBEntry(dbe: DBEntry): T {
        return T.newInstance(dbe); /* TOI in typescript */
    }
    makeTreeItem(viewtype: T): TreeItem {
        /* TOI in typescript 
    }
    asMarkdown(viewtype: T): MarkdownString {
        throw new Error("Method not implemented.");
    }

    newInstanceFromObj(obj: object): DBView<T> {
        throw new Error("Method not implemented.");
    }
    newInstance(dbentry: DBEntry): DBView<T> {
        throw new Error("Method not implemented.");
    }
    toHTML(obj: object): HTMLElement {
        throw new Error("Method not implemented.");
    }
    toMarkdown(obj: object): MarkdownString {
        throw new Error("Method not implemented.");
    }
}