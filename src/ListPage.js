import React, { Component } from "react";
import "./ListPage.css";
// import { ListGroup } from "reactstrap";
// import { Link } from "react-router-dom";
// import config from "./config";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class ListPage extends Component {
  state = {
    romUrl: ''
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.history.push({ pathname: "/run/" + encodeURIComponent(this.state.romUrl) });
  }

  render() {
    return (
      <div
        className="container ListPage my-4"
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Form inline onSubmit={this.onSubmit.bind(this)}>
              <Input
                className="col-md-10 col-sm-12"
                name="romUrl"
                id="romUrl"
                onChange={e => this.setState({ romUrl: e.target.value})}
                placeholder="Enter the IPFS route or URL of a ROM to start playing"
              />
              <Button className="col-md-2 col-sm-12" disabled={!this.state.romUrl}>Play!</Button>
            </Form>
            
            {/* <ListGroup className="mb-4">
              {Object.keys(config.ROMS).map(key => (
                <Link
                  key={key}
                  to={"/run/" + encodeURIComponent(key)}
                  className="list-group-item"
                >
                  {key}
                  <span className="float-right">&rsaquo;</span>
                </Link>
              ))}
              </ListGroup> */}
            <p>Or, drag and drop a ROM file onto the page.</p>
          </div>
        </div>
      </div>
    );
  }

  handleDragOver = e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  handleDrop = e => {
    e.preventDefault();

    const file = e.dataTransfer.items
      ? e.dataTransfer.items[0].getAsFile()
      : e.dataTransfer.files[0];

    this.props.history.push({ pathname: "/run", state: { file } });
  };
}

export default ListPage;
