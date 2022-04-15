const startWorkHours = 9
const finishWorkHours = 17
let startDate = new Date('2022-04-16T15:42:47.893Z')
let myStartDate = new Date(startDate.getTime());
console.log('start Date',startDate)
const turnaroundHours = 12

const setStartWorkDate = (date, startWork)=> {
    return new Date(date.setHours(startWork + 3, 0)) //utc+3
}
const setFinishWorkDate = (date, finishWork)=> {
    return new Date(date.setHours(finishWork + 3, 0)) //utc+3
}
const isFinishedOnStartDate = (startDay, endDay) => {
    return startDay.getDay() === endDay.getDay()
}
const isDuringWorkingDay = (hours, start, end) => {
    return hours > start && hours < end
}
const addingHours = (date, difference) => {
    return new Date(date.setHours(date.getHours() + difference))
}
const isNumberPositive = (number)=> {
    if (number < 0){
        console.error('Turnaround must be a positive number!')
    }
}

const calculateDueDate = (startDate, turnaroundHours) => {
    isNumberPositive(turnaroundHours)
    let copyOfStartDate = new Date(startDate.getTime())
    let hours = copyOfStartDate.getHours() -3
    let finishWorkDate = setFinishWorkDate(myStartDate,finishWorkHours)

        if(isDuringWorkingDay(hours, startWorkHours, finishWorkHours)){
            const endTime = addingHours(copyOfStartDate, turnaroundHours)
            const endHours = endTime.getHours() - 3 //utc-3
            let endDate = new Date(copyOfStartDate.setHours(endHours + 3))
            console.log('endDate',endDate)
            let diffHours = Math.floor(Math.abs((endDate - finishWorkDate) / 36e5))
            console.log('diffHours',diffHours)

                if (isFinishedOnStartDate(startDate, endDate)) {
                    return endDate
                }else {
                    if(endDate.getDay() === 5) { //checking is endDate friday
                        newDate = new Date(endDate.setDate(endDate.getDate() + 3))
                        let endDateStart = setStartWorkDate(newDate,startWorkHours)
                        console.log('newDate',newDate)
                        return addingHours(endDateStart, diffHours)
                    }else {
                        newDate = new Date(endDate.setDate(endDate.getDate() + 1))
                        let endDateStart = setStartWorkDate(newDate,startWorkHours)
                        console.log('newDate',newDate)
                        return addingHours(endDateStart, diffHours)
                    }
                }
        }else {
            console.error('A problem can only be reported during working hours.')
        }
}
console.log('dueDate',calculateDueDate(startDate, turnaroundHours))
