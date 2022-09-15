const canvas = document.getElementById("canv1");
const slider = document.getElementById("res");
const label = document.getElementById("resolutionLabel");
let decodedString = document.getElementById("hidden").innerText;
const ctx = canvas.getContext("2d");

slider.addEventListener('change', handleInput);

decodedString.replace(`"`, "");
console.log(decodedString);

const img = new Image();
img.src = decodedString;

class Cell {
    constructor(x, y, character, color) {
        this.x = x;
        this.y = y;
        this.character = character;
        this.color = color;
    }
    draw(ctx) {
        ctx.fillStyle = "rgba(200, 200, 200, 0.4)";
        ctx.fillText(this.character, this.x + 1.2, this.y + 1);
        ctx.fillStyle = this.color;
        ctx.fillText(this.character, this.x, this.y);
    }
}

class Converter {
    #cellArray = [];
    #pixels = [];
    #ctx;
    #width;
    #height;
    constructor(ctx, width, height) {
        this.#ctx = ctx;
        this.#width = width;
        this.#height = height;
        this.#ctx.drawImage(img, 0, 0, this.#width, this.#height);
        this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height);
    }

    #charify(c) {
        if (c > 250) return "@";
        else if (c > 240) return "*";
        else if (c > 220) return "+";
        else if (c > 200) return "#";
        else if (c > 180) return "$";
        else if (c > 160) return "%";
        else if (c > 140) return "&";
        else if (c > 120) return "!";
        else if (c > 100) return "?";
        else if (c > 80) return ">";
        else if (c > 60) return "<";
        else if (c > 40) return "/";
        else if (c > 20) return "W";
        else return '';
    }

    #iterate(size) {
        this.#cellArray = [];
        for (let x = 0; x < this.#pixels.width; x += size) {
            for (let y = 0; y < this.#pixels.height; y += size) {
                const posX = x * 4; 
                const posY = y * 4;
                const pos = (posY * this.#pixels.width) + posX;

                if (this.#pixels.data[pos + 3] > 128) {
                    const R = this.#pixels.data[pos];
                    const G = this.#pixels.data[pos + 1];
                    const B = this.#pixels.data[pos + 2];
                    const total = R + G + B;
                    const avrgValue = total / 3;
                    const color = "rgb(" + R + "," + G + "," + B + ")";
                    const character = this.#charify(avrgValue);
                    if (total > 180) this.#cellArray.push(new Cell(x, y, character, color));
                }
            }
        }
    }
    #drawText() {
        this.#ctx.clearRect(0, 0, this.#width, this.#height);
        for (let i = 0; i < this.#cellArray.length; i++) {
            this.#cellArray[i].draw(this.#ctx);
        }
    }

    draw(size) {
        this.#iterate(size);
        this.#drawText();
    }
}

let apply;

function handleInput () {
    if (slider.value == 1) {
        label.innerHTML = 'Original resolution';
        ctx.drawImage(img, 0, 0, 350, 250);
    } else {
        label.innerHTML = 'Resolution: ' + slider.value + 'px';
        apply.draw(parseInt(slider.value));
        ctx.font = parseInt(slider.value) * 1.3 + 'px Arial'
    }   
}

img.onload = function initialize() {
    canvas.width = 350;
    canvas.height = 250;
    apply = new Converter(ctx, 350, 250);
    handleInput();
}
