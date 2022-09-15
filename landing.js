const drop = document.querySelector(".drop");
const header = document.querySelector(".header");
const landing = document.querySelector(".landing");
const button = document.querySelector(".button");
const input = document.getElementById("fileInput");

button.onclick = () => {
    input.click();
}

// Browsing event
input.addEventListener("change", function() {
    drop.classList.add('active');    

    file = this.files[0];
    process();
});

let file;

drop.addEventListener("dragover", (e) => {
    e.preventDefault();

    header.textContent = 'Release to Upload';
    drop.classList.add('active');
});

drop.addEventListener("dragleave", () => {
    header.textContent = "Drop your Image";
    drop.classList.remove('active');
});

drop.addEventListener("drop", (e) => {
    e.preventDefault();

    drop.classList.remove("active");
    header.textContent = "Uploading the file!";
    
    file = e.dataTransfer.files[0];
    process();
});

var fileURL;
function process() {
    let fileType = file.type;
	let valid = ["image/png", "image/jpg", "image/jpeg"];

	if (valid.includes(fileType)) {
		let fileReader = new FileReader();

		fileReader.onload = () => {
			window.fileURL = fileReader.result;
			// console.log(fileURL);
			landing.remove();
		};
		fileReader.readAsDataURL(file);
	} else {
		alert("Please use an image!");
	}
}

export let fileString = fileURL;

