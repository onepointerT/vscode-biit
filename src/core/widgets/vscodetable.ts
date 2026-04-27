import { Table, type VSCodeTreeItem } from "../table";
import { Event, TreeView, TreeViewExpansionEvent, TreeViewSelectionChangeEvent, TreeViewVisibilityChangeEvent } from "vscode";

export class VSCodeTable<T extends VSCodeTreeItem<T>> extends Table<string, T> implements TreeView<T> {
    constructor() {
        super();
    }

    abstract onDidExpandElement() : Event<TreeViewExpansionEvent<T>>;
    abstract onDidCollapseElement() : Event<TreeViewExpansionEvent<T>>;
    abstract onDidChangeSelection() : Event<TreeViewSelectionChangeEvent<T>>;
    abstract onDidChangeVisibility() : Event<TreeViewVisibilityChangeEvent>;
    
    public reveal(element: T, options?: { select?: boolean; focus?: boolean; expand?: boolean | number; }): Thenable<void> {
        let ti = element.makeItem(element);
        
    }
    dispose() {
        throw new Error("Method not implemented.");
    }

    abstract toHTML() : HTMLElement;
}