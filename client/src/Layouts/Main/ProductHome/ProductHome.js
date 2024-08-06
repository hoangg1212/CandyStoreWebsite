import classNames from 'classnames/bind';
import styles from './ProductHome.module.scss';

import request from '../../../config/Connect';

import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function ProductHome() {
    const priceNew = 50000;
    const priceOld = 40000;

    const [dataProducts, setDataProducts] = useState([]);

    useEffect(() => {
        request.get('/api/products').then((res) => setDataProducts(res.data));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h3
                style={{
                    textAlign: 'center',
                    fontSize: '40px',
                    fontWeight: '700',
                    borderBottom: '1px solid #ccc',
                    width: '80%',
                    margin: 'auto',
                }}
            >
                Sản Phẩm Nổi Bật
            </h3>
            <div className={cx('inner')}>
                {dataProducts.slice(0, 8).map((item) => (
                    <div className={cx('form-pro')}>
                        <img src={item?.img} alt="" />

                        <h4>{item?.nameProducts}</h4>
                        <div className={cx('price-slide-products')}>
                            {item?.priceNew > 0 ? (
                                <span id={cx('price-new')}>{item?.priceNew.toLocaleString()} đ</span>
                            ) : (
                                <></>
                            )}
                            <span
                                style={item?.priceNew > 0 ? { textDecoration: 'line-through', color: '#ff2020' } : {}}
                                id={cx('price-new')}
                            >
                                {priceOld.toLocaleString()} đ
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductHome;
