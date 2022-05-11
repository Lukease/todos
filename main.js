import { Order } from './order.js'

export let todos = []

export const makeNewOrderBox = () => {
    const text = $('.inputText').val()

    if (text === '') {
        return
    }

    const newOrder = createOrder(text)

    newOrder.appendTo($('.main'))
    $('.inputText').val('')

    return newOrder
}

function createOrder(text) {
    const newOrder = new Order(text)
    const order = newOrder.render()
    const orderText = newOrder.getOrderText()
    const trashButton = newOrder.getTrashButton()
    const editButton = newOrder.getEditButton()
    const editInput = newOrder.getEditInput()

    todos = todos.concat(newOrder)

    editButton.click( event => {
        $(event.target).parents('.box').remove()
        $('<input>').addClass('box__input').appendTo($('.main'))

        $('.box__input').on('change', event => {

            const newOrder = createOrder($('.box__input').val())

            newOrder.appendTo($('.main'))

            $(event.target).remove()
        })
    })

    orderText.on('click', event => {

        if (!$(event.target).hasClass('strike')) {
            $(event.target).addClass('strike')
            newOrder.setIsDone(true)

            return
        }

        if ($(event.target).hasClass('strike')) {
            $(event.target).removeClass('strike')
            newOrder.setIsDone(false)
        }
    })

    trashButton.click( event => {
        $(event.target).parents('.box').remove()
    })

    const filteredOrder = (done) => {
        todos
            .filter(todo => todo.getIsDone() === done)
            .map(todo => todo.getOrder())
            .forEach(todo => {
                $(todo).css('display', 'flex')
            })
    }

    $('.filters__box--todo').click(() => {
        $('.box').css('display', 'none')
        filteredOrder(false)
    })

    $('.filters__box--all').click(() => {
        $('.box').css('display', 'flex')
    })

    $('.filters__box--done').click(() => {
        $('.box').css('display', 'none')
        filteredOrder(true)
    })

    return order
}

$('.button').on('click', makeNewOrderBox)