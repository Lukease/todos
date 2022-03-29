const main = document.querySelector('.main')
const makeOrder = document.querySelector('.inputText')
const button = document.querySelector('.button')
const radioAll = document.querySelector('.filters__box--all')
const radioDone = document.querySelector('.filters__box--done')
const radioTodo = document.querySelector('.filters__box--todo')

let orderList = []
let orderListStrike = []
let orderListTodo = []

makeOrder.placeholder = 'order name'

button.addEventListener('click', makeNewOrderBox)

function makeNewOrderBox(event) {
    if (makeOrder.value === '') {
        return
    }

    const newOrder = createOrder(makeOrder.value)
    main.appendChild(newOrder)

    makeOrder.value = ''

    console.log(orderList)
}

function createOrder(text) {
    const order = document.createElement('div')
    const newId = Date.now().toString()
    order.setAttribute('todo-id', newId)
    order.setAttribute('is-done', 'false')
    order.classList.add('box')

    const orderBox = document.createElement('div')
    orderBox.classList.add('box__text')
    order.appendChild(orderBox)

    const orderText = document.createElement('p')
    orderText.classList.add('box__div')
    orderBox.appendChild(orderText)
    orderText.innerHTML = text

    orderText.addEventListener('click', event => {
        if (event.target.className === 'box__div') {
            event.target.style.textDecoration = 'line-through'
            order.setAttribute('is-done', 'true')

            orderListStrike = orderListStrike.concat({
                text: text,
                isDone: true,
                id: newId
            })
            console.log(orderListStrike, 'list: done')

            orderListTodo = orderListTodo.filter(order => order.id !== newId)
            console.log(orderListTodo, 'list : todo')

            orderList = orderList.map(order => {
                if (order.id !== newId) {
                    return order
                }

                return {
                    ...order,
                    isDone: !order.isDone
                }
            })

            console.log(orderList, 'list: all')
        }
    })

    const newButtons = createButtons(newId)
    orderBox.appendChild(newButtons)

    orderList = orderList.concat({
        text: text,
        isDone: false,
        id: newId
    })

    orderListTodo = orderListTodo.concat({
        text: text,
        isDone: false,
        id: newId
    })

    return order
}

function createButtons(id) {
    const boxButtons = document.createElement('span')

    const trashButton = document.createElement('button')
    trashButton.classList.add('fa-solid', 'fa-trash')
    boxButtons.appendChild(trashButton)

    trashButton.addEventListener('click', event => {
        console.log('delete', id)
        event.target.parentNode.parentNode.parentNode.remove()

        orderList = orderList.filter(order => order.id !== id)
        console.log(orderList, 'list: all')
        orderListTodo = orderListTodo.filter(order => order.id !== id)
        console.log(orderListTodo, 'list : todo')
        orderListStrike = orderListStrike.filter(order => order.id !== id)
        console.log(orderListStrike, 'list: done')
    })

    const editButton = document.createElement('button')
    editButton.classList.add('fa-solid', 'fa-pen')
    boxButtons.appendChild(editButton)
    boxButtons.append(trashButton, editButton)

    editButton.addEventListener('click', event => {
        event.target.parentNode.parentNode.parentNode.remove()

        orderList = orderList.filter(order => order.id !== id)
        orderListTodo = orderListTodo.filter(order => order.id !== id)
        orderListStrike = orderListStrike.filter(order => order.id !== id)

        const editInput = document.createElement('input')
        editInput.classList.add('box')

        main.appendChild(editInput)

        editInput.addEventListener('change', event => {
            const editText = editInput.value
            const newOrder = createOrder(editText)
            main.appendChild(newOrder)

            event.target.remove()
        })
    })

    return boxButtons
}

radioAll.addEventListener('click', event => {
    document.querySelectorAll('.box').forEach(order => {
        order.style.display='flex'
    })
})

radioDone.addEventListener('click', event => {
    document.querySelectorAll('[is-done=true]').forEach(order =>{
            order.style.display='flex'
    }
        )
    document.querySelectorAll('[is-done=false]').forEach(order => {
        order.style.display= 'none'
    })
})

radioTodo.addEventListener('click', event => {
    document.querySelectorAll('[is-done=false]').forEach(order =>{
        order.style.display='flex'
    })
    document.querySelectorAll('[is-done=true]').forEach(order =>{
        order.style.display= 'none'
    })
})