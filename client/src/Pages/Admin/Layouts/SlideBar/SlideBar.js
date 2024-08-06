import classNames from 'classnames/bind';
import styles from './SlideBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAddressBook,
    faBlog,
    faCartPlus,
    faChartLine,
    faFile,
    faHome,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SlideBar({ setActiveList }) {
    const handleActiveList = (data) => {
        setActiveList(data);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('controller')}>
                <ul>
                    <li onClick={() => handleActiveList('dash')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faHome} />
                        <h5>Trang Chủ</h5>
                    </li>

                    <li onClick={() => handleActiveList('blog')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faBlog} />
                        <h5>QL Bài Viết</h5>
                    </li>

                    <li onClick={() => handleActiveList('product')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faCartPlus} />
                        <h5>QL Sản Phẩm</h5>
                    </li>

                    <li onClick={() => handleActiveList('customer')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faUser} />
                        <h5>QL Khách Hàng</h5>
                    </li>

                    <li onClick={() => handleActiveList('contact')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faAddressBook} />
                        <h5>QL Liên Hệ</h5>
                    </li>

                    <li onClick={() => handleActiveList('order')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faFile} />
                        <h5>QL Đơn Hàng</h5>
                    </li>

                    <li onClick={() => handleActiveList('chartline')}>
                        <FontAwesomeIcon id={cx('icons')} icon={faChartLine} />
                        <h5>Thống Kê</h5>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SlideBar;
