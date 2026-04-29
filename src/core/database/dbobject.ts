import type { MarkdownString } from "vscode";
import type { DBEntry } from "./dbentry";
import type { DBID } from "./dbid";


export interface DBOject<T> {
    id: DBID;

    newInstanceFromObj(obj: object) : T;
    newInstance(dbentry: DBEntry) : T;

    toHTML(obj: object) : HTMLElement;
    toMarkdown(obj: object) : MarkdownString;
}