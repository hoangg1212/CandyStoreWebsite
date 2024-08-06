function ChatBot(message, io) {
    if (message == 'Cửa hàng của bạn giới thiệu những sản phẩm gì?') {
        setTimeout(() => {
            io.emit(
                'message',
                'Chúng tôi tự hào giới thiệu đến quý khách hàng những loại bánh kẹo cao cấp như bánh tart trái cây tươi và socola hảo hạng.',
            );
        }, 1000);
    } else if (message == 'Sản phẩm nổi bật hiện tại là gì?') {
        setTimeout(() => {
            io.emit(
                'message',
                'Hiện tại, sản phẩm nổi bật của chúng tôi là bánh mousse sô cô la với lớp vị sô cô la thơm ngon.',
            );
        }, 1000);
    } else if (message == 'Làm thế nào để đặt hàng từ cửa hàng của bạn?') {
        setTimeout(() => {
            io.emit(
                'message',
                'Quý khách có thể đặt hàng trực tuyến qua website của chúng tôi hoặc liên hệ trực tiếp qua số điện thoại để được hỗ trợ tốt nhất.',
            );
        }, 1000);
    } else if (message == 'Làm sao để liên hệ với dịch vụ khách hàng của bạn?') {
        setTimeout(() => {
            io.emit(
                'message',
                'Quý khách có thể liên hệ với chúng tôi qua email dongkhanh123@gmail.com hoặc gọi vào số hotline: 0123-456-789.',
            );
        }, 1000);
    } else if (message == 'Phương thức thanh toán của cửa hàng là gì?') {
        setTimeout(() => {
            io.emit(
                'message',
                'Chúng tôi chấp nhận thanh toán bằng thẻ tín dụng, chuyển khoản ngân hàng và thanh toán khi nhận hàng (COD).',
            );
        }, 1000);
    } else if (message == 'Có dịch vụ giao hàng nào của cửa hàng không?') {
        setTimeout(() => {
            io.emit(
                'message',
                'Chúng tôi cung cấp dịch vụ giao hàng nhanh trong khu vực thành phố và dịch vụ gửi hàng đi tỉnh qua dịch vụ vận chuyển uy tín.',
            );
        }, 1000);
    } else if (message == 'Chính sách hoàn trả hàng của cửa hàng như thế nào?') {
        setTimeout(() => {
            io.emit(
                'message',
                'Chúng tôi chấp nhận đổi trả sản phẩm trong vòng 7 ngày kể từ khi nhận hàng, với điều kiện sản phẩm còn nguyên vẹn và không bị hư hỏng.',
            );
        }, 1000);
    } else if (message == 'Có chương trình khuyến mãi nào hiện tại không?') {
        setTimeout(() => {
            io.emit(
                'message',
                'Hiện tại, chúng tôi đang có chương trình giảm giá 10% cho đơn hàng đầu tiên của quý khách. Hãy ghé thăm website để biết thêm chi tiết.',
            );
        }, 1000);
    } else {
        setTimeout(() => {
            io.emit(
                'message',
                'tôi chưa hiểu ý bạn lắm !!! ,vui lòng liên hệ admin qua facebok : https://www.facebook.com/profile.php?id=100034903927283&mibextid=ZbWKwL',
            );
        }, 1000);
    }
}

module.exports = ChatBot;
