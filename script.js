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
    this.sr = 0;
    this.growing = true;
    this.x = Math.random()*(starbg.width - this.r*2);
    this.y = Math.random()*(starbg.height- this.r*2);

    this.dr = 1/(40-this.r);

    this.draw = function(){
        ctx.beginPath();
        var grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sr);
        grd.addColorStop(0, '#ffffff');
        grd.addColorStop(0.3,'#fafafa');
        grd.addColorStop(0.4,'#bbbbbb');
        grd.addColorStop(1, '#111');
        ctx.fillStyle = grd;
        ctx.arc(this.x, this.y, this.sr, 0, Math.PI*2);
        ctx.fill();
    }
    this.animate = function(dt){
        if(dt > 1000) dt = 200;
        if(this.sr >= this.r) this.growing = false;
        this.sr += (this.growing ? this.dr : -this.dr)*dt/6;
        dist = (this.x-mousePos.x)*(this.x-mousePos.x) + (this.y-mousePos.y)*(this.y-mousePos.y)
        this.x -= 20*(mousePos.x-this.x)/(dist)*dt
        this.y -= 20*(mousePos.y-this.y)/(dist)*dt
        if (this.sr <= 0) {
            this.x = Math.random()*(starbg.width - this.r*2);
            this.y = Math.random()*(starbg.height- this.r*2);
            this.r = Math.random()*5 + 5;
            this.sr = 0;
            this.growing = true;
            this.dr = 2/(40-this.r);
        }
        this.draw()
    }
}
var n = Math.round(60*(Math.pow(starbg.width*starbg.height/(1920*1080), 0.7)))
let stars = [];
for(i = 0; i<n; i++){
    stars.push(new Star())
}
var lastframe = Date.now();
function update(){
    starbg.width = document.getElementById("home-div").clientWidth;
    starbg.height = document.getElementById("home-div").clientHeight;
    n = Math.round(60*(Math.pow(starbg.width*starbg.height/(1920*1080), 0.7)))
    ctx = starbg.getContext("2d");
    ctx.clearRect(0,0, starbg.width, starbg.height);
    let quota = stars.length - n;
    let deleted = false;
    for(i = 0; i < stars.length; i++){
        if(quota > 0){
            if(stars[i].sr <= 0){ 
                stars.splice(i, 1);
                quota--;
                deleted = true;
            }
        }else if(quota < 0){
            stars.push(new Star())
            quota++;
        }
        if(!deleted) stars[i].animate(Date.now()-lastframe);
        deleted = false;
    }
    lastframe = Date.now();
    requestAnimationFrame(update)
}
update();