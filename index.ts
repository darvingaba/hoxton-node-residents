import express from "express"
import cors from "cors"
import { houses, residents} from "./housesData"
// import { send } from "process"

const app =express()
app.use(cors())

const port = 3002

app.get("/",(req,res)=>{
    res.send(`
      <h1>House/resident Api</h1>
      <ul>
        <li><a href="/houses">Houses</a></li>
        <li><a href="/residents">Residents</a></li>
        <li></li>
      </ul>
    `)
})

app.get("/houses",(req,res)=>{
    let houseData= houses.map(house=>{
        let residentInfo= residents.find(resident=>resident.houseId===house.id)
        return { ...house, residentInfo };
    })
    res.send(houseData);
})

app.get("/residents",(req,res)=>{
    let residentsOfHouse = residents.map((resident) => {
      let house = houses.find((house) => house.id === resident.houseId);
      return { ...resident, house };
    });
    res.send(residentsOfHouse)
})

app.listen(port,()=>{
    console.log("started at 3002")
})