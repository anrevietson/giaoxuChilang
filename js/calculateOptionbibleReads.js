(function () {
    // Hàm chính lấy bài đọc dựa trên code 4 chữ số
    function getBibleByOptionDigitCode(date) {
        // Kiểm tra nếu 'date' là đối tượng Date hợp lệ
        if (date instanceof Date && !isNaN(date)) {
            // Lấy giá trị ngày, tháng và năm từ đối tượng Date
            const day = date.getDate();         // Lấy ngày
            const month = date.getMonth() + 1;  // Lấy tháng (nhớ cộng thêm 1 vì tháng trong JS bắt đầu từ 0)
            const year = date.getFullYear();    // Lấy năm

             // Gọi hàm lấy mã secondaryCode dựa trên ngày, tháng, năm
            const secondaryCode = getCodeForDate(day, month, year);

            if (!secondaryCode) {
               return; // Hoặc bạn có thể tiếp tục xử lý nếu cần.
            }

            const codeStr = secondaryCode.toString();  // Chuyển đổi code thành chuỗi nếu cần

            // Kiểm tra nếu dữ liệu OptionsaintReadings đã được load
            if (!window.OptionsaintReadings) {
                console.error("Dữ liệu OptionsaintReadings chưa được load.");
                return null;
            }

            // Lấy danh sách các mã bài đọc hiện có
            const availableCodes = Object.keys(window.OptionsaintReadings);

            // Lấy bài đọc tương ứng với secondaryCode
            const readings = window.OptionsaintReadings[secondaryCode];

            // Kiểm tra nếu tồn tại bài đọc với mã đã lấy
            if (readings) {
                return readings;
            } else {
                console.error("Không tìm thấy bài đọc cho mã:", secondaryCode);
                return null;
            }
        } else {
            //console.error('date không hợp lệ:', date);
            return null;  // Trả về null nếu date không hợp lệ
        }
    }

    // Gắn hàm getBibleByOptionDigitCode vào phạm vi toàn cục
    if (typeof window !== 'undefined') {
        window.getBibleByOptionDigitCode = getBibleByOptionDigitCode;
    } else if (typeof global !== 'undefined') {
        global.getBibleByOptionDigitCode = getBibleByOptionDigitCode;
    }
})();
