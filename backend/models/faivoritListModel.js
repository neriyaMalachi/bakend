import mongoose from 'mongoose';


const FaivoriteSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    category: { type: String, require: true },
    slug: { type: String, require: true, unique: true },
    image: { type: String, require: true },
    price: { type: String, require: true },
    countInStock: { type: String, require: true },
    brand: { type: String, require: true },
    rating: { type: Number, require: true },
    numReviews: { type: Number, require: true },
    description: { type: String, require: true },
});


const Faivorit=mongoose.model("faivorite",FaivoriteSchema);
export default Faivorit;
