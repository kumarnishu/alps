import express from "express";
import path from "path"
const app = express()

app.use(express.static("dist"))

app.get('*', (req, res) => {
    res.sendFile(path.join(path.__dirname, "dist/", "index.html"));
})
app.listen(3000)