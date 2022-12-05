let myElm = document.createElement("button");	

myElm.innerText = 'Test';		
myElm.style.color = 'red';		
myElm.style.position = 'absolute';
myElm.style.right = '5%';
myElm.style.bottom = '5%';
myElm.style.zIndex = '1000000';

document.body.appendChild(myElm);
