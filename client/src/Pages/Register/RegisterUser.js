import classNames from 'classnames/bind';
import styles from './RegisterUser.module.scss';

import request from '../../config/Connect';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(styles);

function RegisterUser() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        try {
            var pattern = /[A-Z]/;
            const checkEmail = pattern.test(email);

            if (fullname === '' || email === '' || password === '' || confirmPassword === '') {
                toast.error('Vui Lòng Xem Lại Thông Tin !!!');
            } else if (checkEmail === true) {
                toast.error('Email Không Được Viết Hoa !!!');
            } else if (password !== confirmPassword) {
                toast.error('Mật Khẩu Không Trùng Khớp !!!');
            } else {
                const res = await request.post('/api/register', {
                    fullname,
                    email,
                    password,
                    confirmPassword,
                    phone,
                });
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('header-form-login')}>
                        <span>Đăng ký </span>
                        <p>Hãy tạo cho mình 1 tài khoản mua sắm nhé !</p>
                    </div>
                    <div className={cx('input-box')}>
                        <div className={cx('form-input')}>
                            <label>Họ tên</label>
                            <input placeholder="Nhập họ tên" onChange={(e) => setFullname(e.target.value)} />
                        </div>

                        <div className={cx('form-input')}>
                            <label>Đại chỉ Email</label>
                            <input placeholder="Nhập địa chỉ Email" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className={cx('form-input')}>
                            <label>Số điện thoại</label>
                            <input placeholder="Nhập số điện thoại" onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div className={cx('form-input')}>
                            <label>Mật khẩu</label>

                            <input
                                placeholder="Nhập mật khẩu"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className={cx('form-input')}>
                            <label>Nhập lại mật khẩu</label>
                            <input
                                type="password"
                                placeholder="Nhập lại mật khẩu"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={cx('login-footer')}>
                        <p>
                            Bạn đã có tài khoản?
                            <Link id={cx('link')} to="/login">
                                Đăng nhập
                            </Link>
                            tại đây
                        </p>
                        <button onClick={handleRegister}>Đăng ký</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RegisterUser;
