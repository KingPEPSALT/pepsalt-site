let quote_hover = document.getElementsByClassName('quote-hover');
for(let e of quote_hover){
    e.addEventListener('mouseover', () => {e.innerHTML = "「" + e.innerHTML + "」";});
    e.addEventListener('mouseout',  () => {e.innerHTML = e.innerHTML.substring(1, e.innerHTML.length-1);});
}
getMouse = function(e, element) {
    var offsetX = 0, offsetY = 0, mx, my;
  
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }
  
    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;
  
    return {x: mx, y: my};
}


const starbg = document.getElementById("star-bg");
const homediv = document.getElementById("home-div");
starbg.width = homediv.clientWidth;
starbg.height = homediv.clientHeight;
var ctx = starbg.getContext("2d");
var mousePos = {x:0, y:0};
homediv.addEventListener('mousemove', function(evt) {
    mousePos = getMouse(evt, homediv);
}, false);

function Star(){
    this.r = Math.random()*5 + 5;
    this.x = Math.random()*(starbg.width - this.r*2);
    this.y = Math.random()*(starbg.height- this.r*2);

    this.dr = -1/(40-this.r);

    this.draw = function(){
        ctx.beginPath();
        var grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grd.addColorStop(0, '#ffffff');
        grd.addColorStop(0.3,'#fafafa');
        grd.addColorStop(0.4,'#bbbbbb');
        grd.addColorStop(1, '#111');
        ctx.fillStyle = grd;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fill();
    }
    this.animate = function(){
        this.r += this.dr;
        dist = (this.x-mousePos.x)*(this.x-mousePos.x) + (this.y-mousePos.y)*(this.y-mousePos.y)
        this.x -= 100*(mousePos.x-this.x)/(dist)
        this.y -= 100*(mousePos.y-this.y)/(dist)
        if (this.r <= 0) {
            this.x = Math.random()*(starbg.width - this.r*2);
            this.y = Math.random()*(starbg.height- this.r*2);
            this.r = Math.random()*5 + 5;
            this.dr = -1/(40-this.r);

        }
        this.draw()
    }
}
const n = 40
let stars = [];
for(i = 0; i<n; i++){
    stars.push(new Star())
}
function update(){
    starbg.width = document.getElementById("home-div").clientWidth;
    starbg.height = document.getElementById("home-div").clientHeight;
    ctx = starbg.getContext("2d");
    ctx.clearRect(0,0, starbg.width, starbg.height);
    for(let s of stars){
        s.animate();
    }
    requestAnimationFrame(update)
}
update();