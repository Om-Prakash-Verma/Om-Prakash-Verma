import * as THREE from 'three';

// Procedural Hand-Drawn Sketch Texture Generator
// Produces crisp ink-line canvas textures matching the itomdev comic/sketch aesthetic.

export function createWoodFloorTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Paper background
  ctx.fillStyle = '#f5f3ec';
  ctx.fillRect(0, 0, 1024, 1024);

  // Planks
  const plankWidth = 128;
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 3;

  for (let x = 0; x <= 1024; x += plankWidth) {
    // Slight organic jitter for hand-drawn look
    ctx.beginPath();
    let currX = x;
    ctx.moveTo(currX, 0);
    for (let y = 0; y <= 1024; y += 40) {
      currX = x + (Math.sin(y * 0.05 + x) * 1.5);
      ctx.lineTo(currX, y);
    }
    ctx.stroke();

    // Wood grain lines inside each plank
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1.2;
    for (let g = 0; g < 4; g++) {
      ctx.beginPath();
      const gx = x + 15 + g * 25;
      ctx.moveTo(gx, 0);
      for (let y = 0; y <= 1024; y += 30) {
        const offset = Math.sin((y + gx) * 0.03) * 6;
        ctx.lineTo(gx + offset, y);
      }
      ctx.stroke();
    }
    ctx.strokeStyle = '#222222';
    ctx.lineWidth = 3;
  }

  // Cross seams between boards
  ctx.lineWidth = 3;
  for (let x = 0; x < 1024; x += plankWidth) {
    for (let y = 200 + (x % 3) * 120; y < 1024; y += 450) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + plankWidth, y + (Math.random() * 2 - 1));
      ctx.stroke();
      // Nail dots
      ctx.fillStyle = '#222222';
      ctx.beginPath();
      ctx.arc(x + 12, y - 6, 2.5, 0, Math.PI * 2);
      ctx.arc(x + plankWidth - 12, y - 6, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createBrickWallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#faf8f2';
  ctx.fillRect(0, 0, 1024, 1024);

  const rowHeight = 44;
  const brickWidth = 110;
  ctx.strokeStyle = '#2b2b2b';
  ctx.lineWidth = 2.5;

  let rowIndex = 0;
  for (let y = 0; y <= 1024; y += rowHeight) {
    // Horizontal mortar line
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 1024; x += 30) {
      ctx.lineTo(x, y + Math.sin(x * 0.1 + y) * 1);
    }
    ctx.stroke();

    // Vertical mortar lines
    const offset = (rowIndex % 2 === 0) ? 0 : brickWidth / 2;
    for (let x = offset; x <= 1024; x += brickWidth) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + (Math.random() * 2 - 1), y + rowHeight);
      ctx.stroke();

      // Hand-drawn brick texture hatch
      if (Math.random() > 0.4) {
        ctx.strokeStyle = '#888888';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + 10, y + 10);
        ctx.lineTo(x + 35, y + 25);
        ctx.stroke();
        ctx.strokeStyle = '#2b2b2b';
        ctx.lineWidth = 2.5;
      }
    }
    rowIndex++;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createDoorTexture(label, subtext = '', hasTape = true) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Door panel background (wood tone)
  ctx.fillStyle = '#ede5d5';
  ctx.fillRect(0, 0, 512, 1024);

  // Outer door frame outline
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 8;
  ctx.strokeRect(10, 10, 492, 1004);

  // Inner recessed panels
  ctx.lineWidth = 5;
  ctx.strokeRect(40, 50, 432, 420);
  ctx.strokeRect(40, 520, 432, 440);

  // Door knob / handle
  ctx.fillStyle = '#444444';
  ctx.beginPath();
  ctx.arc(430, 510, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(430, 510);
  ctx.lineTo(465, 510);
  ctx.stroke();

  // If blueprints or notes taped on the door
  if (hasTape) {
    // Taped paper sheet
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 3;
    ctx.fillRect(70, 100, 370, 310);
    ctx.strokeRect(70, 100, 370, 310);

    // Blue painter's tape on 4 corners
    ctx.fillStyle = '#4a90e2';
    // Top-left tape
    ctx.fillRect(55, 90, 45, 20);
    // Top-right tape
    ctx.fillRect(410, 90, 45, 20);
    // Bottom-left tape
    ctx.fillRect(55, 395, 45, 20);
    // Bottom-right tape
    ctx.fillRect(410, 395, 45, 20);

    // Technical Blueprint schematic doodles inside
    ctx.strokeStyle = '#4a90e2';
    ctx.lineWidth = 2;
    ctx.strokeRect(95, 125, 150, 110);
    ctx.strokeRect(265, 125, 150, 110);
    ctx.beginPath();
    ctx.moveTo(170, 235);
    ctx.lineTo(170, 290);
    ctx.lineTo(340, 290);
    ctx.lineTo(340, 235);
    ctx.stroke();
  }

  // Wood sign plaque above/on door
  ctx.fillStyle = '#d8b98b';
  ctx.strokeStyle = '#222222';
  ctx.lineWidth = 6;
  ctx.fillRect(60, 40, 392, 100);
  ctx.strokeRect(60, 40, 392, 100);

  // Screws on plaque corners
  ctx.fillStyle = '#222222';
  [[75, 55], [437, 55], [75, 125], [437, 125]].forEach(([sx, sy]) => {
    ctx.beginPath();
    ctx.arc(sx, sy, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ede5d5';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sx - 3, sy - 3);
    ctx.lineTo(sx + 3, sy + 3);
    ctx.stroke();
  });

  // Door sign label
  ctx.fillStyle = '#1c1c1c';
  ctx.font = 'bold 44px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, 256, 105);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export function createSeaWaterTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f8f6f0';
  ctx.fillRect(0, 0, 1024, 1024);

  // Swirling hand-drawn wave ripples
  ctx.strokeStyle = '#282828';
  ctx.lineWidth = 2.5;

  for (let y = 20; y < 1024; y += 45) {
    for (let x = -50; x < 1050; x += 140) {
      ctx.beginPath();
      const waveX = x + ((y % 90 === 0) ? 70 : 0);
      ctx.arc(waveX, y, 40, 0.1 * Math.PI, 0.9 * Math.PI, false);
      ctx.stroke();

      // Little inner swirl
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(waveX, y + 8, 20, 0.2 * Math.PI, 0.8 * Math.PI, false);
      ctx.stroke();
      ctx.lineWidth = 2.5;
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

export function createPaperPlaneGeometry() {
  // Low-poly 3D paper airplane geometry
  const geom = new THREE.BufferGeometry();
  
  // Vertices for folded paper airplane
  const vertices = new Float32Array([
    // Nose
    0, 0, 2.2,
    // Left wing tip
    -1.8, 0.3, -1.5,
    // Center fold
    0, -0.4, -1.2,
    // Right wing tip
    1.8, 0.3, -1.5,
    // Center top fold
    0, 0.2, -1.5,
    // Under keel
    0, -0.6, -0.5
  ]);

  // Triangular faces
  const indices = [
    // Top Left Wing
    0, 1, 4,
    // Top Right Wing
    0, 4, 3,
    // Under Keel Left
    0, 2, 5,
    // Under Keel Right
    0, 5, 2,
    // Back fold
    1, 2, 4,
    4, 2, 3
  ];

  geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();
  return geom;
}
