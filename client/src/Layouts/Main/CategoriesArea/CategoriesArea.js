import classNames from 'classnames/bind';
import styles from './CategoriesArea.module.scss';

import services1 from './img/services1.png';
import services2 from './img/services2.png';
import services3 from './img/services3.png';
import services4 from './img/services4.png';

const cx = classNames.bind(styles);

function CategoriesArea() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row-1')}>
                <img src={services1} alt="" />
                <h5>Giao hàng nhanh</h5>
                <p>Dịch vụ giao hàng nhanh</p>
            </div>

            <div className={cx('row-1')}>
                <img src={services2} alt="" />
                <h5>Thanh toán trực tuyến</h5>
                <p>Dịch vụ thanh toán trực tuyến</p>
            </div>

            <div className={cx('row-1')}>
                <img src={services3} alt="" />
                <h5>Chính sách hoàn tiền</h5>
                <p>Cung cấp dịch vụ hoàn tiền</p>
            </div>

            <div className={cx('row-1')}>
                <img src={services4} alt="" />
                <h5>Hỗ trợ 24/7</h5>
                <p>Nhân viên hỗ trợ 24/7</p>
            </div>
        </div>
    );
}

export default CategoriesArea;
