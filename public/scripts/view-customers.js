document.querySelectorAll('.color').forEach((elem)=>{
    elem.style.background = elem.getAttribute('colorAttr')
})