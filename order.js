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
        const order = $('<div>').addClass('box').attr('id', this.#id)
        const orderBox = $('<div>').addClass('box__text').appendTo(order)
        const text = $('<div>').addClass('text').appendTo(orderBox)
        const orderText = $('<p>').addClass('box__div').text(this.#text).appendTo(text)
        const boxButtons = $('<span>').appendTo(orderBox)
        const trashButton = $('<button>').addClass('trash').appendTo(boxButtons)
        const editButton = $('<button>').addClass('edit').appendTo(boxButtons)

        this.#boxButtons = boxButtons
        this.#orderText = orderText
        this.#trashButton = trashButton
        this.#editButton = editButton
        this.#ref = order

        return order
    }

    getOrder() {
        return this.#ref
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
}