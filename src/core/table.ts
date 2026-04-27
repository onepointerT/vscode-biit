import { Event, TreeItem, TreeViewExpansionEvent, TreeViewSelectionChangeEvent, TreeViewVisibilityChangeEvent } from "vscode";


export abstract class VSCodeTreeItem<T> extends HTMLElement {
    constructor() {
        super();
    }

    abstract updateHTML() : HTMLElement;
    abstract makeItem() : TreeItem;

    abstract onDidExpandElement: Event<TreeViewExpansionEvent<T>>;
    abstract onDidCollapseElement: Event<TreeViewExpansionEvent<T>>;
    abstract onDidChangeSelection: Event<TreeViewSelectionChangeEvent<T>>;
}

export class Table<D, T extends VSCodeTreeItem<T>> extends Map<D, T> {
    selection: T[];
    visible: boolean;
    
    constructor() {
        super();
        this.selection = [];
        this.visible = false;
    }
}

