
class Calculator {
    constructor(display, stack) {
        this.display = display
        this.stack = stack
        this.reset()
    }

    reset() {
        this.current = ''
        this.previous = ''
        this.operation = undefined
    }

    delete() {
        // slice the current value from index 0 all the way to one from the end 
        this.current = this.current.toString().slice(0, -1)
    }

    appendNumber(number) {
        // check to allow just one dezimal point in a number
        if (number === '.' && this.current.includes('.')) return
        if (this.current.length > 9) return
        this.current = this.current.toString() + number.toString()
    }

    chooseOperation(operation) {
        // check for current value before addidn an operator
        if (this.current === '') return
        // do the computation if we have a current and previous number already
        if (this.previous !== '') {
            this.compute()
        }
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }

    compute() {
        let computation
        const previousNum = parseFloat(this.previous)
        const currentNum = parseFloat(this.current)
        // check for previous and current number , which are required for computing
        if (isNaN(previousNum) || isNaN(currentNum)) return
        switch (this.operation) {
            case '+':
                computation = previousNum + currentNum
                break
            case '-':
                computation = previousNum - currentNum
                break
            case 'x':
                computation = previousNum * currentNum
                break
            case '/':
                computation = previousNum / currentNum
                break
            default:
                return
        }
        this.current = computation
        this.operation = undefined
        this.previous = ''
    }

    // helper function to add comas to number
    getDisplayNumber(number) {
        // parse the number to a string so we can split it to number and dezimal number
        const stringNumber = number.toString()
        //intiger part befor the dezimal point
        const integerNum = parseFloat(stringNumber.split('.')[0])
        // dezimal part after the dezimal point
        const dezimalnum = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerNum)) {
            integerDisplay = ''
        } else {
            // add commas, {maximumFractionDigits: 0} ====> means there can never be any dezimal places after this value when it gets converted to a string with commas
            integerDisplay = integerNum.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (dezimalnum != null) {
            return `${integerDisplay}.${dezimalnum}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.display.innerText = this.getDisplayNumber(this.current)
        if (this.operation != null) {
            this.stack.innerText = `${this.getDisplayNumber(this.previous)} ${this.operation}`
        } else {
            this.stack.innerText = ''
        }

    }
}

const numbers = document.querySelectorAll('[data-number]')
const operators = document.querySelectorAll('[data-operation]')
const equal = document.querySelector('[data-equals]')
const deletebtn = document.querySelector('[data-deletebtn]')
const reset = document.querySelector('[data-reset]')
const display = document.getElementById('display')
const stack = document.getElementById('stack')

const calculator = new Calculator(display, stack)

numbers.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
    })
})

operators.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
    })
})

equal.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

reset.addEventListener('click', () => {
    calculator.reset()
    calculator.updateDisplay()
})

deletebtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})