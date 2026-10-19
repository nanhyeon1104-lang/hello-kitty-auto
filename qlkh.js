// XỬ LÝ MENU TRƯỢT (ĐÃ XÓA MẶT TRĂNG)
const sidebar = document.querySelector(".sidebar");
const menuBtn = document.querySelector("#btn");

if (menuBtn) {
  const menuIcon = menuBtn.querySelector("i");
  const menuText = menuBtn.querySelector("span");

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    const opened = sidebar.classList.contains("open");
    if (menuIcon) menuIcon.classList.replace(opened ? "bx-menu" : "bx-x", opened ? "bx-x" : "bx-menu");
    if (menuText) menuText.textContent = opened ? "Đóng" : "Menu";
  });
}

const STORAGE_KEY = "helloKittyAutoCustomers";
const CAR_STORAGE_KEY = "helloKittyAutoCarList";
const FALLBACK_CARS = [
  {name:"VinFast VF 7 Eco", isSold:false},
  {name:"Porsche 911 Carrera", isSold:true},
  {name:"Lamborghini Temerario", isSold:false},
  {name:"Audi e-tron GT", isSold:false},
  {name:"Mercedes-Benz S450 Luxury", isSold:false},
  {name:"BMW i7 eDrive50", isSold:false},
  {name:"Toyota Camry Hybrid", isSold:false},
  {name:"Lexus LX 600 Urban", isSold:false}
];

function getInventory() {
  try {
    const saved = JSON.parse(localStorage.getItem(CAR_STORAGE_KEY));
    if (Array.isArray(saved) && saved.length) return saved;
  } catch (error) {}
  return FALLBACK_CARS;
}

function getAvailableCars() {
  return getInventory().filter(car => !car.isSold);
}


const fixedCustomers = [
  {name:"Nguyễn Mạnh Cường", phone:"0981234567", email:"cuong.nguyen@example.com", car:"Porsche 911 Carrera", date:"2026-10-15", status:"Đang tư vấn", notes:"Quan tâm lịch lái thử xe Porsche 911."},
  {name:"Hoàng Minh Anh", phone:"0912345678", email:"minhanh.hoang@example.com", car:"Lamborghini Temerario", date:"2026-10-16", status:"Khách mới", notes:"Yêu cầu tư vấn bảng giá chi tiết và thời gian bàn giao."},
  {name:"Đàm Thế Anh Dũng", phone:"0978901234", email:"dung.dam@example.com", car:"Audi e-tron GT", date:"2026-10-14", status:"Đã đặt cọc", notes:"Đã hoàn tất hợp đồng cọc xe."},
  {name:"Đào Ngọc Anh", phone:"0934567890", email:"ngocanh.dao@example.com", car:"Mercedes-Benz S450 Luxury", date:"2026-10-11", status:"Đã mua xe", notes:"Đã nhận xe và hoàn tất các thủ tục."},
  {name:"Vũ Công Huấn", phone:"0905678901", email:"huan.vu@example.com", car:"VinFast VF 7 Eco", date:"2026-10-12", status:"Đang tư vấn", notes:"Cần tư vấn thêm về gói trả góp ngân hàng."}
];


const firstNames = ["Phạm", "Lê", "Trần", "Trịnh", "Ngô", "Bùi", "Đỗ", "Đặng", "Dương", "Lý", "Huỳnh", "Võ"];
const middleNames = ["Thanh", "Văn", "Thị", "Quốc", "Khánh", "Hoàng", "Phương", "Đức", "Minh", "Thu", "Ngọc", "Hữu"];
const lastNames = ["Hải", "Tùng", "Mai", "Bảo", "Linh", "Giang", "Thảo", "Tuấn", "Nam", "Hương", "Trinh", "Phúc", "Khang", "Sơn", "Hà"];
const carModels = ["VinFast VF 7 Eco", "Porsche 911 Carrera", "Lamborghini Temerario", "Audi e-tron GT", "Mercedes-Benz S450 Luxury", "BMW i7 eDrive50", "Toyota Camry Hybrid", "Lexus LX 600 Urban"];
const statuses = ["Khách mới", "Đang tư vấn", "Đã đặt cọc", "Đã mua xe"];

function generateRandomCustomers(count) {
  const list = [];
  for (let i = 0; i < count; i++) {
    const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
    const mn = middleNames[Math.floor(Math.random() * middleNames.length)];
    const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${fn} ${mn} ${ln}`;
    const phone = `09${Math.floor(10000000 + Math.random() * 90000000)}`;
    const email = `${ln.toLowerCase()}.${fn.toLowerCase()}${i}@example.com`;
    const car = carModels[Math.floor(Math.random() * carModels.length)];
    const date = `2026-10-${String(Math.floor(1 + Math.random() * 18)).padStart(2, '0')}`;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    list.push({
      name,
      phone,
      email,
      car,
      date,
      status,
      notes: `Khách hàng tiềm năng quan tâm dòng xe ${car}.`
    });
  }
  return list;
}


function generateInitialCustomers() {
  const randoms = generateRandomCustomers(20);
  const combined = [...fixedCustomers, ...randoms];
  
  return combined.map((item, index) => ({
    id: `KH${String(index + 1).padStart(3, "0")}`,
    name: item.name,
    phone: item.phone,
    email: item.email,
    car: item.car,
    date: item.date || "2026-10-18",
    status: item.status || "Khách mới",
    notes: item.notes || "Khách hàng đăng ký qua website Hello Kitty Auto."
  }));
}

const initialCustomers = generateInitialCustomers();

let customers;
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  customers = Array.isArray(saved) && saved.length ? saved : initialCustomers;
} catch {
  customers = initialCustomers;
}


customers = customers.map(customer => ({
  ...customer, 
  car: ({"911 Carrera":"Porsche 911 Carrera", "Polestar 2 Performance":"VinFast VF 7 Eco", "Polestar2 Performance":"VinFast VF 7 Eco", "Tesla Model 3 Performance":"Audi e-tron GT"}[customer.car] || customer.car)
}));

let currentPage = 1;
let rowsPerPage = 10;

const tableBody = document.querySelector("#customer-table-body");
const searchInput = document.querySelector("#search-input");
const statusFilter = document.querySelector("#status-filter");
const emptyState = document.querySelector("#empty-state");
const modalBackdrop = document.querySelector("#customer-modal");
const customerForm = document.querySelector("#customer-form");
const modalTitle = document.querySelector("#modal-title");
const detailModal = document.querySelector("#customer-detail-modal");
let viewingCustomerId = null;
const toast = document.querySelector("#toast");
let toastTimer;

function saveCustomers() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[char]));
}

function initials(name) {
  return name.trim().split(/\s+/).slice(-2).map(word => word[0] || "").join("").toUpperCase();
}

function statusClass(status) {
  return {"Khách mới":"status-new","Đang tư vấn":"status-consult","Đã đặt cọc":"status-deposit","Đã mua xe":"status-bought"}[status] || "status-new";
}

function formatDate(date) {
  if (!date) return "—";
  const parts = date.split("-");
  return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : date;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

let statusChart = null;
let carChart = null;

function populateCarOptions(selectedValue = "") {
  const select = document.querySelector("#customer-car");
  if (!select) return;
  const available = getAvailableCars();
  const selectedExists = available.some(car => car.name === selectedValue);
  select.innerHTML = '<option value="">-- Chọn xe đang có trong cửa hàng --</option>' + available.map(car => `<option value="${escapeHTML(car.name)}">${escapeHTML(car.name)}${car.status === "Đã cọc" ? " · Đã cọc" : ""}</option>`).join("");
  if (selectedValue && !selectedExists) select.insertAdjacentHTML("beforeend", `<option value="${escapeHTML(selectedValue)}">${escapeHTML(selectedValue)} · không còn trong kho</option>`);
  select.value = selectedValue || "";
}

function renderCharts() {
  if (!window.Chart) return;
  const statusLabels = ["Khách mới", "Đang tư vấn", "Đã đặt cọc", "Đã mua xe"];
  const statusValues = statusLabels.map(label => customers.filter(customer => customer.status === label).length);
  const inventoryNames = getInventory().map(car => car.name);
  const interestNames = [...new Set([...inventoryNames, ...customers.map(customer => customer.car).filter(Boolean)])];
  const interestValues = interestNames.map(name => customers.filter(customer => customer.car === name).length);
  const statusCanvas = document.querySelector("#customer-status-chart");
  const carCanvas = document.querySelector("#customer-car-chart");
  if (statusCanvas) {
    statusChart?.destroy();
    statusChart = new Chart(statusCanvas, {type:"doughnut", data:{labels:statusLabels,datasets:[{data:statusValues,backgroundColor:["#d5001c","#c89b55","#6478d3","#2b9460"],borderColor:"transparent",hoverOffset:7}]}, options:{responsive:true,maintainAspectRatio:false,cutout:"70%",plugins:{legend:{position:"bottom",labels:{usePointStyle:true,boxWidth:8,padding:18,font:{size:11}}},tooltip:{callbacks:{label:context=>`${context.label}: ${context.raw} khách`}}}}});
  }
  if (carCanvas) {
    carChart?.destroy();
    carChart = new Chart(carCanvas, {type:"bar", data:{labels:interestNames,datasets:[{label:"Khách quan tâm",data:interestValues,backgroundColor:"#d5001c",borderRadius:5,maxBarThickness:36}]}, options:{indexAxis:"y",responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{callbacks:{label:context=>`${context.raw} khách hàng`}}},scales:{x:{beginAtZero:true,ticks:{precision:0},grid:{color:"rgba(130,130,130,.13)"}},y:{grid:{display:false},ticks:{font:{size:11}}}}}});
  }
}



// ==============================================================
// HÀM PHÂN TRANG (ĐÃ XÓA Ô CHỌN DÒNG - CHỐT CỨNG 10 KHÁCH/TRANG)
// ==============================================================


function renderPagination(totalFilteredCount) {
  let paginationContainer = document.querySelector(".pagination-container");
  
  if (!paginationContainer) {
    paginationContainer = document.createElement("div");
    paginationContainer.className = "pagination-container";
    const tableWrap = document.querySelector(".table-wrap");
    tableWrap.parentNode.insertBefore(paginationContainer, document.querySelector(".table-footer"));
  }

  const totalPages = Math.ceil(totalFilteredCount / rowsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;

  const startIdx = totalFilteredCount === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endIdx = Math.min(currentPage * rowsPerPage, totalFilteredCount);

  let pageBtnsHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    pageBtnsHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }

  // ĐÃ XÓA CỤC HTML CHỌN DÒNG - CHỈ GIỮ LẠI CHỮ THÔNG BÁO VÀ NÚT BẤM
  paginationContainer.innerHTML = `
    <div class="pagination-info">Hiển thị <strong>${startIdx}-${endIdx}</strong> trên tổng số <strong>${totalFilteredCount}</strong> khách hàng</div>
    <div class="pagination-controls">
      <button class="page-btn" id="prev-page-btn" ${currentPage === 1 ? 'disabled' : ''}><i class="bx bx-chevron-left"></i></button>
      ${pageBtnsHTML}
      <button class="page-btn" id="next-page-btn" ${currentPage === totalPages ? 'disabled' : ''}><i class="bx bx-chevron-right"></i></button>
    </div>
  `;

  // Lắng nghe sự kiện click cho các nút phân trang
  paginationContainer.querySelectorAll(".page-btn[data-page]").forEach(btn => {
    btn.addEventListener("click", () => {
      currentPage = parseInt(btn.dataset.page);
      renderCustomers();
    });
  });

  const prevBtn = paginationContainer.querySelector("#prev-page-btn");
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderCustomers();
      }
    });
  }

  const nextBtn = paginationContainer.querySelector("#next-page-btn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderCustomers();
      }
    });
  }
}
function renderCustomers() {
  const keyword = searchInput.value.trim().toLocaleLowerCase("vi");
  const chosenStatus = statusFilter.value;
  const filtered = customers.filter(customer => {
    const text = [customer.id, customer.name, customer.phone, customer.email, customer.car].join(" ").toLocaleLowerCase("vi");
    return text.includes(keyword) && (chosenStatus === "all" || customer.status === chosenStatus);
  });


  const start = (currentPage - 1) * rowsPerPage;
  const paginatedCustomers = filtered.slice(start, start + rowsPerPage);

  tableBody.innerHTML = paginatedCustomers.map(customer => `
    <tr>
      <td><strong>${escapeHTML(customer.id)}</strong></td>
      <td><div class="customer-cell"><div class="avatar">${escapeHTML(initials(customer.name))}</div><div><div class="customer-name">${escapeHTML(customer.name)}</div><div class="customer-id">Khách hàng</div></div></div></td>
      <td><div class="contact-line">${escapeHTML(customer.phone)}</div><div class="muted">${escapeHTML(customer.email || "Chưa có email")}</div></td>
      <td><span class="car-name">${escapeHTML(customer.car)}</span></td>
      <td>${escapeHTML(formatDate(customer.date))}</td>
      <td><span class="status ${statusClass(customer.status)}">${escapeHTML(customer.status)}</span></td>
      <td><div class="row-actions">
        <button class="icon-btn" type="button" data-action="view" data-id="${escapeHTML(customer.id)}" title="Xem chi tiết" aria-label="Xem chi tiết"><i class="bx bx-show"></i></button>
        <button class="icon-btn" type="button" data-action="edit" data-id="${escapeHTML(customer.id)}" title="Sửa" aria-label="Sửa"><i class="bx bx-edit-alt"></i></button>
        <button class="icon-btn delete" type="button" data-action="delete" data-id="${escapeHTML(customer.id)}" title="Xóa" aria-label="Xóa"><i class="bx bx-trash"></i></button>
      </div></td>
    </tr>`).join("");

  emptyState.hidden = filtered.length !== 0;
  document.querySelector(".table-wrap").style.display = filtered.length ? "" : "none";
  document.querySelector("#result-summary").textContent = `Đang hiển thị ${filtered.length} / ${customers.length} hồ sơ`;
  document.querySelector("#footer-count").textContent = `${filtered.length} khách hàng`;
  document.querySelector("#total-count").textContent = customers.length;
  document.querySelector("#new-count").textContent = customers.filter(c => c.status === "Khách mới").length;
  document.querySelector("#consult-count").textContent = customers.filter(c => c.status === "Đang tư vấn").length;
  document.querySelector("#bought-count").textContent = customers.filter(c => c.status === "Đã mua xe").length;

  renderPagination(filtered.length);
  renderCharts();
}

function openModal(customer = null) {
  customerForm.reset();
  populateCarOptions(customer?.car || "");
  document.querySelector("#customer-id").value = customer?.id || "";
  document.querySelector("#customer-name").value = customer?.name || "";
  document.querySelector("#customer-phone").value = customer?.phone || "";
  document.querySelector("#customer-email").value = customer?.email || "";
  document.querySelector("#customer-car").value = customer?.car || "";
  document.querySelector("#customer-status").value = customer?.status || "Khách mới";
  document.querySelector("#customer-date").value = customer?.date || new Date().toISOString().slice(0, 10);
  document.querySelector("#customer-notes").value = customer?.notes || "";
  modalTitle.textContent = customer ? "Cập nhật khách hàng" : "Thêm khách hàng";
  modalBackdrop.hidden = false;
  document.querySelector("#customer-name").focus();
}

function closeModal() {
  modalBackdrop.hidden = true;
}

function createCustomerId() {
  let number = 1;
  while (customers.some(c => c.id === `KH${String(number).padStart(3, "0")}`)) number++;
  return `KH${String(number).padStart(3, "0")}`;
}

document.querySelector("#add-customer-btn").addEventListener("click", () => openModal());
document.querySelector("#close-modal-btn").addEventListener("click", closeModal);
document.querySelector("#cancel-modal-btn").addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", event => {
  if (event.target === modalBackdrop) closeModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modalBackdrop.hidden) closeModal();
  if (event.key === "Escape" && !detailModal.hidden) closeDetailModal();
});

function closeDetailModal() {
  detailModal.hidden = true;
  viewingCustomerId = null;
}

function openDetailModal(customer) {
  viewingCustomerId = customer.id;
  document.querySelector("#detail-name").textContent = customer.name;
  document.querySelector("#detail-id").textContent = customer.id;
  const status = document.querySelector("#detail-status");
  status.textContent = customer.status;
  status.className = `status ${statusClass(customer.status)}`;
  document.querySelector("#detail-phone").textContent = customer.phone || "Chưa có";
  document.querySelector("#detail-email").textContent = customer.email || "Chưa có email";
  document.querySelector("#detail-date").textContent = formatDate(customer.date);
  document.querySelector("#detail-car").textContent = customer.car || "Chưa chọn xe";
  document.querySelector("#detail-notes").textContent = customer.notes || "Chưa có ghi chú tư vấn cho khách hàng này.";
  detailModal.hidden = false;
  document.querySelector("#close-detail-btn").focus();
}

document.querySelector("#close-detail-btn").addEventListener("click", closeDetailModal);
document.querySelector("#detail-close-bottom").addEventListener("click", closeDetailModal);
detailModal.addEventListener("click", event => {
  if (event.target === detailModal) closeDetailModal();
});
document.querySelector("#detail-edit-btn").addEventListener("click", () => {
  const customer = customers.find(c => c.id === viewingCustomerId);
  closeDetailModal();
  if (customer) openModal(customer);
});

searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderCustomers();
});

statusFilter.addEventListener("change", () => {
  currentPage = 1;
  renderCustomers();
});

window.addEventListener("hka:inventory-updated", () => {
  populateCarOptions(document.querySelector("#customer-car")?.value || "");
  renderCharts();
});
window.addEventListener("storage", event => {
  if (event.key === CAR_STORAGE_KEY) {
    populateCarOptions(document.querySelector("#customer-car")?.value || "");
    renderCharts();
  }
});
window.addEventListener("helloKittyAutoCarsUpdated", () => {
  populateCarOptions(document.querySelector("#customer-car")?.value || "");
  renderCharts();
});

customerForm.addEventListener("submit", event => {
  event.preventDefault();
  const id = document.querySelector("#customer-id").value;
  const customer = {
    id: id || createCustomerId(),
    name: document.querySelector("#customer-name").value.trim(),
    phone: document.querySelector("#customer-phone").value.trim(),
    email: document.querySelector("#customer-email").value.trim(),
    car: document.querySelector("#customer-car").value.trim(),
    status: document.querySelector("#customer-status").value,
    date: document.querySelector("#customer-date").value,
    notes: document.querySelector("#customer-notes").value.trim()
  };
  if (!customer.name || !customer.phone || !customer.car || !customer.date) {
    showToast("Vui lòng điền đầy đủ các trường bắt buộc.");
    return;
  }
  const duplicatePhone = customers.some(c => c.phone === customer.phone && c.id !== id);
  if (duplicatePhone && !confirm("Số điện thoại này đã có trong danh sách. Bạn vẫn muốn lưu?")) return;

  if (id) {
    customers = customers.map(c => c.id === id ? customer : c);
    showToast("Đã cập nhật thông tin khách hàng.");
  } else {
    customers.unshift(customer);
    showToast("Đã thêm khách hàng mới.");
  }
  saveCustomers();
  renderCustomers();
  closeModal();
});

tableBody.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const customer = customers.find(c => c.id === button.dataset.id);
  if (!customer) return;
  if (button.dataset.action === "edit") {
    openModal(customer);
  } else if (button.dataset.action === "delete") {
    if (confirm(`Bạn có chắc muốn xóa khách hàng ${customer.name} (${customer.id}) không?`)) {
      customers = customers.filter(c => c.id !== customer.id);
      saveCustomers();
      renderCustomers();
      showToast("Đã xóa khách hàng.");
    }
  } else if (button.dataset.action === "view") {
    openDetailModal(customer);
  }
});

populateCarOptions();
renderCustomers();