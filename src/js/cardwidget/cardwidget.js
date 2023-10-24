import "./cardwidget.css";
import { definePaymentSystem, validateCardNumber } from "./validate";

export default class CardWidget {
  constructor(widget) {
    this.activePaySystem = false;
    this.widget = document.querySelector(widget);
    this.input = this.widget.querySelector(".input");
    this.imageContainers = this.widget.querySelector(".images").children;

    this.button = this.widget.querySelector(".button");

    this.validateKeyDown = this.validateKeyDown.bind(this);
    this.input.addEventListener("keydown", this.validateKeyDown);

    this.validateInput = this.validateInput.bind(this);
    this.input.addEventListener("input", this.validateInput);

    this.validateCardNumber = this.validateCardNumber.bind(this);
    this.button.addEventListener("click", this.validateCardNumber);
  }

  validateKeyDown(event) {
    if (event.keyCode === 65 && event.ctrlKey) {
      return;
    }

    if (event.keyCode === 13 && !this.button.disabled) {
      this.button.click();
    }

    if (
      ![
        48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8, 13, 46, 37, 39, 35, 36, 17,
        96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
      ].includes(event.keyCode)
    ) {
      event.preventDefault();
    }

    if (
      this.input.value.length === 16 &&
      ![8, 13, 46, 37, 39, 35, 36, 17].includes(event.keyCode)
    ) {
      event.preventDefault();
    }
    if (
      this.input.value.length === 2 &&
      !this.activePaySystem &&
      ![8, 13, 46, 37, 39, 35, 36, 17].includes(event.keyCode)
    ) {
      event.preventDefault();
    }
  }

  validateInput() {
    if (this.input.value.length < 16 && this.input.value.length > 2) {
      this.button.disabled = true;
      this.input.classList.remove("input-card-unchecked");
      this.input.classList.remove("input-card-checked");
    }

    if (this.input.value.length < 2) {
      for (let element of this.imageContainers) {
        element.firstElementChild.classList.add("image-not-active");
      }
      this.button.disabled = true;
      this.activePaySystem = false;
      this.input.classList.remove("input-card-unchecked");
      this.input.classList.remove("input-card-checked");
    }

    if (this.input.value.length === 2) {
      this.button.disabled = true;
      const paySystem = definePaymentSystem(this.input.value);
      switch (paySystem) {
        case "visa":
          this.activePaySystem = true;
          this.imageContainers[0].firstElementChild.classList.remove(
            "image-not-active"
          );
          this.input.classList.remove("input-card-unchecked");
          this.input.classList.remove("input-card-checked");
          break;
        case "mastercard":
          this.activePaySystem = true;
          this.imageContainers[1].firstElementChild.classList.remove(
            "image-not-active"
          );
          this.input.classList.remove("input-card-unchecked");
          this.input.classList.remove("input-card-checked");
          break;
        case "unionpay":
          this.activePaySystem = true;
          this.imageContainers[2].firstElementChild.classList.remove(
            "image-not-active"
          );
          this.input.classList.remove("input-card-unchecked");
          this.input.classList.remove("input-card-checked");
          break;
        case "mir":
          this.activePaySystem = true;
          this.imageContainers[3].firstElementChild.classList.remove(
            "image-not-active"
          );
          this.input.classList.remove("input-card-unchecked");
          this.input.classList.remove("input-card-checked");
          break;
        default:
          this.activePaySystem = false;
          this.input.classList.add("input-card-unchecked");
          this.input.classList.remove("input-card-checked");
          return;
      }
    }

    if (this.input.value.length === 16) {
      this.button.disabled = false;
    }
  }

  validateCardNumber() {
    const result = validateCardNumber(this.input.value);
    if (result) {
      this.input.classList.add("input-card-checked");
    } else {
      this.input.classList.add("input-card-unchecked");
    }
  }
}
