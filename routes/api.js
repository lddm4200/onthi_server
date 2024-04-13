var express = require('express');
var router = express.Router();

const Xemays = require('../model/xemays');
const upload = require('../config/common/upload');

// get list
router.get('/list', async (req, res) => {
    try {
        const xemays = await Xemays.find();
        if (xemays) {
            res.json({
                status: 200,
                masage: "Danh sách xe máy",
                data: xemays
            })
        } else {
            res.json({
                status: 400,
                masage: "Fail",
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 404,
            masage: "Lỗi kết nốt",
            data: []
        })
    }
});

// get theo id



router.post('/add', upload.single('image'), async (req, res) => {
    try {
        const data = req.body;
        const { file } = req;
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

        const xemay = new Xemays({
            ten_xe_ph42469: data.ten_xe_ph42469,
            mau_sac_ph42469: data.mau_sac_ph42469,
            gia_ban_ph42469: data.gia_ban_ph42469,
            mo_ta_ph42469: data.mo_ta_ph42469,
            hinh_anh_ph42469: imageUrl
        })

        const result = await xemay.save();

        if (result) {
            res.json({
                status: 200,
                masage: "add xe máy ok",
                data: result
            })
        } else {
            res.json({
                status: 400,
                masage: "add xe máy fail",
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 404,
            masage: "Lỗi kết nốt",
            data: []
        })
    }
})


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Xemays.findByIdAndDelete(id);
        if (result) {
            res.json({
                status: 200,
                masage: "delete xe máy ok",
                data: result
            })
        } else {
            res.json({
                status: 400,
                masage: "delete xe máy fail",
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 404,
            masage: "Lỗi kết nốt",
            data: []
        })
    }
})

// update 
router.put('/update/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (req.file) {
            const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
            data.hinh_anh_ph42469 = imageUrl;
        }
        const result = await Xemays.findByIdAndUpdate(id, data, { new: true });
        if (result) {
            res.json({
                status: 200,
                masage: "update xe máy ok",
                data: result
            })
        } else {
            res.json({
                status: 400,
                masage: "update xe máy fail",
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 404,
            masage: "Lỗi kết nốt",
            data: []
        })
    }
})

// search 
router.get('/search', async (req, res) => {
    try {
        const { key } = req.query;
        const result = await Xemays.find({ ten_xe_ph42469: { "$regex": key, "$options": "i" } });
        if (result) {
            res.json({
                status: 200,
                masage: "list search xe máy ok",
                data: result
            })
        } else {
            res.json({
                status: 400,
                masage: "list search xe máy fail",
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 404,
            masage: "Lỗi kết nốt",
            data: []
        })
    }
})


// search 
router.get('/search', async (req, res) => {
    try {
        const { key } = req.query;
        const result = await Xemays.find({ ten_xe_ph42469: { "$regex": key, "$options": "i" } });
        if (result) {
            res.json({
                status: 200,
                masage: "list search xe máy ok",
                data: result
            })
        } else {
            res.json({
                status: 400,
                masage: "list search xe máy fail",
                data: []
            })
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 404,
            masage: "Lỗi kết nốt",
            data: []
        })
    }
})

// sort by price
router.get('/sort', async (req, res) => {
    const { type } = req.query;
        let result = null;
        if (type == 1) {
            result = await Xemays.find().sort({ gia_ban_ph42469: 1 });
        } else {
            result = await Xemays.find().sort({ gia_ban_ph42469: -1 });
        }
        if (result) {
            res.json({
                status: 200,
                masage: "sort by price xe máy ok",
                data: result
            })
        } else {
            res.json({
                status: 400,
                masage: "sort by price xe máy fail",
                data: []
            })
        }
})
module.exports = router;
