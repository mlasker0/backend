const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://mydb:<db_password>@cluster0.nfdzadu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error: ", err));

// Schema and Model
const DataSchema = new mongoose.Schema({
    name: String,
    value: String
});
const Data = mongoose.model("Data", DataSchema);

// Routes
app.post('/save', async (req, res) => {
    try {
        const data = new Data(req.body);
        await data.save();
        res.status(200).json({ message: "Data saved successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Save error", error: err });
    }
});

app.get('/data', async (req, res) => {
    try {
        const allData = await Data.find();
        res.json(allData);
    } catch (err) {
        res.status(500).json({ message: "Fetch error", error: err });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
