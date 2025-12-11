class BubbleApp {
    constructor(hud) {
        Object.defineProperty(this, "hud", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: hud
        });
        Object.defineProperty(this, "canvas", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ctx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dpr", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "width", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "height", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "backgroundFill", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                currentGB: 5,
                targetGB: 5,
                globalOpacity: 0.9,
                speedFactor: 1.1,
                collisionsEnabled: true,
            }
        });
        Object.defineProperty(this, "palette", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ['#ff2f56', '#ff7a00', '#ffd200', '#7be000', '#25d6ff', '#2b7bff', '#8a2be2', '#ff5be0']
        });
        Object.defineProperty(this, "bubbles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "MAX_BUBBLES", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 60
        });
        Object.defineProperty(this, "baseTexture", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Image()
        });
        Object.defineProperty(this, "textureReady", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "neighborOffsets", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: [
                [0, 0],
                [1, 0],
                [-1, 0],
                [0, 1],
                [0, -1],
                [1, 1],
                [-1, -1],
                [1, -1],
                [-1, 1],
            ]
        });
        Object.defineProperty(this, "SPAWN_INTERVAL_MS", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 90
        });
        Object.defineProperty(this, "SPAWN_BATCH", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "bubbleIdSeq", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "desiredSizes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "BASE_RADIUS", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 26
        });
        Object.defineProperty(this, "AREA_LIMIT", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0.55
        });
        Object.defineProperty(this, "PAD_AREA_COEFF", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 8
        });
        Object.defineProperty(this, "cappedGB", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "MAX_VEL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 2.2
        });
        Object.defineProperty(this, "COLLISION_ITERS", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 2
        });
        Object.defineProperty(this, "lastConsoleLog", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "grid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "arrayPool", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "cellSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 70
        });
        Object.defineProperty(this, "checkedPairs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Set()
        });
        Object.defineProperty(this, "overlapsCount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "fpsFrames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "fpsAccumMs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "lastFpsUpdate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "fpsMin", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Number.POSITIVE_INFINITY
        });
        Object.defineProperty(this, "fpsMax", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "fpsTotalFrames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "fpsTotalMs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "lastLogUpdate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "ghostsCount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "pendingSpawns", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "spawnCooldown", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "lastSpawnTick", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: performance.now()
        });
        Object.defineProperty(this, "lastFrameTime", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: performance.now()
        });
        Object.defineProperty(this, "handleFrame", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (now) => {
                const rawDtMs = now - this.lastFrameTime;
                const dt = this.clamp(rawDtMs * 0.06, 0, 1.5);
                this.lastFrameTime = now;
                this.fpsFrames += 1;
                this.fpsAccumMs += rawDtMs;
                if (now - this.lastFpsUpdate > 400 && this.fpsAccumMs > 0) {
                    const fps = this.fpsFrames / (this.fpsAccumMs / 1000);
                    this.hud.fpsValueEl.textContent = Math.round(fps).toString();
                    this.fpsTotalFrames += this.fpsFrames;
                    this.fpsTotalMs += this.fpsAccumMs;
                    this.fpsMin = Math.min(this.fpsMin, fps);
                    this.fpsMax = Math.max(this.fpsMax, fps);
                    const fpsAvg = this.fpsTotalMs > 0 ? this.fpsTotalFrames / (this.fpsTotalMs / 1000) : fps;
                    this.hud.fpsMinEl.textContent = Math.round(this.fpsMin === Number.POSITIVE_INFINITY ? fps : this.fpsMin).toString();
                    this.hud.fpsMaxEl.textContent = Math.round(this.fpsMax).toString();
                    this.hud.fpsAvgEl.textContent = fpsAvg.toFixed(1);
                    this.fpsFrames = 0;
                    this.fpsAccumMs = 0;
                    this.lastFpsUpdate = now;
                }
                if (this.backgroundFill) {
                    this.ctx.fillStyle = this.backgroundFill;
                    this.ctx.fillRect(0, 0, this.width, this.height);
                }
                if (Math.abs(this.state.currentGB - this.state.targetGB) > 0.001) {
                    this.state.currentGB += (this.state.targetGB - this.state.currentGB) * 0.08;
                    this.updateHud();
                }
                this.overlapsCount = 0;
                this.ghostsCount = 0;
                const steps = Math.max(1, Math.ceil(dt / 0.4));
                const subDt = dt / steps;
                for (let step = 0; step < steps; step++) {
                    for (let i = 0; i < this.bubbles.length; i++) {
                        const b = this.bubbles[i];
                        b.overlapping = false;
                        if (!this.state.collisionsEnabled && !b.solid) {
                            b.solid = true;
                        }
                        b.colorT += subDt * 0.01;
                        if (b.colorT >= 1) {
                            b.colorFrom = b.colorTo;
                            b.colorTo = this.pickPaletteColor(b.colorFrom);
                            b.colorT = 0;
                        }
                        b.color = this.lerpColor(b.colorFrom, b.colorTo, b.colorT);
                        if (this.textureReady && (++b.colorTick & 7) === 0) {
                            b.sprite = this.tintSprite(b.color, b.sprite);
                        }
                        const sizeLerp = 0.08 * subDt;
                        b.sizeGB += (b.targetSizeGB - b.sizeGB) * sizeLerp;
                        if (b.sizeGB < 0.001 && b.targetSizeGB === 0) {
                            b.toRemove = true;
                        }
                        else {
                            b.radius = this.BASE_RADIUS * Math.sqrt(Math.max(b.sizeGB, 0.001));
                            b.mass = b.radius * b.radius * 0.35;
                        }
                        b.wobblePhase += b.wobbleSpeed * subDt * 0.016;
                        const wobbleX = Math.cos(b.wobblePhase) * b.wobbleAmount;
                        const wobbleY = Math.sin(b.wobblePhase * 0.8) * b.wobbleAmount;
                        b.x += (b.vx + wobbleX) * this.state.speedFactor * subDt;
                        b.y += (b.vy + wobbleY) * this.state.speedFactor * subDt;
                        if (b.x - b.radius < 0) {
                            b.x = b.radius;
                            b.vx = Math.abs(b.vx);
                        }
                        if (b.x + b.radius > this.width) {
                            b.x = this.width - b.radius;
                            b.vx = -Math.abs(b.vx);
                        }
                        if (b.y - b.radius < 0) {
                            b.y = b.radius;
                            b.vy = Math.abs(b.vy);
                        }
                        if (b.y + b.radius > this.height) {
                            b.y = this.height - b.radius;
                            b.vy = -Math.abs(b.vy);
                        }
                    }
                    if (this.state.collisionsEnabled) {
                        this.rebuildGrid();
                        let ghostsPresent = false;
                        for (let i = 0; i < this.bubbles.length; i++) {
                            if (!this.bubbles[i].solid) {
                                this.ghostsCount += 1;
                                ghostsPresent = true;
                            }
                        }
                        if (ghostsPresent) {
                            this.markGhostOverlaps();
                        }
                        for (let iter = 0; iter < this.COLLISION_ITERS; iter++) {
                            this.resolveCollisionsSpatial();
                            this.resolvePositionalOnly();
                        }
                    }
                }
                this.spawnQueued(now);
                if (this.state.collisionsEnabled) {
                    for (let i = 0; i < this.bubbles.length; i++) {
                        const b = this.bubbles[i];
                        if (!b.solid && now > b.ghostUntil && !b.overlapping) {
                            b.solid = true;
                            this.ghostsCount = Math.max(0, this.ghostsCount - 1);
                        }
                    }
                }
                this.bubbles.sort((a, b) => a.depth - b.depth);
                for (let i = this.bubbles.length - 1; i >= 0; i--) {
                    if (this.bubbles[i].toRemove) {
                        this.bubbles.splice(i, 1);
                    }
                }
                for (let i = 0; i < this.bubbles.length; i++) {
                    this.drawBubble(this.bubbles[i]);
                }
                this.updateLog(now);
                requestAnimationFrame(this.handleFrame);
            }
        });
        const canvas = document.getElementById('canvas');
        if (!canvas) {
            throw new Error('Canvas element not found');
        }
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('2D context unavailable');
        }
        this.canvas = canvas;
        this.ctx = context;
        this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        this.attachEvents();
        this.loadTexture();
        this.resize();
        this.planSizes(this.state.targetGB);
        this.reconcileBubbles();
        this.updateHud();
        requestAnimationFrame(this.handleFrame);
    }
    attachEvents() {
        this.hud.minusBtn.addEventListener('click', () => this.stepGB(-1));
        this.hud.plusBtn.addEventListener('click', () => this.stepGB(1));
        this.hud.speedSlider.addEventListener('input', (e) => {
            const input = e.target;
            this.state.speedFactor = parseInt(input.value, 10) / 100;
        });
        this.hud.opacitySlider.addEventListener('input', (e) => {
            const input = e.target;
            this.state.globalOpacity = parseInt(input.value, 10) / 100;
        });
        this.hud.hudToggle.addEventListener('click', () => this.toggleHud());
        this.hud.collisionsToggle.addEventListener('click', () => this.toggleCollisions());
        window.addEventListener('resize', () => {
            this.resize();
            this.planSizes(this.state.targetGB);
        });
        window.addEventListener('keydown', (e) => {
            if (e.key === 'h' || e.key === 'H') {
                this.toggleHud();
            }
        });
    }
    loadTexture() {
        this.baseTexture.onload = () => {
            this.textureReady = true;
            this.rebuildSprites();
        };
        this.baseTexture.src = './bubble.png';
    }
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = Math.floor(this.width * this.dpr);
        this.canvas.height = Math.floor(this.height * this.dpr);
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        this.buildBackground();
    }
    buildBackground() {
        const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);
        grad.addColorStop(0, 'rgba(12, 33, 58, 0.9)');
        grad.addColorStop(1, 'rgba(8, 18, 32, 0.92)');
        this.backgroundFill = grad;
    }
    acquireArray() {
        return this.arrayPool.pop() || [];
    }
    releaseArray(arr) {
        arr.length = 0;
        this.arrayPool.push(arr);
    }
    clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }
    tintSprite(color, target) {
        if (!this.textureReady)
            return null;
        const c = target || document.createElement('canvas');
        if (c.width !== this.baseTexture.width || c.height !== this.baseTexture.height) {
            c.width = this.baseTexture.width;
            c.height = this.baseTexture.height;
        }
        const t = c.getContext('2d');
        if (!t)
            return null;
        t.globalCompositeOperation = 'source-over';
        t.globalAlpha = 1;
        t.clearRect(0, 0, c.width, c.height);
        t.drawImage(this.baseTexture, 0, 0);
        t.globalCompositeOperation = 'source-atop';
        t.fillStyle = color;
        t.globalAlpha = 0.95;
        t.fillRect(0, 0, c.width, c.height);
        t.globalCompositeOperation = 'lighter';
        t.globalAlpha = 0.35;
        t.drawImage(this.baseTexture, 0, 0);
        return c;
    }
    hexToRgb(hex) {
        const h = hex.replace('#', '');
        return {
            r: parseInt(h.substring(0, 2), 16),
            g: parseInt(h.substring(2, 4), 16),
            b: parseInt(h.substring(4, 6), 16),
        };
    }
    rgbToHex(r, g, b) {
        const toHex = (v) => v.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
    lerpColor(a, b, t) {
        const ca = this.hexToRgb(a);
        const cb = this.hexToRgb(b);
        const r = Math.round(ca.r + (cb.r - ca.r) * t);
        const g = Math.round(ca.g + (cb.g - ca.g) * t);
        const bl = Math.round(ca.b + (cb.b - ca.b) * t);
        return this.rgbToHex(r, g, bl);
    }
    pickPaletteColor(except) {
        let c = except;
        while (c === except) {
            c = this.palette[Math.floor(Math.random() * this.palette.length)];
        }
        return c;
    }
    makeBubble(spawnFromCenter = false, sizeGB = 1) {
        const depth = 1;
        const baseRadius = this.BASE_RADIUS;
        const radius = baseRadius * depth * Math.sqrt(sizeGB);
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.15 + Math.random() * 0.22) * depth;
        const wobble = 0.2 + Math.random() * 0.35;
        const hue = this.palette[Math.floor(Math.random() * this.palette.length)];
        const spawnX = spawnFromCenter ? this.width * 0.5 + (Math.random() - 0.5) * 60 : Math.random() * this.width;
        const spawnY = spawnFromCenter ? this.height + radius * 1.2 : Math.random() * this.height;
        const spawnAngle = spawnFromCenter ? -Math.PI / 2 + (Math.random() - 0.5) * 0.6 : angle;
        const spawnSpeed = spawnFromCenter ? 0.9 + Math.random() * 0.8 : speed;
        const spawnVx = Math.cos(spawnAngle) * spawnSpeed;
        const spawnVy = Math.sin(spawnAngle) * spawnSpeed;
        return {
            id: ++this.bubbleIdSeq,
            x: spawnX,
            y: spawnY,
            vx: spawnVx,
            vy: spawnVy,
            radius,
            baseRadius,
            depth,
            mass: radius * radius * 0.35,
            alpha: 0.35 + depth * 0.35,
            wobblePhase: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.6 + Math.random() * 0.6,
            wobbleAmount: wobble,
            isFractional: sizeGB < 1,
            color: hue,
            colorFrom: hue,
            colorTo: this.pickPaletteColor(hue),
            colorT: Math.random(),
            colorTick: 0,
            solid: false,
            ghostUntil: performance.now() + 3000,
            overlapping: false,
            sizeGB,
            targetSizeGB: sizeGB,
            sprite: null,
        };
    }
    rebuildSprites() {
        this.bubbles.forEach((b) => {
            b.sprite = this.tintSprite(b.color, b.sprite);
        });
    }
    planSizes(totalGB) {
        const sizes = [];
        const whole = Math.floor(Math.max(totalGB, 0));
        const frac = Math.max(0, totalGB - whole);
        for (let i = 0; i < whole; i++)
            sizes.push(1);
        if (frac > 0)
            sizes.push(frac);
        sizes.sort((a, b) => a - b);
        const screenArea = this.width * this.height;
        const sumSizes = () => sizes.reduce((acc, s) => acc + s, 0);
        const occupiedArea = () => {
            const areaSum = Math.PI * this.BASE_RADIUS * this.BASE_RADIUS * sumSizes();
            const padding = this.PAD_AREA_COEFF * this.BASE_RADIUS * this.BASE_RADIUS * sizes.length;
            return areaSum + padding;
        };
        while (sizes.length > this.MAX_BUBBLES && sizes.length > 1) {
            const a = sizes.shift();
            const b = sizes.shift();
            sizes.push((a || 0) + (b || 0));
            sizes.sort((x, y) => x - y);
        }
        while (sizes.length > 0 && occupiedArea() > screenArea * this.AREA_LIMIT) {
            sizes.shift();
        }
        this.desiredSizes = sizes.sort((a, b) => b - a);
        this.cappedGB = this.desiredSizes.reduce((acc, s) => acc + s, 0);
    }
    enqueueSpawn(size) {
        this.pendingSpawns.push(size);
    }
    spawnQueued(now) {
        this.spawnCooldown -= now - this.lastSpawnTick;
        this.lastSpawnTick = now;
        if (this.spawnCooldown > 0 || this.pendingSpawns.length === 0)
            return;
        let spawned = 0;
        while (this.pendingSpawns.length && spawned < this.SPAWN_BATCH && this.spawnCooldown <= 0) {
            const size = this.pendingSpawns.shift();
            if (size === undefined)
                break;
            const b = this.makeBubble(true, size);
            b.sprite = this.tintSprite(b.color, b.sprite);
            this.bubbles.push(b);
            spawned += 1;
            this.spawnCooldown += this.SPAWN_INTERVAL_MS;
        }
    }
    reconcileBubbles() {
        const desired = [...this.desiredSizes];
        const existing = [...this.bubbles].sort((a, b) => b.targetSizeGB - a.targetSizeGB);
        const keep = Math.min(desired.length, existing.length);
        this.pendingSpawns.length = 0;
        this.spawnCooldown = 0;
        this.lastSpawnTick = performance.now();
        for (let i = 0; i < keep; i++) {
            const b = existing[i];
            b.targetSizeGB = desired[i];
        }
        if (desired.length > existing.length) {
            for (let i = keep; i < desired.length; i++) {
                this.enqueueSpawn(desired[i]);
            }
        }
        if (existing.length > desired.length) {
            for (let i = keep; i < existing.length; i++) {
                const b = existing[i];
                b.targetSizeGB = 0;
            }
        }
    }
    gridKey(cx, cy) {
        return `${cx}|${cy}`;
    }
    getCellRange(b) {
        const minCx = Math.floor((b.x - b.radius) / this.cellSize);
        const maxCx = Math.floor((b.x + b.radius) / this.cellSize);
        const minCy = Math.floor((b.y - b.radius) / this.cellSize);
        const maxCy = Math.floor((b.y + b.radius) / this.cellSize);
        return { minCx, maxCx, minCy, maxCy };
    }
    rebuildGrid() {
        for (const arr of this.grid.values())
            this.releaseArray(arr);
        this.grid.clear();
        for (let i = 0; i < this.bubbles.length; i++) {
            const b = this.bubbles[i];
            const { minCx, maxCx, minCy, maxCy } = this.getCellRange(b);
            for (let cx = minCx; cx <= maxCx; cx++) {
                for (let cy = minCy; cy <= maxCy; cy++) {
                    const key = this.gridKey(cx, cy);
                    let list = this.grid.get(key);
                    if (!list) {
                        list = this.acquireArray();
                        this.grid.set(key, list);
                    }
                    list.push(b);
                }
            }
        }
    }
    updateHud() {
        this.hud.gbValueEl.textContent = this.state.currentGB.toFixed(1);
    }
    stepGB(delta) {
        const amount = parseFloat(this.hud.deltaInput.value) || 0;
        const step = amount > 0 ? amount : 0.1;
        this.state.targetGB = this.clamp(this.state.targetGB + delta * step, 0, 999);
        this.planSizes(this.state.targetGB);
        this.reconcileBubbles();
    }
    resolveCollisionsSpatial() {
        this.checkedPairs.clear();
        for (const [key, list] of this.grid.entries()) {
            const [cx, cy] = key.split('|').map(Number);
            for (const [dx, dy] of this.neighborOffsets) {
                const nKey = this.gridKey(cx + dx, cy + dy);
                const otherList = this.grid.get(nKey);
                if (!otherList)
                    continue;
                for (let i = 0; i < list.length; i++) {
                    const a = list[i];
                    for (let j = 0; j < otherList.length; j++) {
                        const b = otherList[j];
                        if (a === b)
                            continue;
                        if (!a.solid || !b.solid)
                            continue;
                        const pairId = a.id < b.id ? `${a.id}|${b.id}` : `${b.id}|${a.id}`;
                        if (this.checkedPairs.has(pairId))
                            continue;
                        const dx2 = b.x - a.x;
                        const dy2 = b.y - a.y;
                        const minDist = a.radius + b.radius;
                        const distSq = dx2 * dx2 + dy2 * dy2;
                        if (distSq >= minDist * minDist || distSq === 0)
                            continue;
                        const dist = Math.sqrt(distSq) || 0.0001;
                        const nx = dx2 / dist;
                        const ny = dy2 / dist;
                        const overlapRaw = (minDist - dist) * 0.5;
                        const overlap = Math.min(overlapRaw, minDist * 0.25);
                        a.x -= nx * overlap;
                        a.y -= ny * overlap;
                        b.x += nx * overlap;
                        b.y += ny * overlap;
                        const ma = a.mass;
                        const mb = b.mass;
                        const va = a.vx * nx + a.vy * ny;
                        const vb = b.vx * nx + b.vy * ny;
                        const restitution = 0.9;
                        const p = (restitution * 2 * (va - vb)) / (ma + mb);
                        a.vx -= p * mb * nx;
                        a.vy -= p * mb * ny;
                        b.vx += p * ma * nx;
                        b.vy += p * ma * ny;
                        a.vx = this.clamp(a.vx, -this.MAX_VEL, this.MAX_VEL);
                        a.vy = this.clamp(a.vy, -this.MAX_VEL, this.MAX_VEL);
                        b.vx = this.clamp(b.vx, -this.MAX_VEL, this.MAX_VEL);
                        b.vy = this.clamp(b.vy, -this.MAX_VEL, this.MAX_VEL);
                        a.overlapping = true;
                        b.overlapping = true;
                        this.overlapsCount += 1;
                        this.checkedPairs.add(pairId);
                    }
                }
            }
        }
    }
    resolvePositionalOnly() {
        for (const [key, list] of this.grid.entries()) {
            const [cx, cy] = key.split('|').map(Number);
            for (const [dx, dy] of this.neighborOffsets) {
                const nKey = this.gridKey(cx + dx, cy + dy);
                const otherList = this.grid.get(nKey);
                if (!otherList)
                    continue;
                for (let i = 0; i < list.length; i++) {
                    const a = list[i];
                    for (let j = 0; j < otherList.length; j++) {
                        const b = otherList[j];
                        if (a === b)
                            continue;
                        if (!a.solid || !b.solid)
                            continue;
                        const dx2 = b.x - a.x;
                        const dy2 = b.y - a.y;
                        const minDist = a.radius + b.radius;
                        const distSq = dx2 * dx2 + dy2 * dy2;
                        if (distSq >= minDist * minDist || distSq === 0)
                            continue;
                        const dist = Math.sqrt(distSq) || 0.0001;
                        const nx = dx2 / dist;
                        const ny = dy2 / dist;
                        const overlapRaw = (minDist - dist) * 0.5;
                        const overlap = Math.min(overlapRaw, minDist * 0.2);
                        a.x -= nx * overlap;
                        a.y -= ny * overlap;
                        b.x += nx * overlap;
                        b.y += ny * overlap;
                    }
                }
            }
        }
    }
    markGhostOverlaps() {
        for (let i = 0; i < this.bubbles.length; i++) {
            const g = this.bubbles[i];
            if (g.solid)
                continue;
            const { minCx, maxCx, minCy, maxCy } = this.getCellRange(g);
            let intersect = false;
            for (let cx = minCx - 1; cx <= maxCx + 1 && !intersect; cx++) {
                for (let cy = minCy - 1; cy <= maxCy + 1 && !intersect; cy++) {
                    const nKey = this.gridKey(cx, cy);
                    const list = this.grid.get(nKey);
                    if (!list)
                        continue;
                    for (let k = 0; k < list.length; k++) {
                        const other = list[k];
                        if (other === g)
                            continue;
                        const dx2 = other.x - g.x;
                        const dy2 = other.y - g.y;
                        const minDist = other.radius + g.radius;
                        if (dx2 * dx2 + dy2 * dy2 < minDist * minDist) {
                            intersect = true;
                            break;
                        }
                    }
                }
            }
            if (intersect) {
                g.overlapping = true;
            }
        }
    }
    updateLog(now) {
        if (now - this.lastLogUpdate < 300)
            return;
        this.lastLogUpdate = now;
        const sizes = {};
        for (let i = 0; i < this.bubbles.length; i++) {
            const s = Math.round(this.bubbles[i].sizeGB * 1000) / 1000;
            sizes[s] = (sizes[s] || 0) + 1;
        }
        const sizeEntries = Object.entries(sizes)
            .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
            .map(([k, v]) => `${k}:${v}`)
            .join(', ');
        this.hud.logEl.textContent = `curGB:${this.state.currentGB.toFixed(2)} tgtGB:${this.state.targetGB.toFixed(2)} cappedGB:${this.cappedGB.toFixed(2)} | desired:${this.desiredSizes.length} | bubbles:${this.bubbles.length} | ghosts:${this.ghostsCount} | overlaps:${this.overlapsCount} | sizes[${sizeEntries}]`;
        if (now - this.lastConsoleLog > 1500) {
            this.lastConsoleLog = now;
            console.log('[bubbles]', {
                currentGB: this.state.currentGB.toFixed(2),
                targetGB: this.state.targetGB.toFixed(2),
                desiredCount: this.desiredSizes.length,
                desiredSizes: [...this.desiredSizes],
                cappedGB: this.cappedGB,
                bubbles: this.bubbles.length,
                ghosts: this.ghostsCount,
                overlaps: this.overlapsCount,
                sizesHistogram: sizes,
            });
        }
    }
    drawBubble(b) {
        const size = b.radius * 2;
        this.ctx.save();
        this.ctx.globalAlpha = b.alpha * this.state.globalOpacity;
        if (this.textureReady && b.sprite) {
            this.ctx.drawImage(b.sprite, b.x - size * 0.5, b.y - size * 0.5, size, size);
        }
        else {
            const g = this.ctx.createRadialGradient(b.x - b.radius * 0.25, b.y - b.radius * 0.25, b.radius * 0.15, b.x, b.y, b.radius);
            g.addColorStop(0, 'rgba(255,255,255,0.9)');
            g.addColorStop(0.3, `${b.color}aa`);
            g.addColorStop(0.55, `${b.color}55`);
            g.addColorStop(1, 'rgba(255,255,255,0.04)');
            this.ctx.fillStyle = g;
            this.ctx.beginPath();
            this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.restore();
    }
    toggleHud() {
        this.hud.hud.classList.toggle('hidden');
        this.hud.hud.style.opacity = this.hud.hud.classList.contains('hidden') ? '0.2' : '1';
        this.hud.hudToggle.textContent = this.hud.hud.classList.contains('hidden') ? 'Показать' : 'Скрыть';
    }
    toggleCollisions() {
        this.state.collisionsEnabled = !this.state.collisionsEnabled;
        this.hud.collisionsToggle.textContent = this.state.collisionsEnabled ? 'Коллизии: Вкл' : 'Коллизии: Выкл';
        if (!this.state.collisionsEnabled) {
            for (let i = 0; i < this.bubbles.length; i++) {
                this.bubbles[i].solid = true;
            }
            this.ghostsCount = 0;
        }
    }
}
function queryRequired(selector, type) {
    const el = document.querySelector(selector);
    if (!el || !(el instanceof type)) {
        throw new Error(`Element ${selector} not found or has wrong type`);
    }
    return el;
}
function bootstrap() {
    const hud = {
        gbValueEl: queryRequired('#gbValue', HTMLElement),
        fpsValueEl: queryRequired('#fpsValue', HTMLElement),
        fpsMinEl: queryRequired('#fpsMin', HTMLElement),
        fpsAvgEl: queryRequired('#fpsAvg', HTMLElement),
        fpsMaxEl: queryRequired('#fpsMax', HTMLElement),
        deltaInput: queryRequired('#deltaInput', HTMLInputElement),
        minusBtn: queryRequired('#minusBtn', HTMLButtonElement),
        plusBtn: queryRequired('#plusBtn', HTMLButtonElement),
        speedSlider: queryRequired('#speedSlider', HTMLInputElement),
        opacitySlider: queryRequired('#opacitySlider', HTMLInputElement),
        hud: queryRequired('#hud', HTMLElement),
        hudToggle: queryRequired('#hudToggle', HTMLButtonElement),
        collisionsToggle: queryRequired('#collisionsToggle', HTMLButtonElement),
        logEl: queryRequired('#log', HTMLElement),
    };
    new BubbleApp(hud);
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
}
else {
    bootstrap();
}
export {};
