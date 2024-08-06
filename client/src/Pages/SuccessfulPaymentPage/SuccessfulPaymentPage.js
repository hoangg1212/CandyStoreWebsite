import classNames from 'classnames/bind';
import styles from './SuccessfulPaymentPage.module.scss';

import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';
import request from '../../config/Connect';

import imgCheck from './img/imgCheck.png';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function SuccessfulPaymentPage() {
    const [dataCart, setDataCart] = useState([]);

    useEffect(() => {
        request.get('/api/successPayment').then((res) => res.data.map((item) => setDataCart(item)));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('inner')}>
                <div className={cx('form-thanks-order')}>
                    <header className={cx('header')}>
                        <img src={imgCheck} alt="" />
                        {dataCart?.map((item) => (
                            <>
                                <h3>Cảm Ơn Bạn Đã Mua Hàng!</h3>
                                <p>
                                    Kính gửi {item?.email}, Chúng tôi xin gửi lời cảm ơn chân thành đến anh/chị đã tin tưởng và lựa chọn Đồng Khánh để đặt hàng. Chúng tôi rất vui mừng được phục vụ anh/chị và cam kết sẽ luôn nỗ lực hết mình để mang đến cho anh/chị những sản phẩm tốt nhất cùng dịch vụ chăm sóc khách hàng tận tình nhất..
                                </p>
                            </>
                        ))}
                    </header>

                    <main>
                        <div>
                            <table className={cx('table table-hover')}>
                                <thead>
                                    <tr>
                                        <th scope="col">Sản phẩm</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataCart.map((item) =>
                                        item.products.map((item2) => (
                                            <tr key={item2?._id}>
                                                <td>{item2?.nameProduct}</td>
                                                <td>x {item2?.quantity}</td>
                                                <td>{item2.price?.toLocaleString()} đ</td>
                                            </tr>
                                        )),
                                    )}
                                </tbody>

                                <tbody>
                                    <tr>
                                        <td>Tổng cộng</td>
                                        <td></td>
                                        {dataCart.map((item) => (
                                            <td key={item._id}>{item.sumPrice.toLocaleString()} đ</td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default SuccessfulPaymentPage;
