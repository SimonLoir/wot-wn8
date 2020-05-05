import * as mysql from 'mysql';
export class db {
    private _con: mysql.Connection;
    private _output_errors = process.env.ERRORS
        ? process.env.ERRORS == '1'
        : true;
    constructor() {}

    private get connection(): mysql.Connection {
        if (!this._con)
            this._con = mysql.createConnection({
                host: process.env.DB_HOST || 'localhost',
                user: process.env.DB_USER || 'root',
                password: process.env.DB_PSSWD || '',
                database: process.env.DB_NAME || 'wn8master',
                charset: 'utf8mb4_unicode_ci',
            });
        return this._con;
    }

    public async query(statement: string, prepare: string[] = []) {
        return new Promise(
            (
                resolve: (result: any) => void,
                reject: (message: any) => void
            ) => {
                this.connection.query(statement, prepare, (err, result) => {
                    if (err) {
                        if (this._output_errors) reject(err);
                        else reject('Database error');
                    }
                    resolve(result);
                });
            }
        );
    }

    public async beginTransaction() {
        return new Promise(
            (resolve: () => void, reject: (message: any) => void) => {
                this.connection.beginTransaction((err) => {
                    if (err) {
                        if (this._output_errors) reject(err);
                        else reject('Database error');
                    }
                    resolve();
                });
            }
        );
    }

    public async commit() {
        return new Promise(
            (resolve: () => void, reject: (message: any) => void) => {
                this.connection.commit((err) => {
                    if (err) {
                        if (this._output_errors) reject(err);
                        else reject('Database error');
                    }
                    resolve();
                });
            }
        );
    }

    public async rollback() {
        return new Promise(
            (resolve: () => void, reject: (message: any) => void) => {
                this.connection.rollback((err) => {
                    if (err) {
                        if (this._output_errors) reject(err);
                        else reject('Database error');
                    }
                    resolve();
                });
            }
        );
    }

    public end() {
        return new Promise(
            (resolve: () => void, reject: (message: any) => void) => {
                this.connection.end((err) => {
                    if (err) {
                        if (this._output_errors) reject(err);
                        else reject('Database error');
                    }
                    resolve();
                });
            }
        );
    }
}

export const database = new db();
