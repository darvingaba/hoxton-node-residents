import express from "express"
import cors from "cors"
import { houses, residents} from "./housesData"
// import { send } from "process"

const app =express()
app.use(cors())

const port = 3003

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
      return [{ ...house, residentInfo }]
    })
    res.send(houseData);
  })
  app.post("/houses",(req,res)=>{
    // let newHouse = {
    //   id: houses[houses.length - 1].id + 1,
    //   address: req.body.address,
    //   type: req.body.type
    // };
    // console.log(req.body.address);
    // houses.push(newHouse)
    res.send(houses)
    
  })

app.get("/residents",(req,res)=>{
    let residentsOfHouse = residents.map((resident) => {
      let house = houses.find((house) => house.id === resident.houseId);
      console.log(house)
      return { ...resident, house };
    });
    res.send(residentsOfHouse)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});