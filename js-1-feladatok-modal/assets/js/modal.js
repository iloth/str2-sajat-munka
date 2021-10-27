function modalOpen(title, htmlContent) {
    const modalTitle = document.querySelector(".modal__title");
    const modalContent = document.querySelector(".modal__content");
    const modal = document.querySelector(".modal__background");

    modalTitle.innerHTML = title;
    modalContent.innerHTML = htmlContent;

    modal.style.display = "block";
}

function modalMainClick(e) {
    e.stopPropagation();
}

function modalBackgroundClick() {
    const modal = document.querySelector(".modal__background");
    modal.style.display = "none";
}

function modalCloseClick() {
    const modal = document.querySelector(".modal__background");
    modal.style.display = "none";    
}

function modalCancelClick() {
    const modal = document.querySelector(".modal__background");
    modal.style.display = "none";    
}

function modalOkClick() {
    const modal = document.querySelector(".modal__background");
    modal.style.display = "none";    
}