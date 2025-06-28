const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const analyzeRoutes = require('./routes/analyzeRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/screenshots', express.static('screenshots'));
app.use('/results', express.static('results'));

app.use('/analyze', analyzeRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server running at http://0.0.0.0:${PORT}`));