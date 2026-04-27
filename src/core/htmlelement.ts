import { MarkdownString } from 'vscode';


class HTMLAttributes extends DOMTokenList {
    attributes : object;

    constructor(attributes: object) {
        super();
        this.attributes = attributes;
        this.update(attributes);
    }

    public update(attrs: object) {
        this.attributes = attrs;
        
    
        for (const elem in Object.entries(this.attributes).flat()) {
            let found = false;
            for (const domToken in this.entries()) {
                if ( domToken.localeCompare(elem.toString()) == 0 ) {
                    found = true;
                }
            }
            if ( !found ) {
                this.add(elem);
            }
        }
    }
}

class HTMLAttributesMap extends Map<string, HTMLAttributes> {
    constructor() {
        super();
    }
}

export class HTMLMarkdownElement extends MarkdownString {
    
    attributes : object;
    content : string;
    css : HTMLAttributes;
    attr : HTMLAttributesMap;
    html : HTMLDivElement;

    constructor(attributes: object, md: string = "") {
        super(md);
        this.attributes = attributes;
        this.content = "";
        this.css = new HTMLAttributes(attributes);
        this.attr = new HTMLAttributesMap();
        this.html = new HTMLDivElement();
        this.updateHTML();
    }



    public updateHTML() {
        this.html = new HTMLDivElement();
        // # TODO: this.html.setHTMLUnsafe();

        //this.attributes
    }
}