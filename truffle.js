var HDWalletProvider = require("truffle-hdwallet-provider"); 

// infura 注册后获取的api-key
var infura_apikey = "VGuDEFSHKL1G1RLEfqhq";

// 你的以太坊钱包地址 進入 MetaMask -> Settings -> reveal seed words 复制到这里
var mnemonic = "eternal doll december taxi photo perfect powder garment shield game boy shrimp"; 

module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            gas: 6500000,
            network_id: "*" // Match any network id
        },
        ropsten: {
            gas: 8000000,
            provider: function() {
                return new HDWalletProvider(mnemonic,
                    "https://kovan.infura.io/v3/{{your_apiKey}}")
            },
            network_id: 3
        },
		
		 main: {
				  provider: new HDWalletProvider(mnemonic, "https://mainnet.infura.io/"+infura_apikey),
				  network_id: 3,
				  gas: 6500000,
				  gasPrice:10000000000
		}
    }
    };
