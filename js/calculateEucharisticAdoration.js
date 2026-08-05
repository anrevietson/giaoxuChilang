(function() {
    // Hàm tính tuần thứ bao nhiêu trong năm theo tiêu chuẩn ISO
    function getWeekNumber(date) {
        // Nếu ngày không phải là Chủ Nhật, trả về -1
        if (date.getDay() !== 0) {
            return -1;
        }

        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);  // Ngày đầu tiên của năm
        const dayOfWeekFirstDay = firstDayOfYear.getDay(); // Lấy ngày trong tuần của ngày đầu tiên
        const daysToSunday = (7 - dayOfWeekFirstDay) % 7;  // Tính khoảng cách đến Chủ Nhật đầu tiên

        // Tìm ngày Chủ Nhật đầu tiên của năm
        const firstSunday = new Date(firstDayOfYear);
        firstSunday.setDate(firstSunday.getDate() + daysToSunday);

        // Tính số tuần từ Chủ Nhật đầu tiên
        const pastDaysSinceFirstSunday = (date - firstSunday) / 86400000;  // Số ngày đã qua từ Chủ Nhật đầu tiên
        const weekNumber = Math.ceil((pastDaysSinceFirstSunday + 1) / 7);  // Tính số tuần, tuần đầu tiên là 1

        return weekNumber > 0 ? weekNumber : 1;  // Nếu tính ra tuần 0 thì chỉnh về tuần 1
    }

    // Hàm lấy thông tin Chầu Thánh Thể dựa trên số tuần
    function getEucharisticAdorationContent(date) {
        const weekNumber = getWeekNumber(date);
        if (weekNumber === -1) {
            return '';
        }

        let weekKey = weekNumber.toString().padStart(2, '0');  // Chuyển tuần thành chuỗi có 2 chữ số
        if (window.eucharisticAdoration[weekKey]) {
            return window.eucharisticAdoration[weekKey].content;
        } else {
            return "Không có thông tin Chầu Thánh Thể cho tuần này.";
        }
    }

    // Đưa các hàm ra phạm vi toàn cục (global) để gọi từ HTML
    window.calculateEucharisticAdoration = {
        getEucharisticAdorationContent: getEucharisticAdorationContent
    };

})();
