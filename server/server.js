const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const userRouters = require('./routers/userRouters');
const postRouters = require('./routers/postRouters');

require('dotenv').config();
const { PORT, MONGO_URI } = process.env;

app.use(express.json({extended: false}));
app.use(cors({origin: true, Credential: true}));

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`The Database was Connected Successfully\nThe Server was Listening\nhttp://localhost:${PORT}`);
        });
    })
    .catch((e) => console.log(e.message));

app.use('/blogvoyage', userRouters);
app.use('/blogvoyage/post', postRouters);