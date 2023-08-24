exports.isAlphaSpace = function(string){
    let bool = true
    let regEx = /^[a-zA-Z\s]*$/
    if(!regEx.test(string)){
        bool = false
    }
    return bool
    //empty string will return true
}

let isNumeric = exports.isNumeric = function(string){
    let bool = true
    let regEx = new RegExp('^[0-9]*$')
    if(!regEx.test(string)){
        bool = false
    }
    return bool
    //empty string will return true
}

exports.isAlphaNumericSpace = function(string){
    let bool = true
    let regEx = /^[a-zA-Z0-9 ]*$/
    if(!regEx.test(string)){
        bool = false
    }
    return bool
    //empty string will return true
}

exports.currentDateTime = function(){
    let now = new Date() 
    let year = now.getFullYear()
    let month = now.getMonth()+1 
    let day = now.getDate()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()
    
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`
}

exports.currentDate = function(){
    let now = new Date() 
    let year = now.getFullYear()
    let month = now.getMonth()+1 
    let day = now.getDate()
    
    return `${day}/${month}/${year}`
}

let isLeapYear = exports.leapYear = function(year){
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
}

exports.datesBetween = function(startDate,endDate){
    let monthDays = [31, isLeapYear(Number(startDate.split('/')[2])) ? 29:28 ,31,30,31,30,31,31,30,31,30,31]
    let str_A_year = Number(startDate.split('/')[2])
    let str_A_month = Number(startDate.split('/')[1])
    let str_A_day = Number(startDate.split('/')[0])
    let str_B_year = Number(endDate.split('/')[2])
    let str_B_month = Number(endDate.split('/')[1])
    let str_B_day = Number(endDate.split('/')[0])

    let results = []

    if(monthDays[str_A_month-1]==str_A_day){
        str_A_day = 1
        if(str_A_month==12){
            str_A_month = 1
            str_A_year++
        }
        else{
            str_A_month++
        }
    }
    else{
        str_A_day++
    }

    while(`${str_A_day}/${str_A_month}/${str_A_year}` != `${str_B_day}/${str_B_month}/${str_B_year}`){
        results.push(`${str_A_day}/${str_A_month}/${str_A_year}`)

        if(monthDays[str_A_month-1]==str_A_day){
            str_A_day = 1
            if(str_A_month==12){
                str_A_month = 1
                str_A_year++
            }
            else{
                str_A_month++
            }
        }
        else{
            str_A_day++
        }
    }

    return results
}

exports.compareDateTime = function(str_A, str_B){
    let str_A_date = str_A.split(' ')[0]
    let str_A_year = Number(str_A_date.split('/')[2])
    let str_A_month = Number(str_A_date.split('/')[1])
    let str_A_day = Number(str_A_date.split('/')[0])
    let str_A_time = str_A.split(' ')[1]
    let str_A_hour = Number(str_A_time.split(':')[0])
    let str_A_minute = Number(str_A_time.split(':')[1])
    let str_A_second = Number(str_A_time.split(':')[2])

    let str_B_date = str_B.split(' ')[0]
    let str_B_year = Number(str_B_date.split('/')[2])
    let str_B_month = Number(str_B_date.split('/')[1])
    let str_B_day = Number(str_B_date.split('/')[0])
    let str_B_time = str_B.split(' ')[1]
    let str_B_hour = Number(str_B_time.split(':')[0])
    let str_B_minute = Number(str_B_time.split(':')[1])
    let str_B_second = Number(str_B_time.split(':')[2])

    let data = [[str_A_year,str_B_year],[str_A_month,str_B_month],[str_A_day,str_B_day],[str_A_hour,str_B_hour],[str_A_minute,str_B_minute],[str_A_second,str_B_second]]

    for(let i=0; i<data.length; i++){
        if(data[i][0]>data[i][1]){
            return 1
        }
        else if(data[i][1]>data[i][0]){
            return -1
        }
    }

    return 0
}

exports.dateTimeDiff = function(str_A, str_B){
    let str_A_date = str_A.split(' ')[0]
    let str_A_year = Number(str_A_date.split('/')[2])
    let str_A_month = Number(str_A_date.split('/')[1])
    let str_A_day = Number(str_A_date.split('/')[0])
    let str_A_time = str_A.split(' ')[1]
    let str_A_hour = Number(str_A_time.split(':')[0])
    let str_A_minute = Number(str_A_time.split(':')[1])
    let str_A_second = Number(str_A_time.split(':')[2])

    let str_B_date = str_B.split(' ')[0]
    let str_B_year = Number(str_B_date.split('/')[2])
    let str_B_month = Number(str_B_date.split('/')[1])
    let str_B_day = Number(str_B_date.split('/')[0])
    let str_B_time = str_B.split(' ')[1]
    let str_B_hour = Number(str_B_time.split(':')[0])
    let str_B_minute = Number(str_B_time.split(':')[1])
    let str_B_second = Number(str_B_time.split(':')[2])

    let diff_ms = new Date(str_A_year,str_A_month-1,str_A_day).setHours(str_A_hour,str_A_minute,str_A_second) - new Date(str_B_year,str_B_month-1,str_B_day).setHours(str_B_hour,str_B_minute,str_B_second)

    let minutes = Math.floor((diff_ms/1000)/60)
    return minutes
}

exports.concatZero = function(num){
    if(String(num).length==1) return `0${num}`
    else return num
}