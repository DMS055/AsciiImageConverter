const drop = document.querySelector('.drop');
const header = document.querySelector('.header');

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
});

