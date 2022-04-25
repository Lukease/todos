import { Order } from './order'

const main = document.querySelector('.main')
const makeOrder = document.querySelector('.inputText')
const makeOrderButton = document.querySelector('.button')
const radioAll = document.querySelector('.filters__box--all')
const radioDone = document.querySelector('.filters__box--done')
const radioTodo = document.querySelector('.filters__box--todo')
let todos = []

const makeNewOrderBox = () => {
    if (makeOrder.value === '') {
        return
    }

    const newOrder = createOrder(makeOrder.value)

    main.appendChild(newOrder)

    makeOrder.value = ''
}

function createOrder(text) {
    const newOrder = new Order(text)
    const order = newOrder.render()
    const orderText = newOrder.getOrderText()
    const trashButton = newOrder.getTrashButton()
    const editButton = newOrder.getEditButton()
    const editInput = newOrder.getEditInput()
    todos = todos.concat(newOrder)

    orderText.addEventListener('click', () => {

        if (!orderText.classList.contains('strike')) {

            orderText.classList.remove('box__div')
            orderText.classList.add('strike')

            newOrder.setIsDone(true)

            return
        }

        orderText.classList.add('box__div')
        orderText.classList.remove('strike')

        newOrder.setIsDone(false)

    })

    trashButton.addEventListener('click', () => {
        order.remove()
    })

    editButton.addEventListener('click', () => {
        order.remove()

        main.appendChild(editInput)

        editInput.addEventListener('change', event => {
            const editText = editInput.value
            const newOrder = createOrder(editText)

            main.appendChild(newOrder)
            event.target.remove()
        })
    })

    const filteredOrder = (done) => {
        todos
            .filter(todo => todo.getIsDone() === done)
            .map(todo => todo.getOrder())
            .forEach(todo => {
                todo.style.display = 'flex'
            })
    }

    radioTodo.addEventListener('click', () => {
        order.style.display = 'none'
        filteredOrder(false)
    })

    radioAll.addEventListener('click', () => {
        order.style.display = 'flex'
    })

    radioDone.addEventListener('click', () => {
        order.style.display = 'none'
        filteredOrder(true)
    })

    return order
}

makeOrderButton.addEventListener('click', makeNewOrderBox)