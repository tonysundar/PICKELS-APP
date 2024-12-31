import mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: [Number], required: true },
    description: { type: String, required: true },
    images: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean, required: true },
    date:{type:Number}
});

const porductModel = mongoose.model.product || mongoose.model('proudct',productSchema);

export default porductModel;