import { DBCallbacks } from "./database/dbcallbackfactory";
import { DBEntry } from "./database/dbentry";
import { DBID } from "./database/dbid";
import type { DBOject } from "./database/dbobject";
import { Issue } from "./issue";

export class Milestone implements DBOject<Milestone> {
    id : DBID;
    tag : string;
    headline : string;
    description : string;

    active : Array<Issue>;
    open : Array<Issue>;
    closed : Array<Issue>;

    constructor() {
        this.id = new DBID();
        this.tag = "";
        this.headline = "";
        this.description = "";
        this.active = new Array<Issue>();
        this.open = new Array<Issue>();
        this.closed = new Array<Issue>();
    }
    newInstanceFromObj(obj: object): Milestone {
        return Milestone.newInstanceFromObj(obj);
    }
    newInstance(dbentry: DBEntry): Milestone {
        return Milestone.newInstance(dbentry);
    }

    public static newInstanceFromObj(obj: object): Milestone {
        let dbentry = DBEntry.fromObject(obj);
        return Milestone.newInstance(dbentry);
    }

    public static newInstance(dbentry: DBEntry): Milestone {
        var tag, headline, description, active, open, closed, dbid;
        
        tag = dbentry.getValue("tag");
        headline = dbentry.getValue("headline");
        description = dbentry.getValue("description");
        active = dbentry.getValue("active");
        open = dbentry.getValue("open");
        closed = dbentry.getValue("closed")
        dbid = dbentry.getValue("id");

        let milestone = new Milestone();
        milestone.tag = tag;
        milestone.headline = headline;
        milestone.description = description;
        DBCallbacks.findReferences(active, "issue").forEach((value, index, array) => {
            let issue : Issue = Issue.newInstanceFromObject(value);
            milestone.active.push(issue);

        });
        DBCallbacks.findReferences(open, "issue").forEach((value, index, array) => {
            let issue : Issue = Issue.newInstanceFromObject(value);
            milestone.open.push(issue);

        });
        DBCallbacks.findReferences(closed, "issue").forEach((value, index, array) => {
            let issue : Issue = Issue.newInstanceFromObject(value);
            milestone.closed.push(issue);

        });
        milestone.id = new DBID(dbid);

        return milestone;
    }

    public findByID(issueID : string) {
        let result = null;
        this.open.forEach((value, index, array) => {
            if ( value.id.localeCompare(issueID) == 0 )
                result = value;
        });
        if ( result != null ) return result;
        this.closed.forEach((value, index, array) => {
            if ( value.id.localeCompare(issueID) == 0 )
                result = value;
        });
        return result;
    }

    public add(issue: Issue) : boolean {
        return this.active.length < this.active.push(issue)
            && this.open.length < this.open.push(issue);
    }

    public promote_active(issue : Issue) : boolean {
        if ( this.findByID(issue.id.toString()) != null ) {
            let is_active = false;
            this.active.forEach((value, index, array) => {
                if ( value.id.localeCompare(issue.id.toString()) == 0 ) is_active = true;
            });
            if ( ! is_active ) {
                this.active.push(issue);
                issue.active = true;
            } else return false;
        } else return false;
        return true;
    }

    public unpromote_active(issue : Issue) : boolean {
        let idx = -1;
        let result = new Array<Issue>();
        this.active.forEach((value, index, array) => {
            if ( value.id.localeCompare(issue.id.toString()) == 0) {
                value.active = false;
                idx = index;
            }
            if ( idx > -1 ) {
                for (let elem in array.slice(0, idx - 1)) { result.push(elem); }
                for (let elem in array.slice(idx + 1, array.length-1)) { result.push(elem); }
                array = result;
            }
        });
        return idx > -1;
    }

    public closeIssue(issue: Issue) : boolean {
        let idx = -1;
        this.open.forEach((value, index, array) => {
            if ( value.id == issue.id ) idx = index;
        });
        if ( idx == -1 ) return false;
        let arr_new = new Array<Issue>();
        arr_new.concat(idx > 0 ? this.open.slice(0, idx - 1) : this.open.slice(0,0)
                    , idx < this.open.length - 2 ? this.open.slice(idx+1) : this.open.slice(idx+1, idx+1)
        );
        return true;
    }
}