import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddStoreModal} from './AddStoreModal';

import {EditStoreModal} from './EditStoreModal';


export class Store extends Component{

    constructor(props){
        super(props);
        this.state={sto:[], addModalShow:false, editModalShow : false}
    }
 
    componentDidMount(){
        this.refreshList()
    }

    refreshList(){
        fetch ('https://onboardingwebapplication.azurewebsites.net/api/Store')
        .then(response=> response.json())
        .then(data=>{
            this.setState({sto:data});
        }
        );
        
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deletesto(stoid)
    {
        if(window.confirm('Are you sure ?'))
        {
            fetch('https://onboardingwebapplication.azurewebsites.net/api/Store/'+stoid,{
                method: 'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }
    
    render(){
       
        const {sto, stoid, stoname, stoaddress}=this.state;
        let addModalClose =()=>this.setState({addModalShow: false});
        let editModalClose =()=>this.setState({editModalShow: false});
       

    return(
        <div>
            <ButtonToolbar>
        <Button varient='primary' className="mt-5"
        onClick={()=> this.setState({addModalShow: true})}
        >New Store</Button>

        <AddStoreModal
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
                    {sto.map(sto=>
                        <tr key={sto.StoreId}>
                        <td>{sto.SName}</td>
                        <td>{sto.SAddress}</td>
                        <td>
<ButtonToolbar>
                         <Button className="mr-2" variant="warning"
                            onClick= {() =>this.setState({editModalShow:true, stoid:sto.StoreId, stoname:sto.SName, stoaddress:sto.SAddress})}
                            >EDIT</Button>

                            <EditStoreModal
                                show ={this.state.editModalShow}
                                onHide={editModalClose}
                                stoid={stoid}
                                stoname={stoname}
                                stoaddress={stoaddress}
                                />
</ButtonToolbar>
                        </td>
                        <td>
<ButtonToolbar>

                    <Button className="mr-2" variant="danger"
                            onClick= {() =>this.deletesto(sto.StoreId)}
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