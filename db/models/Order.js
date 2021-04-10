const mongoose = require('mongoose');
const Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0)
    mongoose.connect(require('../connection-config.js'))
        .catch(err => {
            console.error('mongoose Error', err)
        });



let OrderSchema = new Schema({
    id_order: { type: String, required: true, unique: true },
    customer: {
        company: { type: String, required: true },
        contact_person: { type: String, required: true },
      },
    item: {
        code: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        currency: { type: String, required: true },
        total_value: { type: Number, required: true },
      },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

OrderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

OrderSchema.pre('update', function () {
    this.constructor.update({_id: this._id}, { $set: { updatedAt: Date.now() } });
});

OrderSchema.pre('findOneAndUpdate', function () {
    this.constructor.update({_id: this._id}, { $set: { updatedAt: Date.now() } });
});



/** @name db.Order */
module.exports = mongoose.model('Order', OrderSchema);
