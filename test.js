const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン零一二三四五六七八九十界虚空神机同步律动";

class Particle {
    constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.char = charset[Math.floor(Math.random() * charset.length)];
        const colors = ["rgba(255,255,255,0.7)", "rgba(0, 229, 255, 0.5)", "rgba(124, 77, 255, 0.6)"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.vx = 0;
        this.vy = 0;
    }
}
class Node {
    constructor(x, y, label) {
        this.x = x;
        this.y = y;
        this.radius = 90;
        this.coreRadius = 15;
        this.label = label;
        this.isDragging = false;
    }
}
let particles = [];
let nodes = [];
let width = 1000, height = 1000;
nodes.push(new Node(width * 0.3, height * 0.4, "NODE-ALPHA"));
for (let y = 0; y < height; y += 22) {
    for (let x = 0; x < width; x += 22) {
        if (Math.random() > 0.3) {
            particles.push(new Particle(x, y));
        }
    }
}
for (let i = 0; i < particles.length; i++) {
    particles[i].update = function() {
        let dx = this.baseX - this.x;
        let dy = this.baseY - this.y;
        this.vx += dx * 0.05; // spring constant
        this.vy += dy * 0.05;
        
        nodes.forEach(node => {
            let distX = this.x - node.x;
            let distY = this.y - node.y;
            let dist = Math.sqrt(distX * distX + distY * distY);
            
            if (dist < node.radius) {
                let force = (node.radius - dist) / node.radius;
                let angle = Math.atan2(distY, distX);
                this.vx += Math.cos(angle) * force * 5;
                this.vy += Math.sin(angle) * force * 5;
                this.currentColor = "#ff4081"; 
            } else {
                this.currentColor = this.color;
            }
        });
        
        this.vx *= 0.8;
        this.vy *= 0.8;
        this.x += this.vx;
        this.y += this.vy;
    }
    particles[i].update();
}
console.log("No syntax errors");
