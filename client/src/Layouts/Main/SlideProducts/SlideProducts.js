import classNames from 'classnames/bind';
import styles from './SlideProducts.module.scss';
import Slider from 'react-slick';

import latest1 from './img/01.jpg';
import latest2 from './img/02.jpg';
import latest3 from './img/03.jpg';
import latest4 from './img/04.jpg';

const cx = classNames.bind(styles);

function SlideProducts() {
    const checkScreen = window.screen.width;

    const settings = {
        className: 'center',
        infinite: true,
        centerPadding: '60px',
        slidesToShow: checkScreen < 400 ? 1 : 4,
        swipeToSlide: true,
        autoplay: true,
        speed: 100,
        cssEase: 'linear',
    };
    return (
        <div className={cx('wrapper')}>
            <header className={cx('header-slide')}>
                <h3>Sản phẩm bán chạy</h3>
            </header>

            <div className={cx('slider-container')}>
                <Slider {...settings}>
                    <div>
                        <img src={latest1} alt="..." />
                    </div>
                    <div>
                        <img src={latest2} alt="..." />
                    </div>
                    <div>
                        <img src={latest3} alt="..." />
                    </div>
                    <div>
                        <img src={latest4} alt="..." />
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default SlideProducts;
