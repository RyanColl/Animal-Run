import express from 'express';
import path from 'path';

const Bundler = require('parcel-bundler');

const bundler = new Bundler(path.join(__dirname,"/index.html"), {production: process.env.NODE_ENV === 'production' });

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', "dist/index.html"))
})

app.listen(PORT, () => {
  console.log(`\n⚡️[server]: Server is running at https://localhost:${PORT}`);
});

app.use(bundler.middleware());