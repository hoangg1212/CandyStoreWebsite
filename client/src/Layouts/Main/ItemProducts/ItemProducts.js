import classNames from 'classnames/bind';
import styles from './ItemProducts.module.scss';

import img1 from './img/hinh1.jpg';
import img2 from './img/hinh2.jpg';
import img3 from './img/hinh3.jpg';

const cx = classNames.bind(styles);

function ItemProducts() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row-product')}>
                <img id={cx('img-item')} src={img1} alt="123" />
                {/* <span>The Bathroom</span> */}
            </div>

            <div className={cx('row-product')}>
                <img id={cx('img-item')} src={img2} alt="123" />
                {/* <span>Scented Candles</span> */}
            </div>

            <div className={cx('row-product')}>
                <img id={cx('img-item')} src={img3} alt="123" />
                {/* <span>Women's Perfume</span> */}
            </div>
        </div>
    );
}

export default ItemProducts;
