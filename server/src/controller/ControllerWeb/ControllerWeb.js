const ModelBlog = require('../../model/ModelBlog');

class ControllerWeb {
    async GetBlog(req, res) {
        ModelBlog.find({}).then((dataBlog) => res.status(200).json(dataBlog));
    }
    async AddBlog(req, res) {
        const { img, title, des } = req.body;

        ModelBlog.findOne({})
            .sort({ id: 'desc' })
            .then(async (dataProduct) => {
                let newProductId = 1;
                if (dataProduct) {
                    newProductId = dataProduct.id + 1;
                }
                const newBlog = ModelBlog({
                    id: newProductId,
                    img: img,
                    title: title,
                    des: des,
                });
                await newBlog.save();
                return res.status(200).json({ message: 'Thêm Bài Viết Thành Công !!!' });
            });
    }
    async DeleteBlog(req, res) {
        ModelBlog.deleteOne({ id: req.body.id }).then((data) =>
            res.status(200).json({ message: 'Xóa Thành Công !!!' }),
        );
    }
    async EditBlog(req, res) {
        const { img, title, des } = req.body;
        console.log(req.body);
        ModelBlog.findOne({ id: req.body.idBlog }).then((dataProduct) => {
            if (dataProduct) {
                dataProduct
                    .updateOne({
                        img: img || dataProduct.img,
                        title: title || dataProduct.title,
                        des: des || dataProduct.des,
                    })
                    .then();
                return res.status(200).json({ message: 'Sửa Thành Công !!!' });
            } else {
                return;
            }
        });
    }
}

module.exports = new ControllerWeb();
