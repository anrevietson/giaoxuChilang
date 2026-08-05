(function () {
    // Mảng chu kỳ phụng vụ theo thứ tự 4 vòng
    const liturgicalRounds = ['MÂN CÔI', 'LỘ ĐỨC', 'FATIMA', 'LA VANG'];

    // Biến toàn cục để lưu kết quả
    let totalWeeksGlobal = 0;
    let liturgicalCycleGlobal = '';

    // Hàm tính toán chu kỳ phụng vụ dựa trên tổng số tuần
    function calculateLiturgicalCycle(totalWeeks) {
        const cycle = (Math.abs(totalWeeks) % 4 + 4) % 4; // Tính chu kỳ dựa trên % 4, đảm bảo trị tuyệt đối
        return liturgicalRounds[cycle]; // Trả về vòng tương ứng
    }

    // Hàm để kiểm tra xem một ngày có phải Chủ Nhật hay không
    function isSunday(date) {
        return date.getDay() === 0; // Chủ Nhật = 0
    }

    // Hàm tính tổng số tuần từ năm khởi đầu đến ngày hiện tại hoặc tính ngược lại
    function getTotalWeeksSinceStart(startYear, currentYear, inputDate) {
        let totalWeeks = 0;
        let direction = (currentYear >= startYear) ? 1 : -1; // Nếu năm hiện tại trước năm khởi đầu thì tính ngược

        // Tính tổng số tuần cho từng năm từ startYear đến currentYear
        for (let year = startYear; direction === 1 ? year <= currentYear : year >= currentYear; year += direction) {
            const sundays = getSundaysOfYear(year); // Lấy tất cả Chủ Nhật trong năm

            if (year === currentYear) {
                // Tìm số tuần trong năm hiện tại, tính đến ngày input
                for (let i = 0; i < sundays.length; i++) {
                    if (inputDate < sundays[i].date) {
                        return totalWeeks + i * direction; // Trả về tổng số tuần tính đến ngày hiện tại
                    }
                }
                // Nếu inputDate lớn hơn tất cả các Chủ Nhật trong năm hiện tại
                totalWeeks += sundays.length * direction;
            } else {
                // Cộng số tuần của các năm trước hoặc trừ nếu tính ngược
                totalWeeks += sundays.length * direction;
            }
        }

        return totalWeeks;
    }

    // Hàm để tính tất cả các Chủ Nhật trong một năm
    function getSundaysOfYear(year) {
        const sundays = [];
        let currentDate = new Date(year, 0, 1); // Bắt đầu từ ngày 1/1 của năm đó

        // Tìm Chủ Nhật đầu tiên của năm
        while (!isSunday(currentDate)) {
            currentDate.setDate(currentDate.getDate() + 1); // Tăng ngày lên cho đến khi gặp Chủ Nhật
        }

        // Duyệt qua tất cả các Chủ Nhật trong năm
        while (currentDate.getFullYear() === year) {
            sundays.push({
                date: new Date(currentDate) // Lưu lại ngày Chủ Nhật
            });
            currentDate.setDate(currentDate.getDate() + 7); // Chuyển sang Chủ Nhật tiếp theo
        }

        return sundays;
    }

    // Hàm chính để sử dụng cho đầu vào là đối tượng Date
    function processDate(inputDate) {
        const year = inputDate.getFullYear(); // Lấy năm từ đối tượng Date
        const startYear = 2024; // Năm khởi đầu là 2024

        // Tính tổng số tuần và chu kỳ phụng vụ
        totalWeeksGlobal = Math.abs(getTotalWeeksSinceStart(startYear, year, inputDate)); // Tổng số tuần (trị tuyệt đối)
        liturgicalCycleGlobal = calculateLiturgicalCycle(totalWeeksGlobal); // Chu kỳ phụng vụ

        // Trả về kết quả chu kỳ phụng vụ
        return liturgicalCycleGlobal;
    }

    // Gắn hàm processDate vào window để gọi từ HTML
    window.processDate = processDate;
})();
