import { DBID, DBIDObject } from "./database/dbid";
import { Issue } from "./issue";

export class Milestone implements DBIDObject {
    id : DBID;
    name : string;
    description : string;

    active : Array<Issue>;
    open : Array<Issue>;
    closed : Array<Issue>;

    constructor(name : string, description : string) {
        this.id = new DBID();
        this.name = name;
        this.description = description;
        this.active = new Array<Issue>();
        this.open = new Array<Issue>();
        this.closed = new Array<Issue>();
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