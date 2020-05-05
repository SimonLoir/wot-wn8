import * as express from 'express';
export default function errorMessage(
    message: string,
    response: express.Response
) {
    response.status(500).json({
        type: 'error',
        message,
    });
}
type expressFn = (req: express.Request, res: express.Response) => Promise<any>;
export function asyn(callback: expressFn) {
    return function (req: express.Request, res: express.Response) {
        callback(req, res).catch((reason) => {
            if (reason.errno && reason.sqlMessage)
                errorMessage(
                    `SQL ERROR ${reason.errno} : ${reason.sqlMessage}`,
                    res
                );
            else errorMessage(reason, res);
        });
    };
}
