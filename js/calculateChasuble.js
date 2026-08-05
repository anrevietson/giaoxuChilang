(function (window) {



    const chasubleColorsByCodeNumber = {
        '3060': 'Đ', '3064': 'Tr', '3065': 'Đ', '3066': 'Tr', '70202': 'Tr', '72202': 'Tr', '71903': 'Tr', '71312': 'Tr',
        '72503': 'Tr', '5000': 'Tr', '72406': 'Tr', '72906': 'Đ', '5450': 'Tr', '71508': 'Tr', '71409': 'Đ', '70211': 'Tm', '70911': 'Tr', '70812': 'Tr', '70001': 'Tr', '70002': 'Tr', '70003': 'Tr', '72411': 'Đ',
        // Thêm các codeNumber và màu tương ứng khác tại đây
    };

    // Hàm lấy các ngày lễ quan trọng
    function getImportantDates(year) {
        const baptismOfTheLord = window.getBaptismOfTheLord(year);
        const easterDate = window.getEasterDate(year);
        const pentecost = window.getPentecost(easterDate);
        const firstSundayOfAdvent = window.getFirstSundayOfAdvent(year);

        return {
            baptismOfTheLord,
            easterDate,
            pentecost,
            firstSundayOfAdvent
        };
    }

    // Hàm chính để tính toán các mốc ngày lễ
    function calculateLiturgicalData(year) {
        const { baptismOfTheLord, easterDate, pentecost, firstSundayOfAdvent } = getImportantDates(year);

        const firstDayOfYear = new Date(year, 0, 1);
        const ashWednesday = new Date(easterDate); 
        ashWednesday.setDate(ashWednesday.getDate() - 47); 
        const palmSunday = new Date(easterDate);
        palmSunday.setDate(palmSunday.getDate() - 8); 
        const holySaturday = new Date(easterDate);
        holySaturday.setDate(easterDate.getDate() - 1); 
        const adventStart = new Date(firstSundayOfAdvent);
        const christTheKing = window.getChristTheKing(year);
        christTheKing.setDate(christTheKing.getDate() + 6);

        const chasubleData = [
            { start: firstDayOfYear, end: baptismOfTheLord, chasuble: 'Tr' }, 
            { start: baptismOfTheLord, end: ashWednesday, chasuble: 'X' },
            { start: ashWednesday, end: holySaturday, chasuble: 'Tm' },
            { start: easterDate, end: pentecost, chasuble: 'Tr' },
            { start: pentecost, end: christTheKing, chasuble: 'X' },
            { start: adventStart, end: new Date(year, 11, 24), chasuble: 'Tm' },
            { start: new Date(year, 11, 25), end: new Date(year, 11, 31), chasuble: 'Tr' }
        ];

        return chasubleData;
    }

    // Hàm để lấy mã codeNumber
    function getCodeNumberForDay(solarDate, year) {
        return calculatenumberSunday(year).getCodeNumberForDay(solarDate);
    }

    // Hàm xử lý ngày lễ đặc biệt
    function handleSpecialFeasts(date, easterDate) {
        const pentecost = window.getPentecost(easterDate);
        const motherOfTheChurch = new Date(pentecost);
        motherOfTheChurch.setDate(pentecost.getDate() + 1);
        const trinitySunday = new Date(pentecost);
        trinitySunday.setDate(pentecost.getDate() + 7);
        const corpusChristi = new Date(pentecost);
        corpusChristi.setDate(pentecost.getDate() + 14);
        const heartOfJesus = new Date(easterDate);
        heartOfJesus.setDate(easterDate.getDate() + 68);
        const immaculateHeartOfMary = new Date(heartOfJesus);
        immaculateHeartOfMary.setDate(heartOfJesus.getDate() + 1);

        if (date.getTime() === pentecost.getTime()) return 'Đ';
        if (date.getTime() === motherOfTheChurch.getTime()) return 'Tr';
        if (date.getTime() === trinitySunday.getTime()) return 'Tr';
        if (date.getTime() === corpusChristi.getTime()) return 'Tr';
        if (date.getTime() === heartOfJesus.getTime()) return 'Đ';
        if (date.getTime() === immaculateHeartOfMary.getTime()) return 'Tr';

        return null; 
    }


    // Lấy danh sách các ngày lễ từ saintcelebration.js
    const celebrations = window.celebrations || []; 

   // Hàm chuyển đổi đối tượng Date thành chuỗi 'dd/mm'
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0'); // Đảm bảo luôn có 2 chữ số
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        return `${day}/${month}`;
    }

    function getChasubleForDay(date, year) {
    const { easterDate } = getImportantDates(year);
    const specialChasuble = handleSpecialFeasts(date, easterDate);

    // Nếu có màu áo lễ đặc biệt, trả về ngay
    if (specialChasuble) {
        return specialChasuble;
    }

    // Định dạng ngày hiện tại thành chuỗi 'dd/mm'
    const formattedDate = formatDate(date);
    const codeNumber = getCodeNumberForDay(date, year);

    // Kiểm tra màu áo lễ theo mã code
    if (chasubleColorsByCodeNumber[codeNumber]) {
        return chasubleColorsByCodeNumber[codeNumber];
    }

    // Tính toán thời gian từ Ash Wednesday đến Holy Saturday
    const ashWednesday = new Date(easterDate);
    ashWednesday.setDate(easterDate.getDate() - 47);
    const holySaturday = new Date(easterDate);
    holySaturday.setDate(easterDate.getDate() - 1);
    const octaveEater = new Date(easterDate);
    octaveEater.setDate(easterDate.getDate() + 8);

    // Kiểm tra nếu ngày hiện tại nằm trong khoảng Ash Wednesday đến Holy Saturday
    const isDuringAshToHoly = date.getTime() >= ashWednesday.getTime() && date.getTime() <= octaveEater.getTime();
    const isOctaveEater = date.getTime() >= holySaturday.getTime() && date.getTime() <= octaveEater.getTime();


    if (date.getDay() === 0) {
        // Không gọi saintcelebration.js, tiếp tục với dữ liệu phụng vụ
    } else {
        // Chỉ tìm kiếm trong saintcelebration.js nếu không phải là Chúa Nhật cuối năm
        const foundCelebration = celebrations.find(celebration => celebration.date === formattedDate);
        
        if (isDuringAshToHoly) {
            // Trong khoảng từ Ash Wednesday đến Holy Saturday, chỉ cập nhật nếu Type: 'F' và không phải Chủ nhật
            if (foundCelebration && foundCelebration.type === 'F' && date.getDay() !== 0 && date.getTime() === ashWednesday.getTime() && isOctaveEater) {
                return foundCelebration.chasuble; // Trả về màu áo lễ cho lễ trọng ngày thường
            }
        } else if (foundCelebration && foundCelebration.chasuble) {
            // Nếu không nằm trong khoảng thời gian đặc biệt, trả về màu áo lễ thông thường
            return foundCelebration.chasuble;
        }
    }

    // Kiểm tra màu áo lễ từ dữ liệu phụng vụ
    const chasubleData = calculateLiturgicalData(year);
    for (let { start, end, chasuble } of chasubleData) {
        if (date.getTime() >= start.getTime() && date.getTime() <= end.getTime()) {
            return chasuble; // Trả về màu áo lễ nếu ngày nằm trong khoảng phụng vụ
        }
    }

    return null; // Trả về màu mặc định nếu không tìm thấy
}


    // Khởi tạo trước cho năm cụ thể, không cần tính toán trước toàn bộ danh sách
    window.calculateChasuble = function (year) {
        return {
            getChasubleForDay: (date) => {
                return getChasubleForDay(date, year); // Sử dụng kết quả tra cứu trực tiếp
            }
        };
    };

})(window);
