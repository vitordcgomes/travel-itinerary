const formatter = (date) => {
    console.log(dayjs(date).format('hh:mm'))

    return {
        day: {
            number: dayjs(date).format('DD'),
            week: {
                short: dayjs(date).format('ddd'),
                long: dayjs(date).format('dddd')
            }
        },
        month: dayjs(date).format('MMMM'),
        time: dayjs(date).format('HH:mm')
    }
}

formatter(new Date('2024-04-01'))

const activity0 = {
    name: "Lunch",
    date: new Date("2024-07-13 10:00"),
    finished: true
}

let activities = [
    activity0,
    {
        name: "Gym",
        date: new Date("2024-02-28 12:00"),
        finished: false
    },
    {
        name: "Gaming Session",
        date: new Date("2024-07-14 16:00"),
        finished: true
    },
]

activities = []

// arrow function
const createActivityItem = (activity) => {

    let input = `
    <input 
    onchange="endActivity(event)"
    value="${activity.date}"
    type="checkbox"
    `

    if (activity.finished) {
        input = input + ' checked'
    }

    input += '>'

    format = formatter(activity.date)

    return `
    <div>
        ${input}
        <span>${activity.name}</span>
        <time>
            ${format.day.week.long},
            ${format.day.number}th of
            ${format.month},
            ${format.time}h
        </time>
    </div>
    `
}

const updateActivitiesList = () => {
    const section = document.querySelector('section')
    section.innerHTML = ''

    // verify if list is empty
    if (!activities.length) {
        section.innerHTML = `<p>No activity registered.</p>`
        return
    }

    for (let activity of activities) {
        section.innerHTML += createActivityItem(activity)
    }
}
updateActivitiesList()


const createSelectionDays = () => {
    const days = [
        "2024-02-28",
        "2024-02-29",
        "2024-03-01",
        "2024-03-02",
        "2024-03-03",
    ]

    let selectionDays = ""

    for (let day of days) {
        const format = formatter(day)
        const displayDay = `
        ${format.month}
        ${format.day.number}
        `
        selectionDays += `<option value="${day}">${displayDay}</option>`
    }

    document.querySelector('select[name="day"]').innerHTML = selectionDays
    
}
createSelectionDays()

const createSelectionTime = () => {
    let availableTime = ''

    for (let i = 6; i < 23; i++) {
        const hour = String(i).padStart(2, '0')
        availableTime += `<option value="${hour}:00">${hour}:00</option>`
        availableTime += `<option value="${hour}:30">${hour}:30</option>`
    }

    document.querySelector('select[name="time"]').innerHTML = availableTime

}
createSelectionTime()

const saveActivity = (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const name = formData.get('activity')
    const day = formData.get('day')
    const time = formData.get('time')
    const date = `${day} ${time} `

    const newActivity = {
        name: name,
        date: date,
        finished: false
    }

    const activityExist = activities.find((activity) => {
        return activity.date == newActivity.date
    })

    if (activityExist) {
        return alert('Date/Time not available')
    }

    activities = [newActivity, ...activities]
    updateActivitiesList()
}

const endActivity = (event) => {
    const input = event.target
    const inputDate = input.value

    const activity = activities.find((activity) => {
        return activity.date == inputDate
    })

    if (!activity) {
        return
    }

    activity.finished = !activity.finished
}




