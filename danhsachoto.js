// ==============================================================
// 1. BIẾN TOÀN CỤC & KHỞI TẠO (KẾT NỐI KHO TỔNG)
// ==============================================================
let carList = [];
let currentPage = 1;
const itemsPerPage = 4; // 4 xe trên 1 trang
let currentCategory = 'all';
let filteredCarsCache = [];

document.addEventListener("DOMContentLoaded", function() {
    // 1.1 Khởi động Menu trái
    const sidebar = document.querySelector(".sidebar");
    const menuBtn = document.querySelector("#btn");
    if (menuBtn) {
        const menuIcon = menuBtn.querySelector("i");
        const menuText = menuBtn.querySelector("span");
        menuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("open");
            if (sidebar.classList.contains("open")) {
                if (menuIcon) menuIcon.classList.replace("bx-menu", "bx-x");
                if (menuText) menuText.textContent = "ĐÓNG";
            } else {
                if (menuIcon) menuIcon.classList.replace("bx-x", "bx-menu");
                if (menuText) menuText.textContent = "MENU";
            }
        });
    }

    // 1.2 Lấy xe từ kho tổng database.js
    if (typeof getCarsFromDB === 'function') {
        carList = getCarsFromDB(); 
    }
    filteredCarsCache = [...carList];
    updateStockLabels();
    renderPage(1);
});

// Cập nhật nhãn đếm xe đã bán / chưa bán
function updateStockLabels() {
    let unSoldCarsCount = carList.filter(car => !car.isSold).length;
    let soldCarsCount = carList.filter(car => car.isSold).length;

    const unSoldLabel = document.getElementById('un-sold-label');
    const soldLabel = document.getElementById('sold-label');

    if (unSoldLabel) unSoldLabel.innerText = `Xe chưa bán (${unSoldCarsCount})`;
    if (soldLabel) soldLabel.innerText = `Xe đã bán (${soldCarsCount})`;
}

// ==============================================================
// 2. BỘ LỌC DỮ LIỆU (THEO HÃNG, CHỖ NGỒI, DẪN ĐỘNG)
// ==============================================================
function applyFilters() {
    let selectedSeats = Array.from(document.querySelectorAll('input[name="seatFilter"]:checked')).map(cb => cb.value);
    let selectedDrives = Array.from(document.querySelectorAll('input[name="driveFilter"]:checked')).map(cb => cb.value);
    let selectedStockStatus = Array.from(document.querySelectorAll('input[name="stockStatusFilter"]:checked')).map(cb => cb.value);

    let result = carList.filter(car => {
        let matchCategory = (currentCategory === 'all' || car.carType === currentCategory);
        let matchSeats = (selectedSeats.length === 0 || selectedSeats.includes(car.seats));
        let matchDrive = (selectedDrives.length === 0 || selectedDrives.includes(car.drive));
        
        let matchStockStatus = true;
        if (selectedStockStatus.length > 0) {
            let isMatchUnSold = selectedStockStatus.includes('un-sold') && !car.isSold;
            let isMatchSold = selectedStockStatus.includes('sold') && car.isSold;
            matchStockStatus = isMatchUnSold || isMatchSold;
        }

        return matchCategory && matchSeats && matchDrive && matchStockStatus;
    });

    filteredCarsCache = result;
    renderPage(1);
}

function filterCarType(type) {
    currentCategory = type;
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';

    let titles = {
        'all': 'Tất Cả Các Dòng Xe Chính',
        'electric': 'Dòng Xe Điện (Electric)',
        'gasoline': 'Dòng Xe Xăng (Gasoline)',
        'hybrid': 'Dòng Xe Hybrid'
    };
    
    document.getElementById('section-title').innerText = titles[type] || 'Danh Sách Các Dòng Xe';
    applyFilters();
}

function searchCarByName() {
    let input = document.getElementById('searchInput').value.toLowerCase().trim();
    let titleElem = document.getElementById('section-title');

    if (input !== '') {
        titleElem.innerText = "Kết quả tìm kiếm cho: " + document.getElementById('searchInput').value;
    } else {
        titleElem.innerText = "Tất Cả Các Dòng Xe Chính";
    }

    filteredCarsCache = carList.filter(car => car.name.toLowerCase().includes(input));
    renderPage(1);
}

// ==============================================================
// 3. HIỂN THỊ DANH SÁCH & PHÂN TRANG (ĐÃ FIX MŨI TÊN BOXICONS)
// ==============================================================
function renderPage(page) {
    currentPage = page;
    const grid = document.getElementById('car-variants-grid');
    const paginationContainer = document.getElementById('pagination-container');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    let start = (page - 1) * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = filteredCarsCache.slice(start, end);

    if (paginatedItems.length === 0) {
        grid.innerHTML = `<h3 class="text-gray-500 w-full text-center mt-10">Không tìm thấy xe nào phù hợp!</h3>`;
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    paginatedItems.forEach((car) => {
        let tagsHtml = car.tags ? car.tags.map(tag => `<span class="px-2.5 py-1 bg-gray-100 text-xs rounded font-medium">${tag}</span>`).join('') : '';
        
        let soldBadgeHtml = car.isSold 
            ? `<div class="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg z-10">Đã Bán</div>` 
            : ``;

        let cardHtml = `
            <div class="car-item car-card bg-white rounded-2xl p-6 pt-2 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden">
                ${soldBadgeHtml}
                <div>
                    <div class="car-image-container h-48 flex items-center justify-center my-4">
                        <img src="${car.img || car.image}" alt="${car.name}" class="max-h-full max-w-full object-contain drop-shadow-xl" onerror="this.src='https://via.placeholder.com/400x200?text=Car+Image'">
                    </div>
                    <div class="flex justify-between items-start mb-1">
                        <h3 class="car-name text-xl font-bold">${car.name}</h3>
                        <button onclick="openEditSoldModal('${car.id}')" class="text-xs bg-gray-100 hover:bg-black hover:text-white px-2.5 py-1 rounded-lg transition" title="Sửa trạng thái bán">
                            <i class='bx bx-edit-alt'></i> Sửa bán
                        </button>
                    </div>
                    <p class="text-sm text-gray-500 mb-1">Giá bán: <strong class="text-gray-900">${car.price}</strong></p>
                    <p class="text-sm text-gray-500 mb-4">Năm: <strong class="text-gray-900">${car.year}</strong> - <strong class="text-blue-600">${car.seats} chỗ ngồi</strong></p>
                    
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${tagsHtml}
                        <span class="px-2.5 py-1 bg-gray-100 text-xs rounded font-medium">${car.driveText || 'Dẫn động cầu sau (RWD)'}</span>
                    </div>
                </div>

                <div class="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <button onclick="viewCarDetail('${car.id}')" class="px-5 py-2.5 bg-black text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition">Chi tiết xe</button>
                </div>
            </div>
        `;
        grid.innerHTML += cardHtml;
    });

    // Tạo nút phân trang (ĐÃ THAY BẰNG ICON BOXICONS CHỐNG Ô VUÔNG RỖNG)
    if (paginationContainer) {
        paginationContainer.innerHTML = '';
        let totalPages = Math.ceil(filteredCarsCache.length / itemsPerPage);
        
        if (totalPages > 1) {
            let prevDisabled = page === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-black hover:text-white';
            paginationContainer.innerHTML += `<button onclick="changePage(${page - 1})" class="px-3.5 py-2 bg-white border rounded-lg text-sm transition ${prevDisabled}"><i class='bx bx-chevron-left'></i></button>`;

            for (let i = 1; i <= totalPages; i++) {
                let activeClass = i === page ? 'bg-black text-white border-black' : 'bg-white text-black border hover:bg-gray-100';
                paginationContainer.innerHTML += `<button onclick="changePage(${i})" class="w-10 h-10 rounded-lg text-sm font-bold border transition ${activeClass}">${i}</button>`;
            }

            let nextDisabled = page === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-black hover:text-white';
            paginationContainer.innerHTML += `<button onclick="changePage(${page + 1})" class="px-3.5 py-2 bg-white border rounded-lg text-sm transition ${nextDisabled}"><i class='bx bx-chevron-right'></i></button>`;
        }
    }
}

function changePage(targetPage) {
    let totalPages = Math.ceil(filteredCarsCache.length / itemsPerPage);
    if (targetPage >= 1 && targetPage <= totalPages) {
        renderPage(targetPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ==============================================================
// 4. XEM CHI TIẾT XE
// ==============================================================
function viewCarDetail(carId) {
    let selectedCar = carList.find(c => c.id === carId);
    if(selectedCar) {
        localStorage.setItem('selectedCarDetail', JSON.stringify(selectedCar));
        window.location.href = 'chitietxe.html';
    }
}

// ==============================================================
// 5. MODAL SỬA TRẠNG THÁI BÁN (ĐỒNG BỘ KHO XE)
// ==============================================================
function openEditSoldModal(carId) {
    let car = carList.find(c => c.id === carId);
    if(!car) return;
    
    document.getElementById('editCarIndex').value = carId;
    document.getElementById('editCarNameDisplay').value = car.name;
    document.getElementById('editCarSoldPriceInput').value = car.soldPrice ? car.soldPrice.replace(/[^0-9]/g, '') : '';
    formatInputPrice(document.getElementById('editCarSoldPriceInput'));
    document.getElementById('editCarIsSoldCheckbox').checked = car.isSold || false;

    document.getElementById('editSoldModal').classList.remove('hidden');
    document.getElementById('editSoldModal').classList.add('flex');
}

function closeEditSoldModal() {
    document.getElementById('editSoldModal').classList.remove('flex');
    document.getElementById('editSoldModal').classList.add('hidden');
}

function saveCarSoldStatus(event) {
    event.preventDefault();
    let carId = document.getElementById('editCarIndex').value;
    let rawSoldPrice = document.getElementById('editCarSoldPriceInput').value.replace(/,/g, '');
    let isSold = document.getElementById('editCarIsSoldCheckbox').checked;

    let carIndex = carList.findIndex(c => c.id === carId);
    if (carIndex !== -1) {
        carList[carIndex].isSold = isSold;
        
        // Đồng bộ chữ trạng thái để bên Dashboard nhận diện được
        if(isSold) {
            carList[carIndex].status = "ĐÃ GIAO XE";
            carList[carIndex].statusClass = "bg-gray";
            carList[carIndex].category = "completed";
        } else {
            carList[carIndex].status = "SẴN SÀNG BÁN";
            carList[carIndex].statusClass = "bg-green";
            carList[carIndex].category = "san-sang";
        }

        if (rawSoldPrice) {
            carList[carIndex].soldPrice = Number(rawSoldPrice).toLocaleString('vi-VN') + " ₫";
        }
        
        saveCarsToDB(carList); // Lưu ngược lại kho tổng database.js

        updateStockLabels();
        applyFilters(); 
        closeEditSoldModal();
        alert("Cập nhật trạng thái bán xe thành công!");
    }
}

// ==============================================================
// 6. TIỆN ÍCH FORM & ĐÃ HOÀN THIỆN HÀM THÊM XE MỚI (addNewCar)
// ==============================================================
function formatInputPrice(input) {
    let value = input.value.replace(/\D/g, '');
    if (!value) { input.value = ''; return; }
    input.value = Number(value).toLocaleString('en-US');
}

function openAddModal() {
    document.getElementById('addCarModal').classList.remove('hidden');
    document.getElementById('addCarModal').classList.add('flex');
}

function closeAddModal() {
    document.getElementById('addCarModal').classList.remove('flex');
    document.getElementById('addCarModal').classList.add('hidden');
}

// Hàm bổ trợ đọc file ảnh thành chuỗi Base64
function readFileAsDataURL(file) {
    return new Promise((resolve) => {
        if (!file) return resolve("");
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = () => resolve("");
        reader.readAsDataURL(file);
    });
}

// HÀM THÊM XE MỚI ĐẦY ĐỦ 100% CỦA SẾP
async function addNewCar(event) {
    event.preventDefault();

    let name = document.getElementById('newCarName').value.trim();
    let category = document.getElementById('newCarCategory').value;
    let year = document.getElementById('newCarYear').value.trim();
    let status = document.getElementById('newCarStatus').value.trim();
    let seats = document.getElementById('newCarSeats').value;
    let drive = document.getElementById('newCarDrive').value;
    let driveText = drive === 'rear' ? "Dẫn động cầu sau (RWD)" : "Dẫn động cầu trước (FWD)";
    
    let rawPrice = document.getElementById('newCarPrice').value.replace(/,/g, '');
    let rawSoldPrice = document.getElementById('newCarSoldPrice').value.replace(/,/g, '');
    let rawImportPrice = document.getElementById('newCarImportPrice').value.replace(/,/g, '');
    let maxRange = document.getElementById('newCarRange').value.trim();
    let fuelConsumption = document.getElementById('newCarFuel').value.trim();
    let rawSpeed = document.getElementById('newCarSpeed').value.trim();
    let isSold = document.getElementById('newCarIsSold').checked;

    let fileMain = document.getElementById('newCarMainImg').files[0];
    let file45 = document.getElementById('newCarImg45').files[0];
    let fileCabin = document.getElementById('newCarImgCabin').files[0];
    let fileRear = document.getElementById('newCarImgRear').files[0];

    let formattedPrice = Number(rawPrice).toLocaleString('vi-VN') + " ₫";
    let formattedSoldPrice = rawSoldPrice ? Number(rawSoldPrice).toLocaleString('vi-VN') + " ₫" : formattedPrice;
    let formattedImportPrice = Number(rawImportPrice).toLocaleString('vi-VN') + " ₫";
    let formattedSpeed = rawSpeed.toLowerCase().includes('km') ? rawSpeed : rawSpeed + " km/h";

    // Đọc đồng thời cả 4 ảnh được tải lên từ máy tính
    const [imgMain, img45, imgCabin, imgRear] = await Promise.all([
        readFileAsDataURL(fileMain),
        readFileAsDataURL(file45),
        readFileAsDataURL(fileCabin),
        readFileAsDataURL(fileRear)
    ]);

    // Tạo đối tượng xe mới tương thích 100% với cả Dashboard và trang Chi tiết
    let newCarObj = {
        id: name.toLowerCase().replace(/[^a-z0-9]/g, '-') + "-" + Math.floor(Math.random() * 1000),
        name: name,
        carType: category, // Dùng lọc trang Danh sách
        category: isSold ? "completed" : "san-sang", // Dùng lọc Dashboard
        status: isSold ? "ĐÃ GIAO XE" : "SẴN SÀNG BÁN",
        statusClass: isSold ? "bg-gray" : "bg-green",
        location: "SHOWROOM TẦNG 1",
        aging: 0,
        price: formattedPrice,
        soldPrice: formattedSoldPrice,
        importPrice: formattedImportPrice,
        discount: "0 ₫",
        cost: formattedImportPrice,
        profit: "+ 0 ₫",
        year: year,
        img: imgMain || "https://via.placeholder.com/600x300?text=No+Car+Image",
        image: imgMain || "https://via.placeholder.com/600x300?text=No+Car+Image",
        img45: img45,
        imgCabin: imgCabin,
        imgRear: imgRear,
        tags: [year, category.toUpperCase()],
        maxRange: maxRange || "Đang cập nhật",
        accel: "5.0 s",
        fuelConsumption: fuelConsumption || "Đang cập nhật",
        speed: formattedSpeed,
        seats: seats,
        drive: drive,
        driveText: driveText,
        specs: `<i class='bx bx-tachometer'></i> ${formattedSpeed} &nbsp; <i class='bx bx-timer'></i> 5.0s`,
        isSold: isSold,
        isSpecialVF7: false
    };

    // Đưa xe mới lên ĐẦU kho xe
    carList.unshift(newCarObj);
    
    // LƯU NGAY VÀO KHO TỔNG DATABASE.JS ĐỂ CÁC TRANG KHÁC CÙNG NHẬN
    saveCarsToDB(carList);

    updateStockLabels();
    applyFilters();

    document.getElementById('addCarForm').reset();
    closeAddModal();
    alert("Thêm siêu xe mới vào kho thành công! Sếp qua trang Tổng quan xem thử nhé!");
}