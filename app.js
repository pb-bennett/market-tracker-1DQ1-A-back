const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const initModels = require('./models/init-models');
const itemsRoutes = require('./routes/itemsRoutes');
const groupsRoutes = require('./routes/groupsRoutes');
const router = express.Router();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST,
});

const models = initModels(db);

const app = express();

app.use(morgan('dev'));

// const getAllPriceData = async function (req, res, next) {
//   try {
//     const results = await models.invGroups.findAll({ include: [{ all: true, nested: true, duplicating: false }] });
//     res.status(200).json({
//       status: 'success',
//       result: results,
//     });
//   } catch (error) {}
// };

// router.route('/').get(getAllPriceData);

app.use('/api/v1/prices', itemsRoutes);
app.use('/api/v1/groups', groupsRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started. Listening on port ${port}`));
