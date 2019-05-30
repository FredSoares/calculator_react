import React, {Component} from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

//constante que manipula o estado atual do display 
const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}

export default class Calculator extends Component{

    state = { ...initialState}

    constructor(props){
        super(props)
 
        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }
    //limpa o disaly
    clearMemory(){
        //caso o botao clear for apertado
        this.setState({...initialState})
    }

    //seta a operação a ser efectuada
    setOperation(operation){
        if (this.state.current === 0) {
            this.setState({operation, current:1, clearDisplay:true})
        }else{
            const equals = operation === '=' 
            //pega a operação corrente caso for diferente de igual
            const currentOperation = this.state.operation

            //clona o array dos valores
            const values = {...this.state.values}
            //utilizei o try para prevenir algum erro com a função eval
            try {
                //executa a operação e o resultado fica no indice 0 e o indice zero será zerado
                //podemos também subtituir o eval por um switch ou um if
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (error) {
                //caso der algum erro attribui o valor do estado á possição zero do array
                values[0] = this.state.values[0]
            }
            
            values[1] = 0

            this.setState({
                //imprime o valor resultante da operação
                displayValue: values[0],
                //se operação for igual atribui null ao operation caso contrario pega a operação corrente
                operation: equals ? null : operation,
                //se for digitado igual continuamos mexendo no valor zero caso contrario será no valor 1
                current: equals ? 0 : 1,
                //limpa o display caso a operação for diferente de igual
                clearDisplay: !equals,
                //passamos os valores para serem substituidos no estado


            })
        }
        console.log(operation);
    }

    //adicionar um digito
    addDigit(n){
        //se no displayValue já contem um ponto ingnora a tentativa 
        //de adicionar um ponto e passa para a proxima regra
        if(n === '.' && this.state.displayValue.includes('.')){
            return
        }

        //limpa o display se tiver zero ou for marcado como true
        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay

        //se precisar limpar o display o valor corrente vai ser vazio 
        //se não vai ser o valor do display
        const currentValue = clearDisplay ? '' : this.state.displayValue

        //pega o valor corrente e junta com o proximo valor digitado
        const displayValue = currentValue + n

        //atualizar o estado para que os valors digitados possam aparecer no display 
        this.setState({displayValue, clearDisplay: false})

        if (n !== '.') {
            //guarda o valor do indice do array 
            const i = this.state.current
            //pega o valor que for digitado que é uma string e converte para float
            const newValue = parseFloat(displayValue)
            
            //faz um clone do array e armazena na constante
            const values = [...this.state.values]
            //coloca o valor no indice que estamos utilizando neste caso 1 ou 2
            values[i] = newValue

            //depois de modificar o array adicionamos os valores
            this.setState({values})

            //imprimir no console
            console.log(values)
        }
    } 

    render(){
        //const addDigit = n => this.addDigit(n);
        //const setOperation = op => this.setOperation(op);
        return(
            <div className= "calculator">
                <Display value={this.state.displayValue}/>
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/>
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.addDigit} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}
