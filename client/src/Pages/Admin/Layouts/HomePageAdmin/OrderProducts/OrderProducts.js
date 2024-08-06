import { useEffect, useState } from 'react';

import request from '../../../../../config/Connect';
import { CheckProduct } from '../../../Modal/Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderProducts() {
    const [dataOrder, setDataOrder] = useState([]);
    const [show, setShow] = useState(false);
    const [idProduct, setIdProduct] = useState(false);

    useEffect(() => {
        request.get('/api/getorder').then((res) => setDataOrder(res.data));
    }, [show]);

    const handleCheckProduct = (data) => {
        setShow(!show);
        setIdProduct(data);
    };

    const handleCloseOrder = (id) => {
        request.post('/api/deleteorder', { id }).then((res) => {
            toast.success(res.data.message);
            request.get('/api/getorder').then((res) => setDataOrder(res.data));
        });
    };

    return (
        <div>
            <ToastContainer />
            <h1>Quản Lý Đơn Hàng</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Xử lý</th>
                    </tr>
                </thead>
                <tbody>
                    {dataOrder?.map((item) => (
                        <tr>
                            <th scope="row">{item?.email}</th>
                            {item.products.map((item2) => (
                                <>
                                    <th>
                                        <td key={item2._id}> {item2?.nameProduct}</td>
                                    </th>
                                    <th>
                                        <td>{item2.price?.toLocaleString()} đ</td>
                                    </th>
                                    <th>
                                        <td>x {item2.quantity}</td>
                                    </th>
                                    <td>
                                        <button
                                            onClick={() => handleCheckProduct(item.email)}
                                            type="button"
                                            className="btn btn-primary"
                                        >
                                            Duyệt
                                        </button>
                                        <button
                                            onClick={() => handleCloseOrder(item._id)}
                                            type="button"
                                            className="btn btn-danger"
                                        >
                                            Hủy Đơn
                                        </button>
                                    </td>
                                </>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <CheckProduct show={show} setShow={setShow} idProduct={idProduct} />
        </div>
    );
}

export default OrderProducts;
