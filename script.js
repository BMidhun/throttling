const generateBtn = document.getElementById('generate-btn');

const usernameElement = document.getElementById('username');

const draggableBox = document.getElementById('box')

const boxContainer = document.querySelector(".box-container");

const MOVEMENT_DELTA = 10;

const box_position = {
    x: 0,
    y: 0,
}

function throttle(fn, interval) {
    let shouldExecute = true; // Is set as true to trigger API call when user click the button for the first time 
    return function (event) {
        if (shouldExecute) {
            fn.call(this, event);
            shouldExecute = false

            setTimeout(() => {
                shouldExecute = true;
            }, interval);    // should execute will be set to true after the interval is reached. In between the interval, if the user clicks the btn the API call won't be triggered. 

        }
    }
}


async function generateUserName() {

    const randomId = Math.floor(Math.random() * 10) + 1

    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${randomId}`);

    const user = await response.json();

    usernameElement.innerText = user.username
}

generateBtn.addEventListener('click', throttle(generateUserName, 1000));


document.addEventListener("keydown", throttle(moveBox,500))


function moveBox (event) {
    const keytype = event.key.toLowerCase().replace('arrow', '');
    switch (keytype) {
        case 'up': {
            if (box_position.y <= 0)
                return;
            box_position.y -= MOVEMENT_DELTA;
            break;
        }

        case 'down': {
            if (box_position.y === 600)
                return;
            box_position.y += MOVEMENT_DELTA;
           break;
        }


        case 'left': {
            if (box_position.x <= 0)
                return;
            box_position.x -= MOVEMENT_DELTA;
            break;
        }

        case 'right': {
            console.log("right reached")
            if (box_position.x === 600)
                return;
            box_position.x += MOVEMENT_DELTA;
            break;
        }

    }


     draggableBox.style.transform = `translate(${box_position.x}px, ${box_position.y}px)`
}
