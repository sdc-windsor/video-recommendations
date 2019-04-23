const htmlTemplate = reactDom => `
  <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" type="text/css" href="style.css">.
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />


        <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"/>

    </head>
    <body>
        <div id="Recommendations">${reactDom}</div>
        <script src="bundle.js"></script>
    </body>
  </html>
  `;

module.exports = htmlTemplate;
