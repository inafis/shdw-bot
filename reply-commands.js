/* eslint-disable no-unused-vars */
const CoinGecko = require('coingecko-api');
const solanaWeb3 = require('@solana/web3.js');
const CoinGeckoClient = new CoinGecko();

module.exports = {
	getPrice: async () => {
		console.log('Fetching $SHDW Price');
		return await CoinGeckoClient.simple.price({
			ids:['genesysgo-shadow'],
		});
	},
	getStakedShdw: async () => {
		console.log('Fetching Staked SSC Tokens');
		const connection = new solanaWeb3.Connection(
			solanaWeb3.clusterApiUrl('mainnet-beta'),
			'confirmed',
		);
		const PublicKey = solanaWeb3.PublicKey;
		const ssc_key = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
		const ssc_config = {
			filters: [{
				'dataSize': 165,
			}, {
				'memcmp': {
					'offset': 32,
					'bytes': '46BtRifF7jVcMYaoPu9E6Mdh9ahyEr8TMkrxKFwJ3QDa',
				},
			},
			],
		};
		return await connection.getProgramAccounts(ssc_key, ssc_config);
	},
};