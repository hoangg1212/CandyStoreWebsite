import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';

import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';
import Banner from '../Layouts/Banner/Banner';
import request from '../../config/Connect';

import LogoMomo from './img/MoMo_Logo.png';

import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../Layouts/Loading/Loading';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Checkout() {
    const [dataCart, setDataCart] = useState({});
    const [checkBox, setCheckBox] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [firstName, setFirsName] = useState('');
    const [lastName, setLastName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    const token = document.cookie;

    const navigate = useNavigate();

    const dataAddress = { firstName, lastName, phoneNumber, email, country, addressLine1, city };

    useEffect(() => {
        if (token) {
            request.get('/api/getcart').then((res) => res.data.map((item) => setDataCart(item)));
        }
    }, [token]);

    const handlePaymentMomo = async () => {
        if (
            checkBox === false ||
            firstName === '' ||
            lastName === '' ||
            companyName === '' ||
            phoneNumber === '' ||
            email === '' ||
            country === '' ||
            addressLine1 === '' ||
            addressLine2 === '' ||
            city === '' ||
            zip === ''
        ) {
            toast.error('Please accept our terms or you are missing information');
        } else if (!dataCart) {
            toast.error('Please Return to Purchase Page !!!');
        } else {
            try {
                setIsLoading(true);
                const res = await request.post('/api/paymentmomo', {
                    dataAddress,
                });
                if (res) {
                    setIsLoading(false);
                    toast.success(res.data.message);
                    setTimeout(() => {
                        window.open(res.data.payUrl);
                    }, 2000);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    };

    const handlePayment = async () => {
        if (
            checkBox === false ||
            firstName === '' ||
            lastName === '' ||
            companyName === '' ||
            phoneNumber === '' ||
            email === '' ||
            country === '' ||
            addressLine1 === '' ||
            addressLine2 === '' ||
            city === '' ||
            zip === ''
        ) {
            toast.error('Please accept our terms or you are missing information');
        } else if (!dataCart) {
            toast.error('Please Return to Purchase Page !!!');
        } else {
            request.post('/api/payment').then((res) => console.log(res.data));
            navigate('/thanks');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <header>
                <Header />
            </header>

            <Loading isLoading={isLoading} />

            <div>
                <Banner />
            </div>

            <main className={cx('inner')}>
                <div className={cx('inner-checkout')}>
                    <div className={cx('column-billing')}>
                        <h1 id={cx('title-billing')}>Thông tin chi tiết</h1>
                        <div className={cx('input-name')}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Họ"
                                    onChange={(e) => setFirsName(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên nhà riêng / công ty"
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className={cx('input-name')}>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Số điện thoại"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Địa chỉ Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Quốc gia"
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <div></div>

                        <div className="mt-5">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Thành phố/Tỉnh"
                                    onChange={(e) => setAddressLine1(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Quận/Huyện"
                                    onChange={(e) => setAddressLine2(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Phường/xã"
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div className="input-group mb-3 mt-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Mã Code/Zip"
                                    onChange={(e) => setZip(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={cx('form-order')}>
                        <div className={cx('inner-order')}>
                            <h1 id={cx('title-order')}>Đơn hàng của bạn</h1>

                            <div>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sản phẩm</th>
                                            <th scope="col">Số lượng</th>
                                            <th scope="col">Tổng tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataCart?.products?.map((item) => (
                                            <tr key={item?._id}>
                                                <td>{item?.nameProduct}</td>
                                                <td>x {item?.quantity}</td>
                                                <td>{item.price?.toLocaleString()} đ</td>
                                            </tr>
                                        ))}
                                    </tbody>

                                    <tbody>
                                        <tr>
                                            <td>Tổng cộng</td>
                                            <td></td>
                                            <td>{dataCart?.sumPrice?.toLocaleString()} đ</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={cx('form-pay')}>
                                <div className={cx('checkbox-terms')}>
                                    <input onChange={(e) => setCheckBox(e.target.checked)} type="checkbox" />
                                    <label>Tôi đã đọc và chấp nhận các đièu khoản và điều kiện*</label>
                                </div>

                                <div className={cx('payment-momo')}>
                                    <button onClick={handlePaymentMomo}>
                                        <img src={LogoMomo} alt="" />
                                        <span>Thanh Toán Mằng MoMo</span>
                                    </button>
                                </div>

                                <div className={cx('payment-on-delivery')}>
                                    <button onClick={handlePayment}>Thanh Toán Khi Nhận Hàng</button>
                                </div>

                                <div className={cx('continue')}>
                                    <button>
                                        <Link style={{ textDecoration: 'none', color: 'white' }} to="/thanks">
                                            <span>Tiếp tục </span>
                                        </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Checkout;
