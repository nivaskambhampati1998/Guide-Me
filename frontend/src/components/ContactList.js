import React from 'react';
import { Link } from 'react-router-dom';

class ContactList extends React.Component{
    constructor(){
        super();
        this.state={
            data:[]
        };
    }

    fetchData(){
        fetch('http://127.0.0.1:8000/contact/')
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                data:data
            });
        });
    }

    componentDidMount(){
        this.fetchData();
    }

    deleteData(id){
        fetch('http://127.0.0.1:8000/contact/'+id+'/',{
            method:'DELETE',
            body:JSON.stringify(this.state),
        })
        .then(response=>response)
        .then((data)=>{
            if(data){
                this.fetchData();
            }
        });
    }

    render(){
        const reviewData=this.state.data;
        const rows=reviewData.reverse().map((review)=>
            <tr key={review.id}>
                <td>{review.name}</td>
                <td>{review.email}</td>
                <td>{review.subject}</td>
                <td>{review.message}</td>
                <td>
                    <a href={"mailto:"+ review.email+"?subject=Re: "+review.subject} className="btn btn-info mr-2">Reply</a>
                    <button onClick={()=>this.deleteData(review.id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
        return (
            <table className="table table-bordered" style={{marginTop:'100px'}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Action</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
    
}

export default ContactList;