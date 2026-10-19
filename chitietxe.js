let currentImageIndex = 0;
let imagesList = [];
let currentCar = null;

document.addEventListener("DOMContentLoaded", function() {
    const carDataStr = localStorage.getItem('selectedCarDetail');
    if (!carDataStr) {
        document.getElementById('car-detail-container').innerHTML = `
            <div class="text-center py-16">
                <h2 class="text-2xl font-bold mb-4">Không tìm thấy thông tin xe!</h2>
                <a href="danhsachoto.html" class="px-6 py-2.5 bg-black text-white rounded-lg text-sm">Quay lại danh sách</a>
            </div>
        `;
        return;
    }

    currentCar = JSON.parse(carDataStr);
    loadImagesArray(currentCar);
    renderDetailView(currentCar);
});

function loadImagesArray(car) {
    imagesList = [
        car.image,
        car.img45 || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200",
        car.imgCabin || "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200",
        car.imgRear || "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200"
    ];
}

function renderDetailView(car) {
    let thumbnailsHtml = imagesList.map((img, idx) => `
        <div onclick="selectImage(${idx})" class="w-16 h-14 bg-white rounded-lg p-1 border-2 cursor-pointer overflow-hidden transition ${idx === currentImageIndex ? 'border-black scale-105 shadow-md' : 'border-gray-100 hover:border-gray-300'}">
            <img src="${img}" class="w-full h-full object-cover" alt="Thumbnail ${idx + 1}">
        </div>
    `).join('');

    let soldStatusRow = car.isSold 
        ? `<div class="flex justify-between items-center py-2 bg-red-50 px-3 rounded-lg border border-red-100"><span class="text-red-700 font-bold">Trạng thái xe:</span> <span class="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full uppercase">Đã Bán</span></div>
           <div class="flex justify-between items-center pt-2"><span class="text-gray-500">Giá đã bán thực tế:</span> <strong class="text-lg text-red-600 font-extrabold">${car.soldPrice || car.price}</strong></div>`
        : `<div class="flex justify-between items-center py-2 bg-emerald-50 px-3 rounded-lg border border-emerald-100"><span class="text-emerald-700 font-bold">Trạng thái xe:</span> <span class="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full uppercase">Còn Hàng (Chính Hãng)</span></div>`;

    let htmlContent = `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div class="lg:col-span-7 flex flex-col space-y-4">
                <div class="image-slider-container relative rounded-2xl p-4 h-[400px] border shadow-inner overflow-hidden flex items-center justify-center bg-gray-50">
                    <button onclick="prevImage()" class="slider-btn absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg flex items-center justify-center z-20 text-lg transition hover:scale-105">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>

                    <img id="main-display-img" src="${imagesList[currentImageIndex]}" alt="${car.name}" class="max-h-full max-w-full object-contain">

                    <button onclick="nextImage()" class="slider-btn absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg flex items-center justify-center z-20 text-lg transition hover:scale-105">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>

                <div class="flex items-center justify-center space-x-3 overflow-x-auto py-2 px-1">
                    ${thumbnailsHtml}
                </div>
            </div>

            <div class="lg:col-span-5 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start">
                        <span class="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-semibold uppercase">${car.category}</span>
                        <div class="flex space-x-2">
                            <button onclick="openEditModal()" class="px-3.5 py-1.5 bg-gray-100 hover:bg-black hover:text-white text-xs font-semibold rounded-lg transition flex items-center space-x-1.5">
                                <i class="fa-solid fa-pen-to-square"></i> <span>Chỉnh sửa ảnh</span>
                            </button>
                            <button onclick="openEditInfoModal()" class="px-3.5 py-1.5 bg-black text-white hover:bg-gray-800 text-xs font-semibold rounded-lg transition flex items-center space-x-1.5">
                                <i class="fa-solid fa-pen"></i> <span>Sửa thông tin</span>
                            </button>
                        </div>
                    </div>
                    <h2 class="text-3xl font-extrabold mt-3 mb-2">${car.name}</h2>
                    <p class="text-gray-500 text-sm mb-4">Thông số kỹ thuật chính hãng</p>
                    
                    <div class="space-y-3 text-sm border-t border-b py-5 my-4">
                        <div class="flex justify-between"><span class="text-gray-500">Giá sale:</span> <strong class="text-base text-black">${car.price}</strong></div>
                        ${soldStatusRow}
                        <div class="flex justify-between"><span class="text-gray-500">Giá nhập kho:</span> <strong class="text-base text-gray-700">${car.importPrice}</strong></div>
                        <div class="flex justify-between"><span class="text-gray-500">Năm sản xuất:</span> <strong class="font-semibold">${car.year}</strong></div>
                        <div class="flex justify-between"><span class="text-gray-500">Tình trạng xe:</span> <strong class="text-emerald-600 font-semibold">${car.status}</strong></div>
                        <div class="flex justify-between"><span class="text-gray-500">Số chỗ ngồi:</span> <strong class="font-semibold">${car.seats || '5'} chỗ</strong></div>
                        <div class="flex justify-between"><span class="text-gray-500">Hệ dẫn động:</span> <strong class="font-semibold text-blue-600">${car.driveText || 'Dẫn động cầu trước (FWD)'}</strong></div>
                        <div class="flex justify-between"><span class="text-gray-500">Quãng đường tối đa:</span> <strong class="font-semibold text-emerald-600">${car.maxRange || 'Đang cập nhật'}</strong></div>
                        <div class="flex justify-between"><span class="text-gray-500">Tăng tốc (0-100 km/h):</span> <strong class="font-semibold">${car.accel}</strong></div>
                        <div class="flex justify-between"><span class="text-gray-500">Tiêu thụ nhiên liệu:</span> <strong class="font-semibold text-blue-600">${car.fuelConsumption || 'Đang cập nhật'}</strong></div>
                        <div class="flex justify-between"><span class="text-gray-500">Tốc độ tối đa:</span> <strong class="font-semibold">${car.speed || 'Đang cập nhật'}</strong></div>
                    </div>
                </div>

                <div class="pt-2">
                    <a href="danhsachoto.html" class="block w-full py-3 bg-black text-white text-center text-sm font-semibold rounded-xl hover:bg-gray-800 transition">Quay lại danh sách</a>
                </div>
            </div>
        </div>
    `;

    document.getElementById('car-detail-container').innerHTML = htmlContent;
}

function selectImage(index) {
    currentImageIndex = index;
    updateImageView();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % imagesList.length;
    updateImageView();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + imagesList.length) % imagesList.length;
    updateImageView();
}

function updateImageView() {
    const mainImg = document.getElementById('main-display-img');
    if (mainImg) {
        mainImg.src = imagesList[currentImageIndex];
    }
    if (currentCar) {
        renderDetailView(currentCar);
    }
}

function openEditModal() {
    document.getElementById('editImagesModal').classList.remove('hidden');
    document.getElementById('editImagesModal').classList.add('flex');
}

function closeEditModal() {
    document.getElementById('editImagesModal').classList.remove('flex');
    document.getElementById('editImagesModal').classList.add('hidden');
}

function openEditInfoModal() {
    if (!currentCar) return;
    document.getElementById('infoCarName').value = currentCar.name || '';
    document.getElementById('infoCarCategory').value = currentCar.category || 'electric';
    document.getElementById('infoCarYear').value = currentCar.year || '';
    document.getElementById('infoCarStatus').value = currentCar.status || '';
    document.getElementById('infoCarSeats').value = currentCar.seats || '5';
    document.getElementById('infoCarDrive').value = currentCar.drive || 'rear';
    document.getElementById('infoCarPrice').value = currentCar.price || '';
    document.getElementById('infoCarImportPrice').value = currentCar.importPrice || '';
    document.getElementById('infoCarRange').value = currentCar.maxRange || '';
    document.getElementById('infoCarAccel').value = currentCar.accel || '';
    document.getElementById('infoCarSpeed').value = currentCar.speed || '';
    document.getElementById('infoCarFuel').value = currentCar.fuelConsumption || '';

    document.getElementById('editInfoModal').classList.remove('hidden');
    document.getElementById('editInfoModal').classList.add('flex');
}

function closeEditInfoModal() {
    document.getElementById('editInfoModal').classList.remove('flex');
    document.getElementById('editInfoModal').classList.add('hidden');
}

function saveCarInfo(event) {
    event.preventDefault();
    if (!currentCar) return;

    currentCar.name = document.getElementById('infoCarName').value.trim();
    currentCar.category = document.getElementById('infoCarCategory').value;
    currentCar.year = document.getElementById('infoCarYear').value.trim();
    currentCar.status = document.getElementById('infoCarStatus').value.trim();
    currentCar.seats = document.getElementById('infoCarSeats').value;
    currentCar.drive = document.getElementById('infoCarDrive').value;
    currentCar.driveText = currentCar.drive === 'rear' ? "Dẫn động cầu sau (RWD)" : "Dẫn động cầu trước (FWD)";
    currentCar.price = document.getElementById('infoCarPrice').value.trim();
    currentCar.importPrice = document.getElementById('infoCarImportPrice').value.trim();
    currentCar.maxRange = document.getElementById('infoCarRange').value.trim();
    currentCar.accel = document.getElementById('infoCarAccel').value.trim();
    currentCar.speed = document.getElementById('infoCarSpeed').value.trim();
    currentCar.fuelConsumption = document.getElementById('infoCarFuel').value.trim();

    localStorage.setItem('selectedCarDetail', JSON.stringify(currentCar));

    let allCars = getCarsFromDB();
    let carIndex = allCars.findIndex(c => c.id === currentCar.id);
    if(carIndex !== -1) {
        allCars[carIndex] = currentCar; // Cập nhật chiếc xe bị sửa
        saveCarsToDB(allCars);          // Lưu ngược lại kho tổng
    }

    renderDetailView(currentCar);
    closeEditInfoModal();
    alert("Cập nhật thông tin xe thành công!");
    
}

function saveNewImages(event) {
    event.preventDefault();

    let fileMain = document.getElementById('editMainImg')?.files[0];
    let file45 = document.getElementById('editImg45')?.files[0];
    let fileCabin = document.getElementById('editImgCabin')?.files[0];
    let fileRear = document.getElementById('editImgRear')?.files[0];

    let filesToProcess = [];
    if (fileMain) filesToProcess.push({ key: 'image', file: fileMain });
    if (file45) filesToProcess.push({ key: 'img45', file: file45 });
    if (fileCabin) filesToProcess.push({ key: 'imgCabin', file: fileCabin });
    if (fileRear) filesToProcess.push({ key: 'imgRear', file: fileRear });

    if (filesToProcess.length === 0) {
        alert("Vui lòng chọn ít nhất một ảnh để thay đổi!");
        return;
    }

    let processedCount = 0;

    filesToProcess.forEach(item => {
        let reader = new FileReader();
        reader.onload = function(e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                let canvas = document.createElement('canvas');
                let MAX_WIDTH = 800;
                let scaleSize = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * (scaleSize > 1 ? 1 : scaleSize);

                let ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                let compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);

                currentCar[item.key] = compressedDataUrl;
                processedCount++;

                if (processedCount === filesToProcess.length) {
                    try {
                        localStorage.setItem('selectedCarDetail', JSON.stringify(currentCar));
                        loadImagesArray(currentCar);
                        renderDetailView(currentCar);
                        closeEditModal();
                        
                        const form = document.getElementById('editImagesForm');
                        if (form) form.reset();

                        alert("Cập nhật bộ sưu tập ảnh thành công!");
                    } catch (storageError) {
                        alert("Bộ nhớ trình duyệt đã đầy. Vui lòng chọn ảnh có dung lượng nhẹ hơn!");
                    }
                }
            };
        };
        reader.onerror = function() {
            processedCount++;
        };
        reader.readAsDataURL(item.file);
    });
}