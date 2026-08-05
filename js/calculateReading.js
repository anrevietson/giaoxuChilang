(function() {
    const liturgicalYears = ['B', 'C', 'A'];
    const specialReadingCodes = new Map();  // Mã đặc biệt 5 chữ số



    // Tính năm phụng vụ B, C, A 
    function getLiturgicalYear(date) {
        const year = date.getFullYear();
        const startYear = 2020;  // Thay đổi năm khởi điểm nếu cần
        const cycleLength = 3;
        const yearOffset = year - startYear;
        const cycle = (yearOffset % cycleLength + cycleLength) % cycleLength;
        return liturgicalYears[cycle];
    }

    // Xác định năm lẻ hay chẵn
    function isOddYear(date) {
        const year = date.getFullYear();
        return year % 2 !== 0;
    }

    // Hàm tính codeNumber từ ngày
    function getCodeNumberForDay(date) {
        return calculatenumberSunday(date.getFullYear()).getCodeNumberForDay(date);
    }
    // Mảng readings từ file readingdata.js
    const readings = window.readings;

    // Hàm trả về thông tin bài đọc dựa vào mã số (codeNumber)

    function getFeastByFourDigitCode(date) {
    date.setHours(0, 0, 0, 0);  // Đặt thời gian về 00:00 để bỏ qua giờ, phút, giây
    const codeNumber = getCodeNumberForDay(date);
    const codeStr = codeNumber.toString();

    // Mã các ngày lễ đặc biệt liên quan năm phụng vụ
    const specialCodes = ["5001", "5002", "5003", "5004"];
    
    // Mã các ngày lễ đặc biệt không liên quan năm phụng vụ
    const specialCodes1 = ["6000", "3004", "3005", "3006", "3007", "70001", "70002", "70003",];
    
   // Xử lý mã 5 chữ số
    if (codeStr.length === 5) {
        const result = readings.find(reading => reading.code == codeStr);
        return result ? result : null;
    }

    // Xử lý mã 4 chữ số
    const seasonCode = parseInt(codeStr.charAt(0));  // Số đầu tiên là mùa
    const dayOfWeekCode = parseInt(codeStr.charAt(3));  // Số cuối là ngày trong tuần

    let liturgicalYear;

    // Xử lý các mã đặc biệt
    if (specialCodes.includes(codeStr)) {
        liturgicalYear = getLiturgicalYear(new Date(date.getFullYear() - 1));
        const result = readings.find(reading => reading.code == codeStr && reading.year === liturgicalYear);
        return result ? result : null;
    }
    // Xử lý các mã đặc biệt
    if (specialCodes1.includes(codeStr)) {
        const result = readings.find(reading => reading.code == codeStr);
        return result ? result : null;
    }

    if (codeStr.length === 4) {
        if (dayOfWeekCode === 0 && (seasonCode !== 1 && seasonCode !== 2)) {
            // Chủ nhật và Năm Phụng vụ
	let date1 = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
            liturgicalYear = getLiturgicalYear(date1);
            } else if (dayOfWeekCode === 0 &&  (seasonCode === 1 || seasonCode === 2)) {
            // Chủ nhật và là Năm Phụng Vụ
            liturgicalYear = getLiturgicalYear(date);
        }

        // Tìm bài đọc theo mã 4 chữ số
        if (dayOfWeekCode === 0) {
           const result = readings.find(reading => reading.code == codeStr && reading.year === liturgicalYear);
            return result ? result : null;
        }

        // Ngày thường trong Mùa Thường Niên
        if (dayOfWeekCode !== 0 && seasonCode === 5) {
            const yearType = isOddYear(date) ? '1' : '2';
            const result = readings.find(reading => reading.code == codeStr && reading.year === yearType);
            return result ? result : null;
        } else {
            const result = readings.find(reading => reading.code == codeStr);
            return result ? result : null;
        }
    }

    return null;
}

    // Gắn hàm getFeastByFourDigitCode vào phạm vi toàn cục
    window.getFeastByFourDigitCode = getFeastByFourDigitCode;

})();
