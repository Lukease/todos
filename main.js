import { Order } from './order'

const main = document.querySelector('.main')
const makeOrder = document.querySelector('.inputText')
const makeOrderButton = document.querySelector('.button')
const radioAll = document.querySelector('.filters__box--all')
const radioDone = document.querySelector('.filters__box--done')
const radioTodo = document.querySelector('.filters__box--todo')

const makeNewOrderBox = () =>{
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
    const newId = newOrder.getId()
    const orderText = newOrder.getOrderText()
    const trashButton = newOrder.getTrashButton()
    const editButton = newOrder.getEditButton()
    const editInput = newOrder.getEditInput()

    order.setAttribute('is-done', newOrder.getIsDone())
    order.setAttribute('todo-id', newId)
    order.setAttribute('text', text)

    orderText.addEventListener('click', () => {

        if (!orderText.classList.contains('strike')) {

            orderText.classList.remove('box__div')
            orderText.classList.add('strike')
            order.setAttribute('is-done', 'true')
            newOrder.setIsDone(true)

            return
        }

        orderText.classList.add('box__div')
        orderText.classList.remove('strike')
        order.setAttribute('is-done', 'false')
        newOrder.setIsDone(false)

    })

    trashButton.addEventListener('click', () => {
        trashButton.parentNode.parentNode.parentNode.remove()

    })

    editButton.addEventListener('click', () => {
        editButton.parentNode.parentNode.parentNode.remove()

        main.appendChild(editInput)

        editInput.addEventListener('change', event => {
            const editText = editInput.value
            const newOrder = createOrder(editText)

            main.appendChild(newOrder)
            event.target.remove()
        })
    })

    return order
}

makeOrderButton.addEventListener('click', makeNewOrderBox)

radioAll.addEventListener('click', () => {
    document.querySelectorAll('.box').forEach(order => {
        order.style.display = 'flex'
    })
})

radioDone.addEventListener('click', () => {
    document.querySelectorAll('[is-done=true]').forEach(order => {
            order.style.display = 'flex'
        }
    )
    document.querySelectorAll('div.box[is-done=false]').forEach(order => {
        order.style.display = 'none'
    })
})

radioTodo.addEventListener('click', () => {
    document.querySelectorAll('[is-done=false]').forEach(order => {
        order.style.display = 'flex'
    })
    document.querySelectorAll('[is-done=true]').forEach(order => {
        order.style.display = 'none'
    })
})