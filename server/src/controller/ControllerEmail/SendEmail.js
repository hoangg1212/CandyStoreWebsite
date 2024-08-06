const { google } = require('googleapis');
const nodemailer = require('nodemailer');
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (email) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'huyhoang1212.cke@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        const info = await transport.sendMail({
            from: '"Dong Khanh Cảm Ơn " <huyhoang1212.cke@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Thư Cảm Ơn ', // Subject line
            text: 'Hello world?', // plain text body
            html: `<b>
            Dear ${email}
            Chúng tôi xin chân thành cảm ơn Quý khách đã tin tưởng và lựa chọn sản phẩm của chúng tôi. Sự hài lòng của Quý khách là nguồn động viên lớn lao giúp chúng tôi không ngừng nỗ lực và phát triển.
            Chúng tôi tự hào vì đã có cơ hội phục vụ Quý khách và mong muốn được tiếp tục nhận được sự ủng hộ của Quý khách trong tương lai. Nếu có bất kỳ ý kiến đóng góp hoặc thắc mắc nào, xin vui lòng liên hệ với chúng tôi. Chúng tôi luôn sẵn lòng lắng nghe và cải thiện dịch vụ để phục vụ</b>`,
        });
    } catch (error) {
        console.log('Error sending email:', error);
    }
};

module.exports = sendMail;
