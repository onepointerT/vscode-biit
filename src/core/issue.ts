import { DBID, DBIDObject } from "./database/dbid";

export class Issue extends Array<Bookmark> implements DBIDObject{
    id : DBID;
    headline : string;
    short_descr : string;
    description : string;
    milestones : Array<Milestone>;
    active : boolean;
    
    constructor(bookmark: Bookmark) {
        super();
        this.id = new DBID();
        this.headline = "";
        this.short_descr = "";
        this.description = "";
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