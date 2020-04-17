import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditStoreModal extends Component{
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
      
           fetch('https://onboardingwebapplication.azurewebsites.net/api/Store',{
             method:'PUT',
             headers:{
               'Accept':'application/json',
               'Content-Type':'application/json'
             },
             body:JSON.stringify({
               StoreId:event.target.StoreId.value,
               SName:event.target.SName.value,
               SAddress:event.target.SAddress.value
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
             this.setState({snackbaropen:true, snackbarmsg:'failed to Update'});
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
              Edit Store
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
                <Row>
                  <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="StoreId">
                        <Form.Label>Store ID</Form.Label>
                        <Form.Control
                          type="text"
                          name="StoreId"
                          required
                          disabled
                          defaultValue={this.props.stoid}
                          />
                          </Form.Group>

                      <Form.Group controlId="SName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="SName"
                          required
                          defaultValue={this.props.stoname}
                          
                          />
                          </Form.Group>
                          <Form.Group controlId="SAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="SAddress"
                          required
                          defaultValue={this.props.stoaddress}
                          />
                      </Form.Group>
                      
                    
          <Modal.Footer>
            <Button variant="dark" onClick={this.props.onHide}>Cancel</Button>
            <Form.Group>
                      <Button variant="success" type="submit"> Edit</Button>
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