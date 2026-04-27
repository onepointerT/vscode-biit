import { v4 } from 'uuid';

export class DBID extends String {
    constructor(id : string = v4()) {
        super(id);
    }

    public findInArray<T extends DBIDObject>(arr: Array<T>) : T | null {
        let result = null;
        arr.forEach((value, index, array) => {
            if ( value.id.toString().localeCompare(this.toString()) == 0 )
                result = value;
        });
        return result;
    }
}

export interface DBIDObject {
    id: DBID;
}