# SOAD-project	(GuideMe)

[![Build Status](https://travis-ci.com/venky012/GuideMe.svg?token=a5pFPnEPqqri9dMzjwCe&branch=master)](https://travis-ci.com/venky012/GuideMe)

### Problem

When we visit a new place it's usually not so easy to find a person to guide you through your tour. To understand it in a better way let's see an example how our website will be useful to tourists and business applications. Ravi wants to go to a location but he doesn't have any idea how the location will be so our website will help for those tourists giving the information about a place and list of tourist guides, weather report. 

### Introduction 

GuideMe is a solution to a modern problem concerned with finding a tourist guide. Our site gives you lots of information about a place and helps you to find a guide easily. We get you an experienced local guide from the place you want to visit, thus ensuring you get complete information about that place. Users can read the tourist guide blogs about places, check the reviews & ratings of the guides before booking. 


### Services Consumed

* **Weather API** : to get the weather information of a place for the next 5 days
* **Location API** : To make sure the city names are unique we are using this api.
* **Google calendar API** : To make an event for guides and tourist to notify them
* **Stripe API** : For smooth flow of payments for booking a guide.

### Services Exposed

* **Booking API** : Travel Business applications like redbus, abhibus, makemytrip can use our services to offer a tour+guide combo to the users. Even Hotel business applications like trivago, oyo etc can also use service to offer guides to the tourists who get accommodation in their hotel.
* **Blog API** : Sites that show details of tourist places can use our guide blogs about places and reviews and ratings of the place given by tourists and also recommend other nearby tourist locations.
* **Reviews on places API** : Reviews help people to understand the true experience of a place. So knowing other tourist reviews helps in understanding about the experience about the place. So tourism sites can show our reviews to their users. Also the government can know about defects in the tourist places by looking at our reviews and rectifying them.

### Project and environment setup
```bash
# Setup environment
mkdir GuideMe
cd GuideMe
python -m venv env
# Activate the environment
source ./env/bin/activate

# Clone repository
git clone https://github.com/venky012/GuideMe.git

# go to project folder
cd GuideMe/

# Install the requirement of the project in the virtual environment created 
pip install -r requirements.txt

# you need two terminals to run our project one for running the django server and other for running reactjs server
python manage.py runserver

# in another terminal
cd frontend/

# install the node dependencies
npm install

# start the development server
npm start
```

### Project Files Structure
* **accounts** - contains user model and the user authentication fnctions
* **blog** - contains the models for collecting the reviews.
* **blog_api** - contains the reviews on places 
* **booking** - contains the model and funtions for booking the guide.
* **contact** - contains the model to save the contact queries
* **frontend** - contains the frontend application of the project
* **mock** - contains the mock applications that explains the diifferent exposing services
* **monuments** - contains the information about the places and cities
* **posting** - contains the blog application
* **review_api** - contains the reviews on guides


### Contributors:
- [P Venkatesh](https://github.com/venky012) | S20180010135
- [P Sri Ranga](https://github.com/Pabbisettysriranga) | S20180010125
- [P Vikranth Reddy](https://github.com/vikranthreddyp) | S20180010126
- [S Harshavardhan](https://github.com/harshavardan605) | S20180010151
- [K N D Pavan Srinivas](https://github.com/nivaskambhampati1998) | S20170010062
