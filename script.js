let quote_hover = document.getElementsByClassName('quote-hover');
for(let e of quote_hover){
    e.addEventListener('mouseover', () => {e.innerHTML = "「" + e.innerHTML + "」";});
    e.addEventListener('mouseout',  () => {e.innerHTML = e.innerHTML.substring(1, e.innerHTML.length-1);});
}
