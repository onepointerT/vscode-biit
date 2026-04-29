import { Bookmark } from "./bookmark"
import { Issue } from "./issue";
import { Milestone } from "./milestone";
import { DBEntry, type DBDataSet } from './database/dbentry';
import { DBCallbacks } from "./database/dbcallbackfactory";
import { DBOject } from './database/dbobject';


export namespace coreFactory {
    
}
export class CoreFactory {
    static bookmarks : Array<Bookmark>;
    static issues : Array<Issue>;
    static milestones : Array<Milestone>

    public static appendReferenceArray(key: string, obj: object, ref_arr: Array<object>) : object {
        let o = obj;


        let oref = [];
        for (let ref in ref_arr) {
            oref.push(ref);
        }
        Object.defineProperty(o, key, oref);

        return o;
    }

    public static appendReferences(obj: object, reftype: string, refvalues: string) : [object, Array<object>] {
        let refs : Array<string> = refvalues.split('\n');

        if ( refs.length == 0 ) return [obj, []];
        let result = new Array<object>();
        for (const ref in refs) {
            let obj_dataset = DBCallbacks.execOnce("SELECT * FROM ${reftype} WHERE id == ${ref};", obj
                                    , (dataset, attributes) => {
                                        let dbentry : DBEntry = dataset[0];
                                        let dbo = dbentry.toObject();
                                        Object.assign(dbo, attributes);
                                        return dbo;
            });
            result.push(obj_dataset);
        }

        let ores = CoreFactory.appendReferenceArray(reftype, obj, result);
        return [ores, result];
    }

    public static appendReferencesGeneric<T extends DBOject<T>>(obj: object, reftype: string, refvalues: string) : [object, Array<T>] {
        let ref = CoreFactory.appendReferences(obj, reftype, refvalues);
        let arr = new Array<T>();

        for (const o in  ref[1]) {
            // TOI: let t = T.newInstanceFromObject(o);
            //arr.push(t);
        }

        return [ref[0], arr];
    }

    public static createBookmark(dbentry: DBEntry) : Bookmark | undefined { 
        return Bookmark.newInstance(dbentry);
    }

    public static createIssue(dbentry: DBEntry) : Issue | undefined {
        return Issue.newInstance(dbentry);
    }

    public static createMilestone(dbentry: DBEntry) : Milestone | undefined {
        return Milestone.newInstance(dbentry);
    }

    /* TOI: public static create<T>(dbentry: DBEntry) : T | undefined {
        if ( (typeof T) == (typeof Bookmark) ) return CoreFactory.createBookmark(dbentry);
        else if ( (typeof T) == (typeof Issue) ) return CoreFactory.createIssue(dbentry);
        else if ( (typeof T) == (typeof Milestone) ) return CoreFactory.createMilestone(dbentry);
        else return undefined;
    }*/
}