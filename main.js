const SHA256 = require('crypto-js/sha256');

class Block{
	constructor(index, timestamp, data, previousHash=''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = JSON.stringify(data);
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
	}

	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp+JSON.stringify(this.data)).toString();		
	}
}

class BlockChain{
	constructor(){
		this.chain = [this.createGenesisBlock()];
	}

	createGenesisBlock(){
		return new Block(0, '01/01/2017', "Genesis Block", "0");
	}

	getLatestBlock(){
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBLock){
		newBLock.previousHash = this.getLatestBlock().hash;
		newBLock.hash = newBLock.calculateHash();
		this.chain.push(newBLock);
	}

	isValidChain(){
		for (var i = 1; i <this.chain.length; i++) {

			var currentBlock = this.chain[i];
			var previousBlock = this.chain[i - 1];

			if(currentBlock.hash != currentBlock.calculateHash()){
				return false;
			}

			if(currentBlock.previousHash != previousBlock.hash){
				return false;
			}
		}	

		return true;
	}

}

let coin = new BlockChain();
coin.addBlock(new Block(1,'10/07/2017',{amount:10}));
coin.addBlock(new Block(1,'10/09/2017',{amount:30}));
coin.addBlock(new Block(1,'10/09/2017',{amount:30}));
coin.addBlock(new Block(1,'10/11/2017',{amount:30}));
coin.addBlock(new Block(1,'10/1/2017',{amount:30}));
coin.addBlock(new Block(1,'10/09/2017',{amount:30}));
coin.addBlock(new Block(1,'10/09/2017',{amount:30}));

//coin.chain[1].data = {amount:11};

console.log(JSON.stringify(coin,null,10));

console.log("Is chain is valid? : "+coin.isValidChain());