const loginForm = document.getElementById('loginForm');
const alertOverlay = document.getElementById('alertOverlay');
const alertTitle = document.getElementById('alertTitle');
const alertMessage = document.getElementById('alertMessage');
const alertBtn = document.getElementById('alertBtn');

let isSuccess = false;

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();

    let users = JSON.parse(sessionStorage.getItem('registeredUsers')) || [];
    let matchedUser = users.find(u => u.username === user && u.password === pass);

    if ((user === "admin123" && pass === "123456") || matchedUser) {
        isSuccess = true;
        alertTitle.textContent = "Thành công";
        alertMessage.textContent = "Đăng nhập thành công! Chào mừng bạn quay trở lại hệ thống.";
    } else {
        isSuccess = false;
        alertTitle.textContent = "Lỗi đăng nhập";
        alertMessage.textContent = "Tài khoản không tồn tại hoặc mật khẩu không chính xác.";
    }
    alertOverlay.classList.add('active');
});

alertBtn.addEventListener('click', function() {
    alertOverlay.classList.remove('active');
    if (isSuccess) {
        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.href = "car.html";
    }
});