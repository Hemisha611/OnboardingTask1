import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddProductModal} from './AddProductModal';

import {EditProductModal} from './EditProductModal';

export class Product extends Component{

    constructor(props){
        super(props);
        this.state={pro:[], addModalShow:false, editModalShow : false}
    }
 
    componentDidMount(){
        this.refreshList()
    }

    refreshList(){
        fetch ('https://onboardingwebapplication.azurewebsites.net/api/Product')
        .then(response=> response.json())
        .then(data=>{
            this.setState({pro:data});
        }
        );
        
    }
    componentDidUpdate(){
        this.refreshList();
    }

    deletepro(proid)
    {
        if(window.confirm('Are you sure ?'))
        {
            fetch('https://onboardingwebapplication.azurewebsites.net/api/Product/'+proid,{
                method: 'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }


    render(){
       
        const {pro, proid, proname, proprice}=this.state;
        let addModalClose =()=>this.setState({addModalShow: false});
        let editModalClose =()=>this.setState({editModalShow: false});

    return(
        <div>
        <ButtonToolbar>
        <Button varient='primary' className="mt-5"
        onClick={()=> this.setState({addModalShow: true})}
        >New Product</Button>

        <AddProductModal
            show={this.state.addModalShow}
            onHide={addModalClose}
            />
    </ButtonToolbar>
            <Table className="mt-5" striped bordered hover size="lg">
                <thead>
                    <tr>
            
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pro.map(pro=>
                        <tr key={pro.ProductId}>
                        <td>{pro.PName}</td>
                        <td>{pro.PPrice}</td>
                        <td>
        <ButtonToolbar>
                         <Button className="mr-2" variant="warning"
                            onClick= {() =>this.setState({editModalShow:true, proid:pro.ProductId, proname:pro.PName, proprice:pro.PPrice})}
                            >EDIT</Button>

                            <EditProductModal
                                show ={this.state.editModalShow}
                                onHide={editModalClose}
                                proid={proid}
                                proname={proname}
                                proprice={proprice}
                                />
                                
                       
         </ButtonToolbar>  
                        </td>
                        <td>
<ButtonToolbar>
                            <Button className="mr-2" variant="danger"
                            onClick= {() =>this.deletepro(pro.ProductId)}
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