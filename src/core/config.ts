import { IniFile } from "./ini";



export class Config extends IniFile {
    
    constructor(configini: string) {
        super(configini);
    }
}