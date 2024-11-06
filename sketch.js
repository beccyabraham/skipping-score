
let started = false;
let timeStarted = 0;



const colors = ["#242038", "#003D1E", "#03394F"];
const cc = "#D5F2E3";

let phasesLeft  = [];
let phasesRight = [];

let MARGIN;
const TIME_MULTIPLIER = 60000;
const OFFSET = 0;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    MARGIN = width / 25;
    phasesLeft = [
        new Phase(0, 1, 0, 0, (t, side, i, state) => {
            let y1 = 0.65;
            let y2 = 0.95;
            drawBackground(side, i);
            //pointsInRegion(t, 200, 800, 0, y1, y2, state);
            write("tap here slowly", side, y1, y2)
            dashedBox(side, y1, y2);
        }),
        new Phase(1, 2, 0, 0, (t, side, i, state) => {
            drawBackground(side, i);
            let y1 = 0.35;
            let y2 = 0.65
            write("tap slowly", side, y1, y2)
            //pointsInRegion(t, 200, 800, 0, y1, y2, state);
            dashedBox(side, y1, y2);
        }),

        new Phase(2, 2.5, 0, 1, (t, side, i) => {
            drawBackground(side, i);
        }),
        new Phase(2.5, 3.5, 0, 1, (t, side, i) => {
           drawBackground(side, i);
           let y1 = 0.05;
           let y2 = 0.5;
           dashedBox(side, y1, y2);
           write("press slowly", side, y1, y2);
        }),
        new Phase(3.5, 4.5, 0, 1, (t, side, i) => {
            drawBackground(side, i);
            let y1 = 0.25;
            let y2 = 0.75;
            dashedBox(side, y1, y2);
            write("press for longer", side, y1, y2);
         }),
         new Phase(4.5, 5, 0, 1, (t, side, i) => {
            drawBackground(side, i);
         }),

         new Phase(5, 6, 0, 1, (t, side, i) => {
            drawBackground(side, i);
            write("wander slowly", side, 0.25, 0.75);
         }),
         new Phase(6, 7, 0, 0, (t, side, i, state) => {
            if (! state.started) {
                drawBackground(side, i);
                write("tap with three fingers individually", side, 0.25, 0.75);
                state.started = true;
                state.lastTime = t;
            }
            if (t - state.lastTime > 200) {
                noStroke();
                fill(cc);
                circle(random(10, width / 2 - 10), random(0, height), 10);
                state.lastTime = t;
            }
         }),
         new Phase(7, 8, 0, 2, (t, side, i, state) => {
            if (! state.started) {
                drawBackground(side, i);
                write("tap with three fingers,\nquickly", side, 0.25, 0.75);
                state.started = true;
                state.lastTime = t;
            }
            if (t - state.lastTime > 5) {
                noStroke();
                fill(cc);
                circle(random(10, width / 2 - 10), random(0, height), 10);
                state.lastTime = t;
            }
         }),
         new Phase(8, 9, 0, 0, (t, side, i) => {
            drawBackground(side, i);
            let y1 = 0.5;
            let y2 = 0.95;
            write("tap sporadically,\nslowing down", side, y1, y2);
            dashedBox(side, y1, y2);
         }),

         new Phase(9, 10, 0, 0, (t, side, i) => {
            drawBackground(side, i);
            write("draw a circle when you hear something you like", side, 0.25, 0.75);
         }),
         new Phase(10, 10.5, 0, 0, (t, side, i, state) => {
            drawBackground(side, i);
            stroke(cc);
            strokeWeight(5);
            if (t < 0.05 * TIME_MULTIPLIER) {
                line(0.1 * width, 0.9 * height, 0.1 * width, map(t, 0, 0.05 * TIME_MULTIPLIER, 0.9 * height, 0.1 * height));
            }
            write("swipe up once,\n\nthen tap occasionally", side, 0.25, 0.75);
         }),

        new Phase(10.5, 11, 0, 0, (t, side, i) => {
            drawBackground(side, i);
        }),
        new Phase(11, 13, 0, 0, (t, side, i) => {
            drawBackground(side, i);
            let h = 0.35
            let y1 = map(t, 0, 2 * TIME_MULTIPLIER, 0.05, 0.95 - h);
            dashedBox(side, y1, y1 + h);
            pulse(side, t, y1, y1 + h, 1000);
            write("tap in time", side, y1, y1 + h);
        }),
        new Phase(13, 14, 0, 2, (t, side, i) => {
            drawBackground(side, i);
            dashedBox(side, 0.05, 0.95);
            write("tap rarely", side, 0.25, 0.75);
        }),
        new Phase(14, 15, 0, 0, (t, side, i) => {
            drawBackground(side, i);
            write("improvise,\nmake distinct gestures", side, 0.25, 0.75);
        }),
        new Phase(15, 16, 0, 1, (t, side, i) => {
            drawBackground(side, i);
            write("mimc someone next to you", side, 0.25, 0.75);
        }),
        new Phase(16, 16.4, 0, 1, (t, side, i) => {
            drawBackground(side, i);
            write("find a note you like\nand hum it", side, 0.25, 0.75);
        }),
        new Phase(16.4, 17, 0, 0, (t, side, i) => {
            noStroke();
            fill("black");
            rect(0, 0, width / 2, height);
            write("keeping humming,\nturn off your phone", side, 0.25, 0.75);
        })
    ];
    phasesRight = [
        new Phase(0, 0.5, 1, 0, (t, side, i) => {
            drawBackground(side, i);
        }),
        new Phase(0.5, 1.5, 1, 0, (t, side, i, state) => {
            drawBackground(side, i);
            let y1 = 0.05;
            let y2 = 0.35;
            //pointsInRegion(t, 200, 800, 1, y1, y2, state);
            write("tap here slowly", side, y1, y2);
            dashedBox(side, y1, y2);
        }),
        new Phase(1.5, 2, 1, 1, (t, side, i) => {
            drawBackground(side, i);
        }),

        new Phase(2, 3, 1, 1, (t, side, i) => {
            drawBackground(side, i);
            let y1 = 0.5;
            let y2 = 0.95;
            write("press slowly", side, y1, y2);
            dashedBox(side, y1, y2);
        }),
        new Phase(3, 4, 1, 1, (t, side, i) => {
            drawBackground(side, i);
            let y1 = 0.25;
            let y2 = 0.75;
            write("press for longer", side, y1, y2);
            dashedBox(side, y1, y2);
        }),
        new Phase(4, 5, 1, 2, (t, side, i) => {
            drawBackground(side, i);
            let y1 = 0.05;
            let y2 = 0.95;
            write("tap sporadically", side, y1, y2);
            dashedBox(side, y1, y2);
        }),

        new Phase(5, 5.5, 1, 0, (t, side, i) => {
            drawBackground(side, i);
        }),
        new Phase(5.5, 6.5, 1, 0, (t, side, i) => {
            drawBackground(side, i);
            write("wander slowly", side, 0.25, 0.75);
        }),
        new Phase(6.5, 7.5, 1, 2, (t, side, i) => {
            drawBackground(side, i);
            write("make rectangles of different sizes", side, 0.25, 0.75);
        }),
        new Phase(7.5, 8.5, 1, 0, (t, side, i, state) => {
            if (! state.started) {
                drawBackground(side, i);
                write("tap with three fingers\nindividually, quickly", side, 0.25, 0.75);
                state.started = true;
                state.lastTime = t;
            }
            if (t - state.lastTime > 5) {
                noStroke();
                fill(cc);
                circle(random(width / 2 + 10, width - 10), random(0, height), 10);
                state.lastTime = t;
            }
        }),

        new Phase(8.5, 10, 1, 1, (t, side, i) => {
            drawBackground(side, i);
            write("take turns,\ndraw squiqqles", side, 0.25, 0.75);
        }),

        new Phase(10, 10.5, 1, 0, (t, side, i) => {
            drawBackground(side, i);
            write("swipe up once,\n\nthen tap occasionally", side, 0.25, 0.75);
            stroke(cc);
            strokeWeight(5);
            if (t < 0.05 * TIME_MULTIPLIER) {
                line(0.9 * width, 0.9 * height, 0.9 * width, map(t, 0, 0.05 * TIME_MULTIPLIER, 0.9 * height, 0.1 * height));
            }
        }),

        new Phase(10.5, 11.5, 1, 0, (t, side, i) => {
            drawBackground(side, i);
            let y1 = 0.25;
            let y2 = 0.75;
            pulse(side, t, y1, y2, 1000);
            write("tap in time", side, y1, y2);
            dashedBox(side, y1, y2);
        }),
        new Phase(11.5, 12, 1, 0, (t, side, i) => {
            drawBackground(side, i);
            write("swipe down once", side, 0.25, 0.75);
        }),
        new Phase(12, 13.5, 1, 0, (t, side, i) => {
            drawBackground(side, i);
            write("tap rarely", side, 0.25, 0.75);
            dashedBox(side, 0.05, 0.95);
        }),
        new Phase(13.5, 14, 1, 0, (t, side, i) => {
            drawBackground(side, i);
        }),
        new Phase(14, 15, 1, 0, (t, side, i) => {
            drawBackground(side, i);
            write("mimc someone next to you", side, 0.25, 0.75);
        }),
        new Phase(15, 16, 1, 1, (t, side, i) => {
            drawBackground(side, i);
            write("improvise,\nmake distinct gestures", side, 0.25, 0.75);
        }),
        new Phase(16, 16.5, 1, 1, (t, side, i) => {
            drawBackground(side, i);
            write("find a note you like\nand hum it", side, 0.25, 0.75);
        }),
        new Phase(16.5, 17, 1, 0, (t, side, i) => {
            noStroke();
            fill("black");
            rect(width / 2, 0, width / 2, height);
            write("keeping humming,\nturn off your phone", side, 0.25, 0.75);
        })
    ];
}

function draw() {
    let timeNow = getTime();
    if (timeNow === 0) {
        return;
    }
    for (let i = 0; i < phasesLeft.length; i += 1) {
        let phase = phasesLeft[i];
        if (timeNow >= phase.startTime && timeNow < phase.endTime) {
            phase.draw(timeNow - phase.startTime);
        }
    }
    for (let i = 0; i < phasesRight.length; i += 1) {
        let phase = phasesRight[i];
        if (timeNow >= phase.startTime && timeNow < phase.endTime) {
            phase.draw(timeNow - phase.startTime);
        }
    }
}

function drawBackground(side, instrument) {
    noStroke();
    fill(colors[instrument]);
    if (side == 0) {
        rect(0, 0, width / 2, height);
    } else if (side == 1) {
        rect(width / 2, 0, width / 2, height);
    }
}

function write(s, side, y1, y2) {
    textAlign(CENTER, CENTER);
    textSize(height / 20);
    textStyle(ITALIC);
    noStroke();
    fill(cc);
    let xCorner;
    if (side === 0) {
        xCorner = 0;
    } else if (side === 1) {
        xCorner = width / 2;
    }
    text(s, xCorner, height * y1, width / 2, (height * y2) - (height * y1));

}

function dashedBox(side, y1, y2) {
    drawingContext.setLineDash([20, 20]);
    strokeWeight(5);
    stroke(cc);
    noFill();
    let xCorner;
    if (side === 0) {
        xCorner = 0;
    } else if (side === 1) {
        xCorner = width / 2;
    }
    rect(xCorner + MARGIN, height * y1, (width / 2) - (MARGIN * 2), (height * y2) - (height * y1));
    drawingContext.setLineDash([]);
}

function pulse(side, t, y1, y2, period) {
    noStroke();
    let clr = color(cc);
    clr.setAlpha(map(t % period, 0, period, 100, 0));
    fill(clr);
    let xCorner;
    if (side === 0) {
        xCorner = 0;
    } else if (side === 1) {
        xCorner = width / 2;
    }
    rect(xCorner + MARGIN, height * y1, (width / 2) - (MARGIN * 2), (height * y2) - (height * y1));
}

function pointsInRegion(time, pointLength, pause, side, yStart, yEnd, pointState) {
    let timeInPeriod = time % (pointLength + pause);
    let pointSize = height / 20;
    if (! pointState.started) {
        pointState.x = random(MARGIN + pointSize, (width / 2) - MARGIN - pointSize);
        if (side === 1) {
            pointState.x += width / 2;
        }
        pointState.y = random(yStart * height + pointSize, yEnd * height - pointSize);
        pointState.started = true;
    }
    if (timeInPeriod < pointLength) {
        noStroke();
        touchColor = color(cc);
        touchColor.setAlpha(map(timeInPeriod, 0, pointLength, 0, 255));
        fill(touchColor);
        circle(pointState.x, pointState.y, pointSize);
    } else {
        pointState.x = random(MARGIN + pointSize, (width / 2) - MARGIN - pointSize);
        if (side === 1) {
            pointState.x += width / 2;
        }
        pointState.y = random(yStart * height + pointSize, yEnd * height - pointSize);
        pointState.started = false;
    }
}


function randomYInRegion(y1, y2) {
    return random(y1 * height, y2 * height);
}

function getTime() {
    if (started) {
        return millis() - timeStarted + OFFSET * TIME_MULTIPLIER;
    } else {
        return 0;
    }
}

function mouseClicked() {
    if (started) {
        return;
    }
    started = true;
    timeStarted = millis();
}

function windowResized() {
    createCanvas(window.innerWidth, window.innerHeight);
}

class Phase {
    constructor(startTime, endTime, side, instrument, drawFunc) {
        this.startTime = startTime * TIME_MULTIPLIER;
        this.endTime = endTime * TIME_MULTIPLIER;
        this.side = side;
        this.instrument = instrument;
        this.state = {};
        this.drawFunc = (t, s, i, state) => drawFunc(t, s, i, state);
    }

    draw(time) {
        this.drawFunc(time, this.side, this.instrument, this.state);
    }
}