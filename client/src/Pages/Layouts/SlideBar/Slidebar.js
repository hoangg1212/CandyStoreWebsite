import classNames from 'classnames/bind';
import styles from './Slidebar.module.scss';

const cx = classNames.bind(styles);

function SlideBar({ setValueType, valueInput1, setValueInput1 }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('select-option')}>
                <div>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={(e) => setValueType(e.target.value)}
                    >
                        <>
                            <option value="" selected>
                                Tất cả
                            </option>
                            <option value="perfume">Bánh Quy</option>
                            <option value="scentedCandles">Socola</option>
                            <option value="shoe">Kẹo Organic</option>
                            <option value="lipstick">Trái Cây Sấy</option>
                        </>
                    </select>
                </div>
            </div>

            <div className={cx('range-filter')}>
                <div className={cx('price-controls')}>
                    Min
                    <input className={cx('min-price')} type="text" value={0} />
                    Max
                    <input
                        className={cx('max-price')}
                        type="text"
                        value={valueInput1}
                        onChange={(e) => setValueInput1(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default SlideBar;
