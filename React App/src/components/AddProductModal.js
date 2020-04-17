import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddProductModal extends Component{
  constructor(props){
        super(props);


    this.state={snackbaropen: false, snackbarmsg:''};
        this.handleSubmit=this.handleSubmit.bind(this);

    }

    snackbarClose=(event) =>{
      this.setState({snackbaropen: false});
    };


    handleSubmit(event){
      event.preventDefault();

     fetch('https://onboardingwebapplication.azurewebsites.net/api/Product',{
       method:'POST',
       headers:{
         'Accept':'application/json',
         'Content-Type':'application/json'
       },
       body:JSON.stringify({
         ProductId:null,
         PName:event.target.PName.value,
         PPrice:event.target.PPrice.value
       })
       })

      .then(res=>res.json())
      .then((result)=>
      {
        this.setState({snackbaropen:true, snackbarmsg:result});
         //alert(result);
      },
      (error)=>{
       // alert('Failed');
       this.setState({snackbaropen:true, snackbarmsg:'failed to add'});
      }
       
      )
    }

    render(){
        return(
          <div className="container">

            <Snackbar
            anchorOrigin={{vertical:'center', horizontal:'center'}}
            open={this.state.snackbaropen}
            autoHideDuration={3000}
            onClose={this.snackbarClose}

        message={<span id="message-id">{this.state.snackbarmsg}</span>}
        action={[
          <IconButton
            key="close"
            arial-label="Close"
            color="Inherit"
            onClick={this.snackbarClose}>
          </IconButton>
        ]}
        />

<Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="PName">
                    <Form.Label> Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="PName"
                      required
                      
                      />
                      </Form.Group>
                      <Form.Group controlId="PPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="PPrice"
                      required
                      />
                  </Form.Group>
                  
                
      <Modal.Footer>
        <Button className="mr-2"  variant="dark" onClick={this.props.onHide}>Cancel</Button>
        <Form.Group>
                  <Button className="mr-2"  variant="success" type="submit"> Create</Button>
                  </Form.Group>
      </Modal.Footer>
      </Form>
              </Col>
            </Row>
        
      </Modal.Body>
    </Modal>
    </div>
      );
    }
}

