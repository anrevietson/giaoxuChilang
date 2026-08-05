(function (window) {
    // Hàm tính toán các ngày lễ cơ bản của năm phụng vụ
    function calculateFeasts(year) {
        const feasts = []; // Khai báo mảng Ngày Lễ

        const celebrations = window.celebrations; // Lấy danh sách các ngày lễ từ saintcelebration.js

        // Các ngày lễ quan trọng
        const easterDate = getEasterDate(year);
        const epiphanySunday = getEpiphanySunday(year);
        const baptismOfTheLord = getBaptismOfTheLord(year);
        const ashWednesday = getAshWednesday(easterDate);
        const pentecost = getPentecost(easterDate);
        const christTheKing = getChristTheKing(year);
        const firstSundayOfAdvent = getFirstSundayOfAdvent(year);
  
        // Hàm để thêm ngày lễ vào mảng feasts
        function addFeast(name, date) {
            const existingFeastIndex = feasts.findIndex(feast => feast.date.getTime() === date.getTime());
            if (existingFeastIndex === -1) {
                // Nếu chưa có, thêm vào mảng
                feasts.push({ name: name, date: date });
            } else {
                // Nếu đã có, thêm thông tin mới vào đầu chuỗi
                feasts[existingFeastIndex].name = `${name} ${feasts[existingFeastIndex].name}`;
            }
        }
// Mảng chứa các ngày trong tuần bằng tiếng Việt
const daysOfWeekVietnamese = ['Chủ nhật', 'Thứ Hai.', 'Thứ Ba.', 'Thứ Tư.', 'Thứ Năm.', 'Thứ Sáu.', 'Thứ Bảy.'];

// Hàm chuyển đổi từ số ngày thành tên ngày trong tuần tiếng Việt
function getDayOfWeekInVietnamese(date) {
    return daysOfWeekVietnamese[date.getDay()]; // Lấy tên tiếng Việt dựa trên giá trị getDay() (0-6)
}

// Hàm để thêm ngày lễ vào mảng feasts
function addFeastend1(name, date) {
    // Tính ngày Thứ Tư Lễ Tro và Thứ Bảy sau Lễ Tro dựa vào ngày Phục Sinh
    const easterDate = getEasterDate(date.getFullYear());
    const ashWednesday = new Date(easterDate);
    ashWednesday.setDate(easterDate.getDate() - 46); // Thứ Tư Lễ Tro là 46 ngày trước Phục Sinh
    const saturdayAfterAshWednesday = new Date(ashWednesday);
    saturdayAfterAshWednesday.setDate(ashWednesday.getDate() + 3); // Cộng thêm 3 ngày (Thứ Bảy sau Lễ Tro)

    // Bỏ qua các ngày từ Thứ Tư Lễ Tro đến Thứ Bảy
    if (date.getTime() >= ashWednesday.getTime() && date.getTime() <= saturdayAfterAshWednesday.getTime()) {
        // Bỏ qua từ Thứ Tư Lễ Tro đến Thứ Bảy
    }
    // Khai báo cho đúng lại giúp tôi // nếu là ngày 25/11 là thứ 2 bỏ qua
    if (date.getMonth() === 10 && date.getDate() === 25 && date.getDay() === 1) { 
        return; // Bỏ qua ngày 25/11 nếu là Thứ Hai
    }
    // Tính ngày Mồng 1, Mồng 2, Mồng 3 Tết
    const lunarNewYearArray = getSolarDate(1, 1, date.getFullYear()); // Lấy ngày Mồng 1 Tết
    const lunarNewYear = new Date(date.getFullYear(), lunarNewYearArray[1] - 1, lunarNewYearArray[0]);

    const secondLunarDay = new Date(lunarNewYear);
    secondLunarDay.setDate(lunarNewYear.getDate() + 1); // Tính ngày Mồng 2

    const thirdLunarDay = new Date(lunarNewYear);
    thirdLunarDay.setDate(lunarNewYear.getDate() + 2); // Tính ngày Mồng 3

    // Bỏ qua nếu ngày hiện tại rơi vào Mồng 1, Mồng 2, hoặc Mồng 3 Tết
    if (date.getTime() === lunarNewYear.getTime() || 
        date.getTime() === secondLunarDay.getTime() || 
        date.getTime() === thirdLunarDay.getTime()) {
        return; // Bỏ qua Mồng 1, Mồng 2, Mồng 3 Tết
    }

    // Kiểm tra nếu ngày đó là Chủ nhật thì không cử hành lễ
    if (date.getDay() === 0) {
        return; // Nếu là Chủ nhật thì không thực hiện thêm lễ vào mảng feasts
    }

    const existingFeastIndex = feasts.findIndex(feast => feast.date.getTime() === date.getTime());
    
    // Thêm tên ngày trong tuần tiếng Việt vào đầu name
    const dayOfWeekInVietnamese = getDayOfWeekInVietnamese(date);
    const newName = `${dayOfWeekInVietnamese} ${name}`; // Ghép tên ngày vào trước name

    if (existingFeastIndex === -1) {
        // Nếu chưa có, thêm vào mảng
        feasts.push({ name: newName, date: date });
    } else {
        // Nếu đã có, thêm thông tin mới vào cuối chuỗi
        feasts[existingFeastIndex].name += ` ${name}`;
    }
}


        // Thêm các ngày lễ quan trọng
        addFeast("Cuối tuần Bát nhật Giáng Sinh. THÁNH MARIA MẸ, THIÊN CHÚA. Lễ trọng.", new Date(year, 0, 1));
        addFeast("CHÚA HIỂN LINH. Lễ trọng. Lễ cầu cho giáo dân (Lễ họ).", epiphanySunday);
        addFeast("CHÚA GIÊSU CHỊU PHÉP RỬA, lễ kính.", baptismOfTheLord);
        addFeast("THỨ TƯ LỄ TRO. Giữ chay và kiêng thịt.", ashWednesday);
        addFeast("THỨ NĂM TUẦN THÁNH. chiều: THÁNH LỄ TIỆC LY.", new Date(easterDate.getTime() - 3 * 24 * 60 * 60 * 1000)); // Holy Thursday
        addFeast("THỨ SÁU TUẦN THÁNH. TƯỞNG NIỆM CUỘC THƯƠNG KHÓ CỦA CHÚA.", new Date(easterDate.getTime() - 2 * 24 * 60 * 60 * 1000)); // Good Friday
        addFeast("THỨ BẢY TUẦN THÁNH. Canh thức Vượt Qua. THÁNH LỄ VỌNG PHỤC SINH.", new Date(easterDate.getTime() - 1 * 24 * 60 * 60 * 1000)); // Holy Saturday
        addFeast("CUỐI TUẦN BÁT NHẬT PHỤC SINH. CHÚA NHẬT VỀ LÒNG THƯƠNG XÓT CỦA CHÚA.", new Date(easterDate.getTime() + 7 * 24 * 60 * 60 * 1000)); // Second Sunday of Easter
        addFeast("CHÚA NHẬT CHÚA CHIÊN LÀNH. Cầu cho ơn thiên triệu linh mục và tu sĩ.", new Date(easterDate.getTime() + 21 * 24 * 60 * 60 * 1000)); // Fourth Sunday of Easter
        addFeast("CHÚA NHẬT CHÚA THĂNG THIÊN. Lễ trọng, Lễ cầu cho giáo dân (Lễ họ).", new Date(easterDate.getTime() + 42 * 24 * 60 * 60 * 1000)); // Seventh Sunday of Easter
        addFeast("Thứ Hai. Đức Trinh Nữ Maria, Mẹ Hội Thánh. Lễ nhớ.", new Date(easterDate.getTime() + 50 * 24 * 60 * 60 * 1000)); // Day after Pentecost
        addFeast("Thứ Bảy. Trái Tim Vô Nhiễm Đức Mẹ. Lễ nhớ.", new Date(easterDate.getTime() + 69 * 24 * 60 * 60 * 1000)); // Immaculate Heart of Mary
        //addFeast("KÍNH TRỌNG THỂ CÁC THÁNH TỬ ĐẠO VIỆT NAM.", new Date(christTheKing.getTime() - 7 * 24 * 60 * 60 * 1000)); // One week before Christ the King
        addFeast("CHÚA KITÔ VUA VŨ TRỤ.", christTheKing);
   
        // Thêm các ngày lễ âm lịch vào mảng feasts
        const lunarNewYearArray = getSolarDate(1, 1, year); // Lấy mảng trả về (ngày, tháng)
        const lunarNewYear = new Date(year, lunarNewYearArray[1] - 1, lunarNewYearArray[0]); // Sử dụng ngày và tháng từ mảng, thêm năm
        const canChi = getYearCanChi(lunarNewYear.getFullYear());

        const midAutumnArray = getSolarDate(15, 8, year); // Lấy mảng trả về (ngày, tháng)
        const midAutumnFestival = new Date(year, midAutumnArray[1] - 1, midAutumnArray[0]); // Sử dụng ngày và tháng từ mảng, thêm năm

        addFeast(`MỒNG MỘT TẾT. CẦU BÌNH AN NĂM MỚI. (${canChi})`, lunarNewYear);
        addFeast(`MỒNG HAI TẾT. KÍNH NHỚ ÔNG BÀ TỔ TIÊN. (${canChi})`, new Date(lunarNewYear.getTime() + 1 * 24 * 60 * 60 * 1000)); // Ngày tiếp theo
        addFeast(`MỒNG BA TẾT.THÁNH HÓA CÔNG ĂN VIỆC LÀM.  (${canChi})`, new Date(lunarNewYear.getTime() + 2 * 24 * 60 * 60 * 1000)); // Ngày tiếp theo
        //addFeast("TRUNG THU, tết thiếu nhi.", midAutumnFestival);


        // Mapping các mùa phụng vụ
        const seasonMapping = { 1: "Mùa Vọng", 3: "Mùa Chay", 4: "Phục Sinh", 5: "Thường Niên" };
        // Mapping các mùa phụng vụ
        const seasonMapping1 = { 1: "MÙA VỌNG.", 3: "MÙA CHAY.", 4: "PHỤC SINH.", 5: "THƯỜNG NIÊN." };
        // Mapping các ngày trong tuần
        const dayOfWeekMapping = {
            0: "CHÚA NHẬT", 1: "Thứ Hai", 2: "Thứ Ba", 3: "Thứ Tư", 4: "Thứ Năm", 5: "Thứ Sáu", 6: "Thứ Bảy"
        };

        // Hàm nhận vào một mã số bốn chữ số và trả về thông tin ngày lễ
        function getFeastByFourDigitCode(codeNumber) {
            const codeStr = codeNumber.toString();

            if (specialFeastCodes.has(codeStr)) {
                return specialFeastCodes.get(codeStr); // Trả về ngày lễ từ bản đồ
            }

            const seasonCode = parseInt(codeStr.charAt(0));
            const weekCode = parseInt(codeStr.slice(1, 3));
            const dayOfWeekCode = parseInt(codeStr.charAt(3));
            const season = seasonMapping[seasonCode] || "";
            const season1 = seasonMapping1[seasonCode] || "";
            const dayOfWeek = dayOfWeekMapping[dayOfWeekCode] || "";
            const weekRoman = convertToRoman(weekCode);
	     
    	      if (dayOfWeekCode === 0) {
    		return `${dayOfWeek} ${weekRoman} ${season1}`;
    		}
    	   return `${dayOfWeek} ${weekRoman} ${season}`;
        }


        // Hàm để lấy mã codeNumber
        function getCodeNumberForDay(solarDate) {
            return calculatenumberSunday(year).getCodeNumberForDay(solarDate);
        }

        const specialFeastCodes = new Map([
            ["70812", "ĐỨC MẸ VÔ NHIỄM NGUYÊN TỘI. Lễ trọng. Lễ cầu cho giáo dân (Lễ họ)."],          
	        ["3005", "Thứ Năm sau Lễ Tro."], ["3006", "Thứ Sáu sau Lễ Tro."], ["3007", "Thứ Bảy sau Lễ Tro."],
            ["3060", "CHÚA NHẬT LỄ LÁ. TƯỞNG NIỆM CUỘC THƯƠNG KHÓ CỦA CHÚA."],
            ["3061", "Thứ Hai Tuần Thánh."], ["3062", "Thứ Ba Tuần Thánh."], ["3063", "Thứ Tư Tuần Thánh."],
            ["4011", "THỨ HAI TRONG TUẦN BÁT NHẬT PHỤC SINH."], ["4012", "THỨ BA TRONG TUẦN BÁT NHẬT PHỤC SINH."], ["4013", "THỨ TƯ TRONG TUẦN BÁT NHẬT PHỤC SINH."],
            ["4014", "THỨ NĂM TRONG TUẦN BÁT NHẬT PHỤC SINH."], ["4015", "THỨ SÁU TRONG TUẦN BÁT NHẬT PHỤC SINH."], ["4016", "THỨ BẢY TRONG TUẦN BÁT NHẬT PHỤC SINH."],
            ["4010", "CHÚA NHẬT PHỤC SINH. MỪNG CHÚA SỐNG LẠI. Lễ trọng với tuần bát nhật. Lễ cầu cho giáo dân (Lễ họ)."],
            ["5410", "CHÚA THÁNH THẦN HIỆN XUỐNG. Lễ trọng. Lễ cầu cho giáo dân (Lễ họ)."],
            ["5420", "CHÚA BA NGÔI. Lễ trọng. Lễ cầu cho giáo dân (Lễ họ)."],
            ["5430", "MÌNH MÁU CHÚA KITÔ. Lễ trọng. Lễ cầu cho giáo dân (Lễ họ)."],
            ["5440", "Thứ Sáu. THÁNH TÂM CHÚA GIÊSU. Lễ trọng. ngày xin ơn thánh hóa các linh mục."],
            ["20401", "Mùa Giáng Sinh."], ["20501", "Mùa Giáng Sinh."], ["20601", "Mùa Giáng Sinh."], ["20701", "Mùa Giáng Sinh."],
            ["2010", "THÁNH GIA CHÚA GIÊSU, ĐỨC MA-RI-A VÀ THÁNH GIUSE. Lễ trọng."],
            ["21712", "Phần II: Mùa Vọng ngày 17 /12."], ["21812", "Mùa Vọng ngày 18 /12."], ["21912", "Mùa Vọng ngày 19 /12."],
            ["22012", "Mùa Vọng ngày 20 /12."], ["22212", "Mùa Vọng ngày 22 /12."], ["22412", "Mùa Vọng ngày 24 /12."],
            ["22512", "CHÚA GIÁNG SINH. Lễ trọng với tuần bát nhật. Lễ buộc. Lễ cầu cho giáo dân (Lễ họ)."],
            ["6001", "Thứ Hai sau lễ Hiển Linh."], ["6002", "Thứ Ba sau lễ Hiển Linh."], ["6003", "Thứ Tư sau lễ Hiển Linh."],
            ["6004", "Thứ Năm sau lễ Hiển Linh."], ["6005", "Thứ Sáu sau lễ Hiển Linh."], ["6006", "Thứ Bảy sau lễ Hiển Linh."],
            ["22812", "Bát nhật Giáng Sinh."], ["22912", "Bát nhật Giáng Sinh."], ["23012", "Bát nhật Giáng Sinh."],
            ["71903", "THÁNH GIUSE BẠN TRĂM NĂM ĐỨC TRINH NỮ MARIA. Bổn mạng Hội Thánh hoàn vũ và Hội Thánh Việt Nam. Lễ trọng. Lễ cầu cho giáo dân (Lễ họ)."],
            ["72411", "CÁC THÁNH TỬ ĐẠO VIỆT NAM. Bổn mạng Hội Thánh Việt Nam. Lễ Trọng."],
            ["72503", "LỄ TRUYỀN TIN. Lễ trọng."],
            ["72406", "SINH NHẬT THÁNH GIOAN TẨY GIẢ. Lễ trọng."],
            ["72906", "THÁNH PHÊRÔ VÀ THÁNH PHAOLÔ TÔNG ĐỒ. Lễ trọng. Lễ cầu cho giáo dân (Lễ họ)."],
            ["5450", "CHÚA HIỂN DUNG. Lễ kính."],
            ["71508", "ĐỨC MẸ LÊN TRỜI. Lễ trọng. Lễ cầu cho giáo dân (Lễ họ)."],
            ["70211", "CẦU CHO CÁC TÍN HỮU ĐÃ QUA ĐỜI."],
            ["70911", "CUNG HIẾN THÁNH ĐƯỜNG LATÊRANÔ. Lễ kính."],
            ["71409", "SUY TÔN THÁNH GIÁ. Lễ kính."],
            ["70202", "DÂNG CHÚA GIÊSU TRONG ĐỀN THÁNH (Lễ Nến). Lễ kính."],
            ["71312", "KỶ NIỆM CUNG HIẾN THÁNH ĐƯỜNG GIÁO XỨ. Lễ trọng."],
            ["71409", "SUY TÔN THÁNH GIÁ. Lễ kính."],
        ]);

   
// Duyệt qua tất cả các ngày trong năm và kiểm tra với celebrations
for (let month = 1; month <= 12; month++) {
    for (let day = 1; day <= 31; day++) {
        const solarDate = new Date(year, month - 1, day);
        if (solarDate.getMonth() + 1 !== month) break; // Kiểm tra tính hợp lệ của ngày

        // Bỏ qua nếu là ngày Thứ Tư Lễ Tro
        if (solarDate.getTime() === ashWednesday.getTime()) {
            continue; // Bỏ qua Thứ Tư Lễ Tro
        }

        // Thêm ngày lễ từ tệp celebrations
        addCelebrationsFromExternalFile(month, day, solarDate);

        // Nếu ngày 25/11 là ngày thứ 2 thì không cập nhật????
       
        const isSunday = solarDate.getDay() === 0;
        const existingFeastIndex = feasts.findIndex(feast => feast.date.getTime() === solarDate.getTime());
        
        // Bỏ qua nếu không phải Chủ Nhật và ngày lễ đã có
        if (!isSunday && existingFeastIndex !== -1) {
            continue;
        }

        // Tính toán mã số codeNumber và lấy thông tin ngày lễ từ mã đó
        const codeNumber = getCodeNumberForDay(solarDate);
        const feastInfo = getFeastByFourDigitCode(codeNumber);
        
        // Thêm ngày lễ từ thông tin tính toán
        addFeast(feastInfo, solarDate);
    }
}


// Hàm chuyển đổi đối tượng Date thành chuỗi 'dd/mm'
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo luôn có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    return `${day}/${month}`;
}

// Lấy các ngày lễ từ celebrations và thêm vào feasts các ngày lễ nhớ và lễ kính
function addCelebrationsFromExternalFile(month, day, solarDate) {
    const key = formatDate(solarDate); // Chuyển solarDate thành chuỗi "dd/mm"
    const easterDate = getEasterDate(year);

    const ashWednesday = new Date(easterDate);
    ashWednesday.setDate(easterDate.getDate() - 47); // Tính ngày Thứ Tư Lễ Tro
    const holySaturday = new Date(easterDate);
    holySaturday.setDate(easterDate.getDate() -8); // Tính ngày Thứ Bảy Tuần Thánh
    const octaveEater = new Date(easterDate);
    octaveEater.setDate(easterDate.getDate() +8);
    const Heartjesus = new Date(easterDate);
    Heartjesus.setDate(easterDate.getDate() +68);

    // Kiểm tra nếu ngày hiện tại nằm trong khoảng Ash Wednesday đến Holy Saturday
    const isDuringAshToHoly = solarDate.getTime() >= ashWednesday.getTime() && solarDate.getTime() <= holySaturday;
    // Kiểm tra bát nhật phục sinh 
     const isoctaveEater = solarDate.getTime() >= holySaturday.getTime() && solarDate.getTime() <= octaveEater.getTime();
     const isHeartjesus = solarDate.getTime() === Heartjesus.getTime();
     const day912 = new Date(solarDate.getFullYear(), 11, 9); // Tạo đối tượng Date cho ngày 9 tháng 12
    const isMonday912 = day912.getDay() === 1 && solarDate.getTime() === day912.getTime();

    // Duyệt qua các ngày lễ trong celebrations
    celebrations.forEach((celebration) => {
        const celebrationDate = celebration.date;  // Lấy ngày/tháng từ celebration
        let feastName = celebration.feast; // Lấy tên ngày lễ từ celebration
        const type = celebration.type; // Lấy kiểu ngày lễ (M, F, etc.)

        // Nếu kiểu là 'M' và nằm trong khoảng Ash Wednesday đến Holy Saturday
        if (type === 'M' && isDuringAshToHoly) {
            // Giữ nguyên feastName, không thêm "Lễ nhớ."
            feastName = celebration.feast;
        } else if (type === 'M') {
            // Thêm "Lễ nhớ." nếu type là 'M' và không nằm trong thời gian Ash Wednesday đến Holy Saturday
            feastName += " Lễ nhớ.";
        } else if (type === 'F') {
            // Thêm "Lễ kính." nếu type là 'F'
            feastName += " Lễ kính.";
        }

        // So sánh celebrationDate (chuỗi 'dd/mm') với solarDate (chuỗi 'dd/mm')
        if (celebrationDate === key) {
            let feast = feastName; 

            // Tìm xem có ngày lễ nào trùng với ngày cần xét trong feasts hay không
            const existingFeastIndex = feasts.findIndex(feast => 
               feast.date.getDate() === solarDate.getDate() && 
               feast.date.getMonth() === solarDate.getMonth()
            );
	  // không cập nhật lễ cho tuần bát nhật phục sinh
            if (isoctaveEater ||isHeartjesus||isMonday912) { 
                return; // Ngày lễ đã tồn tại, bỏ qua
            }
            // Nếu ngày lễ đã có trong feasts, không thêm trùng lặp
            if (existingFeastIndex !== -1&&!isoctaveEater) { 
                return; // Ngày lễ đã tồn tại, bỏ qua
            }

            // Thêm ngày lễ vào feasts
            addFeastend1(feast, solarDate); 
        }
    });
}


        return feasts; // Trả về danh sách các ngày lễ toàn năm
    }

    // Hàm chuyển đổi số tuần thành số La Mã
    function convertToRoman(num) {
        const romanNumerals = [["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]];
        let roman = '';
        for (let [letter, value] of romanNumerals) {
            while (num >= value) {
                roman += letter;
                num -= value;
            }
        }
        return roman;
    }

    // Cung cấp các hàm cần thiết để sử dụng bên ngoài
    window.calculateFeasts = calculateFeasts;
})(window);
