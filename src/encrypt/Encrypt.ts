import elliptic = require('elliptic')
import BN = require('bn.js')

class Point {
    inf: boolean;
    precomputed: any;
    type: String;
    x: BN;
    y: BN;
}

class Encryption {
    privateKey: String;
    publicKey: Point;
    generatorPoint: Point;

    constructor() {
        let EC = elliptic.ec;
        let curve = new EC('secp256k1');
        let keypair = curve.genKeyPair();
        this.publicKey = keypair.getPublic();
        this.privateKey = keypair.getPrivate();
        this.generatorPoint = new Point();
        this.generatorPoint.x = new BN(1, 16);
        this.generatorPoint.y = new BN(1, 16);
    }

    public encodeString(data: String): String {
        let result = "";
        for (let i = 0; i < data.length; i++) {
            let hex = data.charCodeAt(i).toString(16);
            result += ("000" + hex).slice(-2);
        }
        return result;
    }

    public decodeString(data: String): String {
        let hexes = data.match(/.{1,4}/g) || [];
        let result = "";
        for (let i = 0; i < hexes.length; i++) {
            result += String.fromCharCode(parseInt(hexes[i], 16));
        }
        return result;
    }

    public encryptData(data: String): String {
        return "encrypted";
    }

    public decryptData(data: String): String {
        return "decrypted";
    }

    public signData(data: String): String {
        return "signature";
    }

    public verifySignature(signature: String): boolean {
        return false;
    }
}

var enc = new Encryption();
// console.log(enc.publicKey.x.toString);
console.log(enc.encodeString('Jibitesh is a good boy.'))