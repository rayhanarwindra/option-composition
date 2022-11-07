<template>
  <div class="options">
    <div class="options__status">
      <div>Status: {{ inputStatus }}</div>
      <div>Operator: {{ operatorStatus }}</div>
    </div>
    <div class="options__calculator calculator">
      <div class="calculator__input">
        <span>{{ inputValue }}</span>
      </div>
      <div
          v-for="(buttonRow, i) in buttons"
          :key="i"
          class="calculator__buttons"
      >
        <div
            v-for="(button, j) in buttonRow"
            :key="j"
            class="calculator__button"
            @click="clickButton(button)"
        >
          <span>{{ button }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const buttons = [
    ['C', '+-', '%', '/'],
    ['7', '8', '9', 'X'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['DEL', '0', '.', '=']
]

const operators = new Set(['+', '-', 'X', '/'])

export default {
  name: 'options-api',
  data () {
    return {
      buttons: buttons,
      inputValue: '0',
      operator: '',
      firstOperand: '',
      expectingNextOperand: false
    }
  },

  computed: {
    inputStatus () {
      return !this.firstOperand ? 'Waiting for first operand' :
          'Waiting for second operand'
    },

    operatorStatus () {
      switch (this.operator) {
        case '+':
          return 'Multiplication'
        case '-':
          return 'Substraction'
        case '/':
          return 'Division'
        case 'X':
          return 'Multiplication'
        default:
          return 'None'
      }
    },

    isNegative () {
      return this.inputValue[0] === '-'
    }
  },

  methods:{
    clickButton (buttonValue) {
      if (this.expectingNextOperand) {
        if (!isNaN(buttonValue)) {
          this.inputValue = buttonValue
          this.expectingNextOperand = false
          return
        }
      }
      if (!isNaN(buttonValue)) {
        this.handleNumberClicked(buttonValue)
        return
      }
      if (operators.has(buttonValue)) {
        this.handleOperatorClicked(buttonValue)
        return
      }
      this.handleOtherButtonClicked(buttonValue)
    },
    handleOtherButtonClicked(value) {
      switch (value) {
        case 'C':
          this.handleClearClicked()
          break
        case '+-':
          this.changeSign()
          break
        case '%':
          this.inputValue = parseFloat(this.inputValue) * 0.01
          break
        case 'DEL':
          this.deleteLastNumber()
          break
        case '.':
          this.handleDecimalClicked()
          break
        case '=':
          this.handleEqualClicked()
          this.firstOperand = ''
          this.operator = ''
          break
      }
    },
    handleNumberClicked(value) {
      if (this.inputValue !== '0') {
        this.inputValue += value
      } else {
        this.inputValue = value
      }
    },
    handleClearClicked() {
      this.inputValue = '0'
      this.expectingNextOperand = false
      this.firstOperand = ''
      this.operator = ''
    },
    deleteLastNumber() {
      if (this.inputValue !== '0') {
        this.inputValue = this.inputValue.length > 1 ?
            this.inputValue.slice(0, this.inputValue.length - 1)
            : '0'
      }
    },
    handleDecimalClicked () {
      this.inputValue += '.'
    },
    handleOperatorClicked (operator) {
      this.operator = operator
      this.expectingNextOperand = true
      this.firstOperand = this.inputValue
    },
    handleEqualClicked () {
      if (this.firstOperand && this.operator) {
        switch (this.operator){
          case '+':
            this.inputValue = parseFloat(this.firstOperand) + parseFloat(this.inputValue)
            break
          case '-':
            this.inputValue = parseFloat(this.firstOperand) - parseFloat(this.inputValue)
            break
          case 'X':
            this.inputValue = parseFloat(this.firstOperand) * parseFloat(this.inputValue)
            break
          case '/':
            if (this.inputValue === '0') {
              this.handleDivisionByZero()
              break
            }
            this.inputValue = parseFloat(this.firstOperand) / parseFloat(this.inputValue)
            break
        }
        this.inputValue = String(this.inputValue)
      }
    },
    handleDivisionByZero() {
      window.alert('Cannot divide by zero')
    },
    changeSign() {
      if (this.isNegative) {
        this.inputValue = this.inputValue.slice(1)
      } else if (this.inputValue !== '0') {
        this.inputValue = '-' + this.inputValue
      }
    }
  }
}
</script>

<style scoped>
.options {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.calculator__input {
  color: white;
  background: #DC5F00;
  border-radius: 12px;
  padding: 8px;
  margin-bottom: 12px;
}
.calculator{
  margin-top: 20px;
}
.calculator__buttons {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.calculator__button {
  text-align: center;
  padding: 16px;
  background: #EEE;
  width: 30px;
  height: 20px;
  border-radius: 12px;
  color: #CF0A0A;
  transition: 0.2s;
}

.calculator__button:hover {
  color: #EEE;
  background: #CF0A0A;
  cursor: pointer;
}

.options__status {
  color: white;
  font-weight: bold;
}

.options__status div {
  margin-top: 5px;
}

</style>
