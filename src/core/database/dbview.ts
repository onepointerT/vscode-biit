import type { MarkdownString, TreeItem } from "vscode";
import type { DBEntry } from "./dbentry";
import type { DBOject } from "./dbobject";


export interface DBView<T> extends DBOject<DBView<T>> {
    obj : T;
    trItem : TreeItem;
    md : MarkdownString;

    fromDBEntry(dbe: DBEntry) : T;
    makeTreeItem(viewtype: T) : TreeItem;
    asMarkdown(viewtype: T) : MarkdownString;
}