"use strict";
// String Literal Types
class UIElement {
    animate(dx, dy, easing) {
        if (easing === "ease-in") {
            console.log(easing);
        }
        else if (easing === "ease-out") {
            console.log(easing);
        }
        else if (easing === "ease-in-out") {
            console.log(easing);
        }
        else {
            console.log('no easing');
        }
    }
}
;
let button = new UIElement();
button.animate(0, 0, "ease-in"); // ease-in
// button.animate(0, 0, "uneasy"); // Argument of type '"uneasy"' is not assignable to parameter of type 'Easing'.
// Numeric Literal Types
function rollDice() {
    return (Math.floor(Math.random() * 6) + 1);
}
const result = rollDice();
console.log(result); // 5
;
;
