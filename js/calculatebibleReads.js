(function () {
    const liturgicalYears = ['B', 'C', 'A'];

    // Tính năm phụng vụ B, C, A
    function getLiturgicalYear(date) {
        const year = date.getFullYear();
        const startYear = 2020;
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

    // Hàm chính lấy bài đọc dựa trên code 4 chữ số
    function getBibleByFourDigitCode(date) {
        date.setHours(0, 0, 0, 0);  // Đặt thời gian về 00:00 để bỏ qua giờ, phút, giây
        const codeNumber = getCodeNumberForDay(date);
        const codeStr = codeNumber.toString();

        // Xử lý mã 4 chữ số
        const seasonCode = parseInt(codeStr.charAt(0));
        const dayOfWeekCode = parseInt(codeStr.charAt(3));

         // Xác định năm chẵn lẻ và xử lý ngày thường (Ordinary Time Readings)
         const oddYear = isOddYear(date);
         const ordinaryReadings = oddYear ? window.bibledailyOrdinary1Readings : window.bibledailyOrdinary2Readings;
        // Kiểm tra nếu dữ liệu Bible readings đã được load
        if (typeof window.bibledailySeasonReadings === 'không load được') {
            return null;
        }
        if (typeof window.bibledailyOrdinary1Readings === 'không load được') {
            return null;
        }
        if (typeof window.bibledailyOrdinary2Readings === 'không load được') {
            return null;
        }
          // Các ngày lễ có mã 5 số               
        if (codeStr.length === 5) {
            let availableCodes = Object.keys(window.SaintsBibleReading);
            let readingsFiveCode = window.SaintsBibleReading[codeStr];
            if (readingsFiveCode) {
                return readingsFiveCode;
            } else {
                //console.log(`Các thánhg ${codeStr} in các thánh readings.`);
            }
        }

        if (seasonCode !== 5) {
            let availableCodes = Object.keys(window.bibledailySeasonReadings);
            let readingsForCode = window.bibledailySeasonReadings[codeStr];
            if (readingsForCode) {
                return readingsForCode;
            } else {
             //   console.log(`không phải mùa thường niên ${codeStr} in season readings.`);
            }
        } else if (dayOfWeekCode !== 0 && seasonCode === 5) {
            const oddYear = isOddYear(date);
            const ordinaryReadings = oddYear ? window.bibledailyOrdinary1Readings : window.bibledailyOrdinary2Readings;
            
            let availableOrdinaryCodes = Object.keys(ordinaryReadings || {});
        
            if (ordinaryReadings && ordinaryReadings[codeStr]) {
                return ordinaryReadings[codeStr];
            } else {
            //    console.log(`code trong mảng mùa thường niên ${codeStr}.`);
            }
        }
 

        let liturgicalYear;

        // Xác định năm phụng vụ và tính toán ngày chủ nhật
        if (codeStr.length === 4) {
            if (dayOfWeekCode === 0 && (seasonCode !== 1 && seasonCode !== 2)) {
                let date1 = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
                liturgicalYear = getLiturgicalYear(date1);
            } else if (dayOfWeekCode === 0 && (seasonCode === 1 || seasonCode === 2)) {
                liturgicalYear = getLiturgicalYear(date);
            }

            // Kiểm tra nếu dữ liệu Bible readings đã được load
            if (typeof window.bibleReadings === 'undefined') {
                console.error("Bible readings not loaded.");
                return null;
            }

            // Duyệt qua từng phần tử trong mảng window.bibleReadings
            for (let i = 0; i < window.bibleReadings.length; i++) {
                let readingsForCode = window.bibleReadings[i][codeStr];

                // Kiểm tra nếu mã code tồn tại
                if (readingsForCode) {
                    const readingForYear = readingsForCode[liturgicalYear];

                    if (readingForYear) {
                        return readingForYear;
                    } else {
                        console.warn("No readings found for liturgical year:", liturgicalYear);
                        return null;
                    }
                }
            }
        } else {
            console.log("No readings found for code:", codeStr);
            return null;
        }           
        console.log("No readings found for ordinary time code:", codeStr);
        return null;
    }

    // Gắn hàm getBibleByFourDigitCode vào phạm vi toàn cục
    if (typeof window !== 'undefined') {
        window.getBibleByFourDigitCode = getBibleByFourDigitCode;
    } else if (typeof global !== 'undefined') {
        global.getBibleByFourDigitCode = getBibleByFourDigitCode;
    }
})();
