import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddSalesModal} from './AddSalesModal';

import {EditSalesModal} from './EditSalesModal';

export class Sales extends Component{

    constructor(props){
        super(props);

        this.state={sal:[], addModalShow:false, editModalShow : false}
        
    }
 
    componentDidMount(){
        this.refreshList()
    }

    refreshList(){
        fetch ('https://onboardingwebapplication.azurewebsites.net/api/Sales')
        .then(response=> response.json())
        .then(data=>{
            this.setState({sal:data});
        }
        );
        
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deletecus(salid)
    {
        if(window.confirm('Are you sure ?'))
        {
            fetch('https://onboardingwebapplication.azurewebsites.net/api/Sales/'+salid,{
                method: 'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }
    
    render(){
       
        const {sal, salid, salcusname, salproname, salstoname, saldatesold}=this.state;
        let addModalClose =()=>this.setState({addModalShow: false});
        let editModalClose =()=>this.setState({editModalShow: false});

    return(
        <div>
            <ButtonToolbar>
        <Button varient='primary' className="mt-5"
        onClick={()=> this.setState({addModalShow: true})}
        >New Sale</Button>

        <AddSalesModal
            show={this.state.addModalShow}
            onHide={addModalClose}
            />
    </ButtonToolbar>
        
            <Table className="mt-5" striped bordered hover size="lg">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Store</th>
                        <th>DateSold</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sal.map(sal=>
                        <tr key={sal.SalesId}>
                
                        <td>{sal.CName}</td>
                        <td>{sal.PName}</td>
                        <td>{sal.SName}</td>
                        <td>{sal.DateSold}</td>
                        <td>
<ButtonToolbar>
                         <Button className="mr-2" variant="warning"
                            onClick= {() =>this.setState({editModalShow:true, salid:sal.SalesId, salcusname:sal.CName, salproname:sal.PName, salstoname:sal.PName, saldatesold:sal.DateSold})}
                            >EDIT</Button>

                            <EditSalesModal
                                show ={this.state.editModalShow}
                                onHide={editModalClose}
                          salid={salid}
                                salcusname={salcusname}
                                salproname={salproname}
                                salstoname={salstoname}
                                saldatesold={saldatesold}
                                />
</ButtonToolbar>
                        </td>
                        <td>
<ButtonToolbar>
                            <Button className="mr-2" variant="danger"
                            onClick= {() =>this.deletecus(sal.SalesId)}
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