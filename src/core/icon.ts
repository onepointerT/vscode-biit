

export class HTMLIcon extends HTMLImageElement {
    fname : string;
    static me: MouseEvent;

    constructor(fname: string
            , mouseClick : ((this: GlobalEventHandlers, ev: MouseEvent) => any)
            , contextmenu : ((this: GlobalEventHandlers, ev: MouseEvent) => any)
            , mouseLeave : ((this: GlobalEventHandlers, ev: MouseEvent) => any)
            , mouseOver : ((this: GlobalEventHandlers, ev: MouseEvent) => any)
    ) {
        super();
        this.fname = fname;
        super.src = "resources/" + this.fname;
        if ( HTMLIcon.me == undefined ) HTMLIcon.me = new MouseEvent("static_for_icons");

        this.onClick = mouseClick;
        this.oncontextmenu = contextmenu;
        this.onmouseleave = mouseLeave;
        this.onmouseover = mouseOver;

        super.addEventListener("click", this.onClick);
        super.addEventListener("mouseover", this.onmouseover);
        super.addEventListener("mouseleave", this.onmouseleave);
        super.addEventListener("contextmenu", this.oncontextmenu);
        super.addEventListener("cancel", this.onmouseleave);
    }

    public onmouseover: ((this: GlobalEventHandlers, ev: MouseEvent) => any);
    public onmouseleave: ((this: GlobalEventHandlers, ev: MouseEvent) => any);
    public oncontextmenu: ((this: GlobalEventHandlers, ev: PointerEvent) => any);
    public onClick: ((this: GlobalEventHandlers, ev: MouseEvent) => any);
}