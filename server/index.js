const path = require('path')
const cors = require("cors");
const express = require("express");
const app = express();

const port = process.env.PORT || "3001";

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors());
app.use("/api", require("./routes/index"));

app.use(express.static(path.join(__dirname, '..', 'client', 'public')))

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'))
})

// catch 404 and forward to error handler
app.use((err, req, res, next) => {
  console.log('404\n\n')
  console.error(JSON.stringify(err))
  console.error(err.stack)
  res.status(err.status || 500).send({ message: err.message } || 'Internal server error.')
})

app.listen(port, function () {
  console.log(`listening on port ${port}`)
})
