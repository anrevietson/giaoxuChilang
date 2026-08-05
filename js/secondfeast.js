(function () {
    // Hàm tính toán các ngày lễ vọng (Second Feasts)
    function calculateSecondFeasts(year) {
        const secondFeasts = [];

        // Hàm để đảm bảo date luôn là đối tượng Date
        function parseDate(date) {
            return (date instanceof Date) ? date : new Date(date);
        }

        // Lấy ngày Phục Sinh
        const easterDate = parseDate(getEasterDate(year));
        

        // Chúa nhật thứ 1 của tháng 10
        let BfirstSunday = parseDate(getFirstSundayOfOctober(year));

        let EndSunday = parseDate(getEndSundayOfYear(year));

        // Tính các ngày lễ vọng
        secondFeasts.push({ name: 'Bắt đầu tuần cầu nguyện cho các kitô hữu hợp nhất.', date: new Date(year, 0, 18) });
        secondFeasts.push({ name: 'Kết thúc tuần cầu nguyện cho các kitô hữu hợp nhất.', date: new Date(year, 0, 25) });


        secondFeasts.push({ name: 'Chiều: LỄ VỌNG CHÚA THĂNG THIÊN (Tr). Bài đọc như lễ Chính ngày', date: new Date(easterDate.getTime() + 41 * 24 * 60 * 60 * 1000) });
        secondFeasts.push({ name: 'Chiều: LỄ VỌNG CHÚA THÁNH THẦN HIỆN XUỐNG (Đ).', date: new Date(easterDate.getTime() + 48 * 24 * 60 * 60 * 1000) });
        secondFeasts.push({ name: 'Chiều: LỄ VỌNG THÁNH PHÊRÔ VÀ PHAOLÔ TỒNG ĐỒ (Đ).', date: new Date(year, 5, 28) });
        secondFeasts.push({ name: 'Chiều: LỄ VỌNG ĐỨC MẸ HỒN XÁC LÊN TRỜI (Tr)', date: new Date(year, 7, 14) });
        secondFeasts.push({ name: 'Chiều: LỄ VỌNG GIÁNG SINH', date: new Date(year, 11, 24) });
        const christTheKing = parseDate(getChristTheKing(year));
        secondFeasts.push({name: 'KÍNH TRỌNG THỂ CÁC THÁNH TỬ ĐẠO VIỆT NAM. (Đ)', date: new Date(christTheKing.getTime() - 7 * 24 * 60 * 60 * 1000)}); // One week before Christ the King
        secondFeasts.push({ name: 'Được kính trọng thể lễ Đức Mẹ Mân Côi (Tr).', date: new Date(BfirstSunday.getTime()) });
        secondFeasts.push({ name: 'Chúa nhật Truyền giáo (Tr). Được cử hành thánh lễ cầu nguyện cho việc rao giảng Tin mừng cho các dân tộc.', date: new Date(BfirstSunday.getTime() + 14 * 24 * 60 * 60 * 1000) });

        const lunarNewYearArray = getSolarDate(1, 1, year); // Lấy mảng trả về (ngày, tháng)
        const lunarNewYear = new Date(year, lunarNewYearArray[1] - 1, lunarNewYearArray[0]); // Sử dụng ngày và tháng từ mảng, thêm năm
        secondFeasts.push({ name: 'THÁNH LỄ TẤT NIÊN (Tr)', date: new Date(lunarNewYear.getTime() - 1 * 24 * 60 * 60 * 1000) });

        const midAutumnArray = getSolarDate(15, 8, year); // Lấy mảng trả về (ngày, tháng)
        const midAutumnFestival = new Date(year, midAutumnArray[1] - 1, midAutumnArray[0]); // Sử dụng ngày và tháng từ mảng, thêm năm
        secondFeasts.push({ name: 'TRUNG THU, tết thiếu nhi. (Tr)', date: new Date(midAutumnFestival.getTime()) });


        // Tính Vọng Thánh Gioan Tẩy Giả
        const sacredHeartDate = new Date(easterDate.getTime() + 68 * 24 * 60 * 60 * 1000); // Ngày lễ Thánh Tâm
        const june24Date = new Date(year, 5, 24); // Ngày 24/6
        if (june24Date.getTime() === sacredHeartDate.getTime()) {
            secondFeasts.push({ name: 'Chiều: LỄ VỌNG THÁNH GIOAN BAOTIXITA', date: new Date(year, 5, 22) });
        } else {
            secondFeasts.push({ name: 'Chiều: LỄ VỌNG THÁNH GIOAN BAOTIXITA', date: new Date(year, 5, 23) });
        }

        return secondFeasts;
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
    function getEndSundayOfYear(year) {
        // Ngày đầu tiên của tháng 12
        let lastDayOfYear = new Date(year, 11, 31); // 31 tháng 12 của năm
    
        // Kiểm tra nếu là ngày 25/12 thì trả về 30/12
        if (lastDayOfYear.getDate() === 25 && lastDayOfYear.getMonth() === 11) {
            return new Date(year, 11, 30); // Trả về 30/12
        }
    
        // Tìm ngày Chủ Nhật gần nhất về trước hoặc trùng với 31 tháng 12
        while (lastDayOfYear.getDay() !== 0) { // getDay() === 0 nghĩa là Chủ Nhật
            lastDayOfYear.setDate(lastDayOfYear.getDate() - 1);
        }
    
        return lastDayOfYear;
    }

    // Đưa hàm calculateSecondFeasts ra ngoài phạm vi toàn cục
    window.calculateSecondFeasts = calculateSecondFeasts;
})();
