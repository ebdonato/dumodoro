export default function() {
    return {
        workTime: 25, // in minutes
        pauseTime: 5, // in minutes
        restTime: 15, // in minutes
        cycles: 4,
        autoStart: false,
        cycle: 0,
        stage: null, // work or pause or rest
        status: null, // stopped or running or waiting
        timeRemaining: null, // in seconds
        intervalReference: null,
    }
}
