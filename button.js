document.body.style.backgroundColor = "orange"
class ButtonJs extends HTMLElement {
    constructor() {
        super();
    }
}

customElements.define('button-js', ButtonJs);
var button = new ButtonJs();
button.innerHTML = "<button>Test Button</button>"
document.body.appendChild(button);
