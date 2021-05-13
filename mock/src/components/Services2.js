import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Services2 extends Component{
    constructor(){
        super();
        this.state={
            data:[]
        };
    }

    fetchData(){
        fetch('http://127.0.0.1:8000/reviewOnPlaces/')
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
        fetch('http://127.0.0.1:8000/reviewOnPlaces/'+id+'/',{
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
        const rows=reviewData.map((review)=>
            <tr key={review.id}>
                <td>{review.author}</td>
                <td>{review.place}</td>
                <td>{review.details}</td>
                <td>{review.review}</td>

            </tr>
        );
        return (
        <div>
            <div className="services" style={{backgroundImage:'url(assets/images/mock-2.jpg)', height:"1000px"}}>
                <div className="container">
                <h1 style={{textAlign:"center", color:"#00FFFF"}}> Reviews on Place</h1>
                    <table className="table table-bordered" style={{marginTop:'100px', color:"#00FFFF"}}>
                        <thead>
                            <tr>
                                <th>Tourist</th>
                                <th>Place</th>
                                <th>Details</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                                {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        )
    }
    
}

export default Services2;