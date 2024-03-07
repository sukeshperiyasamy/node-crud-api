const mongoose = require('mongoose');
const productSchema= mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please enter product name"]
        },
        quantity:{
type:Number,
require:true,
default:0
        },
        price:{
            type:Number,
            require:true
        }


    },
    {
        timestamps: true
    }
)

const product = mongoose.model('product',productSchema);
module.exports= product;