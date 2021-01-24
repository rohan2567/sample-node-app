const express = require('express')
const app = express()

app.get('/', (req, res) => res.send("Version 1 of application"))
app.listen(3000, () => console.log('Server ready'))

