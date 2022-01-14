/* eslint no-constant-condition: ["error", { "checkLoops": false }]*/
require("dotenv").config();
// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");
const moment = require("moment");
const {
  getPrice,
  getStakedTokens,
  getRarity,
  getDrops,
} = require("./reply-commands");
const formatterUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});
// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const token = process.env.token;
const presenceId = process.env.presenceId;
let presence = 0;
const changeStatus = async () => {
  switch (presence) {
    case 0: {
      presence = 1;
      const coin = await getPrice(presenceId);
      const priceString =
        "$" +
        coin.data.tickers[0].base +
        "@ $" +
        coin.data.market_data.current_price.usd;
      client.user.setPresence({
        status: "online",
        activities: [
          {
            name: priceString,
            type: "WATCHING",
          },
        ],
      });
      return;
    }
    case 1: {
      presence = 0;
      const sscTotal = await getStakedTokens();
      const stakedString = "Total Staked " + sscTotal.length.toString();
      client.user.setPresence({
        status: "online",
        activities: [
          {
            name: stakedString,
            type: "WATCHING",
          },
        ],
      });
      return;
    }
  }
};
client.once("ready", () => {
  console.log("Shadow Bot operational");
  setInterval(changeStatus, 15000);
});
client.on("messageCreate", async (message) => {
  let messagePicker = Math.floor(Math.random() * 5);
  if (message.author.bot) {
    return;
  } else if (message.content.toString().toLowerCase().includes("tekika")) {
    if (messagePicker == 0) {
      message.reply(
        `${message.author.username.toString()} only going to warn you once. Don't mention it again.`
      );
    } else if (messagePicker == 1) {
      message.reply(
        `https://media0.giphy.com/media/NEvPzZ8bd1V4Y/giphy.gif?cid=ecf05e477e799e4d1dc4ff41b80b80e6a03eaa1d2008f21b&rid=giphy.gif&ct=g`
      );
    } else if (messagePicker == 2) {
      message.reply(`${message.author.username.toString()} banning in 3..2..`);
    } else if (messagePicker == 3) {
      message.reply(`Please, stop!`);
    } else if (messagePicker == 4) {
      message.reply(`@Sook do something`);
    } else if (messagePicker == 5) {
      message.reply(`Are you a sicko, son?`);
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "price") {
    const coin = interaction.options.getString("coin");
    (async () => {
      const coinData = await getPrice(coin);
      const ath_date = moment(coinData.data.market_data.ath_date.usd);
      const atl_date = moment(coinData.data.market_data.atl_date.usd);
      await interaction.reply(
        "The price of " +
          coinData.data.tickers[0].base +
          " is: " +
          formatterUSD.format(coinData.data.market_data.current_price.usd) +
          ",\n The ATH was $" +
          coinData.data.market_data.ath.usd +
          " on " +
          ath_date.format("dddd, MMMM Do YYYY, h:mm:ss a") +
          ". \n The ATL was $" +
          coinData.data.market_data.atl.usd +
          " on " +
          atl_date.format("dddd, MMMM Do YYYY, h:mm:ss a") +
          ". \n FDV: " +
          formatterUSD.format(
            coinData.data.market_data.fully_diluted_valuation.usd
          ) +
          "\n 24hr price change: " +
          parseInt(
            coinData.data.market_data.price_change_percentage_24h
          ).toFixed(2) +
          "% "
      );
    })();
  } else if (commandName === "staked") {
    (async () => {
      const shdwTotal = await getStakedTokens();
      await interaction.reply(
        "There are currently: " +
          shdwTotal.length +
          " Shadowy Super Coders staked."
      );
    })();
  } else if (commandName === "rarity") {
    let collection = interaction.options.getString("collection");
    collection = collection.trim();
    const id = interaction.options.getInteger("id");
    (async () => {
      try {
        const rarity = await getRarity(collection);
        const nft = rarity.data.items.filter((item) => {
          return item.id == id;
        });
        console.log(nft);
        await interaction.reply(nft.toString());
      } catch (error) {
        console.log(error);
        await interaction.reply(
          "Unable to fetch rarity, HowRareIs API is down"
        );
      }
    })();
  } else if (commandName == "drops") {
    (async () => {
      const drops = await getDrops();
      let channelAnnouncement = "";
      // eslint-disable-next-line no-unused-vars
      for (const [key, value] of Object.entries(drops)) {
        value.each((collection) => {
          channelAnnouncement +=
            "\n" +
            collection.name +
            " is dropping on " +
            collection.date +
            " at a mint price of " +
            collection.price +
            " and a total supply of " +
            collection.nft_count;
        });
      }
      await interaction.reply(channelAnnouncement);
    })();
  }
});
// Login to Discord with your client's token
client.login(token);
