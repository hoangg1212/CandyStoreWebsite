import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <header className={cx('header-footer')}>
                    <div className={cx('header-column-1')}>
                        <h3>Đăng ký để theo dõi đơn hàng</h3>
                        <p>Đăng ký để nhận được những thông báo về sản phẩm đang được giảm giá</p>
                    </div>
                    <div className={cx('input-contact')}>
                        <input placeholder="Nhập Email của bạn" />
                        <button>Đăng ký</button>
                    </div>
                    <div className={cx('icons')}>
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faInstagram} />
                        <FontAwesomeIcon icon={faYoutube} />
                    </div>
                </header>
                <main className={cx('info-contact')}>
                    <div className={cx('column-1')}>
                        <h4>Bánh Quy</h4>
                        <ul>
                            <li>Bánh dừa nướng TOPCOCO</li>
                            <li>Bánh gạo</li>
                            <li>Bánh ngũ cốc thanh Annie's</li>
                        </ul>
                    </div>

                    <div className={cx('column-1')}>
                        <h4>Socola</h4>
                        <ul>
                            <li>Socola đen nguyên chất</li>
                        </ul>
                    </div>

                    <div className={cx('column-1')}>
                        <h4>Kẹo Organic</h4>
                        <ul>
                            <li>Kẹo dừa</li>
                            <li>Kẹo dẻo</li>
                        </ul>
                    </div>

                    <div className={cx('column-1')}>
                        <h4>Trái cây sấy</h4>
                        <ul>
                            <li>Hạt dẻ hữu cơ</li>
                            <li>Nho khô hữu cỡ</li>
                        </ul>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Footer;
