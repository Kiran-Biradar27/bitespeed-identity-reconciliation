const express = require('express');
const app = express();
require('dotenv').config();

const identifyRoute = require('./routes/identify'); // ✅ correct path

app.use(express.json()); // ✅ allows parsing JSON body
app.use('/identify', identifyRoute); // ✅ route mounted

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
