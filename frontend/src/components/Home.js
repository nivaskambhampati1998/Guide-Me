import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';

export class Home extends Component {
  render() {
    return (
      <div>
        <div className="header-text">
          
        </div>
        {/* Header */}
        {/* Page Content */}
        {/* Banner Starts Here */}
        <div id="demo" className="carousel slide" data-ride="carousel">
          <ul className="carousel-indicators">
            <li data-target="#demo" data-slide-to={0} className="active" />
            <li data-target="#demo" data-slide-to={1} />
            <li data-target="#demo" data-slide-to={2} />
          </ul>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="assets/images/slider-image-1-1920x600.jpg" style={{width:'100%'}} width={1100} height={500}/>
              <div className="carousel-caption">
                <h1 style={{color:'black'}}>Book your trip today!</h1>
                <h2></h2>
              </div>   
            </div>
            <div className="carousel-item">
              <img src="assets/images/slider-image-2-1920x600.jpg" style={{width:'100%'}} width={1100} height={500}/>
              <div className="carousel-caption">
                <h1 style={{color:'black'}}>Book your trip today!</h1>
                <h2></h2>
              </div>   
            </div>
            <div className="carousel-item">
              <img src="assets/images/slider-image-3-1920x600.jpg" style={{width:'100%'}} width={1100} height={500}/>
              <div className="carousel-caption">
                <h1 style={{color:'black'}}>Book your trip today!</h1>
                <h2></h2>
              </div>   
            </div>
          </div>
        <a className="carousel-control-prev" href="#demo" data-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </a>
        <a className="carousel-control-next" href="#demo" data-slide="next">
          <span className="carousel-control-next-icon"></span>
        </a>
      </div>
        {/* Banner Ends Here */}
        <div className="latest-products">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-heading" style={{ marginTop: '40px' }}>
                  <h2>Top Rated Guides</h2>
                </div>
              </div>
              <div className="col-md-4">
                <div className="service-item">
                  <img src="https://specials-images.forbesimg.com/imageserve/5d3871cff1176b0008977f70/960x0.jpg?fit=scale" style={{ width:'260px',height:'150px'}} alt="" />
                  <div className="down-content">
                    <h4>Venkatesh</h4>
                    <p className="n-m"><em>"Tour guides lead visitors through tourist attractions and give information about the attractions' natural and cultural significance."</em></p>
                    <a href="/profile/venkatesh123t"><button style={{ backgroundColor: 'red', textAlign: 'center', width: '100px', borderRadius: '10px', borderStyle: 'initial', color: 'white' }}> Book </button></a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="service-item">
                  <img src="https://i.guim.co.uk/img/media/c1a40be9bb16ddac7902147d384d6e3236964721/0_0_3500_2100/master/3500.jpg?width=620&quality=85&auto=format&fit=max&s=5c7b31e1069d0fcdfcf8d2cd640d91cb" style={{ width:'260px',height:'150px'}} alt="" />
                  <div className="down-content">
                    <h4>Ranga</h4>
                    <p className="n-m"><em>"Tour guides lead visitors through tourist attractions and give information about the attractions' natural and cultural significance."</em></p>
                    <a href="/profile/venkatesh123t"><button style={{ backgroundColor: 'red', textAlign: 'center', width: '100px', borderRadius: '10px', borderStyle: 'initial', color: 'white' }}> Book </button></a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="service-item">
                  <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" style={{ width:'260px',height:'150px'}} alt="" />
                  <div className="down-content">
                    <h4>Vikky</h4>
                    <p className="n-m"><em>"Tour guides lead visitors through tourist attractions and give information about the attractions' natural and cultural significance."</em></p>
                    <a href="/profile/venkatesh123t"><button style={{ backgroundColor: 'red', textAlign: 'center', width: '100px', borderRadius: '10px', borderStyle: 'initial', color: 'white' }}> Book </button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="services" style={{ backgroundImage: 'url(assets/images/bg-02.jpg)' }}>
          <div className="latest-products">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="section-heading">
                    <h2>Most Visited Places</h2>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="product-item">
                    <a><img src="media/monuments/Golconda.jpg" alt="" /></a>
                    <div className="down-content" style={{ backgroundColor: '#fff' }}>
                      <h4>Golconda, Hyderabad</h4>
                      <p>Golconda Fort is located in the western part of Hyderabad city and is about 9 km from the Hussain Sagar Lake. </p>
                      <div className="center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <a href="/placedetails/13"><button style={{ backgroundColor: 'red', textAlign: 'center', width: '100px', borderRadius: '10px', borderStyle: 'initial', color: 'white' }}> Book </button></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="product-item">
                    <a><img src="media/monuments/Balaji_Temple.jpg" alt="" /></a>
                    <div className="down-content" style={{ backgroundColor: '#fff' }}>
                      <h4>Balaji Temple, Tirupati</h4>
                      <p>The Tirupati Balaji is one of the most pivotal landmarks of the Hindu mythology, holding a magnificent position in the Chittoor district of Andhra Pradesh.</p>
                      <div className="center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <a href="/placedetails/14"><button style={{ backgroundColor: 'red', textAlign: 'center', width: '100px', borderRadius: '10px', borderStyle: 'initial', color: 'white' }}> Book </button></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="product-item">
                    <a><img src="media/monuments/Marina_place.jpg" alt="" /></a>
                    <div className="down-content" style={{ backgroundColor: '#fff' }}>
                      <h4>Marina beach, Chennai</h4>
                      <p>Marina beach in Chennai along the Bay of Bengal is India's longest and world's second longest beach</p>
                      <div className="center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <a href="/placedetails/15"><button style={{ backgroundColor: 'red', textAlign: 'center', width: '100px', borderRadius: '10px', borderStyle: 'initial', color: 'white' }}> Book </button></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="services" style={{ backgroundImage: 'url(assets/images/other-image-fullscren-1-1920x900.jpg)' }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-heading">
                  <h2>Latest blog posts</h2>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-item">
                  <a href="#" className="services-item-image"><img src="assets/images/blog-1-370x270.jpg" className="img-fluid" alt="" /></a>
                  <div className="down-content">
                    <h4><a href="/blog">A mind that is stretched by a new experience can never go back to its old dimensions.</a></h4>
                    <p style={{ margin: 0 }}> Venktesh &nbsp;&nbsp;|&nbsp;&nbsp; 12/06/2020 10:30 &nbsp;&nbsp;|&nbsp;&nbsp; 114</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-item">
                  <a href="#" className="services-item-image"><img src="assets/images/blog-2-370x270.jpg" className="img-fluid" alt="" /></a>
                  <div className="down-content">
                    <h4><a href="/blog">A mind that is stretched by a new experience can never go back to its old dimensions.</a></h4>
                    <p style={{ margin: 0 }}> Ranga &nbsp;&nbsp;|&nbsp;&nbsp; 12/06/2020 10:30 &nbsp;&nbsp;|&nbsp;&nbsp; 114</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="service-item">
                  <a href="/blog" className="services-item-image"><img src="assets/images/blog-3-370x270.jpg" className="img-fluid" alt="" /></a>
                  <div className="down-content">
                    <h4><a href="">A mind that is stretched by a new experience can never go back to its old dimensions.</a></h4>
                    <p style={{ margin: 0 }}> Vikky &nbsp;&nbsp;|&nbsp;&nbsp; 12/06/2020 10:30 &nbsp;&nbsp;|&nbsp;&nbsp; 114</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="call-to-action">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="inner-content">
                  <div className="row">
                    <div className="col-md-8">
                      <h4>Feel free to contact us anytime.</h4>
                      <p>We try our best to reply you within 24 hours.</p>
                    </div>
                    <div className="col-lg-4 col-md-6 text-right">
                      <a href="/contact" className="filled-button">Contact Us</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Home;