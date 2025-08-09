export default class ARController {
    /** @type HTMLElement */
    scene;
    system = null;

    /** @type () => void */
    onStart;
    /** @type () => void */
    onFaceFound;
    /** @type () => void */
    onFaceLost;

    constructor(scene) {
        this.scene = scene;
        this.init();
    }

    init() {
        this.scene.addEventListener("loaded", () => {
            this.system = this.scene.systems["mindar-face-system"];
        })

        this.scene.addEventListener("targetFound", () => {
            if (this.onFaceFound) this.onFaceFound();
        });

        this.scene.addEventListener("targetLost", () => {
            if (this.onFaceLost) this.onFaceLost();
        });
    }

    start() {
        this.system.start();
        if (this.onStart) this.onStart();
    }

    stop() {
        this.system.stop();
    }
}
