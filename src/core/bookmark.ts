import { v4 } from "uuid";
import { DBID } from "./database/dbid";
import { Table, VSCodeTreeItem } from './table';
import { VSCodeTable } from "./widgets/vscodetable";
import type { Event, TreeItem, TreeViewExpansionEvent, TreeViewSelectionChangeEvent } from "vscode";



class Bookmark extends VSCodeTreeItem<Bookmark> {
    elemID : DBID;
    tag : string;
    headline : string;
    short_descr : string;
    src_location : SourceLocation;

    constructor(tag: string, headline: string, short_descr: string
               , filepath: string, line: number, column: number = 0
               , dbid = v4()
    ) {
        super();
        this.elemID = new DBID(dbid);
        this.tag = tag;
        this.headline = headline;
        this.short_descr = short_descr;
        this.src_location = new SourceLocation(filepath, line, column);
    }

    public get() : object {
        return {
            id: this.id,
            tag: this.tag,
            headline: this.headline,
            short_description: this.short_descr,
            filepath: this.src_location.filepath,
            line: this.src_location.line,
            column: this.src_location.column
        };
    }

    updateHTML() : HTMLElement;
    makeItem() : TreeItem;

    onDidExpandElement: Event<TreeViewExpansionEvent<Bookmark>>;
    onDidCollapseElement: Event<TreeViewExpansionEvent<Bookmark>>;
    onDidChangeSelection: Event<TreeViewSelectionChangeEvent<Bookmark>>;
}


export class BookmarkTable extends VSCodeTable<Bookmark> {
    constructor(bookmarks : Bookmark[] = []) {
        super();
        for (const bookmark in bookmarks) {
            this.set(bookmark.id.toString(), bookmark);
        }
    } 
}