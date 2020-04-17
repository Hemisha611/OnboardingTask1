import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddCustomerModal} from './AddCustomerModal';

import {EditCustomerModal} from './EditCustomerModal';

export class Customer extends Component{

    constructor(props){
        super(props);
        this.state={cus:[], addModalShow:false, editModalShow : false}
    }
 
    componentDidMount(){
        this.refreshList()
    }

    refreshList(){
        fetch ('https://onboardingwebapplication.azurewebsites.net/api/Customer')
        .then(response=> response.json())
        .then(data=>{
            this.setState({cus:data});
        }
        );
        
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deletecus(cusid)
    {
        if(window.confirm('Are you sure ?'))
        {
            fetch('https://onboardingwebapplication.azurewebsites.net/api/Customer/'+cusid,{
                method: 'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }
    
    render(){
       
        const {cus, cusid, cusname, cusaddress}=this.state;
        let addModalClose =()=>this.setState({addModalShow: false});
        let editModalClose =()=>this.setState({editModalShow: false});

    return(
        <div>
            <ButtonToolbar>
        <Button varient='primary' className="mt-5"
        onClick={()=> this.setState({addModalShow: true})}
        >New Customer</Button>

        <AddCustomerModal
            show={this.state.addModalShow}
            onHide={addModalClose}
            />
    </ButtonToolbar>
        
            <Table className="mt-5" striped bordered hover size="lg">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cus.map(cus=>
                        <tr key={cus.CustomerId}>
                
                        <td>{cus.CName}</td>
                        <td>{cus.CAddress}</td>
                        <td>
<ButtonToolbar>
                         <Button className="mr-2" variant="warning"
                            onClick= {() =>this.setState({editModalShow:true, cusid:cus.CustomerId, cusname:cus.CName, cusaddress:cus.CAddress})}
                            >EDIT</Button>

                            <EditCustomerModal
                                show ={this.state.editModalShow}
                                onHide={editModalClose}
                                cusid={cusid}
                                cusname={cusname}
                                cusaddress={cusaddress}
                                />
</ButtonToolbar>
                        </td>
                        <td>
<ButtonToolbar>
                            <Button className="mr-2" variant="danger"
                            onClick= {() =>this.deletecus(cus.CustomerId)}
                            >DELETE</Button>
                         
</ButtonToolbar>
</td>
                        </tr>
                        )}
                </tbody>
            </Table>
            </div>
    )
    }
}