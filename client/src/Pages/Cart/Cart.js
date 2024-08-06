import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';
import Banner from '../Layouts/Banner/Banner';

import request from '../../config/Connect';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function CartUser() {
    const [cartItems, setCartItems] = useState([]);
    const [quantity, setQuantity] = useState({});

    const token = document.cookie;

    useEffect(() => {
        const dataCart = localStorage.getItem('products');
        const parsedCart = JSON.parse(dataCart);
        setCartItems(parsedCart || []);
    }, []);

    const total = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.priceNew * (quantity[item.id] || 1), 0);
    }, [cartItems, quantity]);

    const handleIncreaseQuantity = (id) => {
        setQuantity((prevQuantity) => ({
            ...prevQuantity,
            [id]: (prevQuantity[id] || 0) + 1,
        }));
    };

    const handleDecreaseQuantity = (id) => {
        if (quantity[id] > 1) {
            setQuantity((prevQuantity) => ({
                ...prevQuantity,
                [id]: prevQuantity[id] - 1,
            }));
        }
    };

    const handleDeleteProduct = (id) => {
        const updatedCart = [...cartItems];
        const index = updatedCart.findIndex((item) => item.id === id);
        if (index !== -1) {
            updatedCart.splice(index, 1);
            setCartItems(updatedCart);
            localStorage.setItem('products', JSON.stringify(updatedCart));
        }
    };

    const handlePostCart = async () => {
        if (!token) {
            toast.error('Bạn Cần Đăng Nhập !!!');
            return;
        } else if (cartItems.length <= 0) {
            toast.error('Please add product to cart');
        } else {
            try {
                const dataToSend = cartItems.map((item) => ({
                    id: item.id,
                    quantity: quantity[item.id] || 1,
                }));
                const res = await request.post('/api/cart', dataToSend);
                localStorage.removeItem('products');
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <header>
                <Header />
            </header>
            <div>
                <Banner />
            </div>
            <main>
                <div className={cx('inner')}>
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Tên sản phẩm</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Tổng tiền</th>
                                    <th scope="col">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.nameProducts}</td>
                                        <td>{item.priceNew.toLocaleString()} đ</td>
                                        <td>
                                            <div className={cx('btn-value-products')}>
                                                <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                                                <span>{quantity[item.id] || 1}</span>
                                                <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                                            </div>
                                        </td>
                                        <td>{(item.priceNew * (quantity[item.id] || 1)).toLocaleString()} đ</td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteProduct(item.id)}
                                                type="button"
                                                className="btn btn-danger"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="3">Thanh toán</td>
                                    <td>{total.toLocaleString()} đ</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={cx('btn-cart')}>
                        <Link to="/category">
                            <button>Tiếp tục mua sắm</button>
                        </Link>
                        <Link to="/checkout">
                            <button onClick={handlePostCart}>Tiến hành thanh toán</button>
                        </Link>
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default CartUser;
