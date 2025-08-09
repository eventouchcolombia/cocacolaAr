import UIController from "./ui-controller.js";
import PhotoController from "./photo-controller.js";
import ARController from "./ar-controller.js";

window.addEventListener("DOMContentLoaded", () => {
    const photo = new PhotoController();
    const ar = new ARController(document.querySelector("a-scene"));
    const ui = new UIController();

    photo.init();

    photo.onRecordingStart = () => {
        ar.start();
    }

    photo.onPhotoTaken = async (photoForm) => {
        ar.stop();
        ui.showFinish();

        const KEY = "0279a439effd065dc039c20f134e8573";

        const params = new URLSearchParams();
        params.append("expiration", "600");
        params.append("key", `${KEY}`);

        const res = await fetch(`https://api.imgbb.com/1/upload?${params.toString()}`, {
            method: "POST",
            body: photoForm
        })

        const data = await res.json();
        const bk = data.data.url;
        const qr = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${data.data.url}`

        ui.setFinishImages(qr, bk);
    }

    ar.onFaceFound = () => {
        ui.hideInitialIndications();
        ui.showBrandBorder();
        ui.startCounter(() => {
            photo.capture();
        });
    }

    ar.onFaceLost = () => {
        ui.showInitialIndications();
        ui.hideBrandBorder();
        ui.stopCounter();
    }

    ui.onBack = () => {
        ar.start();
    }
})
