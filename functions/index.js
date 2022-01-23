const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const functions = require("firebase-functions");

const express = require('express');
const app = express();
// const port = process.env.PORT || 3000;

const adminJs = new AdminJS({databases: [], rootPath: '/'});

const router = AdminJSExpress.buildRouter(adminJs);

app.use(adminJs.options.rootPath, router);
// app.listen(port, () => console.log('AdminJS is under localhost:8080/admin'));

exports.app = functions.https.onRequest(app);