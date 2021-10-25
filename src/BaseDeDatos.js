import mongoose from "mongoose";

class BaseDeDatos {
    constructor(){
        const ComidaSchema = new mongoose.Schema({
            name: {
              type: String,
              required: true,
              trim: true,
              lowercase: true,
            },
            calories: {
              type: Number,
              default: 0,
              validate(value) {
                if (value < 0) throw new Error("Negative calories aren't real.");
              },
            },
        });
        this.comidaModel = mongoose.model("Comida", ComidaSchema);
    }

    get_foods () {
        const comida = this.comidaModel.find({});
        return comida;
    }

    add_food (name, calories) {
        const obj = JSON.stringify({name: name, calories: calories});
        const food = new this.comidaModel(JSON.parse(obj));
        food.save();
        return food;
    }

    put_food (name, calories, id) {
        const obj = JSON.stringify({name: name, calories: calories});
        let food = new this.comidaModel(JSON.parse(obj));
        
        const model = "model";
        
        this.comidaModel.findByIdAndUpdate(id, JSON.parse(obj), {new: true},  function (err, food) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated id: ", id);
            }
        });
        return food;
    }

    delete_food (id) {
        return this.comidaModel.findByIdAndDelete(id);
    }
}

export default BaseDeDatos;