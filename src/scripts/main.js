requirejs.config({
    baseUrl: 'libs',
    paths: {
        async: 'requirejs/async',
        jquery: 'jquery/jquery-2.1.1.min',
        materialize: 'materialize-src/js/bin/materialize',
        hammerjs: 'materialize-src/js/hammer.min',
        easing: 'materialize-src/js/jquery.easing.1.3',
        //ScrollMagic: 'scrollmagic/scrollmagic/minified/ScrollMagic.min',
        ScrollMagic: 'scrollmagic/scrollmagic/minified/ScrollMagic.min',
        spin: 'spin.js/spin.min',
        owl: 'owl-carousel/owl.carousel.min',
        masonry: 'masonry/dist/masonry.pkgd.min',
        instansive: 'instansive/instansive.min',
        wow: 'wow/wow.min',
        sticky: 'sticky/jquery.sticky',
        ajaxchimp: 'ajaxchimp/jquery.ajaxchimp.min'
    }
});

requirejs([
    'jquery',
    'materialize',
    'hammerjs',
    'easing',
    'ScrollMagic',
    'spin',
    'owl',
    'masonry',
    'instansive',
    'wow',
    'sticky',
    'ajaxchimp',
    'scripts/sauce.js',
    'scripts/map-style.js'
], function($, materialize, hammer, easing, ScrollMagic, spin, owl, masonry, instansive, wow, sticky, ajaxchimp, sauce, map) {
    // ...
});


/*
 <!--<script src="libs/spin.js/spin.min.js"></script>-->
 <!--<script src="https://maps.googleapis.com/maps/api/js"></script>
 <script src="libs/jquery/jquery-2.1.1.min.js"></script>
 <script src="libs/materialize-src/js/bin/materialize.min.js"></script>
 <script src="libs/owl-carousel/owl.carousel.min.js"></script>
 <script src="libs/masonry/dist/masonry.pkgd.min.js"></script>
 <script src="libs/instansive/instansive.min.js"></script>
 <script src="libs/scrollmagic/scrollmagic/minified/ScrollMagic.min.js"></script>
 <script src="libs/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js"></script>
 <script src="libs/wow/wow.min.js"></script>
 <script src="libs/sticky/jquery.sticky.js"></script>
 <script src="libs/ajaxchimp/jquery.ajaxchimp.min.js"></script>
 <script src="scripts/config.js"></script> <script src="scripts/sauce.js"></script>
 <script src="scripts/map-style.js"></script>-->
 */