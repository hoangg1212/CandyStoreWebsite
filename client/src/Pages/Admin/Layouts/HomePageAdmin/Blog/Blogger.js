import { toast, ToastContainer } from 'react-toastify';
import request from '../../../../../config/Connect';
import { EditBlog, ModalAddBlog } from '../../../Modal/Modal';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
const cx = classNames.bind(styles);

function Blogger() {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [dataBlog, setDataBlog] = useState([]);
    const [id, setId] = useState('');

    const handleShow = () => {
        setShow(!show);
    };

    useEffect(() => {
        request.get('/api/getblog').then((res) => setDataBlog(res.data));
    }, [show, show1]);

    const handleShow1 = (idblog) => {
        setShow1(!show1);
        setId(idblog);
    };

    const handleDeleteBlog = async (data) => {
        const res = await request.post('/api/deleteblog', { id: data });
        await request.get('/api/getblog').then((res) => setDataBlog(res.data));
        toast.success(res.data.message);
    };

    return (
        <>
            <h1>Quản Lý Bài Viết</h1>
            <div className={cx('btn-addBlog')}>
                <button onClick={handleShow} type="button" className="btn btn-primary">
                    Thêm Bài Viết
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên bài viết</th>
                        <th scope="col">Nội dung</th>
                        <th scope="col">Xử lý</th>
                    </tr>
                </thead>
                <tbody>
                    {dataBlog.map((item) => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>
                                <img style={{ width: '150px' }} src={item.img} alt={item.img} />
                            </td>
                            <td>{item.title}</td>
                            <td>{item.des}</td>
                            <td className="action-buttons">
                                <button
                                    onClick={() => handleDeleteBlog(item.id)}
                                    type="button"
                                    className="btn btn-danger"
                                >
                                    Xóa Bài Viết
                                </button>
                                <button onClick={() => handleShow1(item.id)} type="button" className="btn btn-warning">
                                    Sửa Bài Viết
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
            <ModalAddBlog show={show} setShow={setShow} />
            <EditBlog show={show1} setShow={setShow1} idBlog={id} />
        </>
    );
}

export default Blogger;
