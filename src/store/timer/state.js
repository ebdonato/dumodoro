export default function() {
    return {
        workTime: 1, // in minutes
        pauseTime: 2, // in minutes
        restTime: 30, // in minutes
        cycles: 4,
        cycle: 0,
        stage: null, // work or pause or rest
        status: null, // stopped or running
        timeRemaining: null, // in seconds
        intervalReference: null,
    }
}
