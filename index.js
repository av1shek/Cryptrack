require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { handleSend, handleForward, handleTrack } = require('./routes');

const app = express();

const corsOption = {
    origin: '*',
    optionSuccessStatus: 200,
};

const httpServer = http.createServer(app);

app.use(cors(corsOption));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterList: 5000 }));

// app.get('/', (req, res) => {
//     res.status(200).send('Welcome to SAEWF');
// });

app.use('/send', handleSend);
app.use('/forward', handleForward);
app.use('/track', handleTrack);

const port = process.env.PORT || 8080;

httpServer.listen(port, () => {
    console.log('http server is running at ', port);
});
