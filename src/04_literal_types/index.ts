// String Literal Types

// Easing представлен в 3х значениях 
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === "ease-in") {
      console.log(easing)
    } else if (easing === "ease-out") {
      console.log(easing)
    } else if (easing === "ease-in-out") {
      console.log(easing)
    } else {
      console.log('no easing')
    }
  }
};
let button = new UIElement();
button.animate(0, 0, "ease-in"); // ease-in
// button.animate(0, 0, "uneasy"); // Argument of type '"uneasy"' is not assignable to parameter of type 'Easing'.


// Numeric Literal Types

function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
  return (Math.floor(Math.random() * 6) + 1) as 1 | 2 | 3 | 4 | 5 | 6;
}

const result = rollDice();
console.log(result) // 5


// Boolean Literal Types

interface ValidationSuccess {
  isValid: true;
  reason: null;
};

interface ValidationFailure {
  isValid: false;
  reason: string;
};

type ValidationResult =
  | ValidationSuccess
  | ValidationFailure;