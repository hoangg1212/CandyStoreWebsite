import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import request from '../../../config/Connect';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

export function ModalAddProduct({ show, setShow }) {
    const handleClose = () => setShow(false);

    const [nameProduct, setNameProduct] = useState('');
    const [imgProduct, setImgProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState(Number);
    const [desProduct, setDesProduct] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [producer, setProducer] = useState('');

    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [checkPrice, setCheckPrice] = useState(false);

    const handleAddProduct = async () => {
        const checkProduct = check1
            ? 'perfume'
            : '' || check2
            ? 'scentedCandles'
            : '' || check3
            ? 'shoe'
            : '' || check4
            ? 'lipstick'
            : '';
        try {
            const res = await request.post('/api/addproduct', {
                nameProduct,
                imgProduct,
                priceProduct,
                desProduct,
                checkProduct,
                ingredient,
                producer,
                checkPrice,
            });
            toast.success(res.data.message);
            await request.get('/api/products').then();
        } catch (error) {}
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Thêm sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Tên Sản Phẩm
                        </span>
                        <input type="text" className="form-control" onChange={(e) => setNameProduct(e.target.value)} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Ảnh Sản Phẩm
                        </span>
                        <input type="text" className="form-control" onChange={(e) => setImgProduct(e.target.value)} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Giá Gốc
                        </span>
                        <input type="text" className="form-control" onChange={(e) => setPriceProduct(e.target.value)} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Mô Tả Sản Phẩm
                        </span>
                        <input type="text" className="form-control" onChange={(e) => setDesProduct(e.target.value)} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Thành Phần
                        </span>
                        <input type="text" className="form-control" onChange={(e) => setIngredient(e.target.value)} />
                    </div>

                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Nhà Sản Xuất
                        </span>
                        <input type="text" className="form-control" onChange={(e) => setProducer(e.target.value)} />
                    </div>

                    <div className={cx('option')}>
                        <div className={cx('form-checkbox')}>
                            <label>Bánh Quy</label>
                            <input type="checkbox" onChange={(e) => setCheck1(e.target.checked)} />
                        </div>

                        <div className={cx('form-checkbox')}>
                            <label>Socola</label>
                            <input type="checkbox" onChange={(e) => setCheck2(e.target.checked)} />
                        </div>

                        <div className={cx('form-checkbox')}>
                            <label>Kẹo Organic</label>
                            <input type="checkbox" onChange={(e) => setCheck3(e.target.checked)} />
                        </div>

                        <div className={cx('form-checkbox')}>
                            <label>Trái Cây Sấy</label>
                            <input type="checkbox" onChange={(e) => setCheck4(e.target.checked)} />
                        </div>
                    </div>
                    <div className={cx('form-checkbox')} style={{ margin: '10px' }}>
                        <label>Sản Phẩm Giảm Giá</label>
                        <input type="checkbox" onChange={(e) => setCheckPrice(e.target.checked)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleAddProduct}>
                        Thêm Sản Phẩm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export function ModalDeleteProduct({ showModalDelete, setShowModalDelete, idProduct }) {
    const handleClose = () => setShowModalDelete(false);

    const handleDeleteProduct = async () => {
        try {
            const res = await request.post('/api/deleteproduct', { id: idProduct });
            toast.success(res.data.message);
        } catch (error) {}
    };

    return (
        <div>
            <Modal show={showModalDelete} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Xóa Sản Phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn Muốn Xóa Sản Phẩm Có ID : {idProduct}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleDeleteProduct}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export function ModalEditProduct({ setShowModalEdit, showModalEdit, idProduct }) {
    const handleClose = () => setShowModalEdit(false);
    const [nameProduct, setNameProduct] = useState('');
    const [imgProduct, setImgProduct] = useState('');
    const [priceProduct, setPriceProduct] = useState(Number);
    const [desProduct, setDesProduct] = useState('');

    const handleEditProduct = async () => {
        try {
            const res = await request.post('/api/editproduct', {
                nameProduct,
                imgProduct,
                priceProduct,
                desProduct,
                id: idProduct,
            });
            toast.success(res.data.message);
        } catch (error) {}
    };

    return (
        <div>
            <Modal show={showModalEdit} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Sửa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Tên sản phẩm
                        </span>
                        <input type="text" className="form-control" onChange={(e) => setNameProduct(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Hình ảnh
                        </span>
                        <input type="text" className="form-control" onChange={(e) => setImgProduct(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Giá sản phẩm
                        </span>
                        <input type="text" className="form-control" onChange={(e) => setPriceProduct(e.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                            Nội dung sản phẩm
                        </span>
                        <input type="text" className="form-control" onChange={(e) => setDesProduct(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleEditProduct}>
                        Lưu Lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export function ModalAddBlog({ show, setShow }) {
    const handleClose = () => setShow(false);

    const [img, setImg] = useState('');
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');

    const handleAddBlog = async () => {
        try {
            const res = await request.post('/api/addblog', { img, title, des });
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Bài Viết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Hình ảnh"
                            onChange={(e) => setImg(e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tên bài viết"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nội dung"
                            onChange={(e) => setDes(e.target.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleAddBlog}>
                        Thêm Bài Viết
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export function CheckProduct({ show, setShow, idProduct }) {
    const handleClose = () => setShow(false);

    const handleCheckProduct = async () => {
        try {
            const res = await request.post('/api/checkproduct', { idProduct });
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Duyệt Đơn Hàng </Modal.Title>
                </Modal.Header>
                <Modal.Body>Duyệt Đơn Hàng Cho : {idProduct}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleCheckProduct}>
                        Duyệt
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export function EditBlog({ show, setShow, idBlog }) {
    const handleClose = () => setShow(false);

    const [img, setImg] = useState('');
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');

    const handleEditBlog = () => {
        request
            .post('/api/editblog', {
                img,
                title,
                des,
                idBlog,
            })
            .then((res) => toast.success(res.data.message));
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh Sửa Bài Viết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            onChange={(e) => setImg(e.target.value)}
                        />
                        <label for="floatingInput">Hình ảnh</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label for="floatingPassword">Tên bài viết</label>
                    </div>

                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            onChange={(e) => setDes(e.target.value)}
                        />
                        <label for="floatingPassword">Nội dung</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button onClick={handleEditBlog} variant="primary">
                        Lưu Lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export function FeedBackUser({ show, setShow, id }) {
    const handleClose = () => setShow(false);
    const [feedBack, setFeedBack] = useState('');

    const handleFeedBackUser = () => {
        request.post('/api/feedbackadmin', { id, feedBack }).then((res) => toast.success(res.data.message));
    };
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <ToastContainer />
                <Modal.Header closeButton>
                    <Modal.Title>Phản Hồi Người Dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="form-floating">
                        <textarea
                            class="form-control"
                            placeholder="Leave a comment here"
                            id="floatingTextarea2"
                            style={{ height: '100px' }}
                            onChange={(e) => setFeedBack(e.target.value)}
                        ></textarea>
                        <label for="floatingTextarea2">Nội dung phản hồi</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleFeedBackUser}>
                        Lưu Lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
