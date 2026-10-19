
const defaultCars = [
    {
        id: "porsche-911", name: "Porsche 911 Carrera",
        category: "pending", status: "Chờ xác nhận", statusClass: "status-pending",
        location: "SHOWROOM T1", aging: 5,
        price: "7.620.000.000 ₫", soldPrice: "7.500.000.000 ₫", importPrice: "6.800.000.000 ₫", discount: "- 120.000.000 ₫", cost: "6.800.000.000 ₫",
        img: "https://a.storyblok.com/f/322327/2616x712/5d81165a01/cz25w01ix0010911-carrera-side.png",
        image: "https://a.storyblok.com/f/322327/2616x712/5d81165a01/cz25w01ix0010911-carrera-side.png",
        img45: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200", imgCabin: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200", imgRear: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1200",
        year: "2023", tags: ["2023", "Gasoline 3.0L"], maxRange: "720 km", accel: "4.1 s", fuelConsumption: "9.8 L/100km", speed: "294 km/h", seats: "4", drive: "rear", driveText: "Dẫn động cầu sau (RWD)", carType: "gasoline",
        specs: "<i class='bx bx-tachometer'></i> 294 km/h &nbsp; <i class='bx bx-timer'></i> 4.1s", isSpecialVF7: true
    },
    {
        id: "lamborghini-temerario", name: "Lamborghini Temerario",
        category: "deposited", status: "Đã cọc", statusClass: "status-deposited",
        location: "KHO VIP", aging: 2,
        price: "25.500.000.000 ₫", soldPrice: "25.000.000.000 ₫", importPrice: "21.000.000.000 ₫", discount: "0 ₫", cost: "21.000.000.000 ₫",
        img: "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/0_facelift_2025/homepage/models/temerario/familyChooser-Temerario_0.png",
        image: "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/0_facelift_2025/homepage/models/temerario/familyChooser-Temerario_0.png",
        img45: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1200", imgCabin: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200", imgRear: "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?w=1200",
        year: "2024", tags: ["2024", "Hybrid V8 4.0L"], maxRange: "650 km", accel: "2.7 s", fuelConsumption: "11.2 L/100km", speed: "343 km/h", seats: "2", drive: "rear", driveText: "Dẫn động cầu sau (RWD)", carType: "hybrid",
        specs: "<i class='bx bx-tachometer'></i> 343 km/h &nbsp; <i class='bx bx-timer'></i> 2.7s", isSpecialVF7: true
    },
    {
        id: "tesla-model-3", name: "Tesla Model 3 Perf",
        category: "completed", status: "Đã giao xe", statusClass: "status-completed",
        location: "CẢNG CÁT LÁI", aging: 1,
        price: "2.500.000.000 ₫", soldPrice: "2.400.000.000 ₫", importPrice: "2.100.000.000 ₫", discount: "- 30.000.000 ₫", cost: "2.100.000.000 ₫",
        img: "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2?&bkba_opt=1&view=STUD_3QTR&size=1400&model=m3&options=$APBS,$DV2W,$IN3BB,$PPMR,$PRM30,$SC04,$MDL3,$W39B,$MT301,$CPF0,$DRRH,$RSF0&crop=1400,850,300,130&",
        image: "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2?&bkba_opt=1&view=STUD_3QTR&size=1400&model=m3&options=$APBS,$DV2W,$IN3BB,$PPMR,$PRM30,$SC04,$MDL3,$W39B,$MT301,$CPF0,$DRRH,$RSF0&crop=1400,850,300,130&",
        img45: "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2?&bkba_opt=1&view=STUD_FRONT34&size=1400&model=m3", imgCabin: "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2?&bkba_opt=1&view=STUD_INTERIOR&size=1400&model=m3", imgRear: "https://static-assets.tesla.com/configurator/compositor?context=design_studio_2?&bkba_opt=1&view=STUD_REAR34&size=1400&model=m3",
        year: "2024", tags: ["2024", "Electric EV"], maxRange: "528 km", accel: "2.9 s", fuelConsumption: "0 L/100km", speed: "261 km/h", seats: "5", drive: "rear", driveText: "Dẫn động cầu sau (RWD)", carType: "electric",
        specs: "<i class='bx bx-tachometer'></i> 261 km/h &nbsp; <i class='bx bx-timer'></i> 2.9s", isSpecialVF7: true
    },
    {
        id: "polestar-2", name: "Polestar 2 Perf",
        category: "cancelled", status: "Đã hủy", statusClass: "status-cancelled",
        location: "TRẠM SẠC", aging: 65,
        price: "3.200.000.000 ₫", soldPrice: "3.000.000.000 ₫", importPrice: "2.750.000.000 ₫", discount: "- 150.000.000 ₫", cost: "2.750.000.000 ₫",
        img: "https://cas.polestar.com/image/dynamic/MY20_1909/534/summary-transparent-v1/70700/RCC000/XPFWHE/default.png?market=gb&angle=0",
        image: "https://cas.polestar.com/image/dynamic/MY20_1909/534/summary-transparent-v1/70700/RCC000/XPFWHE/default.png?market=gb&angle=0",
        img45: "https://cas.polestar.com/image/dynamic/MY20_1909/534/gallery-exterior-1-v1/70700/RCC000/XPFWHE/default.jpg", imgCabin: "https://cas.polestar.com/image/dynamic/MY20_1909/534/gallery-interior-1-v1/70700/RCC000/XPFWHE/default.jpg", imgRear: "https://cas.polestar.com/image/dynamic/MY20_1909/534/gallery-exterior-2-v1/70700/RCC000/XPFWHE/default.jpg",
        year: "2021", tags: ["2021", "Electric AWD"], maxRange: "480 km", accel: "4.2 s", fuelConsumption: "0 L/100km", speed: "205 km/h", seats: "5", drive: "front", driveText: "Dẫn động cầu trước (FWD)", carType: "electric",
        specs: "<i class='bx bx-tachometer'></i> 205 km/h &nbsp; <i class='bx bx-timer'></i> 4.2s", isSpecialVF7: true
    },
    {
        id: "vinfast-vf7", name: "VinFast VF 7 Eco",
        category: "pending", status: "Chờ xác nhận", statusClass: "status-pending",
        location: "KHO BÃI", aging: 10,
        price: "850.000.000 ₫", soldPrice: "820.000.000 ₫", importPrice: "750.000.000 ₫", discount: "- 20.000.000 ₫", cost: "750.000.000 ₫",
        img: "https://a.storyblok.com/f/322327/2616x712/667ad99f9d/041-panamera-4-e-hybrid-model-intro-3074x857.png",
        image: "https://a.storyblok.com/f/322327/2616x712/667ad99f9d/041-panamera-4-e-hybrid-model-intro-3074x857.png",
        img45: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200", imgCabin: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200", imgRear: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200",
        year: "2025", tags: ["2025", "Eco Electric"], maxRange: "450 km", accel: "5.8 s", fuelConsumption: "16.8 kWh/100km", speed: "200 km/h", seats: "5", drive: "front", driveText: "Dẫn động cầu trước (FWD)", carType: "electric",
        specs: "<i class='bx bx-tachometer'></i> 200 km/h &nbsp; <i class='bx bx-timer'></i> 5.8s", isSpecialVF7: true
    },
    {
        id: "mercedes-s450", name: "Mercedes-Benz S450",
        category: "deposited", status: "Đã cọc", statusClass: "status-deposited",
        location: "SHOWROOM T2", aging: 15,
        price: "5.550.000.000 ₫", soldPrice: "5.400.000.000 ₫", importPrice: "4.900.000.000 ₫", discount: "- 50.000.000 ₫", cost: "4.900.000.000 ₫",
        img: "https://images.porsche.com/f/285489813253582/5000x1390/beb65163ea/model-y1aai1-side-shot_7a4db2cc59b54248abe75a78b06b9e19.png/m/520x145/smart/filters:format(avif)",
        image: "https://images.porsche.com/f/285489813253582/5000x1390/beb65163ea/model-y1aai1-side-shot_7a4db2cc59b54248abe75a78b06b9e19.png/m/520x145/smart/filters:format(avif)",
        img45: "https://images.unsplash.com/photo-1618843479313-7fdeffaffbce?w=1200", imgCabin: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1200", imgRear: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1200",
        year: "2023", tags: ["2023", "Luxury Sedan"], maxRange: "800 km", accel: "5.1 s", fuelConsumption: "8.1 L/100km", speed: "250 km/h", seats: "5", drive: "rear", driveText: "Dẫn động cầu sau (RWD)", carType: "gasoline",
        specs: "<i class='bx bx-tachometer'></i> 250 km/h &nbsp; <i class='bx bx-timer'></i> 5.1s", isSpecialVF7: true
    },
    {
        id: "bmw-i7", name: "BMW i7 eDrive50",
        category: "pending", status: "Chờ xác nhận", statusClass: "status-pending",
        location: "SHOWROOM T1", aging: 8,
        price: "7.199.000.000 ₫", soldPrice: "7.000.000.000 ₫", importPrice: "6.400.000.000 ₫", discount: "- 100.000.000 ₫", cost: "6.400.000.000 ₫",
        img: "https://images.porsche.com/f/285489813253582/5000x1390/ff0291ead8/model-y1afp1-side-shot_4640060826294db8801ffa7e67e0879b.png/m/380x106/smart/filters:format(avif)",
        image: "https://images.porsche.com/f/285489813253582/5000x1390/ff0291ead8/model-y1afp1-side-shot_4640060826294db8801ffa7e67e0879b.png/m/380x106/smart/filters:format(avif)",
        img45: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200", imgCabin: "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?w=1200", imgRear: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200",
        year: "2024", tags: ["2024", "Electric Flagship"], maxRange: "603 km", accel: "5.5 s", fuelConsumption: "18.4 kWh/100km", speed: "205 km/h", seats: "5", drive: "rear", driveText: "Dẫn động cầu sau (RWD)", carType: "electric",
        specs: "<i class='bx bx-tachometer'></i> 205 km/h &nbsp; <i class='bx bx-timer'></i> 5.5s", isSpecialVF7: true
    },
    {
        id: "lexus-lx600", name: "Lexus LX 600 Urban",
        category: "completed", status: "Đã giao xe", statusClass: "status-completed",
        location: "KHO BÃI", aging: 2,
        price: "8.500.000.000 ₫", soldPrice: "8.300.000.000 ₫", importPrice: "7.700.000.000 ₫", discount: "0 ₫", cost: "7.700.000.000 ₫",
        img: "https://images.porsche.com/f/285489813253582/5000x1485/6d42be399c/model-9923b2-side-shot_dcaa55a519bc41f592398ec6affc4365.png/m/380x113/smart/filters:format(avif)",
        image: "https://images.porsche.com/f/285489813253582/5000x1485/6d42be399c/model-9923b2-side-shot_dcaa55a519bc41f592398ec6affc4365.png/m/380x113/smart/filters:format(avif)",
        img45: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200", imgCabin: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200", imgRear: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=1200",
        year: "2024", tags: ["2024", "SUV 7 Seats"], maxRange: "750 km", accel: "7.0 s", fuelConsumption: "12.5 L/100km", speed: "210 km/h", seats: "7", drive: "rear", driveText: "Dẫn động cầu sau (RWD)", carType: "gasoline",
        specs: "<i class='bx bx-tachometer'></i> 210 km/h &nbsp; <i class='bx bx-timer'></i> 7.0s", isSpecialVF7: true
    }
];
const DB_KEY = "KhoXeMaster_v2";

function initDatabase() {
    if (!localStorage.getItem(DB_KEY)) {
        localStorage.setItem(DB_KEY, JSON.stringify(defaultCars));
    }
}

function getCarsFromDB() { 
    return JSON.parse(localStorage.getItem(DB_KEY)) || defaultCars; 
}

function saveCarsToDB(carsArray) { 
    localStorage.setItem(DB_KEY, JSON.stringify(carsArray)); 
}

initDatabase();