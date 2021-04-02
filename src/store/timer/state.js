export default function() {
    return {
        workTime: 1,
        pauseTime: 1,
        restTime: 30,
        cycles: 4,
        stage: null, // or pause or rest
        status: null, // or running
        timeRemaining: null,
        intervalReference: null,
    }
}
