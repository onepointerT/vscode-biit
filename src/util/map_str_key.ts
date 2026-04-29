


export class MapStrKey<T> extends Map<string, T> {
    constructor() {
        super();
    }

    public add(k: string, val: T) : void {
        if ( this.has(k) ) return;
        else this.set(k, val);
    }
    
    public getValue(k: string) : T | string {
        let result = "";

        for (const elem in this.entries()) {
            if ( elem[0].localeCompare(k) == 0 ) { result = elem[1]; break; }
        }

        return result;
    }
    
}