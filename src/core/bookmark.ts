import { v4 } from "uuid";
import { DBID } from "./database/dbid";
import { Table, VSCodeTreeItem } from './table';
import { VSCodeTable } from "./widgets/vscodetable";
import { Event, TreeItem, TreeItemCollapsibleState, TreeViewExpansionEvent, TreeViewSelectionChangeEvent, type TreeView } from "vscode";
import { StrTemplate } from "../util/str_template";
import type { Issue } from "./issue";
import type { DBOject } from "./database/dbobject";
import { DBEntry } from "./database/dbentry";




export class Bookmark extends VSCodeTreeItem<Bookmark> implements DBOject<Bookmark> {
    id : DBID;
    tag : string;
    headline : string;
    short_descr : string;
    src_location : SourceLocation;
    issues : Array<Issue>;

    constructor(tag: string, headline: string, short_descr: string
               , filepath: string, line: number, column: number = 0
               , dbid = v4()
    ) {
        super();
        this.id = new DBID(dbid);
        this.tag = tag;
        this.headline = headline;
        this.short_descr = short_descr;
        this.src_location = new SourceLocation(filepath, line, column);
        this.issues = new Array<Issue>();
    }
    newInstanceFromObj(obj: object): Bookmark {
        return Bookmark.newInstanceFromObject(obj);
    }
    newInstance(dbentry: DBEntry): Bookmark {
        return Bookmark.newInstance(dbentry);
    }

    public static newInstance(dbentry: DBEntry) : Bookmark {
        var tag, headline, short_descr, file, line, column, dbid;
        
        tag = dbentry.getValue("tag");
        headline = dbentry.getValue("headline");
        short_descr = dbentry.getValue("short_descr");
        file = dbentry.getValue("file");
        line = dbentry.getValue("line");
        column = dbentry.getValue("column");
        dbid = dbentry.getValue("id");

        return new Bookmark(tag, headline, short_descr, file, Number.parseInt(line), Number.parseInt(column), dbid);
    }

    public static newInstanceFromObject(obj: object) : Bookmark {
        let dbentry = DBEntry.fromObject(obj);

        return Bookmark.newInstance(dbentry);
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

    updateHTML() : HTMLElement {

    }

    makeItem() : TreeItem {
        let ti = new TreeItem(this.headline, TreeItemCollapsibleState.None);
        ti.tooltip = StrTemplate.make("-- @file@ - Line @line@ - Column @column@ -- @num_issues@ issues using this.", this.get());
        ti.label = this.short_descr;
        ti.id = this.id;
        ti.iconPath = "/resources/biit-bm.svg";
        ti.contextValue = 

    }

    private static showIssues(bm: Bookmark) : TreeView<Issue> {}

    private onDidExpandElement(bm : Bookmark): Event<TreeViewExpansionEvent<Bookmark>> {

        let tvi = Bookmark.showIssues(bm);
        tvi.reveal()
    }
    
    onDidCollapseElement: Event<TreeViewExpansionEvent<Bookmark>> {

    }

    onDidChangeSelection: Event<TreeViewSelectionChangeEvent<Bookmark>> {

    }
}


export class BookmarkTable extends VSCodeTable<Bookmark> {
    constructor(bookmarks : Bookmark[] = []) {
        super();
        for (const bookmark in bookmarks) {
            this.set(bookmark.id.toString(), bookmark);
        }
    } 
}