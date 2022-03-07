// Your code here
function createEmployeeRecord(array) {
  let employee = {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: [],
  }
  return employee
}


let createEmployeeRecords = function (employeeData) {
  return employeeData.map((data) => {
    return createEmployeeRecord(data)
  })
}

function createTimeInEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ')

  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date,
  })
  return employee
}

function createTimeOutEvent(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ')

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  })
  return employee
}

function hoursWorkedOnDate(employee, date) {
  let inDateEvent = employee.timeInEvents.find((e) => {
    return e.date === date
  })

  let outDateEvent = employee.timeOutEvents.find((e) => {
    return e.date === date
  })

  return (outDateEvent.hour - inDateEvent.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
  let baseWage = hoursWorkedOnDate(employee, date) * employee.payPerHour

  return parseFloat(baseWage.toString())
}

function allWagesFor(employee) {
  let dates = employee.timeInEvents.map((e) => {
    return e.date
  })

  let pay = dates.reduce((el, element) => {
    return el + wagesEarnedOnDate(employee, element)
  }, 0)

  return pay
}

function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((el, element) => {
    return el + allWagesFor(element)
  }, 0)
}