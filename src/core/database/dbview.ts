import { MarkdownString, TreeItem, TreeItemCollapsibleState } from "vscode";
import type { DBEntry } from "./dbentry";
import type { DBOject } from "./dbobject";


export interface ViewObject<VOC> {
    makeTreeItem(viewtype: VOC) : TreeItem;
    asMarkdown(viewtype: VOC) : MarkdownString;
}

export abstract class Viewable<V extends ViewObject<V>> extends TreeItem {
    obj: V;

    constructor(cls: V, label: string) {
        super(label, TreeItemCollapsibleState.None);
        this.obj = cls;
    }

    public makeTreeItem(viewtype: V) : TreeItem {
        return this.obj.makeTreeItem(viewtype);
    }
    public asMarkdown(viewtype: V) : MarkdownString  {
        return this.obj.asMarkdown(viewtype);
    }
}


export interface DBView<T extends Viewable<T>> extends DBOject<DBView<T>> {
    trItem : TreeItem;
    viewable: T;
    md : MarkdownString;

    /* A constructor for a class inheriting this interface
        may call `this.trItem = this.viewable.makeTreeItem()`
        while the specialization function is already given for a `ViewObject<T>`.
    */

    fromDBEntry(dbe: DBEntry) : T; /* { return T.newInstance(dbe); } */
}

/* TOI: ES2019 did mention mutliple inheritance and defaul. superCalls like.
    [abstract] class DatabaseObject { 
        id : string;
        
        constructor(dbid: string = v4()) {
            this.id = dbid}
        }

        // A prototype on functions can define a default function for classes implementing
        // this base class
        public prototype getAsObject() : object { return { id: this.id } }
        
        // Or leave it empty function definition to be implemented byy the inheriting class
        // for situation-dependent implementations on inheritor-dependent scenarios.
        // Also it is allowed, when written with keyword `prototype`, to implement a default
        // implementation for a function for example in the base class following to the defining
        // abstract class and define a final class-use-case-dependant function implementation, too
        abstract prototype onEventEmit : boolean;
        abstract prototype makeTreeItem : TreeItem;

        // This means for abstract classes, that they are not completely abstract, but don't omit
        // constructor and partial default implementations, if the `prototype` keyword is precense.
    }
    [aabstract] class Example<T extends TreeItem implements DatabaseObject> extends Event, T, TreeItem {
        constructor(obj: object) {
            super<Event>(obj);
            super<T>(obj);
            super<TreeItem>(this);
        }

        abstract prototype onEventEmit : boolean; // Situation specific
        public prototype makeTreeItem() : TreeItem {
            return T.makeTreeItem(); // Strongly promised: Templates and their members are predictable with `extends`
                                // and `implements` keywords and class type declaration (ES2021 mentioned this 
                                // for a follow-up definement of ES2019's neat-to-have-features).
        }
    }
    class WithEvent<U, ET extends Example<U>> {
        example: U;

        constructor(obj: object) {
            this.example = new U(obj); // Since also constructors on specific template parameters are predictable
        }

        public onEventEmit(): boolean { console.log("%s", this.example.makeTreeItem()); }
    }
*/