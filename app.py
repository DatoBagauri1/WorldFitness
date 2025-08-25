import os
import logging
from flask import Flask, render_template
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Create Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "world-fitness-secret-key")

trainers = [
    { "photo": "gio.jpg" },
    { "photo": "lev.jpg" },
    { "photo": "na.jpg" },
    { "photo": "nk.jpg" },
   
]


# Real World Fitness data from web sources
WORLD_FITNESS_DATA = {
    'name': 'World Fitness • ვორლდ ფიტნესი',
    'phone': '+995 571 03 95 95',
    'address': 'ნავთლუღის 8ა, ისანი მოლი, მე-3 სართული',
    'email': 'worldfitness.ge@gmail.com',
    'hours': 'ორშაბათი-კვირა 7:00-24:00',
    'rating': '8.18',
    'total_reviews': 126,
    'age_restriction': '14 წლამდე არ დაიშვება',
    
    # Real pricing structure from fitpass.ge
    'pricing': {
        'early_month': {
            'period': 'თვის 1-8 რიცხვამდე',
            'price': '70',
            'currency': '₾',
            'type': '1 თვიანი ულიმიტო აბონემენტი'
        },
        'late_month': {
            'period': 'ამჟამინდელი ფასი',
            'price': '110', 
            'currency': '₾',
            'type': '1 თვიანი ულიმიტო აბონემენტი'
        }
    },
    
    # Real services from fitpass.ge (excluding dance as specified)
    'services': [
        {
            'name': 'ფიტნესი',
            'icon': 'zap',
            'description': 'სრული სპორტული დარბაზი თანამედროვე აღჭურვილობით'
        },
        {
            'name': 'აერობიკა', 
            'icon': 'heart',
            'description': 'ენერგიული ჯგუფური ვარჯიშები'
        },
        {
            'name': 'პილატესი',
            'icon': 'activity',
            'description': 'სხეულის ძლიერების და მოქნილობის განვითარება'
        },
        {
            'name': 'Powerlifting',
            'icon': 'target',
            'description': 'ძალისმიერი ვარჯიშები'
        }
    ],
    
    # Real gym images from fitpass.ge
    'gallery_images': [
        'https://nyamie.com/uploads/photos/medium/Entity-lMB0Z6hYyW123UdO.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-GC02zbK0ZayREybB.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-rqMwbUS2YHFwEb6D.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-qbL2aiZMiYjPx0iT.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-oQTDpqwXBl7OgEml.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-KQ6x49fMsYmc3rDI.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-tozMhcwUcIbIQU12.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-AB0dWTumMmc7nLyr.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-RGoaB2mN3PfJAnQG.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-oMCyegVLTCuCnKj5.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-8Kc3zLO1VC87kNu0.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-hM39y9EpjamIdjDW.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-Xr4WcExm5jPW8677.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-jG6aLPO66Np7dg4P.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-GOzKO8xpOatEeH42.jpg',
        'https://nyamie.com/uploads/photos/medium/Entity-FXsLQ0bcmNaavDxD.jpg'
    ],
    
    # Real class schedule from fitpass.ge
    'schedule': {
        'აერობიკა': [
            {'time': '10:00-11:00', 'type': 'ჯგუფური'},
            {'time': '11:00-12:00', 'type': 'ჯგუფური'},
            {'time': '19:00-20:00', 'type': 'ჯგუფური'},
            {'time': '20:00-21:00', 'type': 'ჯგუფური'}
        ],
        'Powerlifting': [
            {'time': 'ინდივიდუალურად', 'type': 'ტრენერთან'}
        ],
        'ფიტნესი': [
            {'time': 'დღის განმავლობაში', 'type': 'თავისუფალი მისვლა/ტრენერთან(ინდივიდუალურად)'}
        ],
        'პილატესი': [
            {'time': 'დღის განმავლობაში', 'type': 'ჯგუფური კლასები'}
        ]
    }
}

def get_current_pricing():
    """Get current pricing based on date"""
    today = datetime.now().day
    
    if today <= 8:
        return WORLD_FITNESS_DATA['pricing']['early_month']
    else:
        return WORLD_FITNESS_DATA['pricing']['late_month']

@app.route('/')
def index():
    """Homepage with hero section and full gym information"""
    current_price = get_current_pricing()
    
    return render_template('index.html', 
                         gym_data=WORLD_FITNESS_DATA,
                         current_pricing=current_price,
                         trainers=trainers,
                         today_date=datetime.now())

@app.route('/services')
def services():
    """Services page"""
    return render_template('index.html', 
                         gym_data=WORLD_FITNESS_DATA,
                         current_pricing=get_current_pricing(),
                         scroll_to='services')

@app.route('/pricing')
def pricing():
    """Pricing page"""
    return render_template('index.html', 
                         gym_data=WORLD_FITNESS_DATA,
                         current_pricing=get_current_pricing(),
                         scroll_to='pricing')

@app.route('/gallery')
def gallery():
    """Gallery page"""
    return render_template('index.html', 
                         gym_data=WORLD_FITNESS_DATA,
                         current_pricing=get_current_pricing(),
                         scroll_to='gallery')

@app.route('/contact')
def contact():
    """Contact page"""
    return render_template('index.html', 
                         gym_data=WORLD_FITNESS_DATA,
                         current_pricing=get_current_pricing(),
                         scroll_to='contact')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
