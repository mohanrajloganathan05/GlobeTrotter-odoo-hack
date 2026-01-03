const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const dbConnect = require('./db/connect')
const signupRoute = require('./routes/authentication/signup')
const loginRoute = require('./routes/authentication/login');
const forgetRoute = require('./routes/authentication/forget');
const verifyRoute = require('./routes/authentication/verify');
const changeRoute = require('./routes/authentication/change');
const createTripRoute = require('./routes/trips/create');
const getTripsRoute = require('./routes/trips/getTrips');
const stopsRoute = require('./routes/trips/stops');
const tripList = require('./routes/trips/triplist')

const port = process.env.PORT
app.use(express.json({ limit: '15mb' }));
app.use(cors());

app.use('/signup',signupRoute);
app.use('/login',loginRoute);
app.use('/forget',forgetRoute);
app.use('/verify',verifyRoute);
app.use('/change',changeRoute);
app.use('/create-trip',createTripRoute);
app.use('/get-trips', getTripsRoute);
app.use('/stops',stopsRoute);
app.use('/triplist',tripList)

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});