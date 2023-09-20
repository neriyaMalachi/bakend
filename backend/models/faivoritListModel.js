import mongoose from 'mongoose';


const FaivoriteSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
});


const Faivorit=mongoose.model("faivorite",FaivoriteSchema);
export default Faivorit;
