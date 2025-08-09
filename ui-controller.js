export default class UIController {
    border = document.querySelector("#border");
    indication = document.querySelector("#indication");
    finish = document.querySelector("#finish");

    counterText = document.querySelector("#counter-text");
    imageQR = document.querySelector("#image-qr");
    finishBK = document.querySelector("#finish-bk");
    back = document.querySelector("#back");

    interval = null;
    counter = 5;

    onBack = () => {}

    constructor() {
        this.back.addEventListener("click", () => {
            this.hideFinish();
            if (this.onBack) this.onBack();
        })
    }

    /** @param cb {() => {}} */
    startCounter(cb) {
        this.counterText.classList.add("show");
        this.interval = window.setInterval(() => {
            this.counter--;

            if (this.counter === 0) {
                this.stopCounter();
                setTimeout(() => cb(), 250);
                return;
            }

            this.counterText.innerText = `${this.counter}`;
        }, 1000);
    }

    stopCounter() {
        this.counterText.classList.remove("show");
        this.counterText.innerText = `${5}`;
        this.counter = 5;

        clearInterval(this.interval);
    }

    showInitialIndications() { this.indication.classList.add("show") }
    hideInitialIndications() { this.indication.classList.remove("show") }

    showBrandBorder() { this.border.classList.add("show") }
    hideBrandBorder() { this.border.classList.remove("show") }

    setFinishImages(qr, bk) {
        this.finishBK.src = bk;
        this.imageQR.src = qr;
    }

    showFinish() {
        this.finish.classList.add("show");
        this.imageQR.classList.add("loaded");
    }

    hideFinish() {
        this.finishBK.src = "";
        this.finish.classList.remove("show");
        this.imageQR.src = "./assets/spinner.svg";
        this.imageQR.classList.remove("loaded");
    }
}
