export function hashMD5(code: string){
    let md5 = require('js-md5');
    const hassedPassword = md5(code);
    return hassedPassword;
}