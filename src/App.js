import React, { Component, PureComponent } from 'react';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button, Checkbox} from 'react-bootstrap';
import './App.css';

function mergeArrays(dest, source) {
  return (dest || []).concat(source || []);
}

function mergeErrors(dest, source) {
  dest.formErrors = mergeArrays(dest.formErrors, source.formErrors);
  for(const fieldName in source.fieldErrors) {
    dest.fieldErrors[fieldName] = mergeArrays(
      dest.fieldErrors[fieldName],
      source.fieldErrors[fieldName],
    );
  }
}

class ControlledForm extends Component {

  state = {
    processing: false,
    formErrors: [],
    fieldErrors: {},
    values: {
      enforceMin: true,
      email: '123',
    },
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('submitting');

    if (this.validate()) {
      console.log('no errors');
      // - do submit
      // - show server errors
    }
  }

  _hasErrors(errors): boolean {
    const {formErrors, fieldErrors} = errors;
    if (formErrors.length) {
      return true;
    }
    for(const fieldName in fieldErrors) {
      if (fieldErrors[fieldName].length) {
        return true;
      }
    }
    return false;
  }

  validate() {
    const errors = {
      formErrors: [],
      fieldErrors: {},
    };

    const {values} = this.state;
    for(const validator of this.validators) {
      const newErrors = validator(values);
      newErrors && mergeErrors(errors, newErrors);
    }

    this.setState(errors);
    return this._hasErrors(errors);
  }

  fields = {
    email: {},
    enforceMin: {},
  }

  validators = [
    (values) => {
      const minLength = 10;
      if (
        values.enforceMin &&
        values.email &&
        values.email.length < minLength
      ) {
        return {formErrors: [{
          message: `You've chosen to enforce the minimum email length of ${minLength} characters`
        }]};
      }
    }
  ];

  render() {
    const {formErrors} = this.state;
    return (
      <form style={{padding: '20px'}} onSubmit={this.handleSubmit}>
        <FormField
          value="12"
          label="Email"
          controlId="exampleEmailInput"
          helpText="Validation is based on string length.">
          <FormControl
            type="text"
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
        <ControlledForm.FormErrors formErrors={this.state.formErrors} />
      </form>
    );
  }

  static FormErrors({formErrors}) {
    if (!formErrors || !formErrors.length) {
      return null;
    }
    return (
      <FormGroup validationState="error">
        <HelpBlock>{formErrors[0].message}</HelpBlock>
      </FormGroup>
    );
  }
}

class FormField extends PureComponent {

  getValidationState() {
    const {errors} = this.props;
    return errors && errors.length ? 'error' : null;
  }

  render() {
    const {errors} = this.props;
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

         {
           (
             errors && errors.length &&
             <HelpBlock>{errors[0]}</HelpBlock>
           ) || (
             this.props.helpText &&
             <HelpBlock>{this.props.helpText}</HelpBlock>
           )
         }
      </FormGroup>
    );
  }
}

class App extends Component {

  render() {
    return (
      <ControlledForm />
    );
  }
}

export default App;
