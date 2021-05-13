import React from 'react';
import { Link } from 'react-router-dom';

class ReviewsOnGuides extends React.Component{
    constructor(){
        super();
        this.state={
            data:[]
        };
    }

    fetchData(){
        fetch('http://127.0.0.1:8000/reviewOnGuides/')
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
        fetch('http://127.0.0.1:8000/reviewOnGuides/'+id+'/',{
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
                <td>{review.guide}</td>
                <td>{review.review}</td>
                <td>{review.rating}</td>
                <td>
                    <Link to={'reviewOnGuides/update/'+review.id} className="btn btn-info mr-2">Update</Link>
                    <button onClick={()=>this.deleteData(review.id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
        return (
            <table className="table table-bordered" style={{marginTop:'100px'}}>
                <thead>
                    <tr>
                        <th>Tourist</th>
                        <th>Guide</th>
                        <th>Review</th>
                        <th>Rating</th>
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

export default ReviewsOnGuides;