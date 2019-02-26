const SHA256 = require('crypto-js/sha256');

class Block{
  constructor(index, timestamp, data, previusHash = ''){
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previusHash = previusHash;
    this.hash = this.calculateHash();
  }

  calculateHash(){
    return SHA256(this.index + this.previusHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain{
  constructor(){
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(){
    return new Block(0, '22-02-2019', 'Block Genesis', '0');
  }

  getLatesBlock(){
    return this.chain[this.chain.length -1];
  }

  addBlock(newBlock){
    newBlock.previusHash = this.getLatesBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

let intiCoin = new Blockchain();
intiCoin.addBlock(new Block(1,'22-02-2019', { monto: 10 }));
intiCoin.addBlock(new Block(2,'23-02-2019', { monto: 100 }));

console.log(JSON.stringify(intiCoin, null, 4 ));
