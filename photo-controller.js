export default class PhotoController {
    stream = null;
    track = null;

    /** @type () => void */
    onRecordingStart;
    /** @type (photo) => void */
    onPhotoTaken = (photo) => {};

    async capture() {
        const imageCapture = new ImageCapture(this.track);
        const bitmap = await imageCapture.grabFrame();

        const canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(bitmap, 0, 0);

        const photo = this._extract(canvas.toDataURL("image/png"));
        if (this.onPhotoTaken) this.onPhotoTaken(photo);
    }

    /** @param dataString {String} */
    _extract(dataString) {
        const [meta, base64] = dataString.split(',');
        const mime = meta.match(/data:(.*);base64/)[1];

        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }

        const blob = new Blob([bytes], { type: mime });
        const formData = new FormData();
        formData.append('image', blob, 'archivo.' + mime.split('/')[1]);

        return formData;
    }

    async init() {
        try {
            this.stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            this.track = this.stream.getVideoTracks()[0];
            if (this.onRecordingStart) this.onRecordingStart();
        } catch {
            console.log("Permissions not granted");
        }
    }
}
