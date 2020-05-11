import React from 'react'
import AddOption from './AddOption'
import Header from './Header'
import Options from './Options'
import Action from './Action'
import OptionModal from './OptionModal'

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    }
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }))
    }
    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }))
    }
    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length)
        const option = this.state.options[randomNum]
        this.setState(() => ({
            selectedOption: option
        }))
    }
    handleAddOption = (option) => {
        // If user didn't type anything in
        if (!option) {
            return 'Enter valid value to add item'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }

        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }))
    }
    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }))
    }
    // This method fires when the component first gets mounted to the DOM 
    componentDidMount() {
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)

            if (options) {
                this.setState(() => ({options}))
            }
        } catch (e) {
            // Do nothing at all
        }
    }
    // This method is going to fire after the component updates
    // So after the state values changed or the props values changed
    // Have access to this.props and this.states new values
    // Have access to arguments of prevProps and prevState objects
    // JSON.stringify() converts JS object into json string
    // JSON.parse() takes json string and converts it to JS object
    // With localStorage object:
    //  - setItem(key, value) to save the data
    //  - getItem(key) to fetch the data
    //  - removeItem(key) to delete
    componentDidUpdate(prevProps, prevState) {
        // Check to see if there actually is a change in the array
        if (prevState.options.length !== this.state.options.length) {
            // Take JS object and convert it to JSON string
            // Pass in the options array
            const json = JSON.stringify(this.state.options)
            // Set an item in localStore
            // 1st arg: THE KEY
            // 2nd arg: THE VALUE
            localStorage.setItem('options', json)
            console.log('saving data')
        }
    }
    // This method gets fire just when a component gets unmounted from the screen
    componentWillUnmount() {
        console.log('component will unmount')
    }
    render() {
        const subtitle = 'Put your life in the hands of a computer'

        return (
            <div>
                <Header subtitle={subtitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <Options
                        options={this.state.options}
                        handleDeleteOptions={this.handleDeleteOptions}
                        handleDeleteOption={this.handleDeleteOption}
                    />
                    <AddOption
                        handleAddOption={this.handleAddOption}
                    />
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        )
    }
}
