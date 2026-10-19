// ==============================================================
// 1. MENU TRƯỢT
// ==============================================================
const sidebar = document.querySelector(".sidebar");
const menuBtn = document.querySelector("#btn");
const menuIcon = document.querySelector("#btn i");
const menuText = document.querySelector("#btn span");

if(menuBtn) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        if(sidebar.classList.contains("open")) {
            menuIcon.classList.replace("bx-menu", "bx-x");
            menuText.textContent = "ĐÓNG";
        } else {
            menuIcon.classList.replace("bx-x", "bx-menu");
            menuText.textContent = "MENU";
        }
    });
}

const navLinks = document.querySelectorAll('.nav-links li');
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ==============================================================
// 2. LẤY DỮ LIỆU TỪ KHO TỔNG & RENDER XE (SPOTLIGHT)
// ==============================================================
let inventoryData = [];
if (typeof getCarsFromDB === "function") {
    inventoryData = getCarsFromDB(); // Lấy từ database.js
}

let filteredData = [...inventoryData]; 
const spotlightCard = document.getElementById("carSpotlight");
let currentCarIndex = 0;
let autoPlayTimer;

function renderSpotlight() {
    if (!spotlightCard) return;

    if (filteredData.length === 0) {
        spotlightCard.innerHTML = `<h2 style="text-align:center; padding: 50px; color: var(--text-muted);">Không tìm thấy xe phù hợp!</h2>`;
        return;
    }

    const car = filteredData[currentCarIndex];
    spotlightCard.style.opacity = 0; 
    
    setTimeout(() => {
        let carImageUrl = car.image || car.img || "https://via.placeholder.com/800x400?text=No+Image";

        spotlightCard.innerHTML = `
            <div class="spot-top">
                <div class="badges-left">
                    <span class="badge-tag ${car.statusClass || 'bg-gray'}">${car.status || 'Đang cập nhật'}</span>
                    <span class="badge-tag bg-gray">TỒN KHO: ${car.aging || 0} NGÀY</span>
                </div>
                <img src="${carImageUrl}" alt="${car.name}" class="car-img">
            </div>
            
            <div class="spot-bottom">
                <h1>${car.name}</h1>
                <div class="car-specs">
                    <i class='bx bx-calendar'></i> ${car.year || '2024'} &nbsp;&nbsp; 
                    ${car.specs}
                </div>
                
                <div class="price-box" style="margin-bottom:0;">
                    <div class="p-item"><small>Giá niêm yết</small><strong>${car.price || 'Liên hệ'}</strong></div>
                    <div class="p-item discount"><small>Max Khuyến mãi</small><strong>${car.discount || '0 ₫'}</strong></div>
                    <div class="p-item cost"><small>Giá vốn nhập</small><strong>${car.importPrice || car.cost || '****** ₫'}</strong></div>
                </div>
            </div>
        `;
        spotlightCard.style.opacity = 1; 
    }, 200);
}

// ==============================================================
// 3. TÌM KIẾM & LỌC NHANH
// ==============================================================
const searchInput = document.getElementById('searchInput');
const pills = document.querySelectorAll('.pill');

function applyFilters() {
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const activePill = document.querySelector('.pill.active');
    const filterValue = activePill ? activePill.getAttribute('data-filter') : "all";

    filteredData = inventoryData.filter(car => {
        const matchKeyword = car.name.toLowerCase().includes(keyword);
        // Khớp chuẩn với 4 trạng thái: pending, deposited, completed, cancelled
        const matchFilter = (filterValue === 'all') ? true : (car.category === filterValue);
        return matchKeyword && matchFilter;
    });

    currentCarIndex = 0; 
    renderSpotlight();
    resetAutoPlay();
}

if(searchInput) searchInput.addEventListener('input', applyFilters);
pills.forEach(pill => {
    pill.addEventListener('click', function() {
        pills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        applyFilters();
    });
});

// ==============================================================
// 4. VUỐT CHUỘT & TỰ ĐỘNG LƯỚT
// ==============================================================
function nextCar() { 
    if (filteredData.length <= 1) return;
    currentCarIndex = (currentCarIndex + 1) % filteredData.length; renderSpotlight(); 
}
function prevCar() { 
    if (filteredData.length <= 1) return;
    currentCarIndex = (currentCarIndex - 1 + filteredData.length) % filteredData.length; renderSpotlight(); 
}

function startAutoPlay() { autoPlayTimer = setInterval(nextCar, 4000); }
function resetAutoPlay() { clearInterval(autoPlayTimer); startAutoPlay(); }

// Xử lý mũi tên bấm
const btnNext = document.getElementById('spotNext');
const btnPrev = document.getElementById('spotPrev');
if(btnNext) btnNext.addEventListener('click', () => { nextCar(); resetAutoPlay(); });
if(btnPrev) btnPrev.addEventListener('click', () => { prevCar(); resetAutoPlay(); });

// Xử lý Vuốt
const swipeArea = document.getElementById("swipeArea");
if(swipeArea) {
    let startX = 0;
    swipeArea.addEventListener("mousedown", e => { startX = e.clientX; clearInterval(autoPlayTimer); });
    swipeArea.addEventListener("mouseup", e => handleSwipe(e.clientX));
    swipeArea.addEventListener("touchstart", e => { startX = e.touches[0].clientX; clearInterval(autoPlayTimer); });
    swipeArea.addEventListener("touchend", e => handleSwipe(e.changedTouches[0].clientX));

    function handleSwipe(endX) {
        let diff = startX - endX;
        if (diff > 50) { nextCar(); resetAutoPlay(); } 
        else if (diff < -50) { prevCar(); resetAutoPlay(); }
        else { startAutoPlay(); }
    }
}

// Khởi chạy khi load
renderSpotlight();
startAutoPlay();

// ==============================================================
// 5. VẼ BIỂU ĐỒ BÁO CÁO (CHART.JS) - ĐẢM BẢO KHÔNG THỂ LỖI
// ==============================================================
window.addEventListener('load', function() {
    try {
        // Biểu đồ Cột (Doanh thu)
        const ctxRev = document.getElementById('revenueChart');
        if (ctxRev) {
            new Chart(ctxRev.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
                    datasets: [{ 
                        label: 'Doanh thu (Tỷ)', 
                        data: [42.5, 38.2, 55.0, 48.7, 62.1, 80.5], 
                        backgroundColor: '#111827', 
                        borderRadius: 4 
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false, 
                    plugins: { legend: { display: false } } 
                }
            });
        }

        // Biểu đồ Tròn (Tồn kho)
        const ctxInv = document.getElementById('inventoryChart');
        if (ctxInv) {
            new Chart(ctxInv.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Sẵn sàng', 'Đã cọc', 'Đã giao', 'Đã hủy'],
                    datasets: [{ 
                        data: [3, 2, 2, 1], // Dữ liệu demo
                        backgroundColor: ['#10B981', '#F59E0B', '#3B82F6', '#EF4444'], 
                        borderWidth: 0 
                    }]
                },
                options: { 
                    responsive: true, 
                    maintainAspectRatio: false, 
                    cutout: '75%', 
                    plugins: { legend: { position: 'right' } } 
                }
            });
        }
    } catch (error) {
        console.error("Lỗi vẽ biểu đồ: ", error);
    }
});
// ==============================================================
// ĐỒNG BỘ 3 KHÁCH HÀNG MỚI NHẤT TỪ TRANG QUẢN LÝ KHÁCH HÀNG
// ==============================================================
window.addEventListener('load', function() {
    // 1. Tìm cái thẻ <tbody> của bảng khách hàng trên trang chủ
    const crmTableBody = document.querySelector(".crm-table tbody");
    if (!crmTableBody) return; // Nếu không có bảng thì bỏ qua

    // 2. Lấy dữ liệu khách hàng từ Kho lưu trữ của trang qlkh.html
    // (Bên trang kia sếp đang lưu với key là "helloKittyAutoCustomers")
    const customersData = JSON.parse(localStorage.getItem("helloKittyAutoCustomers"));

    // Nếu có dữ liệu khách hàng thật
    if (customersData && customersData.length > 0) {
        crmTableBody.innerHTML = ""; // Xóa dữ liệu gõ tay cũ đi
        
        // Chỉ lấy đúng 3 người khách hàng đầu tiên (mới nhất) để hiện lên trang chủ
        const top3Customers = customersData.slice(0, 3);

        top3Customers.forEach(cus => {
            // Tự động phân loại màu sắc độ nóng của khách
            let badgeClass = "cold"; let badgeText = "Hẹn tư vấn";
            if (cus.status === "Khách mới") { badgeClass = "hot"; badgeText = "NÓNG (CẦN GỌI NGAY)"; }
            if (cus.status === "Đang tư vấn") { badgeClass = "warm"; badgeText = "Đang theo dõi"; }

            // Chèn vào bảng
            crmTableBody.innerHTML += `
                <tr>
                    <td><strong>${cus.name}</strong><br><small style="color: var(--text-muted);">Nguồn: Website</small></td>
                    <td>${cus.phone}</td>
                    <td><strong>${cus.car}</strong></td>
                    <td><span class="lead-badge ${badgeClass}">${badgeText}</span></td>
                    <td><button class="btn-call" onclick="window.location.href='qlkh.html'"><i class='bx bx-phone-call'></i> Gọi điện</button></td>
                </tr>
            `;
        });
    }
});