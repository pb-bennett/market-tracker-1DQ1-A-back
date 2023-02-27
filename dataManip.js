const dfd = require('danfojs-node');
const fs = require('fs');
const math = require('mathjs');
const { ma } = require('moving-averages');

const db = require('./db');

const initModels = require('./models/init-models');
const { Op, where } = require('sequelize');

const models = initModels(db);

getAllItems = async function (req, res, next) {
  try {
    // console.log(groupIDs);
    const results = await models.itemLookup.findAll({ include: [{ all: true, nested: true, duplicating: false }] });
    const results2 = await JSON.stringify(results);
    // console.log(results2);
    console.log('done');
    fs.writeFileSync('./allData.json', results2);
  } catch (error) {
    console.error(error);
  }
};
// getAllItems();

const getItemList = async function () {
  try {
    const rawData = await models.itemLookup.findAll();
    const typeIDs = [...new Set(rawData.map(el => el.dataValues.typeID))];
    const typeIDsJSON = await JSON.stringify({ typeIDs });
    // console.log(typeIDsJSON);
    fs.writeFileSync('./typeIDs.json', typeIDsJSON);
    console.log('Written');
    // console.log(typeIDs);
  } catch (error) {
    console.log(error);
  }
};

// getItemList();

// console.log(itemList);

const analyseData1 = async function () {
  try {
    const rawData = fs.readFileSync('./allData.json');
    const data = JSON.parse(rawData);
    console.log(data[0].priceDataExtendeds[0]);
    const dataExample = data[0].priceDataExtendeds[0];
    fs.writeFileSync('exampleData.json', JSON.stringify(dataExample));
  } catch (error) {
    console.log(error);
  }
};

// analyseData1();

const analyseData2 = async function () {
  try {
    const rawData = fs.readFileSync('./allData.json');
    const rawitemIDs = fs.readFileSync('./typeIDs.json');
    const data = JSON.parse(rawData);
    const { typeIDs } = JSON.parse(rawitemIDs);

    // const result = data.find(({ typeID }) => typeID === 34);

    // console.log(result);

    const dataObj = {
      rawData: {
        date: [],
        dq1aBuy: [],
        dq1aBuyVolume: [],
        dq1aSell: [],
        dq1aSellVolume: [],
        jitaBuy: [],
        jitaBuyVolume: [],
        jitaSell: [],
        jitaSellVolume: [],
        amarrBuy: [],
        amarrBuyVolume: [],
        amarrSell: [],
        amarrSellVolume: [],
      },
      aggregates: {
        sampleSize: null,
        means: {
          dq1aBuy: null,
          dq1aBuyVolume: null,
          dq1aSell: null,
          dq1aSellVolume: null,
          jitaBuy: null,
          jitaBuyVolume: null,
          jitaSell: null,
          jitaSellVolume: null,
          amarrBuy: null,
          amarrBuyVolume: null,
          amarrSell: null,
          amarrSellVolume: null,
        },
        std: {
          dq1aBuy: null,
          dq1aBuyVolume: null,
          dq1aSell: null,
          dq1aSellVolume: null,
          jitaBuy: null,
          jitaBuyVolume: null,
          jitaSell: null,
          jitaSellVolume: null,
          amarrBuy: null,
          amarrBuyVolume: null,
          amarrSell: null,
          amarrSellVolume: null,
        },
        ma5: {
          dq1aBuy: [],
          dq1aBuyVolume: [],
          dq1aSell: [],
          dq1aSellVolume: [],
          jitaBuy: [],
          jitaBuyVolume: [],
          jitaSell: [],
          jitaSellVolume: [],
          amarrBuy: [],
          amarrBuyVolume: [],
          amarrSell: [],
          amarrSellVolume: [],
        },
      },
    };
    dataObj.itemName = data[5].typeName;
    dataObj.volume = data[5].volume;
    dataObj.typeID = data[5].typeID;
    dataObj.groupID = data[5].groupID;
    dataObj.iconID = data[5].iconID;
    dataObj.groupName = data[5].group.groupName;
    dataObj.marketGroupID = data[5].marketGroupID;
    data[5].priceDataExtendeds.forEach(el => {
      dataObj.rawData.date.push(el.date);
      dataObj.rawData.dq1aBuy.push(el.dq1aBuy);
      dataObj.rawData.dq1aBuyVolume.push(el.dq1aBuyVolume);
      dataObj.rawData.dq1aSell.push(el.dq1aSell);
      dataObj.rawData.dq1aSellVolume.push(el.dq1aSellVolume);
      dataObj.rawData.jitaBuy.push(el.jitaBuy);
      dataObj.rawData.jitaBuyVolume.push(el.jitaBuyVolume);
      dataObj.rawData.jitaSell.push(el.jitaSell);
      dataObj.rawData.jitaSellVolume.push(el.jitaSellVolume);
      dataObj.rawData.amarrBuy.push(el.amarrBuy);
      dataObj.rawData.amarrBuyVolume.push(el.amarrBuyVolume);
      dataObj.rawData.amarrSell.push(el.amarrSell);
      dataObj.rawData.amarrSellVolume.push(el.amarrSellVolume);
    });
    // CALCULATE MEANS
    dataObj.aggregates.sampleSize = dataObj.rawData.date.length;
    dataObj.aggregates.means.dq1aBuy = math.mean(dataObj.rawData.dq1aBuy);
    dataObj.aggregates.means.dq1aBuyVolume = math.mean(dataObj.rawData.dq1aBuyVolume);
    dataObj.aggregates.means.dq1aSell = math.mean(dataObj.rawData.dq1aSell);
    dataObj.aggregates.means.dq1aSellVolume = math.mean(dataObj.rawData.dq1aSellVolume);
    dataObj.aggregates.means.jitaBuy = math.mean(dataObj.rawData.jitaBuy);
    dataObj.aggregates.means.jitaBuyVolume = math.mean(dataObj.rawData.jitaBuyVolume);
    dataObj.aggregates.means.jitaSell = math.mean(dataObj.rawData.jitaSell);
    dataObj.aggregates.means.jitaSellVolume = math.mean(dataObj.rawData.jitaSellVolume);
    dataObj.aggregates.means.amarrBuy = math.mean(dataObj.rawData.amarrBuy);
    dataObj.aggregates.means.amarrBuyVolume = math.mean(dataObj.rawData.amarrBuyVolume);
    dataObj.aggregates.means.amarrSell = math.mean(dataObj.rawData.amarrSell);
    dataObj.aggregates.means.amarrSellVolume = math.mean(dataObj.rawData.amarrSellVolume);
    // CALCULATE STANDARD DEVIATIONS
    dataObj.aggregates.std.dq1aBuy = math.std(dataObj.rawData.dq1aBuy);
    dataObj.aggregates.std.dq1aBuyVolume = math.std(dataObj.rawData.dq1aBuyVolume);
    dataObj.aggregates.std.dq1aSell = math.std(dataObj.rawData.dq1aSell);
    dataObj.aggregates.std.dq1aSellVolume = math.std(dataObj.rawData.dq1aSellVolume);
    dataObj.aggregates.std.jitaBuy = math.std(dataObj.rawData.jitaBuy);
    dataObj.aggregates.std.jitaBuyVolume = math.std(dataObj.rawData.jitaBuyVolume);
    dataObj.aggregates.std.jitaSell = math.std(dataObj.rawData.jitaSell);
    dataObj.aggregates.std.jitaSellVolume = math.std(dataObj.rawData.jitaSellVolume);
    dataObj.aggregates.std.amarrBuy = math.std(dataObj.rawData.amarrBuy);
    dataObj.aggregates.std.amarrBuyVolume = math.std(dataObj.rawData.amarrBuyVolume);
    dataObj.aggregates.std.amarrSell = math.std(dataObj.rawData.amarrSell);
    dataObj.aggregates.std.amarrSellVolume = math.std(dataObj.rawData.amarrSellVolume);
    // CALCULATE 5 DAY MOVING AVERAGES
    dataObj.aggregates.ma5.dq1aBuy = ma(dataObj.rawData.dq1aBuy, 5);
    dataObj.aggregates.ma5.dq1aBuyVolume = ma(dataObj.rawData.dq1aBuyVolume, 5);
    dataObj.aggregates.ma5.dq1aSell = ma(dataObj.rawData.dq1aSell, 5);
    dataObj.aggregates.ma5.dq1aSellVolume = ma(dataObj.rawData.dq1aSellVolume, 5);
    dataObj.aggregates.ma5.jitaBuy = ma(dataObj.rawData.jitaBuy, 5);
    dataObj.aggregates.ma5.jitaBuyVolume = ma(dataObj.rawData.jitaBuyVolume, 5);
    dataObj.aggregates.ma5.jitaSell = ma(dataObj.rawData.jitaSell, 5);
    dataObj.aggregates.ma5.jitaSellVolume = ma(dataObj.rawData.jitaSellVolume, 5);
    dataObj.aggregates.ma5.amarrBuy = ma(dataObj.rawData.amarrBuy, 5);
    dataObj.aggregates.ma5.amarrBuyVolume = ma(dataObj.rawData.amarrBuyVolume, 5);
    dataObj.aggregates.ma5.amarrSell = ma(dataObj.rawData.amarrSell, 5);
    dataObj.aggregates.ma5.amarrSellVolume = ma(dataObj.rawData.amarrSellVolume, 5);

    console.log(dataObj);
  } catch (error) {
    console.log(error);
  }
};

// analyseData2();

const analyseObject = function (data) {
  const dataObj = {
    rawData: {
      date: [],
      dq1aBuy: [],
      dq1aBuyVolume: [],
      dq1aSell: [],
      dq1aSellVolume: [],
      jitaBuy: [],
      jitaBuyVolume: [],
      jitaSell: [],
      jitaSellVolume: [],
      amarrBuy: [],
      amarrBuyVolume: [],
      amarrSell: [],
      amarrSellVolume: [],
    },
    aggregates: {
      sampleSize: null,
      mean: {
        dq1aBuy: null,
        dq1aBuyVolume: null,
        dq1aSell: null,
        dq1aSellVolume: null,
        jitaBuy: null,
        jitaBuyVolume: null,
        jitaSell: null,
        jitaSellVolume: null,
        amarrBuy: null,
        amarrBuyVolume: null,
        amarrSell: null,
        amarrSellVolume: null,
      },
      std: {
        dq1aBuy: null,
        dq1aBuyVolume: null,
        dq1aSell: null,
        dq1aSellVolume: null,
        jitaBuy: null,
        jitaBuyVolume: null,
        jitaSell: null,
        jitaSellVolume: null,
        amarrBuy: null,
        amarrBuyVolume: null,
        amarrSell: null,
        amarrSellVolume: null,
      },
      ma5: {
        dq1aBuy: [],
        dq1aBuyVolume: [],
        dq1aSell: [],
        dq1aSellVolume: [],
        jitaBuy: [],
        jitaBuyVolume: [],
        jitaSell: [],
        jitaSellVolume: [],
        amarrBuy: [],
        amarrBuyVolume: [],
        amarrSell: [],
        amarrSellVolume: [],
      },
      ma10: {
        dq1aBuy: [],
        dq1aBuyVolume: [],
        dq1aSell: [],
        dq1aSellVolume: [],
        jitaBuy: [],
        jitaBuyVolume: [],
        jitaSell: [],
        jitaSellVolume: [],
        amarrBuy: [],
        amarrBuyVolume: [],
        amarrSell: [],
        amarrSellVolume: [],
      },
      ma20: {
        dq1aBuy: [],
        dq1aBuyVolume: [],
        dq1aSell: [],
        dq1aSellVolume: [],
        jitaBuy: [],
        jitaBuyVolume: [],
        jitaSell: [],
        jitaSellVolume: [],
        amarrBuy: [],
        amarrBuyVolume: [],
        amarrSell: [],
        amarrSellVolume: [],
      },
    },
  };
  dataObj.itemName = data.typeName;
  dataObj.volume = data.volume;
  dataObj.typeID = data.typeID;
  dataObj.groupID = data.groupID;
  dataObj.iconID = data.iconID;
  dataObj.groupName = data.group.groupName;
  dataObj.marketGroupID = data.marketGroupID;
  data.priceDataExtendeds.forEach(el => {
    dataObj.rawData.date.push(el.date);
    dataObj.rawData.dq1aBuy.push(el.dq1aBuy);
    dataObj.rawData.dq1aBuyVolume.push(el.dq1aBuyVolume);
    dataObj.rawData.dq1aSell.push(el.dq1aSell);
    dataObj.rawData.dq1aSellVolume.push(el.dq1aSellVolume);
    dataObj.rawData.jitaBuy.push(el.jitaBuy);
    dataObj.rawData.jitaBuyVolume.push(el.jitaBuyVolume);
    dataObj.rawData.jitaSell.push(el.jitaSell);
    dataObj.rawData.jitaSellVolume.push(el.jitaSellVolume);
    dataObj.rawData.amarrBuy.push(el.amarrBuy);
    dataObj.rawData.amarrBuyVolume.push(el.amarrBuyVolume);
    dataObj.rawData.amarrSell.push(el.amarrSell);
    dataObj.rawData.amarrSellVolume.push(el.amarrSellVolume);
  });
  // CALCULATE MEANS
  dataObj.aggregates.sampleSize = dataObj.rawData.date.length;
  dataObj.aggregates.mean.dq1aBuy = math.mean(dataObj.rawData.dq1aBuy);
  dataObj.aggregates.mean.dq1aBuyVolume = math.mean(dataObj.rawData.dq1aBuyVolume);
  dataObj.aggregates.mean.dq1aSell = math.mean(dataObj.rawData.dq1aSell);
  dataObj.aggregates.mean.dq1aSellVolume = math.mean(dataObj.rawData.dq1aSellVolume);
  dataObj.aggregates.mean.jitaBuy = math.mean(dataObj.rawData.jitaBuy);
  dataObj.aggregates.mean.jitaBuyVolume = math.mean(dataObj.rawData.jitaBuyVolume);
  dataObj.aggregates.mean.jitaSell = math.mean(dataObj.rawData.jitaSell);
  dataObj.aggregates.mean.jitaSellVolume = math.mean(dataObj.rawData.jitaSellVolume);
  dataObj.aggregates.mean.amarrBuy = math.mean(dataObj.rawData.amarrBuy);
  dataObj.aggregates.mean.amarrBuyVolume = math.mean(dataObj.rawData.amarrBuyVolume);
  dataObj.aggregates.mean.amarrSell = math.mean(dataObj.rawData.amarrSell);
  dataObj.aggregates.mean.amarrSellVolume = math.mean(dataObj.rawData.amarrSellVolume);
  // CALCULATE STANDARD DEVIATIONS
  dataObj.aggregates.std.dq1aBuy = math.std(dataObj.rawData.dq1aBuy);
  dataObj.aggregates.std.dq1aBuyVolume = math.std(dataObj.rawData.dq1aBuyVolume);
  dataObj.aggregates.std.dq1aSell = math.std(dataObj.rawData.dq1aSell);
  dataObj.aggregates.std.dq1aSellVolume = math.std(dataObj.rawData.dq1aSellVolume);
  dataObj.aggregates.std.jitaBuy = math.std(dataObj.rawData.jitaBuy);
  dataObj.aggregates.std.jitaBuyVolume = math.std(dataObj.rawData.jitaBuyVolume);
  dataObj.aggregates.std.jitaSell = math.std(dataObj.rawData.jitaSell);
  dataObj.aggregates.std.jitaSellVolume = math.std(dataObj.rawData.jitaSellVolume);
  dataObj.aggregates.std.amarrBuy = math.std(dataObj.rawData.amarrBuy);
  dataObj.aggregates.std.amarrBuyVolume = math.std(dataObj.rawData.amarrBuyVolume);
  dataObj.aggregates.std.amarrSell = math.std(dataObj.rawData.amarrSell);
  dataObj.aggregates.std.amarrSellVolume = math.std(dataObj.rawData.amarrSellVolume);
  // CALCULATE 5 DAY MOVING AVERAGES
  dataObj.aggregates.ma5.dq1aBuy = ma(dataObj.rawData.dq1aBuy, 5);
  dataObj.aggregates.ma5.dq1aBuyVolume = ma(dataObj.rawData.dq1aBuyVolume, 5);
  dataObj.aggregates.ma5.dq1aSell = ma(dataObj.rawData.dq1aSell, 5);
  dataObj.aggregates.ma5.dq1aSellVolume = ma(dataObj.rawData.dq1aSellVolume, 5);
  dataObj.aggregates.ma5.jitaBuy = ma(dataObj.rawData.jitaBuy, 5);
  dataObj.aggregates.ma5.jitaBuyVolume = ma(dataObj.rawData.jitaBuyVolume, 5);
  dataObj.aggregates.ma5.jitaSell = ma(dataObj.rawData.jitaSell, 5);
  dataObj.aggregates.ma5.jitaSellVolume = ma(dataObj.rawData.jitaSellVolume, 5);
  dataObj.aggregates.ma5.amarrBuy = ma(dataObj.rawData.amarrBuy, 5);
  dataObj.aggregates.ma5.amarrBuyVolume = ma(dataObj.rawData.amarrBuyVolume, 5);
  dataObj.aggregates.ma5.amarrSell = ma(dataObj.rawData.amarrSell, 5);
  dataObj.aggregates.ma5.amarrSellVolume = ma(dataObj.rawData.amarrSellVolume, 5);
  // CALCULATE 10 DAY MOVING AVERAGES
  dataObj.aggregates.ma10.dq1aBuy = ma(dataObj.rawData.dq1aBuy, 10);
  dataObj.aggregates.ma10.dq1aBuyVolume = ma(dataObj.rawData.dq1aBuyVolume, 10);
  dataObj.aggregates.ma10.dq1aSell = ma(dataObj.rawData.dq1aSell, 10);
  dataObj.aggregates.ma10.dq1aSellVolume = ma(dataObj.rawData.dq1aSellVolume, 10);
  dataObj.aggregates.ma10.jitaBuy = ma(dataObj.rawData.jitaBuy, 10);
  dataObj.aggregates.ma10.jitaBuyVolume = ma(dataObj.rawData.jitaBuyVolume, 10);
  dataObj.aggregates.ma10.jitaSell = ma(dataObj.rawData.jitaSell, 10);
  dataObj.aggregates.ma10.jitaSellVolume = ma(dataObj.rawData.jitaSellVolume, 10);
  dataObj.aggregates.ma10.amarrBuy = ma(dataObj.rawData.amarrBuy, 10);
  dataObj.aggregates.ma10.amarrBuyVolume = ma(dataObj.rawData.amarrBuyVolume, 10);
  dataObj.aggregates.ma10.amarrSell = ma(dataObj.rawData.amarrSell, 10);
  dataObj.aggregates.ma10.amarrSellVolume = ma(dataObj.rawData.amarrSellVolume, 10);
  // CALCULATE 20 DAY MOVING AVERAGES
  dataObj.aggregates.ma20.dq1aBuy = ma(dataObj.rawData.dq1aBuy, 20);
  dataObj.aggregates.ma20.dq1aBuyVolume = ma(dataObj.rawData.dq1aBuyVolume, 20);
  dataObj.aggregates.ma20.dq1aSell = ma(dataObj.rawData.dq1aSell, 20);
  dataObj.aggregates.ma20.dq1aSellVolume = ma(dataObj.rawData.dq1aSellVolume, 20);
  dataObj.aggregates.ma20.jitaBuy = ma(dataObj.rawData.jitaBuy, 20);
  dataObj.aggregates.ma20.jitaBuyVolume = ma(dataObj.rawData.jitaBuyVolume, 20);
  dataObj.aggregates.ma20.jitaSell = ma(dataObj.rawData.jitaSell, 20);
  dataObj.aggregates.ma20.jitaSellVolume = ma(dataObj.rawData.jitaSellVolume, 20);
  dataObj.aggregates.ma20.amarrBuy = ma(dataObj.rawData.amarrBuy, 20);
  dataObj.aggregates.ma20.amarrBuyVolume = ma(dataObj.rawData.amarrBuyVolume, 20);
  dataObj.aggregates.ma20.amarrSell = ma(dataObj.rawData.amarrSell, 20);
  dataObj.aggregates.ma20.amarrSellVolume = ma(dataObj.rawData.amarrSellVolume, 20);
  return dataObj;
};

const analyseData3 = async function () {
  try {
    const rawData = fs.readFileSync('./allData.json');
    const data = JSON.parse(rawData);
    let dataArray = [];
    data.forEach(el => {
      const object = analyseObject(el);
      dataArray.push(object);
      console.log(`Analysed: ${object.itemName}`);
    });
    const cleanedData = JSON.stringify({ dataArray });
    fs.writeFileSync('./cleanedData.json', cleanedData);
    // console.log(dataArray);
  } catch (error) {
    console.log(error);
  }
};

analyseData3();
