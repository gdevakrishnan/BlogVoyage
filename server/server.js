const express = require('express');
const app = express();
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const userRouters = require('./routers/userRouters');
const postRouters = require('./routers/postRouters');
const multer = require('multer');
const path = require('path');
const { createNewPost } = require('./controllers/postControllers');

require('dotenv').config();
const { PORT, MONGO_URI } = process.env;

// To include the static files
app.use('/public/thumbnails', express.static('./public/thumbnails'));

// Json and Cors (http and header handlers)
app.use(express.json({extended: false}));
app.use(cors({origin: true, Credential: true}));

// Database and server listening
mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`The Database was Connected Successfully\nThe Server was Listening\nhttp://localhost:${PORT}`);
        });
    })
    .catch((e) => console.log(e.message));

// Multer configurations
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, './public/thumbnails');
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname +"_"+ file.originalname + "_" + Date.now() + path.extname(file.originalname));
        }
    }
);

const maxSize = 5E6;
const upload = multer(
    {
        storage: storage,
        limits: {
            fileSize: maxSize
        }
    }
)

// Multer Middleware
app.use('/blogvoyage/post/new_post', upload.single('thumbnail'), createNewPost);

// Routers
app.use('/blogvoyage', userRouters);
app.use('/blogvoyage/post', postRouters);
