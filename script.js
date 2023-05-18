class Calculator {
    constructor(previousScreenInput, currentScreenInput) {
        this.previousScreenInput = previousScreenInput
        this.currentScreenInput = currentScreenInput
        this.clear()
    }
    clear() {
        this.currentScreen = ''
        this.previous = ''
        this.operation = undefined
    }

    clearCurrent() {
        this.currentScreen = ''
    }

    delete() {
        this.currentScreen = this.currentScreen.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentScreen.includes('.')) return
        this.currentScreen = this.currentScreen.toString() + number.toString()
    }

    chooseOtherOperation(otherOperation) {
        if (this.currentScreen === '') return
        if (otherOperation === '1/x') {
            this.currentScreen = 1 / this.currentScreen
        } else if (otherOperation === 'x²') {
            this.currentScreen = Math.pow(this.currentScreen, 2)
        } else if (otherOperation === '2√x') {
            this.currentScreen = Math.sqrt(this.currentScreen)
        } else if (otherOperation === '%') {
            this.currentScreen = this.currentScreen / 100
        }
    }

    chooseOperation(operation) {
        if (this.currentScreen === '') return
        if (this.previousScreen !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousScreen = this.currentScreen
        this.currentScreen = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousScreen)
        const current = parseFloat(this.currentScreen)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '×':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentScreen = computation
        this.operation = undefined
        this.previousScreen = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0,
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentScreenInput.innerText = this.getDisplayNumber(
            this.currentScreen
        )
        if (this.operation != null) {
            this.previousScreenInput.innerText = `${this.getDisplayNumber(
                this.previousScreen
            )} ${this.operation}`
        } else {
            this.previousScreenInput.innerText = ''
        }
    }

    editSign() {
        this.currentScreen = this.currentScreen * -1
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const operationOtherButtons = document.querySelectorAll(
    '[data-other-operation]'
)
const resultButton = document.querySelector('[data-result]')
const deleteButton = document.querySelector('[data-delete]')
const clearCurrentButton = document.querySelector('[data-clear-current]')
const allClearButton = document.querySelector('[data-all-clear]')
const signButton = document.querySelector('[data-sign]')
const previousScreenInput = document.querySelector('[data-previous-screen]')
const currentScreenInput = document.querySelector('[data-current-screen]')

const calculator = new Calculator(previousScreenInput, currentScreenInput)

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

operationOtherButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOtherOperation(button.innerText)
        calculator.updateDisplay()
    })
})

clearCurrentButton.addEventListener('click', (button) => {
    calculator.clearCurrent()
    calculator.updateDisplay()
})

resultButton.addEventListener('click', (button) => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', (button) => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', (button) => {
    calculator.delete()
    calculator.updateDisplay()
})

signButton.addEventListener('click', (button) => {
    calculator.editSign()
    calculator.updateDisplay()
})
