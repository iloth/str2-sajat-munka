const modalOverlay = document.querySelector(".modal__overlay");
const modalTitle = modalOverlay.querySelector(".modal__title");
const modalContent = modalOverlay.querySelector(".modal__content");
const modalClose = modalOverlay.querySelector(".modal__close");
const modalCancel = modalOverlay.querySelector(".modal__cancel");
const modalOk = modalOverlay.querySelector(".modal__ok");

let modalCallBackFunction;

function openModal({
            title = null,
            content = null,
            showClose = true,
            showCancel = true,
            showOk = true,
            closeOnBgClick = true
        } = {}, onClose = null) {

    if (title) {
        modalTitle.innerHTML = title;
    }
    if (content) {
        modalContent.innerHTML = content;
    }

    modalClose.style.display = showClose ? "inline-block" : "none";
    modalCancel.style.display = showCancel ? "inline-block" : "none";
    modalOk.style.display = showOk ? "inline-block" : "none";

    modalOverlay.dataset.closeOnClick = closeOnBgClick;

    modalCallBackFunction = onClose;

    modalOverlay.style.display = "block";
    modalOk.focus();
}

function closeModal(source) {
    if (modalCallBackFunction) {
        modalCallBackFunction(source);
    }

    modalOverlay.style.display = "none";
}

function modalMainClick(e) {
    e.stopPropagation();
}

function modalBackgroundClick() {
    if(modalOverlay.dataset.closeOnClick == "true") {
        closeModal("overlay");
    }
}

function modalCloseClick() {
    closeModal("close");
}

function modalCancelClick() {
    closeModal("cancel");
}

function modalOkClick() {
    closeModal("ok");
}