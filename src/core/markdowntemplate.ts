import { IniFile } from './ini';


export class MarkdownTemplate {
    static inipath: string;
    static tmpl_ini: IniFile;
    tmpl_name: string;
    tmpl: string;

    constructor(tmpl_name: string) {
        if ( MarkdownTemplate.tmpl_ini == undefined )
            MarkdownTemplate.tmpl_ini = new IniFile(MarkdownTemplate.inipath);
        this.tmpl_name = tmpl_name;
        this.tmpl = MarkdownTemplate.tmpl_ini.key(tmpl_name)[1].toString();
    }

    public get(data: object) {
        let result = new String(this.tmpl);
        for (const elem in Object.entries(data).flat()) {
            if ( elem.length != 2 ) continue;
            result = result.replaceAll("@" + elem[0].toString() + "@", elem[1].toString());
        }
        return result;
        
    }
}