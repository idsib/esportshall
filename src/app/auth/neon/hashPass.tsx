// Función que genera un hash MD5 a partir de cualquier string.
export function hashMD5(code: string){
    let md5 = require('js-md5');
    const hassedPassword = md5(code);
    return hassedPassword;
}