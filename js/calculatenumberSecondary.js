const getCodeForDate = (function (global) {
    let codeSecondaryNumbers = [];

    // Hàm chính: nhận ngày, tháng, năm và trả về mã code tương ứng
    function getCodeForDate(day, month, year) {
        const easterDate = getEasterDate(year); // Giả sử đã có hàm tính ngày Phục Sinh
        codeSecondaryNumbers = []; // Khởi tạo lại danh sách codeSecondaryNumbers

        // Cập nhật các mã cố định dựa trên các ngày lễ đã xác định
        updateCodeSecondaryNumbersForMultipleDates(year, codeSecondaryNumbers);
        updateCodeSecondaryNumbersIncludingSundays(year, codeSecondaryNumbers);

        // Tính toán các ngày vọng lễ lớn
        let Bpentecost = new Date(easterDate);
        Bpentecost.setDate(easterDate.getDate() + 48); // Lễ vọng Chúa Thánh Thần Hiện Xuống
        let MotheChurch = new Date(easterDate);
        MotheChurch.setDate(easterDate.getDate() + 50); // Lễ Mẹ Hội Thánh

        let BHeartMaria = new Date(easterDate);
        BHeartMaria.setDate(easterDate.getDate() + 69); // Lễ vọng Thăng Thiên

        let christTheKing = getChristTheKing(year);
        christTheKing.setDate(christTheKing.getDate()-7);
        codeSecondaryNumbers.push({
            date: christTheKing,
            code: `8330`
        });

        codeSecondaryNumbers.push({
            date: Bpentecost,
            code: `8410`
        });
        codeSecondaryNumbers.push({
            date: MotheChurch,
            code: `8411`
        });
        codeSecondaryNumbers.push({
            date: BHeartMaria,
            code: `8441`
        });
        
    

        // Tết Trung Thu
        const midAutumnArray = getSolarDate(15, 8, year); // Lấy mảng trả về (ngày, tháng)
        const midAutumnFestival = new Date(year, midAutumnArray[1] - 1, midAutumnArray[0]); // Sử dụng ngày và tháng từ mảng, thêm năm
        codeSecondaryNumbers.push({
            date: midAutumnFestival,
            code: `80158`
        });

        // Tính ngày Tết âm lịch (Mồng 1 Tết)
        const lunarNewYearArray = getSolarDate(1, 1, year); // Tính ngày âm lịch
        const lunarNewYear = new Date(year, lunarNewYearArray[1] - 1, lunarNewYearArray[0]);
        let secondLunarDay = new Date(lunarNewYear);
        secondLunarDay.setDate(lunarNewYear.getDate() - 1);
        codeSecondaryNumbers.push({
            date: secondLunarDay,
            code: `80001`
        });       

        // cập nhật chủ nhật đầu tháng 10
        let firstSunday = getFirstSundayOfOctober(year);
        codeSecondaryNumbers.push({
            date: firstSunday,
            code: `81711`
        });

        // Kiểm tra ngày Thánh Tâm (Heartjesus) có trùng ngày 24/6 không
        let Heartjesus = new Date(easterDate);
        Heartjesus.setDate(easterDate.getDate() + 68); // Tính ngày Thánh Tâm Chúa Giêsu
        let Jun24 = new Date(year, 5, 24); // Ngày 24 tháng 6
        let Jun23 = new Date(year, 5, 23); // Ngày 23 tháng 6
        let Jun22 = new Date(year, 5, 22); // Ngày 22 tháng 6

        if (Jun24.getTime() === Heartjesus.getTime()) {
            let existingJun22Index = codeSecondaryNumbers.findIndex(item => item.date.getTime() === Jun22.getTime());
            if (existingJun22Index !== -1) {
                codeSecondaryNumbers[existingJun22Index].code = `82306`;
            } else {
                codeSecondaryNumbers.push({
                    date: Jun23,
                    code: `82306`
                });
            }
        } else {
            let existingJun23Index = codeSecondaryNumbers.findIndex(item => item.date.getTime() === Jun23.getTime());
            if (existingJun23Index !== -1) {
                codeSecondaryNumbers[existingJun23Index].code = `82306`;
            } else {
                codeSecondaryNumbers.push({
                    date: Jun23,
                    code: `82306`
                });
            }
        }

      
        // Tạo đối tượng Date từ thông số ngày, tháng, năm đầu vào
        let inputDate = new Date(year, month - 1, day);

        // Tìm kiếm mã dựa trên ngày truyền vào
        let existingCodeIndex = codeSecondaryNumbers.findIndex(item => item.date.getTime() === inputDate.getTime());
        if (existingCodeIndex !== -1) {
            return codeSecondaryNumbers[existingCodeIndex].code;
        } else {
            return null; // Nếu không có mã cho ngày này
        }
    }

    // Các hàm phụ trợ: cập nhật các mã cho các ngày lễ
    function updateCodeSecondaryNumbersForMultipleDates(year, codeSecondaryNumbers) {
        const datesToUpdate = [
            '05-01', '10-02', '06-11', '09-15', '10-17', '11-21', '09-01',
            '08-22', '01-26', '07-26', '07-29', '08-29',  '05-06',  '05-13', '02-11', '08-27', '08-28',
        ];

        const easterDate = getEasterDate(year);
        const holySaturday = new Date(easterDate);
        holySaturday.setDate(easterDate.getDate() - 1); // Tính ngày Thứ Bảy Tuần Thánh
        const octaveEaster = new Date(easterDate);
        octaveEaster.setDate(easterDate.getDate() + 8); // Bát nhật Phục Sinh

        datesToUpdate.forEach(dateString => {
            let [month, day] = dateString.split('-');
            let date = new Date(year, parseInt(month) - 1, parseInt(day));

            const isOctaveEaster = date.getTime() >= holySaturday.getTime() && date.getTime() <= octaveEaster.getTime();

            if (date.getDay() !== 0 && !isOctaveEaster) {
                let code = `8${day}${month}`;
                codeSecondaryNumbers.push({
                    date: date,
                    code: code
                });
            }
        });
    }
// tính chủ nhật đầu tháng 10
    function getFirstSundayOfOctober(year) {
        // Tạo đối tượng ngày bắt đầu từ ngày 1 tháng 10 của năm đó
        let firstDayOfOctober = new Date(year, 9, 1); // Tháng 10 là tháng 9 theo chỉ số (0-indexed)
        
        // Kiểm tra xem ngày đầu tiên của tháng 10 có phải là Chủ Nhật không
        let firstSundayOfOctober = firstDayOfOctober;
        if (firstDayOfOctober.getDay() !== 0) { 
            // Nếu không phải Chủ Nhật, thêm số ngày tương ứng để tìm Chủ Nhật
            let daysUntilSunday = 7 - firstDayOfOctober.getDay();
            firstSundayOfOctober = new Date(year, 9, 1 + daysUntilSunday);
        }
        
        return firstSundayOfOctober;
    }

    // Hàm để cập nhật mã codeSecondaryNumbers cho nhiều ngày, bao gồm cả Chủ Nhật
    function updateCodeSecondaryNumbersIncludingSundays(year, codeSecondaryNumbers) {
        const datesToUpdate = ['08-14', '10-07','11-02','12-24','12-25', '06-23', '06-28'];

        datesToUpdate.forEach(dateString => {
            let [month, day] = dateString.split('-');
            let date = new Date(year, parseInt(month) - 1, parseInt(day));

            let code = `8${day}${month}`;
            codeSecondaryNumbers.push({
                date: date,
                code: code
            });
        });
    }

    // Trả về hàm getCodeForDate để sử dụng bên ngoài
    return getCodeForDate;

})(window || globalThis); // Gán hàm vào biến toàn cục "getCodeForDate"
