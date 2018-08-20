var Web3 = require('web3');

var infura_apikey = "VGuDEFSHKL1G1RLEfqhq";
//引入编合约编译后的json
var TestContract = require('./build/contracts/FoMo3Dlong.json');

var playerContract = require('./build/contracts/PlayerBook.json');


//const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/"+infura_apikey));
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

//使用truffle-contract包的contract()方法
//请务必使用你自己编译的.json文件内容

console.log(web3.eth.Contract);
var fomo = new web3.eth.Contract(TestContract.abi, '0xdd54d84459dcf09056851ce9bc9be0f362d003b4', {
        from: '0x45e030331Bb83B92c067374b4Df5e10503B86cf9', 
        gasPrice: '20000000000' 
}
);
var player= new web3.eth.Contract((playerContract.abi), '0xb3a049adef122ad8601a8d49e79c78d79ddd143d', {
        from: '0x45e030331Bb83B92c067374b4Df5e10503B86cf9', 
            gasPrice: '20000000000' 
});


fomo.methods.setPlayerBook('0xb3a049adef122ad8601a8d49e79c78d79ddd143d').call().then(function(res){
        fomo.activate(); 
        player.methods.addGame(fomo.address, 'fomo').call();


}).catch(function(e){

    console.log('error',e.message);

});

