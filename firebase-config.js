const admin = require('firebase-admin');

// Đảm bảo rằng đường dẫn đến tệp serviceAccountKey.json là chính xác
const serviceAccount = require('./config/serviceAccountKey.json'); // Thay đổi đường dẫn nếu cần

// Khởi tạo Firebase Admin SDK với khóa dịch vụ
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://<your-database-name>.firebaseio.com', // Thay đổi tên database của bạn
});

module.exports = admin;
