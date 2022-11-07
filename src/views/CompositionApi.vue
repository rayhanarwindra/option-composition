<template>
  <div class="composition">
    <div class="composition__status">
      <div>Status: {{ inputStatus }}</div>
      <div>Operator: {{ operatorStatus }}</div>
    </div>
    <div class="composition__calculator calculator">
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

import { ref, computed } from "vue";

export default {
  setup () {

    const inputValue = ref('0')
    const expectingNextOperand = ref(false)

    const clickButton = (buttonValue) => {
      const operators = new Set(['+', '-', 'X', '/'])
      if (expectingNextOperand.value) {
        if (!isNaN(buttonValue)) {
          inputValue.value = buttonValue
          expectingNextOperand.value = false
          return
        }
      }
      if (!isNaN(buttonValue)) {
        handleNumberClicked(buttonValue)
        return
      }
      if (operators.has(buttonValue)) {
        handleOperatorClicked(buttonValue)
        return
      }
      handleOtherButtonClicked(buttonValue)
    }

    const handleNumberClicked = (buttonValue) => {
      if (inputValue.value !== '0') {
        inputValue.value += buttonValue
      } else {
        inputValue.value = buttonValue
      }
    }

    const operator = ref('')
    const firstOperand = ref('')
    const handleOperatorClicked = (operatorClicked) => {
      operator.value = operatorClicked
      expectingNextOperand.value = true
      firstOperand.value = inputValue.value
    }

    const handleOtherButtonClicked = (value) => {
      switch (value) {
        case 'C':
          handleClearClicked()
          break
        case '%':
          inputValue.value = parseFloat(inputValue.value) * 0.01
          break
        case 'DEL':
          deleteLastNumber()
          break
        case '.':
          handleDecimalClicked()
          break
        case '+-':
          changeSign()
          break
        case '=':
          handleEqualClicked()
          break
      }
    }

    const handleClearClicked = () => {
      inputValue.value = '0'
      expectingNextOperand.value = false
      firstOperand.value = ''
      operator.value = ''
    }

    const deleteLastNumber = () => {
      if (inputValue.value !== '0') {
        inputValue.value = inputValue.value.length > 1 ?
            inputValue.value.slice(0, inputValue.value.length - 1)
            : '0'
      }
    }

    const handleDecimalClicked = () => {
      inputValue.value += '.'
    }

    const handleEqualClicked = () => {
      if (firstOperand.value && operator.value) {
        operateEquation(
            inputValue,
            operator.value,
            firstOperand.value,
            inputValue.value
        )
      }
    }

    const inputStatus = computed(() => {
      return !firstOperand.value ? 'Waiting for first operand' :
          'Waiting for second operand'
    })

    const operatorStatus = computed(() => {
      switch (operator.value) {
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
    })

    const isNegative = computed(() => {
      return this.inputValue[0] === '-'
    })

    const changeSign = () => {
      if (isNegative.value) {
        inputValue.value = inputValue.value.slice(1)
      } else if (inputValue.value !== '0') {
        inputValue.value = '-' + inputValue.value
      }
    }

    const { handleDivisionByZero } = useErrors()
    const operateEquation = () => {
      if (firstOperand.value && operator.value) {
        switch (operator.value){
          case '+':
            inputValue.value = parseFloat(firstOperand.value) + parseFloat(inputValue.value)
            break
          case '-':
            inputValue.value = parseFloat(firstOperand.value) - parseFloat(inputValue.value)
            break
          case 'X':
            inputValue.value = parseFloat(firstOperand.value) * parseFloat(inputValue.value)
            break
          case '/':
            if (inputValue.value === '0') {
              handleDivisionByZero()
              break
            }
            inputValue.value = parseFloat(firstOperand.value) / parseFloat(inputValue.value)
            break
        }
        inputValue.value = String(inputValue.value)
      }
    }

    const buttons = [
      ['C', '+-', '%', '/'],
      ['7', '8', '9', 'X'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '+'],
      ['DEL', '0', '.', '=']
    ]

    return {
      clickButton,
      buttons,
      inputStatus,
      operatorStatus,
      inputValue
    }
  }
}

function useErrors () {

  const handleDivisionByZero = () => {
    window.alert('Cannot divide by zero')
  }

  return {
    handleDivisionByZero
  }
}

</script>

<style scoped>
.composition {
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

.composition__status {
  color: white;
  font-weight: bold;
}

.composition__status div {
  margin-top: 5px;
}
</style>
