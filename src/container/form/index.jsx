import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this._onNameChanged = this._onFieldChange.bind(this, 'name');
    this._onPasswordChanged = this._onFieldChange.bind(this , 'password');
  }

  _onFieldChange (field, event) {
    console.log(`${ field } changed to ${ event.target.value }`);
  }

  render () {
    return (
        <form>
            <input onChange={this._onNameChanged} />
            <input onChange={this._onPasswordChanged} />
        </form>
    );
  }

}


export default Form;
