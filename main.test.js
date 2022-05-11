import { makeNewOrderBox, todos } from './main.js'
import $ from 'jquery'

const body = `<div class="main"> 
  <label class="main__orderList">
    <input class="inputText" type="text" placeholder = 'order name' />
    <button class="button">Make new order</button>
  </label>
  <label class="main__filters">
    <span>
      Your filters:
    </span>
    <div class="filters__box">
      <input type="radio" name="filter" checked class="filters__box--all"/>All
      <input  type="radio" name="filter" class="filters__box--done" />Done
      <input  type="radio" name="filter" class="filters__box--todo" /> TODO
    </div>
  </label>
</div>`

describe('todo app', () => {

    beforeEach(() => {
        $('body').append(body)
    })

    afterEach(() => {
        $('body').empty()
    })

    test('should create new order', () => {
        expect(true).toBe(true)
    })

    describe('create todo', () => {

        test('should create new order', () => {
            const orderText = 'milk'

            $('.inputText').val(orderText)
            makeNewOrderBox()

            expect($('.main').children().hasClass('box')).toBeTruthy()
            expect($('.inputText').val()).toBe('')
            expect($('.box__div').text()).toBe(orderText)
            expect(todos.length).toBe(1)
        })

        test('shouldnt create new order', () => {
            $('.inputText').val('')
            makeNewOrderBox()

            expect($('.main').children().hasClass('box')).toBeFalsy()
        })

        test('should create buttons', () => {
            $('.inputText').val('milk')
            makeNewOrderBox()

            expect($('span').children().hasClass('trash')).toBeTruthy()
            expect($('span').children().hasClass('edit')).toBeTruthy()
        })

    })

    describe('todo utils', () => {

        test('should delete order', () => {
            $('.inputText').val('milk')
            makeNewOrderBox()
            $('.trash').trigger('click')

            expect($('.main').children().hasClass('box')).toBeFalsy()
        })

        test('should strike text', () => {
            $('.inputText').val('milk')
            makeNewOrderBox()
            $('.box__div').trigger('click')

            const firstClick = $('.box__div').hasClass('strike')

            $('.box__div').trigger('click')

            const secondClick = $('.box__div').hasClass('strike')

            expect(firstClick).toBeTruthy()
            expect(secondClick).toBeFalsy()
        })

        test('should edit order', () => {
            $('.inputText').val('milk')
            makeNewOrderBox()
            $('.edit').trigger('click')

            const deleteOrder = $('.main').children().hasClass('box')
            const input = $('.main').children().hasClass('box__input')
            const editOrderText = 'milk second'

            $('.box__input').val(editOrderText)
            $('.box__input').trigger('change')

            expect(deleteOrder).toBeFalsy()
            expect(input).toBeTruthy()
            expect($('.box__div').text()).toBe(editOrderText)
        })

        describe('filters tests', () => {

            test('should filter orders', () => {
                $('.inputText').val('milk')
                makeNewOrderBox()
                $('.inputText').val('eggs')
                makeNewOrderBox()
                $('.inputText').val('pizza')
                makeNewOrderBox()

                $('.box__div:eq(0)').trigger('click')
                $('.box__div:eq(1)').trigger('click')

                const firstOrderClicked = $('.box__div:eq(0)').hasClass('strike')
                const secondOrderClicked = $('.box__div:eq(1)').hasClass('strike')
                const thirdOrderClicked = $('.box__div:eq(2)').hasClass('strike')
                const doneFilter = $('.filters__box--done')
                const undoneFilter = $('.filters__box--todo')
                const allFilter = $('.filters__box--all')

                doneFilter.trigger('click')

                const doneFilterClicked = $('.filters__box--done').prop("checked")
                const displayNoneDoneOrder = $('.box:eq(2)').attr('style')

                undoneFilter.trigger('click')

                const todoFilterClicked = $('.filters__box--todo').prop("checked")
                const displayNoneTodoFirstOrder = $('.box:eq(0)').attr('style')
                const displayNoneTodoSecondOrder = $('.box:eq(1)').attr('style')

                allFilter.trigger('click')

                const addFilterClicked = allFilter.prop("checked")
                const allOrderFirst = $('.box:eq(0)').attr('style')
                const allOrderSecond = $('.box:eq(1)').attr('style')
                const allOrderThird = $('.box:eq(1)').attr('style')

                expect(firstOrderClicked).toBeTruthy()
                expect(secondOrderClicked).toBeTruthy()
                expect(thirdOrderClicked).toBeFalsy()
                expect(doneFilterClicked).toBeTruthy()
                expect(displayNoneDoneOrder).toBe('display: none;')
                expect(todoFilterClicked).toBeTruthy()
                expect(displayNoneTodoFirstOrder).toBe('display: none;')
                expect(displayNoneTodoSecondOrder).toBe('display: none;')
                expect(addFilterClicked).toBeTruthy()
                expect(allOrderFirst).toBe('display: flex;')
                expect(allOrderSecond).toBe('display: flex;')
                expect(allOrderThird).toBe('display: flex;')
            })
        })
    })
})

