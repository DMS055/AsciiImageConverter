const canvas = document.getElementById("canv1");
const slider = document.getElementById("res");
const label = document.getElementById("resolutionLabel");
const ctx = canvas.getContext("2d");

slider.addEventListener('change', handleInput);

const img = new Image();
img.src = "data:image/jpeg;base64,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";

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
        console.log(this.#cellArray)
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
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else {
        label.innerHTML = 'Resolution: ' + slider.value + 'px';
        apply.draw(parseInt(slider.value));
        ctx.font = parseInt(slider.value) * 1.3 + 'px Arial'
    }   
}

img.onload = function initialize() {
    canvas.width = img.width;
    canvas.height = img.height;
    apply = new Converter(ctx, img.width, img.height);
    handleInput();
}
