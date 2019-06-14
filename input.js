export default class InputHandler {

    constructor() {
        document.addEventListenter('keydown', (event) => {
            alert(event.keyCode);
        })
    }
}