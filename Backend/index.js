import express from "express";


const app = express();
const port = 8000;

app.use(express.json());
app.get("/", (req,res)=>{
    res.status(200).json({success : "Server is up"})

});


app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});