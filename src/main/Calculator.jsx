import React, { Component, useState } from "react";
import './Calculator.css';
import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
        //faz o display voltar ao estado inicial
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        }//botao passa para o segundo indice do array, salvando o primeiro indice e limpando display
        else {
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]

            let result;
            if (currentOperation === '+') {
                result = values[0] + values[1];
            } else if (currentOperation === '-') {
                result = values[0] - values[1];
            } else if (currentOperation === '*') {
                result = values[0] * values[1];
            } else if (currentOperation === '/') {
                result = values[0] / values[1];
            } else {
                alert('Operação inválida')
            }
            values[0] = result //esta lógica confere qual operação está sendo utilizada de acordo com o botao
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }
        //aqui eu evito que possa existir dois pontos '.' no valor do display da calculadora 

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        //essa constante retorna ao 0 único sempre que eu iniciar add o número 0, assim evitando 0 à esquerda

        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue) //conversao do valor recebido em string para float
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })

            console.log(values)

        }

    }

    render() {

        return (
            <div className="calculator">
                <Display value={this.state.displayValue}></Display>
                <Button label="AC" click={this.clearMemory} triple></Button>
                <Button label="/" click={this.setOperation} operation></Button>
                <Button label="7" click={this.addDigit}></Button>
                <Button label="8" click={this.addDigit}></Button>
                <Button label="9" click={this.addDigit}></Button>
                <Button label="*" click={this.setOperation} operation></Button>
                <Button label="4" click={this.addDigit}></Button>
                <Button label="5" click={this.addDigit}></Button>
                <Button label="6" click={this.addDigit}></Button>
                <Button label="-" click={this.setOperation} operation></Button>
                <Button label="1" click={this.addDigit}></Button>
                <Button label="2" click={this.addDigit}></Button>
                <Button label="3" click={this.addDigit}></Button>
                <Button label="+" click={this.setOperation} operation></Button>
                <Button label="0" click={this.addDigit} double></Button>
                <Button label="." click={this.addDigit}></Button>
                <Button label="=" click={this.setOperation} operation></Button>
            </div>
        )
    }
}