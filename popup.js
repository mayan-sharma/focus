const startButton = document.getElementById('start');
const timeInput = document.getElementById('time');
const content = document.getElementById('content');

let intervalId;
let isRunning = false;

const getMinsAndSecs = (start, end) => {
    const diff = end - start;
    let minutes = Math.floor(diff % (1000*60*60) / (1000*60));
    let seconds = Math.floor(diff % (1000*60) / 1000);
    return [minutes, seconds];
}

const handleSession = () => {
    if (isRunning) {
        startButton.classList.replace('red', 'green');
        startButton.innerHTML = 'Start';
        isRunning = false;

        content.innerHTML = '';
        clearInterval(intervalId);
    } 

    else {
        startButton.classList.replace('green', 'red');
        startButton.innerHTML = 'Cancel';
        isRunning = true;

        const till = new Date().getTime() + (timeInput.value*60*1000);
        // let now = new Date().getTime();            

        // let [minutes, seconds] = getMinsAndSecs(now, till); 
        // content.innerHTML = `${minutes}m ${seconds}s`;

        intervalId = setInterval(() => {
            now = new Date().getTime();
            [minutes, seconds] = getMinsAndSecs(now, till);
            content.innerHTML = `${minutes}m ${seconds}s`;

            if (seconds == 0) {
                console.log('Ended');
                clearInterval(intervalId);
            }

        }, 1000);
    }
}

startButton.addEventListener('click', handleSession);
