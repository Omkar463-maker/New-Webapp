class Calculator {
    constructor(previoustextElement, currenttextElement){
        this.previoustextElement = previoustextElement
        this.currenttextElement = currenttextElement
        this.clear()
    }
    clear(){
      this.currentOperand = ""
      this.previousOperand = ""
      this.operation = undefined  
    }
    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1)
    }
    append(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand + number
    }

    chooseops(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation){
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '/':
                computation = prev / curr
                break
            case '*':
                computation = prev * curr
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updisplay() {
        this.currenttextElement.innerText = this.currentOperand
        this.previoustextElement.innerText = this.previousOperand
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const allclearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previoustextElement = document.querySelector('[data-previous]')
const currenttextElement = document.querySelector('[data-current]')


const calculator = new Calculator(previoustextElement, currenttextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.append(button.innerText)
        calculator.updisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseops(button.innerText)
        calculator.updisplay()
    })
})

equalButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updisplay()
})

allclearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updisplay()
})