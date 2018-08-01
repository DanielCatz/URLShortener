//utils.js

const BijectiveHash = {

     decode : (str) => {
        var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
        var  base = alphabet.length;
        var decoded = 0;
        while (str){
          var index = alphabet.indexOf(str[0]);
          var power = str.length - 1;
          decoded += index * (Math.pow(base, power));
          str = str.substring(1);
        }
        return decoded;
      },

     encode : (num) => {
        var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
        var  base = alphabet.length;
        var encoded = '';
        while (num){
            var remainder = num % base;
            num = Math.floor(num / base);
            encoded = alphabet[remainder].toString() + encoded;
        }
        return encoded;
    }     
}
export default BijectiveHash;