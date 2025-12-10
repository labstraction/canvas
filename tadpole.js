


let rectangles = [];


function setup(newCanvas, button) {

    for (let i = 0; i < 1000; i++) {

        const red = Math.round(Math.random() * 255);
        const green = Math.round(Math.random() * 255);
        const blue = Math.round(Math.random() * 255);
        const alpha = Math.random();

        const width = 3;
        const height = 3;

        const randomVX = Math.random() * 4 - 2;
        const randomVY = Math.random() * 4 - 2;

        const centerX = button.offsetLeft + button.clientWidth / 2;
        const centerY = button.offsetTop + button.clientHeight / 2; 

        const rect = {
            x: centerX,
            y:centerY,
            width: width,
            height: height,
            color: 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')',
            vX: randomVX,
            vY: randomVY
        }

        rectangles.push(rect);
    }

}



function update(newCanvas) {

    for (const rect of rectangles) {
        rect.x = rect.x + rect.vX;
        rect.y = rect.y + rect.vY;

        //rimbalziamo contro le pareti della canvas
        if (rect.x + rect.width > newCanvas.width || rect.x < 0) {
            rect.vX = rect.vX * -1;
        }

        if (rect.y + rect.height > newCanvas.height || rect.y < 0) {
            rect.vY = rect.vY * -1;
        }


        //cambio di direzione randomico
        const diceX = Math.random();
        if (diceX > 0.8) {
            rect.vX += Math.random()
        }
        if (diceX < 0.2) {
            rect.vX -= Math.random()
        }

        const diceY = Math.random();
        if (diceY > 0.8) {
            rect.vY += Math.random()
        }
        if (diceY < 0.2) {
            rect.vY -= Math.random()
        }


        //gestisci la velocità massima
        if (rect.vX > 3) {
            rect.vX = 3
        }
        if (rect.vX < -3) {
            rect.vX = -3
        }
        if (rect.vY > 3) {
            rect.vY = 3
        }
        if (rect.vY < -3) {
            rect.vY = -3
        }


    }
}


function draw(newCanvas) {

    const ctx = newCanvas.getContext('2d');

    //ctx.clearRect(0, 0, newCanvas.width, newCanvas.height);

    // ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    // ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

    for (const rect of rectangles) {

        ctx.fillStyle = rect.color;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
    }

}

function startTadpoleAnimation(button) {


    console.log(event)

    rectangles = [];

    const canvas = document.createElement('canvas');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    document.body.appendChild(canvas);

    setup(canvas, button);

    let milliseconds = 0

    const pippo = setInterval(() => {
        update(canvas);
        draw(canvas);

        milliseconds += 18;

        if (milliseconds > 5000) {
            console.log('ferma tutto!!')
            clearInterval(pippo);
            canvas.remove()
        }



    }, 18);
}