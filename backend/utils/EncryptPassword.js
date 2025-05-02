// EncryptPassword.js
const encryptPassword = (passwd) => {
    const ekey = 'oarvbrhylk'; // Key used for encryption
    let encPass = '';
    let index = 0;
    let times = 0;

    // If password is less than 10 chars, pad with '0'
    if (passwd.length < 10) {
        times = 11 - passwd.length;
        for (let i = 0; i < times; i++) {
            passwd += '0';
        }
    }

    while (index < 10) {
        // Encrypt each character
        let k = ((passwd.charCodeAt(index) - 48) + (ekey.charCodeAt(index) - 48)) % 43;
        k = k + 48;
        encPass += String.fromCharCode(k);
        index++;
    }

    return encPass;
};

module.exports = encryptPassword;
