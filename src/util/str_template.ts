

export class StrTemplate {
    public static make(tmplstr: string, data: object) : string {
        let result = new String(tmplstr);
        for (const elem in Object.entries(data).flat()) {
            if ( elem.length != 2 ) continue;
            result = result.replaceAll("@" + elem[0].toString() + "@", elem[1].toString());
        }
        return result.toString();
    }
}