var mapStyle = [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "color": Sauce.global.colors.dark() === '#f8a760' ? "#000000" : "#ffffff"
            },
            {
                "invert_lightness": true
            },
            {
                "weight": "0.3"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "invert_lightness": true
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": Sauce.global.colors.dark()
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "color": Sauce.global.colors.dark()
            },
            {
                "lightness": "-20"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "color": Sauce.global.colors.dark() === '#f8a760' ? "#000000" : "#ffffff"
            },
            {
                "gamma": "10.00"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    }
];