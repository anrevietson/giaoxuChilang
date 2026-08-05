(function (global) {
    let sundayNumbers = []; 
    let codeNumbers = [];
    function processLiturgicalWeeks(currentDate, endDate, sundayNumberPrefix, sundayNumber, weekBeforeLent, codeNumbers, sundayNumbers, isPentecostSeason = false) {
        while (currentDate < endDate) {
            sundayNumbers.push({
                date: new Date(currentDate),
                weekNumber: sundayNumber
            });

            let prefix = isPentecostSeason
                ? sundayNumber >= 10 ? `5${sundayNumber}` : `50${sundayNumber}`
                : `${sundayNumberPrefix}${sundayNumber}`;

            codeNumbers.push({
                date: new Date(currentDate),
                code: `${prefix}0` // Mã Chủ Nhật
            });

            for (let i = 1; i <= 6; i++) {
                currentDate.setDate(currentDate.getDate() + 1);
                codeNumbers.push({
                    date: new Date(currentDate),
                    code: `${prefix}${i}` // Mã ngày thường
                });
            }

            weekBeforeLent = sundayNumber;
            sundayNumber++;
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return { sundayNumber, weekBeforeLent, currentDate };
    }

    function updateCodeNumbersForMultipleDates(year, codePrefix, codeNumbers) {
        const datesToUpdate = [
            '11-09', '11-30', '09-08', '05-31', '12-03', '01-25',
            '02-22', '04-25', '05-03', '05-14', '07-03',
            '07-22', '07-25', '08-10', '08-24', '09-21',
            '09-29', '10-01', '10-18', '10-28',
        ];

        const easterDate = getEasterDate(year);
        const holySaturday = new Date(easterDate);
        holySaturday.setDate(easterDate.getDate() - 1); 
        const octaveEaster = new Date(easterDate);
        octaveEaster.setDate(easterDate.getDate() + 8);

        datesToUpdate.forEach(dateString => {
            let [month, day] = dateString.split('-');
            let date = new Date(year, parseInt(month) - 1, parseInt(day)); 
            const isOctaveEaster = date.getTime() >= holySaturday.getTime() && date.getTime() <= octaveEaster.getTime();
            if (date.getDay() !== 0 ) {
                let code = `7${day}${month}`;
                let existingCodeIndex = codeNumbers.findIndex(item => item.date.getTime() === date.getTime());
                if(isOctaveEaster) {
                return;
                }
                if (existingCodeIndex !== -1) {
                    codeNumbers[existingCodeIndex].code = code;
                } else {
                    codeNumbers.push({
                        date: date,
                        code: code
                    });
                }
            }
        });
    }

     function updateCodeNumbersIncludingSundays(year, codePrefix, codeNumbers) {
        const datesToUpdate = [
            '08-15', '11-01', '11-02', '11-09',
            '06-29', '06-24', '02-02','09-14', '12-13',
        ];

        datesToUpdate.forEach(dateString => {
            let [month, day] = dateString.split('-');
            let date = new Date(year, parseInt(month) - 1, parseInt(day)); 
            let code = `7${day}${month}`;
            let existingCodeIndex = codeNumbers.findIndex(item => item.date.getTime() === date.getTime());
            if (existingCodeIndex !== -1) {
                codeNumbers[existingCodeIndex].code = code;
            } else {
                codeNumbers.push({
                    date: date,
                    code: code
                });
            }
        });
    }

    function calculatenumberSunday(year) {
        const baptismOfTheLord = global.getBaptismOfTheLord(year);
        const ashWednesday = global.getAshWednesday(global.getEasterDate(year));
        const easterDate = global.getEasterDate(year);
        const pentecost = global.getPentecost(easterDate);
        const firstSundayOfAdvent = global.getFirstSundayOfAdvent(year);
        const epiphanySunday = global.getEpiphanySunday(year);
    	global.getChristTheKing = getChristTheKing;
        let sundayNumbers = [];
        let codeNumbers = [];
        let lastOrdinaryWeekBeforeLent = 0;
        let currentDate = new Date(year, 0, 1); 
            while (currentDate < epiphanySunday) {
                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1; 
                let code = `20${day}0${month}`;
            
                codeNumbers.push({
                    date: new Date(currentDate), 
                    code: code
                });
            
                currentDate.setDate(currentDate.getDate() + 1);
            }
        
        let currentDate1 = new Date(epiphanySunday); 
        let abc = new Date(baptismOfTheLord); 
            if (baptismOfTheLord.getDay() === 0) {
                if (epiphanySunday < abc) {
                    let result = processLiturgicalWeeks(currentDate1, baptismOfTheLord, '60', 0, 1, codeNumbers, sundayNumbers);
                    currentDate1 = result.currentDate; 
                }
            } else {
                codeNumbers.push({
                    date: new Date(epiphanySunday),
                    code: "6000"
                });
            }

        currentDate = new Date(baptismOfTheLord);
            if (currentDate.getDay() !== 0) {
                currentDate.setDate(currentDate.getDate() + (7 - currentDate.getDay()));
            }

        let sundayNumber = baptismOfTheLord.getDay() === 0 ? 1 : 2;
            if (sundayNumber === 2) {
                for (let i = 6; i >= 1; i--) {
                    currentDate.setDate(currentDate.getDate() - 1);
                    let dayCode = i === 1 ? 0 : i;
                    codeNumbers.push({
                        date: new Date(currentDate),
                        code: `50${1}${dayCode}`
                    });
                }
                currentDate.setDate(currentDate.getDate() + 6);
            }

        let result = processLiturgicalWeeks(currentDate, ashWednesday, '50', sundayNumber, lastOrdinaryWeekBeforeLent, codeNumbers, sundayNumbers);
        sundayNumber = result.sundayNumber;
        lastOrdinaryWeekBeforeLent = result.weekBeforeLent;
        currentDate = result.currentDate;
        currentDate = new Date(ashWednesday);
        currentDate.setDate(ashWednesday.getDate() + (7 - ashWednesday.getDay()));
        result = processLiturgicalWeeks(currentDate, easterDate, '30', 1, lastOrdinaryWeekBeforeLent, codeNumbers, sundayNumbers);
        sundayNumber = result.sundayNumber;
        currentDate = result.currentDate;

        currentDate = new Date(easterDate);
        result = processLiturgicalWeeks(currentDate, pentecost, '40', 1, lastOrdinaryWeekBeforeLent, codeNumbers, sundayNumbers);
        currentDate = result.currentDate;

        const isBaptismOfTheLordOnJan9Sunday = (baptismOfTheLord.getDate() === 9 && baptismOfTheLord.getMonth() === 0 && baptismOfTheLord.getDay() === 0);

        let ordinaryAfterPentecostWeek;
            if (isBaptismOfTheLordOnJan9Sunday) {
                ordinaryAfterPentecostWeek = lastOrdinaryWeekBeforeLent + 1;
            } else {
                ordinaryAfterPentecostWeek = baptismOfTheLord.getDay() !== 0 ? lastOrdinaryWeekBeforeLent + 1 : lastOrdinaryWeekBeforeLent + 2;
            }
        currentDate = new Date(pentecost);
        currentDate.setDate(pentecost.getDate());
        let ordinaryEndDate = new Date(firstSundayOfAdvent);
        result = processLiturgicalWeeks(currentDate, firstSundayOfAdvent, '50', ordinaryAfterPentecostWeek, lastOrdinaryWeekBeforeLent, codeNumbers, sundayNumbers, true);
        currentDate = result.currentDate;

        let adventEndDate = new Date(`${year}-12-31`);
        currentDate = new Date(firstSundayOfAdvent);
        result = processLiturgicalWeeks(currentDate, adventEndDate, '10', 1, lastOrdinaryWeekBeforeLent, codeNumbers, sundayNumbers);
        currentDate = result.currentDate;

        let startDate = new Date(`${year}-12-17`);
        let endDate = new Date(`${year}-12-31`);
        currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1; // Lấy tháng
                let code = `2${day}${month < 10 ? '0' : ''}${month}`; // Định dạng mã số: "2" + day + month

                if (currentDate.getDay() === 0 && currentDate >= new Date(`${year}-12-17`) && currentDate <= new Date(`${year}-12-24`)) {
                    let a = currentDate.getTime() === new Date(`${year}-12-17`).getTime() ? 2 : 1;
                    if (a === 1 && currentDate.getDay() === 0) {
                        code = "1040";
                    } else if (a === 2 && currentDate.getDay() === 0) {
                        if (currentDate.getTime() === new Date(`${year}-12-17`).getTime()) {
                            code = "1030";
                        }
                        if (currentDate.getTime() === new Date(`${year}-12-24`).getTime()) {
                            code = "1040";
                        }
                    }
                }

                if (currentDate.getTime() === new Date(`${year}-12-30`).getTime() && new Date(`${year}-12-25`).getDay() === 0) {
                    code = "2010";
                }
                if (currentDate.getDay() === 0 && currentDate >= new Date(`${year}-12-26`) && currentDate <= new Date(`${year}-12-31`)) {
                    code = "2010";
                }

                let existingCodeIndex = codeNumbers.findIndex(item => item.date.getDate() === currentDate.getDate() && item.date.getMonth() === currentDate.getMonth());

                if (existingCodeIndex !== -1) {
                    codeNumbers[existingCodeIndex].code = code;
                } else {
                    codeNumbers.push({
                        date: new Date(currentDate),
                        code: code
                    });
                }

                currentDate.setDate(currentDate.getDate() + 1);
            }

        updateCodeNumbersForMultipleDates(year, "20", codeNumbers);
    	updateCodeNumbersIncludingSundays(year, "20", codeNumbers);


       // Các Lễ trọng, lễ nhớ từ cuối phục sinh
        Trinity = new Date(easterDate);
        Trinity.setDate(easterDate.getDate() + 56);
        Corpus = new Date(easterDate);
        Corpus.setDate(easterDate.getDate() + 63);
        Heartjesus = new Date(easterDate);
        Heartjesus.setDate(easterDate.getDate() + 68);
        Mothercatholic = new Date(easterDate);
        Mothercatholic.setDate(easterDate.getDate() + 69);

        let existingpentecostIndex = codeNumbers.findIndex(item => item.date.getTime() === pentecost.getTime());
        let existingTrinityIndex = codeNumbers.findIndex(item => item.date.getTime() === Trinity.getTime());
        let existingCorpusIndex = codeNumbers.findIndex(item => item.date.getTime() === Corpus.getTime());
        let existingHeartjesusIndex = codeNumbers.findIndex(item => item.date.getTime() === Heartjesus.getTime());
        let existingMothercatholicIndex = codeNumbers.findIndex(item => item.date.getTime() === Mothercatholic.getTime());
        let aug8 = new Date(year, 7, 6);
        let existingaug8Index = codeNumbers.findIndex(item => item.date.getTime() === aug8.getTime());
            if (existingaug8Index !== -1) {
                codeNumbers[existingaug8Index].code = `5450`;
            }

            if (existingMothercatholicIndex !== -1) {
                codeNumbers[existingMothercatholicIndex].code = `5446`;
            }

            if (existingpentecostIndex !== -1) {
                codeNumbers[existingpentecostIndex].code = `5410`;
            }
            if (existingTrinityIndex !== -1) {
                codeNumbers[existingTrinityIndex].code = `5420`;
            }
            if (existingCorpusIndex !== -1) {
                codeNumbers[existingCorpusIndex].code = `5430`;
            }
            if (existingHeartjesusIndex !== -1) {
                codeNumbers[existingHeartjesusIndex].code = `5440`;
            }

        // Các ngày lễ có thể bị thay đổi
        let Jun24 = new Date(year, 5, 24);
        let Jun23 = new Date(year, 5, 23);

            if (Jun24.getTime() === Heartjesus.getTime()) { 
                let existingJun23Index = codeNumbers.findIndex(item => item.date.getTime() === Jun23.getTime());
                if (existingJun23Index !== -1) {
                    codeNumbers[existingJun23Index].code = `72406`;
                } else {
                    codeNumbers.push({
                        date: Jun23,
                        code: `72406`
                    });
                }
            } else {
                let existingJun24Index = codeNumbers.findIndex(item => item.date.getTime() === Jun24.getTime());
                if (existingJun24Index !== -1) {
                    codeNumbers[existingJun24Index].code = `72406`;
                } else {
                    codeNumbers.push({
                        date: Jun24,
                        code: `72406`
                    });
                }
            }

        let march19 = new Date(year, 2, 19);
        let march20 = new Date(year, 2, 20);

            if (march19.getDay() === 0) {
                let existingMarch20Index = codeNumbers.findIndex(item => item.date.getTime() === march20.getTime());
                if (existingMarch20Index !== -1) {
                    codeNumbers[existingMarch20Index].code = `71903`;
                } else {
                    codeNumbers.push({
                        date: march20,
                        code: `71903`
                    });
                }
            } else {
                let existingMarch19Index = codeNumbers.findIndex(item => item.date.getTime() === march19.getTime());
                if (existingMarch19Index !== -1) {
                    codeNumbers[existingMarch19Index].code = `71903`;
                } else {
                    codeNumbers.push({
                        date: march19,
                        code: `71903`
                    });
                }
            }

        let dec8 = new Date(year, 11, 8); 
        let dec9 = new Date(year, 11, 9);

            if (dec8.getDay() === 0) {
                let existingDec9Index = codeNumbers.findIndex(item => item.date.getTime() === dec9.getTime());
                if (existingDec9Index !== -1) {
                    codeNumbers[existingDec9Index].code = `70812`; 
                } else {
                    codeNumbers.push({
                        date: dec9,
                        code: `70812`
                    });
                }
            } else {
                let existingDec8Index = codeNumbers.findIndex(item => item.date.getTime() === dec8.getTime());
                if (existingDec8Index !== -1) {
                    codeNumbers[existingDec8Index].code = `70812`; 
                    } else {
                    codeNumbers.push({
                        date: dec8,
                        code: `70812`
                    });
                }
            }
        let march25 = new Date(year, 2, 25); 
        let eightDaysBeforeEaster = new Date(easterDate);
        eightDaysBeforeEaster.setDate(easterDate.getDate() - 8);
        let eightDaysAfterEaster = new Date(easterDate);
        eightDaysAfterEaster.setDate(easterDate.getDate() + 8);

            if (march25 >= eightDaysBeforeEaster && march25 <= easterDate) {
                let existingDateAfterEasterIndex = codeNumbers.findIndex(item => item.date.getTime() === eightDaysAfterEaster.getTime());
                if (existingDateAfterEasterIndex !== -1) {
                    codeNumbers[existingDateAfterEasterIndex].code = `72503`; 
                } else {
                    codeNumbers.push({
                        date: new Date(eightDaysAfterEaster),
                        code: `72503`
                    });
                }
            } else {
                let existingMarch25Index = codeNumbers.findIndex(item => item.date.getTime() === march25.getTime());
                if (existingMarch25Index !== -1) {
                    codeNumbers[existingMarch25Index].code = `72503`;
                } else {
                    codeNumbers.push({
                        date: new Date(march25),
                        code: `72503`
                    });
                }
            }
        let november24 = new Date(year, 10, 24); 
        let christTheKing = global.getChristTheKing(year);
            if (november24.getTime() === christTheKing.getTime()) {
                let dayAfterChristTheKing = new Date(christTheKing);
                dayAfterChristTheKing.setDate(christTheKing.getDate() + 1);

                let existingIndex = codeNumbers.findIndex(item => item.date.getTime() === dayAfterChristTheKing.getTime());
                if (existingIndex !== -1) {
                    codeNumbers[existingIndex].code = `72411`; 
                } else {
                    codeNumbers.push({
                        date: dayAfterChristTheKing,
                        code: `72411`
                    });
                }
            } else {
                let existingNovember24Index = codeNumbers.findIndex(item => item.date.getTime() === november24.getTime());
                if (existingNovember24Index !== -1) {
                    codeNumbers[existingNovember24Index].code = `72411`;
                } else {
                    codeNumbers.push({
                        date: november24,
                        code: `72411`
                    });
                }
            }
            // Cập nhật tuần thứ tư Lễ tro
            for (let i = 0; i < 4; i++) {
                let currentDay = new Date(ashWednesday);
                currentDay.setDate(ashWednesday.getDate() + i);
                let code = `300${i + 4}`; 
                let existingDayIndex = codeNumbers.findIndex(item => item.date.getTime() === currentDay.getTime());
                if (existingDayIndex !== -1) {
                    codeNumbers[existingDayIndex].code = code;
                } else {
                    codeNumbers.push({
                        date: new Date(currentDay),
                        code: code
                    });
                }
            }       
        const lunarNewYearArray = getSolarDate(1, 1, year); 
        const lunarNewYear = new Date(year, lunarNewYearArray[1] - 1, lunarNewYearArray[0]); 
        let existingLunarNewYearIndex = codeNumbers.findIndex(item => item.date.getTime() === lunarNewYear.getTime());
            if (existingLunarNewYearIndex !== -1) {
                codeNumbers[existingLunarNewYearIndex].code = `70001`; 
            }

        const secondLunarDay = new Date(lunarNewYear);
        secondLunarDay.setDate(lunarNewYear.getDate() + 1); 

        let existingSecondLunarDayIndex = codeNumbers.findIndex(item => item.date.getTime() === secondLunarDay.getTime());
            if (existingSecondLunarDayIndex !== -1) {
                codeNumbers[existingSecondLunarDayIndex].code = `70002`;
            }

        const thirdLunarDay = new Date(lunarNewYear);
        thirdLunarDay.setDate(lunarNewYear.getDate() + 2);

        let existingThirdLunarDayIndex = codeNumbers.findIndex(item => item.date.getTime() === thirdLunarDay.getTime());
            if (existingThirdLunarDayIndex !== -1) {
                codeNumbers[existingThirdLunarDayIndex].code = `70003`; 
            }

            return {
                getSundayNumberForDay: function (solarDate) {
                    for (let sunday of sundayNumbers) {
                        if (solarDate.getTime() === sunday.date.getTime()) {
                            return sunday.weekNumber;
                        }
                    }
                    return ''; 
                },
                getCodeNumberForDay: function (solarDate) {
                    for (let day of codeNumbers) {
                        if (solarDate.getTime() === day.date.getTime()) {
                            return day.code;
                        }
                    }
                    return ''; 
                },
                sundayNumbers 
            };
    }
  global.calculatenumberSunday = calculatenumberSunday;

})(window || globalThis);
