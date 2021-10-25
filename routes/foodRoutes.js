import express from "express";
import foodModel  from "../models/food.js";
import BaseDeDatos from "../src/BaseDeDatos.js";

const app = express();
let baseDeDatos = new BaseDeDatos();

//Acá leo la base de datos con el endpoint https://<URL>/foods
app.get("/foods", async (request, response) => {
  const foods = await baseDeDatos.get_foods();

  try {
    response.send(foods);
  } catch (error) {
    response.status(500).send(error);
  }
});
//acá cargo un valor en la base de datos  https://<URL>/food?name=<nombre>&calories=<calorias>
app.post("/food", async (request, response) => {
  try {
    const food = await baseDeDatos.add_food(request.query.name, request.query.calories)
    response.send(food);
  } catch (error) {
    response.status(500).send(error);
  }
});
 //<id> es que id gigante de Mongo, eso lo tenemos que cambiar, tenemos que buscar por nombre 
// acá modifico los valores con el endpoint https://<URL>/food/<id>?name=<nombre>&calories=<calorias>
//no hace falta que la cadena esté completa, puede estar name o no y lo mismo calories
// https://<URL>/food?name=<nombre>&calories=<calorias>$id=<id>

app.put("/food", async (request, response) => {
    
  try {
    const food = await baseDeDatos.put_food(request.query.name, request.query.calories, request.query.id);
    response.send(food);
  } catch (error) {
    response.status(500).send(error);
  }
});

// acá borro con el endpoint https://<URL>/food/<id>
// el id es el gigante de Mongo, eso hay que cambiarlo
app.delete("/food/:id", async (request, response) => {
    try {
      const food = await baseDeDatos.delete_food(request.params.id);
  
      if (!food) response.status(404).send("No item found");
      response.status(200).send();
    } catch (error) {
      response.status(500).send(error);
    }
  });

  app.use((error, req, res, next) => {
    // Sets HTTP status code
    res.status(error.status)
  
    // Sends response
    res.json({
      status: error.status,
      message: error.message,
      stack: error.stack
    })
  })

  export default app;