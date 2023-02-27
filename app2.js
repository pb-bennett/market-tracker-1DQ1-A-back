const dotenv = require('dotenv');
dotenv.config({ path: './config2.env' });
const express = require('express');
const mongoose = require('mongoose');
// const priceData = require('./models/priceData');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
console.log(DB);

mongoose.set('strictQuery', false);
mongoose.connect(DB).then(con => console.log('Database connection complete!'));

const priceDataSchema = new mongoose.Schema({
  rawData: {
    date: [Date],
    dq1aBuy: [Number],
    dq1aBuyVolume: [Number],
    dq1aBuy: [Number],
    dq1aBuyVolume: [Number],
    jitaBuy: [Number],
    jitaBuyVolume: [Number],
    jitaBuy: [Number],
    jitaBuyVolume: [Number],
    amarrBuy: [Number],
    amarrBuyVolume: [Number],
    amarrBuy: [Number],
    amarrBuyVolume: [Number],
  },
  aggregates: {
    sampleSize: Number,
    mean: {
      dq1aBuy: Number,
      dq1aBuyVolume: Number,
      dq1aBuy: Number,
      dq1aBuyVolume: Number,
      jitaBuy: Number,
      jitaBuyVolume: Number,
      jitaBuy: Number,
      jitaBuyVolume: Number,
      amarrBuy: Number,
      amarrBuyVolume: Number,
      amarrBuy: Number,
      amarrBuyVolume: Number,
    },
    std: {
      dq1aBuy: Number,
      dq1aBuyVolume: Number,
      dq1aBuy: Number,
      dq1aBuyVolume: Number,
      jitaBuy: Number,
      jitaBuyVolume: Number,
      jitaBuy: Number,
      jitaBuyVolume: Number,
      amarrBuy: Number,
      amarrBuyVolume: Number,
      amarrBuy: Number,
      amarrBuyVolume: Number,
    },
    ma5: {
      dq1aBuy: [Number],
      dq1aBuyVolume: [Number],
      dq1aBuy: [Number],
      dq1aBuyVolume: [Number],
      jitaBuy: [Number],
      jitaBuyVolume: [Number],
      jitaBuy: [Number],
      jitaBuyVolume: [Number],
      amarrBuy: [Number],
      amarrBuyVolume: [Number],
      amarrBuy: [Number],
      amarrBuyVolume: [Number],
    },
    ma10: {
      dq1aBuy: [Number],
      dq1aBuyVolume: [Number],
      dq1aBuy: [Number],
      dq1aBuyVolume: [Number],
      jitaBuy: [Number],
      jitaBuyVolume: [Number],
      jitaBuy: [Number],
      jitaBuyVolume: [Number],
      amarrBuy: [Number],
      amarrBuyVolume: [Number],
      amarrBuy: [Number],
      amarrBuyVolume: [Number],
    },
    ma20: {
      dq1aBuy: [Number],
      dq1aBuyVolume: [Number],
      dq1aBuy: [Number],
      dq1aBuyVolume: [Number],
      jitaBuy: [Number],
      jitaBuyVolume: [Number],
      jitaBuy: [Number],
      jitaBuyVolume: [Number],
      amarrBuy: [Number],
      amarrBuyVolume: [Number],
      amarrBuy: [Number],
      amarrBuyVolume: [Number],
    },
  },
  itemName: { type: String, unique: true },
  volume: Number,
  typeID: { type: Number, unique: true },
  groupID: Number,
  iconID: Number,
  groupName: String,
  marketGroupID: Number,
});

const PriceData = mongoose.model('PriceData', priceDataSchema);

const rawSampleData = {
  rawData: { date: ['2023-02-12T22:22:39.000Z', '2023-02-13T17:30:01.000Z', '2023-02-14T17:30:01.000Z', '2023-02-15T17:30:01.000Z', '2023-02-16T17:30:02.000Z', '2023-02-17T17:30:02.000Z', '2023-02-18T17:30:01.000Z', '2023-02-19T17:30:01.000Z', '2023-02-20T17:30:01.000Z', '2023-02-21T17:30:02.000Z', '2023-02-22T17:30:02.000Z', '2023-02-23T17:30:01.000Z', '2023-02-24T17:30:01.000Z', '2023-02-25T17:30:01.000Z'], dq1aBuy: [4.97, 4.17, 4.3, 4.36, 4.36, 4.81, 4.81, 4.87, 4.92, 4.89, 4.95, 4.93, 5, 4.96], dq1aBuyVolume: [1805908733, 1718367382, 1897827453, 2038844370, 2038844370, 2142087778, 2092680498, 2033937198, 2007504208, 1850712045, 2040523044, 2037166852, 2008563614, 1860933323], dq1aSell: [5.14, 5, 5.12, 5.11, 5.11, 4.98, 5.15, 5.23, 5.25, 5.21, 5.24, 4.94, 5.17, 5.16], dq1aSellVolume: [1561609136, 1462122758, 1597310519, 1619941481, 1619941481, 1641137109, 1195885474, 1053123686, 1474009021, 1206365719, 2614985933, 3443840833, 3114628499, 3196755404], jitaBuy: [4.02, 4.01, 4.02, 4.02, 4.01, 4, 4, 4, 4, 4.01, 4.01, 4.01, 4.01, 4.02], jitaBuyVolume: [10311662588, 10284934588, 10292934588, 10535734588, 12287966595, 7998021701, 3709392007, 3611392007, 9870063725, 9881542005, 9573682948, 7972199301, 9487299301, 11634682948], jitaSell: [4.11, 4.11, 4.1, 4.03, 4.04, 4.07, 4, 4.12, 4.08, 4.13, 4.09, 4.14, 4.13, 4.14], jitaSellVolume: [12676459265, 12489148460, 12009747629, 13415625766, 13156318494, 11355446416, 12785165311, 11656586481, 11402444422, 10151831918, 14856585041, 11086404375, 11105251144, 12846117957], amarrBuy: [3.24, 3.35, 3.19, 3.24, 3.32, 3.33, 3.33, 3.31, 3.28, 3.35, 3.14, 3.41, 3.45, 3.44], amarrBuyVolume: [5918926290, 6200131290, 5832420178, 6391004141, 6290131290, 6379131290, 5910131290, 6015131290, 5547705869, 5549455869, 5712705869, 5602705869, 5651530998, 6786788105], amarrSell: [3.75, 3.63, 3.58, 3.52, 3.33, 3.34, 3.51, 3.32, 3.8, 3.49, 3.75, 3.77, 3.46, 3.76], amarrSellVolume: [2790086085, 2824955861, 3586966400, 3894196893, 3458366374, 3271309461, 3407103704, 2859406424, 3208895659, 3662443683, 3394250983, 3304501032, 3396645487, 3602117229] },
  aggregates: {
    sampleSize: 14,
    mean: { dq1aBuy: 4.735714285714286, dq1aBuyVolume: 1969564347.7142856, dq1aSell: 5.1292857142857144, dq1aSellVolume: 1914404075.2142856, jitaBuy: 4.009999999999999, jitaBuyVolume: 9103679206.428572, jitaSell: 4.092142857142857, jitaSellVolume: 12213795191.357143, amarrBuy: 3.3128571428571427, amarrBuyVolume: 5984849974.142858, amarrSell: 3.5721428571428575, amarrSellVolume: 3332946091.071429 },
    std: { dq1aBuy: 0.29583556466165667, dq1aBuyVolume: 121587785.78833438, dq1aSell: 0.09699042662625443, dq1aSellVolume: 810790525.7422239, jitaBuy: 0.007844645405527194, jitaBuyVolume: 2574910412.816108, jitaSell: 0.04353222880872213, jitaSellVolume: 1203584409.516837, amarrBuy: 0.08965133929486295, amarrBuyVolume: 377135778.12900615, amarrSell: 0.17431971385176903, amarrSellVolume: 326588853.2549011 },
    ma5: { dq1aBuy: [null, null, null, null, 4.432, 4.4, 4.5280000000000005, 4.642, 4.7540000000000004, 4.860000000000001, 4.888000000000001, 4.912000000000001, 4.938000000000001, 4.946000000000001], dq1aBuyVolume: [null, null, null, null, 1899958461.6, 1967194270.6, 2042056893.8, 2069278842.8, 2063010810.4, 2025384345.4, 2005071398.6, 1993968669.4, 1988893952.6, 1959579775.6], dq1aSell: [null, null, null, null, 5.096, 5.064, 5.093999999999999, 5.116, 5.144, 5.164, 5.216, 5.174000000000001, 5.162000000000001, 5.144000000000001], dq1aSellVolume: [null, null, null, null, 1572185075, 1588090669.6, 1534843212.8, 1426005846.2, 1396819354.2, 1314104201.8, 1508873966.6, 1958465038.4, 2370766001, 2715315277.6], jitaBuy: [null, null, null, null, 4.016, 4.012, 4.01, 4.005999999999999, 4.002, 4.002, 4.004, 4.0059999999999985, 4.007999999999998, 4.011999999999999], jitaBuyVolume: [null, null, null, null, 10742646589.4, 10279918412, 8964809895.8, 7628501379.6, 7495367207, 7014082289, 7329214538.4, 8181775997.2, 9356957456, 9709881300.6], jitaSell: [null, null, null, null, 4.078, 4.07, 4.048, 4.052000000000001, 4.062, 4.08, 4.0840000000000005, 4.112, 4.114, 4.126], jitaSellVolume: [null, null, null, null, 12749459922.8, 12485257353, 12544460723.2, 12473828493.6, 12071192224.8, 11470294909.6, 12170522634.6, 11830770447.4, 11720503380, 12009238087], amarrBuy: [null, null, null, null, 3.268, 3.286, 3.281999999999999, 3.3059999999999987, 3.3139999999999987, 3.319999999999999, 3.281999999999999, 3.297999999999999, 3.325999999999999, 3.357999999999999], amarrBuyVolume: [null, null, null, null, 6126522637.8, 6218563637.8, 6160563637.8, 6197105860.2, 6028446205.8, 5880311121.6, 5747026037.4, 5685540953.2, 5612820894.8, 5860637342], amarrSell: [null, null, null, null, 3.5620000000000003, 3.4800000000000004, 3.456000000000001, 3.404000000000001, 3.460000000000001, 3.4920000000000018, 3.5740000000000016, 3.626000000000002, 3.654000000000002, 3.6460000000000017], amarrSellVolume: [null, null, null, null, 3310914322.6, 3407158997.8, 3523588566.4, 3378076571.2, 3241016324.4, 3281831786.2, 3306420090.6, 3285899556.2, 3393347368.8, 3471991682.8] },
    ma10: { dq1aBuy: [null, null, null, null, null, null, null, null, null, 4.646, 4.644, 4.720000000000001, 4.790000000000001, 4.8500000000000005], dq1aBuyVolume: [null, null, null, null, null, null, null, null, null, 1962671403.5, 1986132834.6, 2018012781.6, 2029086397.7, 2011295293], dq1aSell: [null, null, null, null, null, null, null, null, null, 5.130000000000001, 5.140000000000001, 5.134, 5.139000000000001, 5.144000000000001], dq1aSellVolume: [null, null, null, null, null, null, null, null, null, 1443144638.4, 1548482318.1, 1746654125.6, 1898385923.6, 2056067315.9], jitaBuy: [null, null, null, null, null, null, null, null, null, 4.0089999999999995, 4.008, 4.008, 4.007, 4.007], jitaBuyVolume: [null, null, null, null, null, null, null, null, null, 8878364439.2, 8804566475.2, 8573292946.5, 8492729417.8, 8602624253.8], jitaSell: [null, null, null, null, null, null, null, null, null, 4.079, 4.077, 4.08, 4.083, 4.093999999999999], jitaSellVolume: [null, null, null, null, null, null, null, null, null, 12109877416.2, 12327889993.8, 12187615585.3, 12097165936.8, 12040215155.9], amarrBuy: [null, null, null, null, null, null, null, null, null, 3.2939999999999996, 3.284, 3.29, 3.3160000000000003, 3.336], amarrBuyVolume: [null, null, null, null, null, null, null, null, null, 6003416879.7, 5982794837.6, 5923052295.5, 5904963377.5, 5944541773.9], amarrSell: [null, null, null, null, null, null, null, null, null, 3.527, 3.527, 3.5410000000000004, 3.529000000000001, 3.553], amarrSellVolume: [null, null, null, null, null, null, null, null, null, 3296373054.4, 3356789544.2, 3404744061.3, 3385711970, 3356504003.6] },
    ma20: { dq1aBuy: [null, null, null, null, null, null, null, null, null, null, null, null, null, null], dq1aBuyVolume: [null, null, null, null, null, null, null, null, null, null, null, null, null, null], dq1aSell: [null, null, null, null, null, null, null, null, null, null, null, null, null, null], dq1aSellVolume: [null, null, null, null, null, null, null, null, null, null, null, null, null, null], jitaBuy: [null, null, null, null, null, null, null, null, null, null, null, null, null, null], jitaBuyVolume: [null, null, null, null, null, null, null, null, null, null, null, null, null, null], jitaSell: [null, null, null, null, null, null, null, null, null, null, null, null, null, null], jitaSellVolume: [null, null, null, null, null, null, null, null, null, null, null, null, null, null], amarrBuy: [null, null, null, null, null, null, null, null, null, null, null, null, null, null], amarrBuyVolume: [null, null, null, null, null, null, null, null, null, null, null, null, null, null], amarrSell: [null, null, null, null, null, null, null, null, null, null, null, null, null, null], amarrSellVolume: [null, null, null, null, null, null, null, null, null, null, null, null, null, null] },
  },
  itemName: 'Tritanium',
  volume: 0.01,
  typeID: 34,
  groupID: 18,
  iconID: 22,
  groupName: 'Mineral',
  marketGroupID: 1857,
};

const testPriceData = new PriceData(rawSampleData);

testPriceData
  .save()
  .then(doc => console.log(doc))
  .catch(err => console.log('ERROR!!!!!!', err));
