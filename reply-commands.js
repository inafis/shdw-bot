/* eslint-disable no-unused-vars */
const CoinGecko = require('coingecko-api');
const solanaWeb3 = require('@solana/web3.js');
const bent = require('bent');

const CoinGeckoClient = new CoinGecko();
const getJson = bent('json');
const stakeAccount = process.env.stakeAccount;

module.exports = {
	getPrice: async (id) => {
		return await CoinGeckoClient.coins.fetch(id);
	},
	getStakedTokens: async () => {
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
					'bytes': stakeAccount,
				},
			},
			],
		};
		return await connection.getProgramAccounts(ssc_key, ssc_config);
	},
	getCollections: async () => {
		return await getJson('http://howrare.is/api/v0.1/collections');
	},
	getRarity: async (collection) => {
		return await getJson('http://howrare.is/api/v0.1/collections/' + collection);
	},
	getDrops: async () => {
		return await getJson('http://howrare.is/api/v0.1/drops');
	},
};