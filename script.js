let quote_hover = document.getElementsByClassName('quote-hover');
for(let e of quote_hover){
    e.addEventListener('mouseover', () => {e.innerHTML = "「" + e.innerHTML + "」";});
    e.addEventListener('mouseout',  () => {e.innerHTML = e.innerHTML.substring(1, e.innerHTML.length-1);});
}

const starbg = document.getElementById("star-bg");
starbg.width = window.innerWidth;
starbg.height = window.innerHeight;
var ctx = starbg.getContext("2d");
function Star(c){
    this.r = Math.random()*6 + 3;
    this.x = Math.random()*(starbg.width - this.r*2);
    this.y = Math.random()*(starbg.height- this.r*2);
    this.c = c;

    this.dr = -(Math.random()/20+0.005);
    this.draw = function(){
        ctx.beginPath();
        var grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grd.addColorStop(0, '#fafafa')
        grd.addColorStop(1, '#111')
        ctx.fillStyle = grd;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fill();
    }
    this.animate = function(){
        this.r += this.dr;
        if (this.r <= 0) {
            this.x = Math.random()*(starbg.width - this.r*2);
            this.y = Math.random()*(starbg.height- this.r*2);
            this.r = Math.random()*6 + 3;
        }
        this.draw()
    }
}
const n = 15
let stars = [];
for(i = 0; i<n; i++){
    stars.push(new Star('#fafafa'))
}
function update(){
    starbg.width = window.innerWidth;
    starbg.height = window.innerHeight;
    ctx = starbg.getContext("2d");
    ctx.clearRect(0,0, starbg.width, starbg.height);
    for(let s of stars){
        s.animate();
    }
    requestAnimationFrame(update)
}
update();