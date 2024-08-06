import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import { ModalAddProduct, ModalDeleteProduct, ModalEditProduct } from '../../../Modal/Modal';

const cx = classNames.bind(styles);

function Products({
    dataProducts,
    show,
    setShow,
    handleShowModalAddProduct,
    showModalDelete,
    setShowModalDelete,
    handleShowModalDeleteProduct,
    idProduct,
    handleShowModalEditProduct,
    showModalEdit,
    setShowModalEdit,
    setValueType,
    valueType,
}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-product')}>
                <h1>Quản lý sản phẩm</h1>
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
                <button
                    onClick={handleShowModalAddProduct}
                    style={{ margin: '20px' }}
                    type="button"
                    className="btn btn-primary"
                >
                    Thêm sản phẩm
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Xử lý</th>
                    </tr>
                </thead>
                <tbody>
                    {dataProducts
                        .filter((item) => valueType === '' || item.checkProducts === valueType)
                        .map((item) => (
                            <>
                                <tr key={item._id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.nameProducts}</td>
                                    <td>
                                        <img style={{ width: '120px' }} src={item.img} alt="." />
                                    </td>
                                    <td>{item.priceNew.toLocaleString()} đ</td>
                                    <td>
                                        <button
                                            onClick={() => handleShowModalEditProduct(item.id)}
                                            type="button"
                                            className="btn btn-warning"
                                        >
                                            Sửa sản phẩm
                                        </button>
                                        <button
                                            onClick={() => handleShowModalDeleteProduct(item.id)}
                                            type="button"
                                            className="btn btn-danger"
                                        >
                                            Xóa sản phẩm
                                        </button>
                                    </td>
                                </tr>
                            </>
                        ))}
                </tbody>
            </table>
            <ModalAddProduct show={show} setShow={setShow} />
            <ModalDeleteProduct
                showModalDelete={showModalDelete}
                setShowModalDelete={setShowModalDelete}
                idProduct={idProduct}
            />
            <ModalEditProduct showModalEdit={showModalEdit} setShowModalEdit={setShowModalEdit} idProduct={idProduct} />
        </div>
    );
}

export default Products;
