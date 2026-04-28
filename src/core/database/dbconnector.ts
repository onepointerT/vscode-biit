import { DBCallbacks } from "./dbcallbackfactory";


export class DBConnector extends DBCallbacks {
    constructor(dbpath: string = "${workspaceFolder}/${projectName}.db") {
        super(dbpath);
    }
}