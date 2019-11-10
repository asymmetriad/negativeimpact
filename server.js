const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Negative Impact Server Go!'))

app.listen(port, () => console.log(`Negative Impact server listening on http://localhost:${port}!`))
