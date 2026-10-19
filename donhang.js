document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const menuBtn = document.querySelector("#btn");
    if(menuBtn) menuBtn.addEventListener("click", () => sidebar.classList.toggle("open"));
    const tableBody = document.getElementById("ordersTableBody");
    const totalOrdersCount = document.getElementById("totalOrdersCount");
    const STORAGE_KEY = "HK_AUTO_ORDERS_DATA";
    
    let currentPage = 1;
    const itemsPerPage = 5; 
    let ordersList = loadOrders();
    let filteredOrders = [...ordersList]; 

    function loadOrders() {
        let stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        if (stored.length === 0) {
            stored = [
                { id: "ORD-88787", customer: "Vũ Công Huấn", phone: "0964110856", car: "VinFast VF 7 Eco", date: "2026-10-15", formattedDate: "15/10/2026", total: "850.000.000 ₫", deposit: "200.000.000 ₫", status: "da-coc", imgUrl: "https://i.postimg.cc/85z1y1N0/vinfast-vf7.png" },
                { id: "ORD-91102", customer: "Lê Hoàng Long", phone: "0988112233", car: "Porsche 911 Carrera", date: "2026-10-15", formattedDate: "15/10/2026", total: "7.620.000.000 ₫", deposit: "500.000.000 ₫", status: "cho-xac-nhan", imgUrl: "https://a.storyblok.com/f/322327/2616x712/5d81165a01/cz25w01ix0010911-carrera-side.png" },
                { id: "ORD-81392", customer: "Đàm Thế Dũng", phone: "01234544677", car: "Lamborghini Temerario", date: "2026-10-01", formattedDate: "01/10/2026", total: "25.500.000.000 ₫", deposit: "1.000.000.000 ₫", status: "da-giao", imgUrl: "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/0_facelift_2025/homepage/models/temerario/familyChooser-Temerario_0.png" },
                { id: "ORD-22027", customer: "Nguyễn Mạnh Cường", phone: "01659721184", car: "BMW i7 eDrive50", date: "2025-09-15", formattedDate: "15/09/2025", total: "7.199.000.000 ₫", deposit: "200.000.000 ₫", status: "da-huy", imgUrl: "https://images.porsche.com/f/285489813253582/5000x1390/ff0291ead8/model-y1afp1-side-shot_4640060826294db8801ffa7e67e0879b.png/m/380x106/smart/filters:format(avif)" },
                { id: "ORD-55411", customer: "Phạm Quỳnh Nga", phone: "0978223344", car: "Mercedes-Benz S450", date: "2026-10-16", formattedDate: "16/10/2026", total: "5.550.000.000 ₫", deposit: "500.000.000 ₫", status: "cho-xac-nhan", imgUrl: "https://i.postimg.cc/vHzVnZQx/mercedes-s450.png" }
            ];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
        }
        return stored;
    }

    function saveOrders(array) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(array));
    }
    const orderSearch = document.getElementById("orderSearch");
    const statusFilter = document.getElementById("statusFilter");
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const datePresetFilter = document.getElementById("datePresetFilter");

    function applyFilters() {
        const keyword = orderSearch ? orderSearch.value.toLowerCase().trim() : "";
        const statusVal = statusFilter ? statusFilter.value : "all";
        const start = startDateInput && startDateInput.value ? new Date(startDateInput.value) : null;
        const end = endDateInput && endDateInput.value ? new Date(endDateInput.value) : null;
        if (end) end.setHours(23, 59, 59); 

        filteredOrders = ordersList.filter(order => {
            const matchSearch = order.customer.toLowerCase().includes(keyword) || order.id.toLowerCase().includes(keyword) || order.phone.includes(keyword) || order.car.toLowerCase().includes(keyword);
            const matchStatus = (statusVal === "all") || (order.status === statusVal);
            
            let matchDate = true;
            if (start || end) {
                const parts = order.formattedDate.split('/');
                const orderDate = new Date(parts[2], parts[1] - 1, parts[0]);
                if (start && orderDate < start) matchDate = false;
                if (end && orderDate > end) matchDate = false;
            }
            return matchSearch && matchStatus && matchDate;
        });

        currentPage = 1; 
        renderTable();
    }

    if(orderSearch) orderSearch.addEventListener("keyup", applyFilters);
    if(statusFilter) statusFilter.addEventListener("change", applyFilters);
    if(startDateInput) startDateInput.addEventListener("change", applyFilters);
    if(endDateInput) endDateInput.addEventListener("change", applyFilters);

    if (datePresetFilter) {
        datePresetFilter.addEventListener("change", () => {
            const val = datePresetFilter.value;
            const now = new Date();
            if (val === "this-week") {
                let day = now.getDay();
                let startOfWeek = new Date(now.setDate(now.getDate() - day + (day === 0 ? -6 : 1)));
                startDateInput.value = startOfWeek.toISOString().split("T")[0];
                endDateInput.value = new Date().toISOString().split("T")[0];
            } else if (val === "this-month") {
                let startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                startDateInput.value = startOfMonth.toISOString().split("T")[0];
                endDateInput.value = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split("T")[0];
            } else {
                startDateInput.value = ""; endDateInput.value = "";
            }
            applyFilters();
        });
    }
    function renderTable() {
        tableBody.innerHTML = "";
        if(totalOrdersCount) totalOrdersCount.textContent = filteredOrders.length;

        const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
        if (currentPage > totalPages) currentPage = totalPages;

        const startIdx = (currentPage - 1) * itemsPerPage;
        const pageItems = filteredOrders.slice(startIdx, startIdx + itemsPerPage);

        if (pageItems.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 30px; color: #888;">Không tìm thấy đơn hàng nào!</td></tr>`;
        } else {
            pageItems.forEach(order => {
                let statusText = "Chờ xác nhận"; let statusColor = "#F59E0B"; let statusBg = "#FEF3C7";
                if (order.status === "da-coc") { statusText = "Đã cọc"; statusColor = "#10B981"; statusBg = "#D1FAE5"; }
                else if (order.status === "da-giao") { statusText = "Đã giao xe"; statusColor = "#3B82F6"; statusBg = "#DBEAFE"; }
                else if (order.status === "da-huy") { statusText = "Đã hủy"; statusColor = "#EF4444"; statusBg = "#FEE2E2"; }

                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><strong>#${order.id}</strong></td>
                    <td><img src="${order.imgUrl}" class="car-thumbnail" onerror="this.src='https://via.placeholder.com/90x55'"></td>
                    <td style="font-weight: 500;">${order.customer}</td>
                    <td>${order.phone}</td>
                    <td style="font-weight: 500;">${order.car}</td>
                    <td>${order.formattedDate}</td>
                    <td><strong style="color: #D5001C;">${order.deposit}</strong></td>
                    <td><span style="background:${statusBg}; color:${statusColor}; padding:4px 10px; border-radius:4px; font-size:11px; font-weight:700; text-transform:uppercase;">${statusText}</span></td>
                    <td style="text-align:center;">
                        <div class="action-buttons">
                            <button class="btn-action-icon view-btn" data-id="${order.id}" title="Xem chi tiết"><i class='bx bx-show'></i></button>
                            <button class="btn-action-icon edit-btn" data-id="${order.id}" title="Sửa đơn hàng"><i class='bx bx-edit-alt'></i></button>
                            <button class="btn-action-icon delete-btn" data-id="${order.id}" title="Xóa đơn hàng"><i class='bx bx-trash'></i></button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(tr);
            });
        }
        attachTableEvents();
        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        const paginationContainer = document.getElementById("paginationControls");
        if(!paginationContainer) return;
        paginationContainer.innerHTML = "";

        const prevBtn = document.createElement("button");
        prevBtn.className = "page-btn";
        prevBtn.innerHTML = "<i class='bx bx-chevron-left'></i>";
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => { if (currentPage > 1) { currentPage--; renderTable(); } };
        paginationContainer.appendChild(prevBtn);

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.className = `page-btn ${i === currentPage ? "active" : ""}`;
            btn.textContent = i;
            btn.onclick = () => { currentPage = i; renderTable(); };
            paginationContainer.appendChild(btn);
        }

        const nextBtn = document.createElement("button");
        nextBtn.className = "page-btn";
        nextBtn.innerHTML = "<i class='bx bx-chevron-right'></i>";
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => { if (currentPage < totalPages) { currentPage++; renderTable(); } };
        paginationContainer.appendChild(nextBtn);
    }
    const orderModal = document.getElementById("orderModal");
    const addEditModal = document.getElementById("addEditModal");

    function attachTableEvents() {
        document.querySelectorAll(".view-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const order = ordersList.find(o => o.id === id);
                if (!order) return;

                document.getElementById("modalOrderId").textContent = order.id;
                document.getElementById("modalCarImage").src = order.imgUrl;
                document.getElementById("modalCustomer").textContent = order.customer;
                document.getElementById("modalPhone").textContent = order.phone;
                document.getElementById("modalCar").textContent = order.car;
                document.getElementById("modalDate").textContent = order.formattedDate;
                document.getElementById("modalTotal").textContent = order.total;
                document.getElementById("modalDeposit").textContent = order.deposit;

                let statusText = "Chờ xác nhận"; let statusColor = "#F59E0B";
                if (order.status === "da-coc") { statusText = "Đã cọc"; statusColor = "#10B981"; }
                else if (order.status === "da-giao") { statusText = "Đã giao xe"; statusColor = "#3B82F6"; }
                else if (order.status === "da-huy") { statusText = "Đã hủy"; statusColor = "#EF4444"; }

                document.getElementById("modalStatus").innerHTML = `<span style="background:${statusColor}; color:#fff; padding:4px 10px; border-radius:4px; font-size:12px; font-weight:bold;">${statusText}</span>`;
                orderModal.classList.add("active");
            });
        });

        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const order = ordersList.find(o => o.id === id);
                if (!order) return;

                document.getElementById("formModalTitle").textContent = "Chỉnh Sửa Đơn: #" + id;
                document.getElementById("editOrderId").value = id;
                document.getElementById("inputCustomer").value = order.customer;
                document.getElementById("inputPhone").value = order.phone;
                document.getElementById("inputDeposit").value = order.deposit.replace(/[^\d]/g, '');
                
                const parts = order.formattedDate.split('/');
                document.getElementById("inputDate").value = `${parts[2]}-${parts[1]}-${parts[0]}`;
                document.getElementById("inputStatus").value = order.status;

                const carSelect = document.getElementById("inputCar");
                if (typeof getCarsFromDB === 'function') {
                    const allCars = getCarsFromDB(); 
                    carSelect.innerHTML = '<option value="">-- Vui lòng chọn xe --</option>';
                    allCars.forEach(car => {
                        let isSelected = (car.name === order.car) ? "selected" : "";
                        carSelect.innerHTML += `<option value="${car.id}" ${isSelected}>${car.name} - ${car.price}</option>`;
                    });
                }
                addEditModal.classList.add("active");
            });
        });

        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                if(confirm("Sếp có chắc chắn muốn xóa đơn hàng #" + id + " này không?")) {
                    ordersList = ordersList.filter(o => o.id !== id);
                    saveOrders(ordersList);
                    applyFilters();
                }
            });
        });
    }

    document.querySelectorAll(".modal-close, #closeModal, #closeAddEditModal").forEach(btn => {
        btn.addEventListener("click", () => {
            if(orderModal) orderModal.classList.remove("active");
            if(addEditModal) addEditModal.classList.remove("active");
        });
    });
    const openAddModalBtn = document.getElementById("openAddModalBtn");
    const btnSaveOrder = document.getElementById("btnSaveOrder");

    if(openAddModalBtn) {
        openAddModalBtn.addEventListener("click", () => {
            document.getElementById("formModalTitle").textContent = "Thêm Đơn Mua Xe Mới";
            document.getElementById("editOrderId").value = "";
            document.getElementById("orderForm").reset();
            document.getElementById("inputDate").value = new Date().toISOString().split("T")[0];
            
            const carSelect = document.getElementById("inputCar");
            if (typeof getCarsFromDB === 'function') {
                const allCars = getCarsFromDB(); 
                carSelect.innerHTML = '<option value="">-- Chọn siêu xe khách đặt --</option>';
                allCars.forEach(car => {
                    carSelect.innerHTML += `<option value="${car.id}">${car.name} - ${car.price}</option>`;
                });
            }
            addEditModal.classList.add("active");
        });
    }

    if(btnSaveOrder) {
        btnSaveOrder.addEventListener("click", (e) => {
            e.preventDefault();
            const editId = document.getElementById("editOrderId").value;
            const customer = document.getElementById("inputCustomer").value.trim();
            const phone = document.getElementById("inputPhone").value.trim();
            const carId = document.getElementById("inputCar").value;
            const depositRaw = document.getElementById("inputDeposit").value.trim();
            const dateVal = document.getElementById("inputDate").value;
            const status = document.getElementById("inputStatus").value;

            if (!customer || !phone || !carId || !depositRaw) {
                alert("Vui lòng điền đủ thông tin!"); return;
            }

            let allCars = getCarsFromDB();
            let carIndex = allCars.findIndex(c => c.id === carId);
            let carDetails = allCars[carIndex];

            const dateParts = dateVal.split("-");
            const formattedDateDisplay = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            const depositFormatted = parseFloat(depositRaw.replace(/[^\d]/g, "")).toLocaleString("vi-VN") + " ₫";

            if (editId) {
                let idx = ordersList.findIndex(o => o.id === editId);
                ordersList[idx] = { ...ordersList[idx], customer, phone, car: carDetails.name, imgUrl: carDetails.img || carDetails.image, total: carDetails.price, deposit: depositFormatted, date: dateVal, formattedDate: formattedDateDisplay, status };
                alert("Đã cập nhật đơn hàng thành công!");
            } else {
                const newId = "ORD-" + Math.floor(10000 + Math.random() * 90000);
                ordersList.unshift({
                    id: newId, customer, phone, car: carDetails.name, imgUrl: carDetails.img || carDetails.image, total: carDetails.price, deposit: depositFormatted, date: dateVal, formattedDate: formattedDateDisplay, status
                });
                alert("Đã tạo mới đơn hàng thành công!");
            }

            saveOrders(ordersList);

            if (status === "da-coc") {
                allCars[carIndex].status = "ĐÃ CỌC";
                allCars[carIndex].category = "da-coc";
                allCars[carIndex].statusClass = "status-deposited";
            } else if (status === "da-giao") {
                allCars[carIndex].status = "ĐÃ GIAO XE";
                allCars[carIndex].category = "completed";
                allCars[carIndex].statusClass = "status-completed";
                allCars[carIndex].isSold = true;
            } else if (status === "da-huy") {
                allCars[carIndex].status = "SẴN SÀNG BÁN";
                allCars[carIndex].category = "san-sang";
                allCars[carIndex].statusClass = "status-ready";
                allCars[carIndex].isSold = false;
            }
            saveCarsToDB(allCars); 

            addEditModal.classList.remove("active");
            applyFilters();
        });
    }

    applyFilters();
});