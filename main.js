import {Order} from './order'

const main = document.querySelector('.main')
const makeOrder = document.querySelector('.inputText')
const makeOrderButton = document.querySelector('.button')
const radioAll = document.querySelector('.filters__box--all')
const radioDone = document.querySelector('.filters__box--done')
const radioTodo = document.querySelector('.filters__box--todo')

let orderList = []
let orderListStrike = []
let orderListTodo = []

makeOrderButton.addEventListener('click', makeNewOrderBox)

function makeNewOrderBox() {
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

    orderText.addEventListener('click', event => {

        if (!event.target.classList.contains('strike')) {

            event.target.classList.remove('box__div')
            event.target.classList.add('strike')
            order.setAttribute('is-done', 'true')
            newOrder.setIsDone(true)
            orderListStrike = orderListStrike.concat(newOrder)
            orderListTodo = orderListTodo.filter(order => order.getId() !== newId)

            orderList.forEach(order => {
                if (order.getId !== newId) {

                    return order
                }

                return !order.getIsDone()

            })

            return
        }

        event.target.classList.add('box__div')
        event.target.classList.remove('strike')
        order.setAttribute('is-done', 'false')
        newOrder.setIsDone(false)

        orderListTodo = orderListTodo.concat(newOrder)
        orderListStrike = orderListStrike.filter(order => order.getId() !== newId)

        orderList.forEach(order => {
            if (order.getId() !== newId) {
                return order
            }

            return order.getIsDone()

        })
    })

    orderList = orderList.concat(newOrder)
    orderListTodo = orderListTodo.concat(newOrder)

    trashButton.addEventListener('click', event => {
        event.target.parentNode.parentNode.parentNode.remove()

        orderList = orderList.filter(order => order.id !== newId)
        orderListTodo = orderListTodo.filter(order => order.id !== newId)
        orderListStrike = orderListStrike.filter(order => order.id !== newId)
    })

    editButton.addEventListener('click', event => {
        event.target.parentNode.parentNode.parentNode.remove()

        orderList = orderList.filter(order => order.id !== newId)
        orderListTodo = orderListTodo.filter(order => order.id !== newId)
        orderListStrike = orderListStrike.filter(order => order.id !== newId)

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

radioAll.addEventListener('click', event => {
    document.querySelectorAll('.box').forEach(order => {
        order.style.display = 'flex'
    })
})

radioDone.addEventListener('click', event => {
    document.querySelectorAll('[is-done=true]').forEach(order => {
            order.style.display = 'flex'
        }
    )
    document.querySelectorAll('div.box[is-done=false]').forEach(order => {
        order.style.display = 'none'
    })
})

radioTodo.addEventListener('click', event => {
    document.querySelectorAll('[is-done=false]').forEach(order => {
        order.style.display = 'flex'
    })
    document.querySelectorAll('[is-done=true]').forEach(order => {
        order.style.display = 'none'
    })
})
