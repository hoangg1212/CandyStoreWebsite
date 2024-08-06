import classNames from 'classnames/bind';
import styles from './LoginUser.module.scss';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import request from '../../config/Connect';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function LoginUser() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLoginUser = async () => {
        var pattern = /[A-Z]/;
        const test = pattern.test(email);
        if (email === '' || password === '' || test === true) {
            toast.error('Vui Lòng Xem Lại Thông Tin !!!');
        } else {
            try {
                const res = await request.post('/api/login', {
                    email,
                    password,
                });
                toast.success(res.data.message);
                navigate('/');
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('header-form-login')}>
                        <span>Đăng nhập</span>
                        <p>Hãy đăng nhập tài khoản để trải nghiệm cảm giác mua sám</p>
                    </div>
                    <div className={cx('input-box')}>
                        <div className={cx('form-input')}>
                            <label>Tài khoản/email</label>
                            <input placeholder="Nhập tài khoản/email" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className={cx('form-input')}>
                            <label>Mật khẩu</label>
                            <input
                                placeholder="Nhập mật khẩu"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className={cx('single-input-fields')}>
                            <div>
                                <input type="checkbox" />
                                <label>Nhớ tài khoản</label>
                            </div>
                            <a href="/#">Quên mật khẩu?</a>
                        </div>
                    </div>
                    <div className={cx('login-footer')}>
                        <p>
                            Bạn chưa có tài khoản?{' '}
                            <Link id={cx('link')} to="/register">
                                Đăng ký
                            </Link>{' '}
                            tại đây
                        </p>
                        <button onClick={handleLoginUser}>Đăng nhập</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginUser;
