import classNames from 'classnames/bind';
import styles from './Testimonial.module.scss';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const cx = classNames.bind(styles);

function Testimonial() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Slide>
                    <div className={cx('form-info')}>
                        <h1>Đánh giá của khách hàng</h1>
                        <p>
                            Tôi rất hài lòng với dịch vụ của cửa hàng Bánh kẹo này, sản phẩm đa dạng và chất lượng, giá cả hợp lý,<br/> một địa điểm lý tưởng để mua sắm bánh kẹo.
                        </p>
                        <div>
                            <div>
                                <img
                                    alt=""
                                    src="https://preview.colorlib.com/theme/capitalshop/assets/img/gallery/founder-img.png.webp"
                                />
                            </div>
                            <div>
                                <span>Khách hàng</span>
                                <p>Lê Huy Hoàng</p>
                            </div>
                        </div>
                    </div>
                </Slide>
            </div>
        </div>
    );
}

export default Testimonial;
