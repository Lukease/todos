import { v4 as uuidv4 } from 'uuid'

export class Order {
    #text
    #isDone = false
    #id = uuidv4()
    #ref
    #orderText
    #trashButton
    #boxButtons
    #editButton
    #editInput

    constructor(text) {
        this.#text = text
    }

    render() {
        const order = document.createElement('div')

        order.classList.add('box')

        const orderBox = document.createElement('div')

        orderBox.classList.add('box__text')
        order.appendChild(orderBox)

        const orderText = document.createElement('p')

        orderText.classList.add('box__div')
        this.#orderText = orderText
        orderBox.appendChild(orderText)
        orderText.innerHTML = this.#text

        const boxButtons = document.createElement('span')

        orderBox.appendChild(boxButtons)
        this.#boxButtons = boxButtons

        const trashButton = document.createElement('button')

        trashButton.classList.add('fa-solid', 'fa-trash')
        this.#trashButton = trashButton

        const editButton = document.createElement('button')

        editButton.classList.add('fa-solid', 'fa-pen')
        boxButtons.appendChild(editButton)
        boxButtons.append(trashButton, editButton)
        this.#editButton = editButton

        const editInput = document.createElement('input')

        editInput.classList.add('box')
        this.#editInput = editInput

        this.#ref = order

        return order
    }

    getTrashButton() {
        return this.#trashButton
    }

    getEditButton() {
        return this.#editButton
    }

    getEditInput() {
        return this.#editInput
    }

    getOrderText() {
        return this.#orderText
    }

    getIsDone() {
        return this.#isDone
    }

    setIsDone(value) {
        this.#isDone = value
    }

    getId() {
        return this.#id
    }
}