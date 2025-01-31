const ftp = require("basic-ftp");
const express = require("express");
const cors = require("cors");
const fs = require("fs");


const app = express();
app.use(cors());
app.use(express.json());


const FTP_CONFIG = {
    host: "127.0.0.1",
    user: "user1",
    password: "123",
    secure: true,
    secureOptions: { rejectUnauthorized: false }, // Acepta certificados autofirmados
    port: 21,
};


const JSON_FILE_PATH = "albums.json"; 


app.get("/albums", async (req, res) => {
    const client = new ftp.Client();
    try {
        await client.access(FTP_CONFIG);


       
        await client.downloadTo(JSON_FILE_PATH, JSON_FILE_PATH);


        
        const jsonData = fs.readFileSync(JSON_FILE_PATH, "utf8");
        const albums = JSON.parse(jsonData); 


       
        res.json(albums); 
    } catch (err) {
        console.error("Error accessing FTP server:", err);
        res.status(500).send("Failed to fetch data from FTP server.");
    } finally {
        client.close();
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
