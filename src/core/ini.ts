import { readFile } from 'fs';


export class IniFile extends Array<[string, string]> {
    filepath: string;

    static read(filepath: string) : Array<[string, string]> {
        let arr = new Array<[string, string]>();

        readFile(filepath, "utf-8", (err, data) => {
            
            let filelines = data.split("\r\n");
            let varname_current = "";
            for (const line in filelines) {
                if ( line.startsWith(";") || line.startsWith("#") ) continue;
                else if ( line.indexOf(" = |") != -1 ) { // Start a new variable
                    const pos_equiv = line.indexOf(" = |");
                    const varname = line.substring(0, pos_equiv-1);
                    arr.push([varname, ""]);
                    varname_current = varname;
                } else if ( line.search("\"") > 0 ) { // Has a value of the current variable in a separate line
                    const pos_str_start = line.indexOf("\"");
                    const pos_str_end = line.lastIndexOf("\"");
                    if ( pos_str_start < 0 || pos_str_end < 0 ) continue;
                    const value = line.substring(pos_str_start+1, pos_str_end-1);
                    arr.findIndex(pos_key => {
                        if (pos_key[0] == varname_current )
                            pos_key[1] += value;
                    });
                } else continue;
            }
        });

        return arr;
    }

    constructor(filepath: string) {
        super(0)
        super.concat(IniFile.read(filepath));
        this.filepath = filepath;
    }

    public key(k: string) : [string, string] {
        for (let index = 0; index < this.length; index++) {
            const element = this[index]
            if ( element[0] == k ) return element;
        }

        this.push([k, ""]);
        return this.key(k);
    }
}