import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import classNames from 'classnames/bind';
import styles from './Slide.module.scss';

// import imgBanner from './img/imgBanner1.jpg';
// import imgBanner1 from './img/imgBanner2.jpg';

import banner1 from './img/banner1.jpg';
import banner2 from './img/banner2.jpg';
import banner3 from './img/banner3.jpg';

const cx = classNames.bind(styles);

function SlideWeb() {
    const slideImages = [
        {
            url: banner1,
        },

        {
            url: banner2,
        },
        {
            url: banner3,
        },
    ];

    return (
        <div className={cx('slide-container')}>
            <Slide>
                {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        {
                            // <div className={cx('text-img')}>
                            //     <span>Fashion Sale</span>
                            //     <h1>Minimal Menz Style</h1>
                            //     <p>
                            //         Consectetur adipisicing elit. Laborum fuga incidunt laboriosam voluptas iure,
                            //         delectus dignissimos facilis neque nulla earum.
                            //     </p>
                            // </div>
                        }
                        {/* <div className={cx('slides')} style={{ backgroundImage: `url(${slideImage.url})` }}></div>
                         */}
                        <div className={cx('img')}>
                            <img src={slideImage.url} alt="" />
                        </div>
                    </div>
                ))}
            </Slide>
        </div>
    );
}

export default SlideWeb;
