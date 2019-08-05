var React = require("react");

class HEAD extends React.Component {
  render() {
    return (
      <head>
      	{this.props.children}
          <meta name={"viewport"} content={"width=device-width, initial-scale=1"} />
          <link rel={"stylesheet"} href={"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"} integrity={"sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"} crossOrigin={"anonymous"} />
      	  
      </head>
    );
  }
}

module.exports = HEAD;