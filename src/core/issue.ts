import type { Bookmark } from "./bookmark";
import { DBEntry } from './database/dbentry';
import { DBID } from "./database/dbid";
import type { DBOject } from "./database/dbobject";
import { Milestone } from "./milestone";

export class Issue extends Array<Bookmark> implements DBOject<Issue> {
    id : DBID;
    tag : string;
    headline : string;
    short_descr : string;
    description : string;
    milestones : Array<Milestone>;
    active : boolean;
    closed : boolean;
    
    constructor() {
        super();
        this.id = new DBID();
        this.tag = "";
        this.headline = "";
        this.short_descr = "";
        this.description = "";
        this.milestones = new Array<Milestone>();
        this.active = true;
        this.closed = false;
    }
    newInstanceFromObj(obj: object): Issue {
        return Issue.newInstanceFromObject(obj);
    }
    newInstance(dbentry: DBEntry): Issue {
        return Issue.newInstance(dbentry);
    }

    public static newInstance(dbentry: DBEntry) : Issue {
        var tag, headline, short_descr, description, active, closed, dbid;
        
        tag = dbentry.getValue("tag");
        headline = dbentry.getValue("headline");
        short_descr = dbentry.getValue("short_descr");
        description = dbentry.getValue("description");
        active = dbentry.getValue("active").localeCompare("false") == 0 ? false : true;
        closed = dbentry.getValue("closed").localeCompare("false") == 0 ? false : true;
        dbid = dbentry.getValue("id");

        let issue = new Issue();
        issue.tag = tag;
        issue.headline = headline;
        issue.short_descr = short_descr;
        issue.description = description;
        issue.active = active;
        issue.closed = closed;
        issue.id = new DBID(dbid);

        return issue;
    }

    public static newInstanceFromObject(obj: object) : Issue {
        let dbentry = DBEntry.fromObject(obj);
        return Issue.newInstance(dbentry);
    }

    public get() : object {
        let result = { 
            headline: this.headline,
            short_descr: this.short_descr,
            description: this.description
        };

        return result;
    }
}