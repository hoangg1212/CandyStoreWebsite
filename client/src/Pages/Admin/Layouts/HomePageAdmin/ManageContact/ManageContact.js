import classNames from 'classnames/bind';
import styles from './ManageContact.module.scss';
import { useEffect, useState } from 'react';
import request from '../../../../../config/Connect';
import { FeedBackUser } from '../../../Modal/Modal';

const cx = classNames.bind(styles);

function ManageContact() {
    const [dataContact, setDataContact] = useState([]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        request.get('/api/allcontact').then((res) => setDataContact(res.data));
    }, []);

    const handleShowModal = (idFeedBack) => {
        setShow(!show);
        setId(idFeedBack);
    };

    return (
        <div className={cx('wrapper')}>
            <h1>Thông Tin Liên Hệ Và Phản Hồi</h1>
            <div>
                <table class="table table-bordered border-primary">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Email Người Dùng</th>
                            <th scope="col">Phản Hồi</th>
                            <th scope="col">Tình Trạng</th>
                            <th scope="col">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataContact.map((item) => (
                            <tr>
                                <th scope="row">{item._id}</th>
                                <td>{item.email}</td>
                                <td>{item.contactContent}</td>
                                <td>{item.tinhTrang ? 'Đã Phản Hồi' : 'Chưa Phản Hồi'}</td>
                                <td>
                                    <button
                                        onClick={() => handleShowModal(item._id)}
                                        type="button"
                                        class="btn btn-primary"
                                    >
                                        Phản Hồi
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <FeedBackUser show={show} setShow={setShow} id={id} />
        </div>
    );
}

export default ManageContact;
