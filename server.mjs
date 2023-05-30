import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
  const rssUrl = 'https://news.google.com/rss/search?q=florida_man&hl=en-IN&gl=IN&ceid=IN:en';

  fetch(rssUrl)
    .then(response => response.text())
    .then(xml => {
      res.setHeader('Content-Type', 'text/xml');
      res.send(xml);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('An error occurred while fetching the RSS feed.');
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
