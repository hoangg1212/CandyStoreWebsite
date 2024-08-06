import classNames from 'classnames/bind';
import styles from './InfoUser.module.scss';

import Header from '../../Layouts/Header/Header';
import Footer from '../../Layouts/Footer/Footer';
import EditInfo, { ChangePassword } from './modal/Modal';
import request from '../../config/Connect';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function InfoUser() {
    const [dataUser, setDataUser] = useState();
    const [show, setShow] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const [showModalEdit, setShowModalEdit] = useState(false);
    const [dataContact, setDataContact] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);

    const token = document.cookie;

    const domain = 'http://localhost:5000/avatars/';

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            request.get('api/auth').then((res) => setDataUser(res.data));
        } else {
            navigate('/login');
        }
    }, [navigate, token]);

    const handleShowModal = async () => {
        setShow(!show);
    };

    const handleLogout = () => {
        request.get('/api/logout');
        navigate('/');
        window.location.reload();
    };

    const handleModalEditInfo = () => {
        setShowModalEdit(!showModalEdit);
    };

    const handleChangeAvatar = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('avatar', selectedFile);
        try {
            await request.post('/api/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            window.location.reload();
            console.log('Avatar uploaded successfully');
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };

    useEffect(() => {
        request.get('/api/getContact').then((res) => setDataContact(res.data));
    }, []);

    useEffect(() => {
        request.get('/api/successPayment').then((res) => res.data.map((item) => setDataOrder(item)));
    }, []);

    console.log(dataOrder);

    return (
        <div className={cx('wrapper')}>
            <header>
                <Header />
            </header>

            <main className={cx('inner')}>
                <div className={cx('form-info-user')}>
                    <div className={cx('column-1')}>
                        <img src={domain + dataUser?.avatar} alt="..." />
                        <h3>{dataUser?.fullname}</h3>
                        <div className={cx('change-avatar')}>
                            <input
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                                formEncType="multipart/form-data"
                                type="file"
                            />
                            <button onClick={handleChangeAvatar}>Đổi Avatar</button>
                        </div>
                        <button onClick={handleModalEditInfo}>Sửa thông tin</button>
                        <button onClick={handleLogout}>Đăng xuất</button>
                    </div>
                    <div className={cx('column-2')}>
                        <h2>Thông tin</h2>

                        <div className={cx('info-contact')}>
                            <div>
                                <h3>Email</h3>
                                <span>{dataUser?.email}</span>
                            </div>

                            <div>
                                <h3>Số điện thoại</h3>
                                <span>0{dataUser?.phone}</span>
                            </div>

                            <div>
                                <h3>Số dư</h3>
                                <span>{dataUser?.surplus} đ</span>
                            </div>
                        </div>

                        <div className={cx('input-change')}>
                            {/* <div class="input-group mb-3">
                                <input type="password" class="form-control" readOnly value={dataUser?.password} />
                            </div> */}
                            <button id={cx('btn-change')} onClick={handleShowModal}>
                                Đổi mật khẩu
                            </button>
                        </div>
                    </div>
                </div>

                <ChangePassword show={show} setShow={setShow} />
                <EditInfo showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} />
            </main>
            
            <div style={{ width: '80%', margin: '50px auto' }}>
                <h4>Thông tin phản hồi</h4>
                <table class="table table-bordered border-primary">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Email Người Dùng</th>
                            <th scope="col">Phản Hồi</th>
                            <th scope="col">Tình Trạng</th>
                            <th scope="col">Nội Dung Phản Hồi Từ Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataContact.map((item) => (
                            <tr>
                                <th scope="row">{item._id}</th>
                                <td>{item.email}</td>
                                <td>{item.contactContent}</td>
                                <td>{item.tinhTrang ? 'Đã Phản Hồi' : 'Chưa Phản Hồi'}</td>
                                <td>{item.contactAdmin}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ width: '80%', margin: '50px auto' }}>
            <h4>Thông tin đơn hàng</h4>
                {dataOrder.map((item) => (
                    <table class="table table-bordered border-primary">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Email Người Dùng</th>
                                <th scope="col">Đơn Hàng</th>
                                <th scope="col">Tình Trạng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">{item._id}</th>
                                <td>{item.email}</td>
                                {item.products.map((item) => (
                                    <td>{item.nameProduct}</td>
                                ))}
                                <td>{item.tinhTrang ? 'Đã Duyệt' : 'Chưa Duyệt'}</td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default InfoUser;
