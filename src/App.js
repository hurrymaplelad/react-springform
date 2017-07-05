import React, { Component, PureComponent } from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button, Checkbox} from 'react-bootstrap';
import './App.css';

class FormField extends PureComponent {
  getValidationState() {
    return null;
  }

  render() {
    return (
      <FormGroup
         controlId={this.props.controlId}
         validationState={this.getValidationState()}>
         <ControlLabel>{this.props.label}</ControlLabel>
         {
           React.cloneElement(this.props.children, {
             value: this.props.value,
             onChange: this.onChange,
           })
         }
         {this.props.helpText && (
           <HelpBlock>{this.props.helpText}</HelpBlock>
         )}
      </FormGroup>
    );
  }
}

class App extends Component {
  render() {
    return (
      <form style={{padding: '20px'}}>
        <FormField
          value="12"
          label="Email"
          controlId="exampleEmailInput"
          helpText="Validation is based on string length.">
          <FormControl
            type="email"
            placeholder="Enter text"
          />
        </FormField>

        <FormField
          label="Password"
          controlId="exampleInputPassword1">
          <FormControl
            type="password"
            placeholder="Password"
          />
        </FormField>

        <FormField
          label="File Input"
          helpText="Example block-level help text here."
          controlId="exampleInputFile">
          <FormControl
            type="file"
          />
        </FormField>

        <Checkbox checked>
          Check me out
        </Checkbox>

        <Button type="submit">Submit</Button>
      </form>
    );
  }
}

export default App;
