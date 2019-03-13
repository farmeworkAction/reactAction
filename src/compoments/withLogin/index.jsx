import React from 'react';

const WithLogin = (WithLoginComponent) => {
  return class NewComponent extends React.Component{
    constructor(props){
      super(props);
      this.state={
        name: 'lee',
      }
    }
    componentDidMount(){
      this.setState({
        name: 'jersey',
      })
    }
    render(){
      const { name } = this.state;
      return(
          <div>
              <WithLoginComponent {...this.props} name={name} />
          </div>
      )
    }
  }
};

export default WithLogin;
