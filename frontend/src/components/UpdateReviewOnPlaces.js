import React from 'react';
class UpdateReviewOnPlaces extends React.Component{
    constructor(){
        super();
        this.state={
            author:'',
            place:'',
            details:'',
            review:''
        }
        this.changeHandler=this.changeHandler.bind(this);
        this.submitForm=this.submitForm.bind(this);
    }

    // Input Change Handler
    changeHandler(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    // Submit Form
    submitForm(){
        var id=this.props.match.params.id;
        fetch('http://127.0.0.1:8000/reviewOnPlaces/'+id+'/',{
            method:'PUT',
            body:JSON.stringify(this.state),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response=>response.json())
        .then((data)=>console.log(data));
    }

    fetchData(){
        var id=this.props.match.params.id;
        fetch('http://127.0.0.1:8000/reviewOnPlaces/'+id)
        .then(response=>response.json())
        .then((data)=>{
            this.setState({
                author:data.author,
                place:data.place,
                details:data.details,
                review:data.review
            });
        });
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){
        return (
            <table className="table table-bordered" style={{marginTop:'100px'}}>
                <tbody>
                    {/* <tr>
                        <th>Tourist</th>
                        <td>
                            <input value={this.state.author} name="author" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr> */}
                    <tr>
                        <th>Place</th>
                        <td>
                            <input value={this.state.place} name="place" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>Details</th>
                        <td>
                            <input value={this.state.details} name="details" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <th>Review</th>
                        <td>
                            <input value={this.state.review} name="review" onChange={this.changeHandler} type="text" className="form-control" />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <input type="submit" onClick={this.submitForm} className="btn btn-dark" />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default UpdateReviewOnPlaces;