const app = require('./app.js');

const port = process.env.PORT || 3002;

app.listen(port, (err) => {
  if (err) {
    console.log(`server connection error: ${err}`);
  } else {
    console.log(`Connected to server. Listening on ${port}`);
  }
});
