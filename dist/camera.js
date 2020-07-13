export default class Camera {
    constructor({ parent, facingMode, className, delay, accept, captureButton = true, loaderButton = true, delayButton = true, facingButton = true, created, mounted, captured, updated, onError }) {
        this.parent = document.body;
        this.el = document.createElement('div');
        this.className = '';
        this.video = document.createElement('video');
        this.facingMode = false;
        this.delay = 0;
        this.accept = 'image/*,video/*';
        this.mode = 'photo';
        this.ratio = 1;
        this.captureSate = false;
        this.isVedeoPlayed = false;
        this.captureButton = true;
        this.loaderButton = true;
        this.delayButton = true;
        this.facingButton = true;
        if (typeof parent === 'string') {
            const p = document.querySelector(parent);
            this.parent = p || this.parent;
        }
        else {
            this.parent = parent || this.parent;
        }
        this.facingMode = facingMode || this.facingMode;
        this.captureButton = captureButton;
        this.loaderButton = loaderButton;
        this.delayButton = delayButton;
        this.facingButton = facingButton;
        this.captured = captured;
        this.onError = onError;
        this.created = created;
        this.mounted = mounted;
        this.updated = updated;
        this.delay = delay || 0;
        this.className = className || 'camera';
        this.accept = accept || this.accept;
        this.el.setAttribute('class', `mood-camera ${this.className}`.trim());
        const width = this.parent.getBoundingClientRect().width;
        const height = this.parent.getBoundingClientRect().height;
        const promise = navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: width },
                height: { ideal: height },
                facingMode: {
                    ideal: this.facingMode ? 'user' : 'environnement'
                }
            }
        });
        promise.catch(e => {
            if (this.onError) {
                this.onError(e);
            }
        });
        promise.then(mediaStream => {
            if (this.created) {
                this.created();
            }
            this.mediaStream = mediaStream;
            window.addEventListener('resize', () => this.build());
            this.parent.addEventListener('resize', () => this.build);
            this.el.addEventListener('resize', () => this.build);
            this.build();
        });
    }
    buildTrack() {
        const width = this.parent.getBoundingClientRect().width;
        const height = this.parent.getBoundingClientRect().height;
        const track = this.mediaStream.getVideoTracks()[0];
        track.applyConstraints({
            advanced: [
                {
                    width,
                    height: height * this.ratio,
                    facingMode: {
                        ideal: this.facingMode ? 'user' : 'environnement'
                    }
                }
            ]
        });
        this.video.width = width;
        this.video.height = height * this.ratio;
        if (this.updated) {
            this.updated();
        }
        if (!this.isVedeoPlayed) {
            this.isVedeoPlayed = true;
            this.video.srcObject = this.mediaStream;
            this.video.onloadedmetadata = () => {
                this.video.play();
            };
        }
    }
    build() {
        const width = this.parent.getBoundingClientRect().width;
        const height = this.parent.getBoundingClientRect().height;
        this.buildTrack();
        this.el.innerHTML = '';
        this.buildCaptureButton();
        this.buildButtonLoader();
        this.buildButtonFacing();
        this.buildDelay();
        this.el.appendChild(this.video);
        if (this.updated) {
            this.updated();
        }
    }
    buildCaptureButton() {
        const capture = document.createElement('button');
        capture.setAttribute('class', `capture ${this.mode}`);
        capture.addEventListener('click', () => this.capture());
        const old = this.el.querySelector('button.capture');
        if (this.captureButton) {
            old ? old.replaceWith(capture) : this.el.appendChild(capture);
        }
        else {
            old?.remove();
        }
        if (this.updated) {
            this.updated();
        }
    }
    buildButtonLoader() {
        const btn = document.createElement('button');
        btn.setAttribute('class', `loader`);
        btn.addEventListener('click', () => this.load());
        const old = this.el.querySelector('button.loader');
        if (this.loaderButton) {
            old ? old.replaceWith(btn) : this.el.appendChild(btn);
        }
        else {
            old?.remove();
        }
        if (this.updated) {
            this.updated();
        }
    }
    buildButtonFacing() {
        const btn = document.createElement('button');
        btn.setAttribute('class', `facing`);
        btn.addEventListener('click', () => {
            this.facingMode = !this.facingMode;
            this.buildTrack();
            this.buildButtonFacing();
        });
        const old = this.el.querySelector('button.facing');
        if (this.facingButton) {
            old ? old.replaceWith(btn) : this.el.appendChild(btn);
        }
        else {
            old?.remove();
        }
        if (this.updated) {
            this.updated();
        }
    }
    buildDelay() {
        const div = document.createElement('div');
        div.setAttribute('class', `delay`);
        const e = document.createElement('button');
        e.addEventListener('click', () => div.classList.toggle('open'));
        e.setAttribute('class', `${this.delay ? 'act' : ''}`);
        if (this.delay) {
            const s = document.createElement('span');
            s.setAttribute('class', `delay-span`);
            s.textContent = String(this.delay);
            e.appendChild(s);
        }
        div.appendChild(e);
        let d = 0;
        for (let i of [0, 3, 5, 10]) {
            const e = document.createElement('button');
            e.setAttribute('class', 'delay-i');
            e.textContent = String(i);
            div.appendChild(e);
            e.addEventListener('click', () => {
                this.delay = i;
                this.buildDelay();
            });
            // e.style.animationDelay = `${d * 0.5}s`;
            d++;
        }
        const old = this.el.querySelector('.delay');
        if (this.delayButton) {
            old ? old.replaceWith(div) : this.el.appendChild(div);
        }
        else {
            old?.remove();
        }
        if (this.updated) {
            this.updated();
        }
    }
    buildDelayIndex(index) {
        const i = document.createElement('div');
        i.setAttribute('class', `delay-counter`);
        i.textContent = String(index);
        const old = this.el.querySelector('div.delay-counter');
        if (index === 0) {
            old?.remove();
        }
        else {
            old ? old.replaceWith(i) : this.el.appendChild(i);
        }
    }
    capture() {
        if (!this.captureSate) {
            this.captureSate = true;
            this.delay ? this.counter() : this.capture0();
        }
    }
    counter(count = 0) {
        this.buildDelayIndex(this.delay - count);
        setTimeout(() => {
            count++;
            count < this.delay ? this.counter(count) : this.capture0();
        }, 1000);
    }
    capture0() {
        this.buildDelayIndex(0);
        this.captureSate = false;
        const canvas = document.createElement('canvas');
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;
        document.body.appendChild(canvas);
        canvas.getContext('2d')?.drawImage(this.video, 0, 0);
        document.body.removeChild(canvas);
        const object = {
            data: canvas.toDataURL('image/jpg'),
            type: 'image/jpg',
            name: `${Date.now()}.jpg`
        };
        if (this.captured) {
            this.captured(object);
        }
    }
    mount() {
        if (this.el.parentElement !== this.parent) {
            this.parent.appendChild(this.el);
            if (this.mounted) {
                this.mounted();
            }
        }
    }
    remove() {
        this.el.remove();
        this.isVedeoPlayed = false;
        const track = this.mediaStream.getVideoTracks()[0];
        track.stop();
    }
    load() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.accept = this.accept;
        input.onchange = () => {
            if (input.files) {
                const file = input.files[0];
                if (file) {
                    const fr = new FileReader();
                    fr.onload = () => {
                        const object = {
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            data: fr.result
                        };
                        if (this.captured) {
                            this.captured(object);
                        }
                    };
                    fr.readAsDataURL(file);
                }
            }
        };
        input.click();
    }
}
//# sourceMappingURL=camera.js.map