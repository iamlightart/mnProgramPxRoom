// eslint-disable-next-line import/no-commonjs
// const CryptoJS = require("crypto-js")
// todo 不直接在环境内对加密实例化,性能很差
const CryptoJS = null;
//  加密
function encryptFactory(plaintext, key, iv) {
  const _key = CryptoJS.enc.Utf8.parse(key);
  const _iv = CryptoJS.enc.Utf8.parse(iv);
  const source = CryptoJS.enc.Utf8.parse(JSON.stringify(plaintext));
  const encrypted = CryptoJS.AES.encrypt(source, _key, {
    iv: _iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}
//解密
function decryptFactory(ciphertext, key, iv) {
  const _key = CryptoJS.enc.Utf8.parse(key);
  const _iv = CryptoJS.enc.Utf8.parse(iv);
  const decrypt = CryptoJS.AES.decrypt(ciphertext, _key, {
    iv: _iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
export { encryptFactory, decryptFactory };
