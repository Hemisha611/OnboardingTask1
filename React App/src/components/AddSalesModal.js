import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';



export class AddSalesModal extends Component{
  constructor(props){
        super(props);

        this.state={cus:[], pro:[], sto:[], snackbaropen: false, snackbarmsg:''};
        this.handleSubmit=this.handleSubmit.bind(this);

    }
    componentDidMount(){
        fetch('https://onboardingwebapplication.azurewebsites.net/api/Customer')
        .then(response=>response.json())
        .then(data=>{
            this.setState({cus:data});
        });
        fetch('https://onboardingwebapplication.azurewebsites.net/api/Product')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pro:data});
        });
        fetch('https://onboardingwebapplication.azurewebsites.net/api/Store')
        .then(response=>response.json())
        .then(data=>{
            this.setState({sto:data});
        });
    }



    snackbarClose=(event) =>{
      this.setState({snackbaropen: false});
    };


    handleSubmit(event){
      event.preventDefault();

     fetch('https://onboardingwebapplication.azurewebsites.net/api/Sales',{
       method:'POST',
       headers:{
         'Accept':'application/json',
         'Content-Type':'application/json'
       },
       body:JSON.stringify({
         SalesId:null,
         CName:event.target.CName.value,
         PName:event.target.PName.value,
         SName:event.target.SName.value,
         DateSold:event.target.DateSold.value
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
          Create Sales
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="DateSold">
                    <Form.Label>DateSold</Form.Label>
                    <Form.Control
                      type="date"
                      name="DateSold"
                      required
                      
                      />
                      </Form.Group>
                      <Form.Group controlId="CName">
                    <Form.Label>Customer</Form.Label>
                    <Form.Control as="select">
                        {this.state.cus.map(cus=>
                            <option key={cus.CustomerId}>{cus.CName}</option>
                            )}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="PName">
                    <Form.Label>Product</Form.Label>
                    <Form.Control as="select">
                        {this.state.pro.map(pro=>
                            <option key={pro.ProductId}>{pro.PName}</option>
                            )}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="SName">
                    <Form.Label>Store</Form.Label>
                    <Form.Control as="select">
                        {this.state.sto.map(sto=>
                            <option key={sto.StoreId}>{sto.SName}</option>
                            )}
                    </Form.Control>
                  </Form.Group>
                  
                
      <Modal.Footer>
        <Button variant="dark" onClick={this.props.onHide}>Cancel</Button>
        <Form.Group>
                  <Button variant="success" type="submit" > Create</Button>
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
