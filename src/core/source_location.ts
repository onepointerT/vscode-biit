


class SourceLocation {
    filepath: string;
    line: number;
    column: number;

    constructor(filepath: string, line: number, column: number = 0) {
        this.filepath = filepath;
        this.line = line;
        this.column = column;
    }
}