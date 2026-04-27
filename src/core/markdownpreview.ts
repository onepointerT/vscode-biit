import 'vscode'
import 'vscode-markdown-languageservice'
import { MarkdownTemplate } from './markdowntemplate';
import { TextLane  } from './widgets/textlane';
import { MarkdownString } from 'vscode';

class MarkdownPreview {
    template: MarkdownTemplate;
    data: object;
    markdown: MarkdownString;

    constructor(tmpl_name: string, data: object = {}) {
        this.template = new MarkdownTemplate(tmpl_name);
        this.data = data;
        this.markdown = new MarkdownString(this.template.get(data).toString());
    }

    public update_markdown(data: object) {
        this.data = data;
        this.markdown.value = "";
        this.markdown.appendMarkdown( this.template.get(data).toString() );
    }

    public replace_markdown(str: string) {
        this.markdown.value = "";
        this.markdown.appendMarkdown(str);
    }

    public toHTML() : HTMLElement {
        let mdLanes = this.markdown.value.split("\r\n");
        let html = new HTMLElement();
        for ( let ml = 0; ml < mdLanes.length; ml++ ) {
            //html
        }

        return html;
    }
}


export class PopupMarkdownPreview extends MarkdownPreview {
    static me : MouseEvent;
    static mw : Window;
    static popup : HTMLElement;

    constructor(tmpl_name: string) {
        super(tmpl_name);
        PopupMarkdownPreview.me = new MouseEvent("mouseOver");
        PopupMarkdownPreview.mw = new Window();
        PopupMarkdownPreview.mw.close();
        PopupMarkdownPreview.popup.innerHTML = "";
    }

    public async onMouseOver(data: object) {
        if ( PopupMarkdownPreview.me != undefined ) return;
        this.update_markdown(data);
        PopupMarkdownPreview.me = new MouseEvent("mouseHover");
        //PopupMarkdownPreview.popup.innerHTML = mark
        
    }

    public async onMouseOverEnd(html: HTMLElement, ev: MouseEvent) {
        if ( PopupMarkdownPreview.me == undefined ) return;
        if ( PopupMarkdownPreview.mw != undefined ) {
            PopupMarkdownPreview.mw.close();
        }
    }
}