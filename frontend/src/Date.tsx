import React, {useState, useEffect} from "react"

function CurrentTime() {
    //state for displaying the current time
    var [date, setDate] = useState(new Date());

    //run forever and update every second
    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)

        return function resetTime() {
            clearInterval(timer)
        }
    })

    return (
        <div className = "current-time">
            <p id = "time">
                {date.toLocaleTimeString()}
            </p>
        </div>

    );
}

export default CurrentTime;