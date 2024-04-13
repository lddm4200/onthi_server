const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const XeMayModel = new Schema({
    ten_xe_ph42469 : {type : String, },
    mau_sac_ph42469 : {type : String, },
    gia_ban_ph42469 : {type : Number, required: true, default: 0},
    mo_ta_ph42469 : {type: String},
    hinh_anh_ph42469 : {type: String}
});

module.exports = mongoose.model('xemay',XeMayModel);