export enum HttpCode {
    E200 = 200,
    E201 = 201,
    E400 = 400,
    E401 = 401,
    E403 = 403,
    E404 = 404,
}

export enum ErrStr {
    OK = '',

    // credentials
    ErrNoCredentials = 'No credentials sent!',
    ErrUnauth = 'Unauthorized!',

    //DB
    ErrNoObj = 'Cannot find the specific record',
    ErrStore = 'Failed to store data',
    ErrNotValid = 'one or more updated values are invalid',

    //parameter
    ErrMissingParameter = 'Missing parameter'
}

export class Err {
    data: any;
    code: number;
    msg: string;

    constructor(code: HttpCode = HttpCode.E200,
            msg: string = ErrStr.OK,
            data = null,
            ) {
        this.data = data
        this.code = code
        this.msg= msg

    }
}

