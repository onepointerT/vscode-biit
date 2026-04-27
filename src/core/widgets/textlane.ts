import { MarkdownString } from "vscode";
import { HTMLMarkdownElement } from "../htmlelement";


export class TextLane extends HTMLMarkdownElement {
    content: string;
    viewMode : boolean;
    markdown : MarkdownString;

    constructor(attributes: object) {
        super(attributes);
        this.content = "";
        this.viewMode = true;
        this.markdown = new MarkdownString();
        this.mode = {
            editMode : this.switchToEditMode,
            previewMode : this.switchToPreviewMode,
            switchMode : this.switchViewMode
        };
    }

    public switchToEditMode() {
        if ( ! this.viewMode ) return;
        let ptoken = this.parser.tokenize(this.markdown.value);
        this.markdown.
        this.innerHTML = "<textedit></textedit>".
    }

    public switchToPreviewMode() {
        if ( this.viewMode ) return;
        this.innerHTML
    }

    public switchViewMode() {
        if ( this.viewMode ) this.switchToEditMode();
        else this.switchToPreviewMode();
    }

    mode : object;
}

export class TextLaneEditable extends TextLane {

}