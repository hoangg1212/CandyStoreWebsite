const ModelPaymentsSuccess = require('../../model/ModelPaymentSuccess');
const ModelProducts = require('../../model/ModelProducts');
const ModelContact = require('../../model/ModelContact');

const { jwtDecode } = require('jwt-decode');
const ModelUser = require('../../model/ModelUser');

require('dotenv').config();

class ControllerAdmin {
    async GetDataOrder(req, res) {
        ModelPaymentsSuccess.find({}).then((data) => res.status(200).json(data));
    }

    async GetUser(req, res) {
        ModelUser.find({}).then((data) => res.status(200).json(data));
    }

    async AddProduct(req, res) {
        const { nameProduct, imgProduct, priceProduct, desProduct, checkProduct, ingredient, producer, checkPrice } =
            req.body;

        try {
            let dataProduct = await ModelProducts.findOne({}).sort({ id: 'desc' }).exec();

            let newProductId = 1; // Default id if no products exist in the database
            if (dataProduct) {
                newProductId = dataProduct.id + 1;
            }

            const newProduct = new ModelProducts({
                id: newProductId,
                nameProducts: nameProduct,
                img: imgProduct,
                priceOld: priceProduct,
                des: desProduct,
                checkProducts: checkProduct,
                ingredient: ingredient,
                producer: producer,
                checkPrice: checkPrice,
                priceNew: checkPrice ? priceProduct - (priceProduct * 10) / 100 : 0,
            });

            await newProduct.save();
            return res.status(200).json({ message: 'Thêm Sản Phẩm Thành Công !!!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async DeleteProduct(req, res) {
        ModelProducts.deleteOne({ id: req.body.id }).then((dataProduct) =>
            res.status(200).json({ message: 'Xóa Sản Phẩm Thành Công !!!', dataProduct }),
        );
    }

    async EditProduct(req, res) {
        const { nameProduct, imgProduct, priceProduct, desProduct } = req.body;

        ModelProducts.findOne({ id: req.body.id }).then((dataProduct) => {
            if (dataProduct) {
                dataProduct
                    .updateOne({
                        nameProducts: nameProduct || dataProduct.nameProducts,
                        img: imgProduct || dataProduct.img,
                        priceNew: priceProduct || dataProduct.priceNew,
                        des: desProduct || dataProduct.des,
                    })
                    .then();
                return res.status(200).json({ message: 'Sửa Thành Công !!!' });
            } else {
                return;
            }
        });
    }

    async GetDataAuth(req, res) {
        const token = req.cookies;
        const decoded = jwtDecode(token.Token);
        ModelUser.findOne({ email: decoded.email }).then((dataUser) => res.status(200).json({ dataUser }));
    }

    async checkProduct(req, res) {
        ModelPaymentsSuccess.findOne({ email: req.body.idProduct }).then((data) => {
            if (data) {
                data.updateOne({ tinhTrang: true }).then();
                return res.status(200).json({ message: 'Success' });
            } else {
                return;
            }
        });
    }

    async DeleteOrder(req, res) {
        ModelPaymentsSuccess.deleteOne({ _id: req.body.id }).then((data) =>
            res.status(200).json({ message: 'Hủy Đơn Hàng Thành Công !!!' }),
        );
    }

    async getAllContact(req, res) {
        ModelContact.find({}).then((data) => res.status(200).json(data));
    }
    async FeedbackAdmin(req, res) {
        const { id, feedBack } = req.body;
        ModelContact.findOne({ _id: id }).then((data) => {
            data.updateOne({ contactAdmin: feedBack, tinhTrang: true }).then();
            return res.status(200).json({ message: 'Success' });
        });
    }
    async DataSumPrice(req, res) {
        ModelPaymentsSuccess.find({}).then((data) => res.status(200).json(data));
    }
}

module.exports = new ControllerAdmin();
