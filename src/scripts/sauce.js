/*!
 * Sauce
 * Project Website: http://sauce.pimmey.com
 * @version 1.0
 * @author Yegor Borisenco <pimmey@pimmey.com>
 */

'use strict';

var Sauce = {
    /*
    * Global functions and variables
    * Useful to have throughout the whole object
    */
    global: {
        // Setting a minimum of 500px for full-height elements
        windowHeight: window.innerHeight < 500 ? 500 : window.innerHeight,

        // Function to determine touch functionality
        isTouch: function isTouch() {
            return (('ontouchstart' in window)
            || (navigator.MaxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0));
        },

        // Function to determine if screen matches medium and down media
        isMediumAndDown: function isMediumAndDown() {
            return window.matchMedia('only screen and (max-width: 992px)').matches;
        },

        // Converting rgb to #
        rgbToHex: function rgbToHex(rgb) {
            var matches = rgb.match(/(\d+)/g),
                r = matches[0],
                g = matches[1],
                b = matches[2];
            rgb = b | (g << 8) | (r << 16);
            return '#' + (0x1000000 + rgb).toString(16).slice(1)
        },

        // Global overlay variable
        overlay: document.getElementById('spinner-overlay'),

        // Global spinner empty object
        spinner: {},

        // Global colors
        colors: {
            dark: function() {
                return Sauce.global.rgbToHex($('#dark-color').css('color'));
            },
            base: function() {
                return Sauce.global.rgbToHex($('#base-color').css('color'));
            }
        },

        // Global tabs
        tabs: $('#menu-tabs'),

        // Navigation type based on body class
        navType: $('body').attr('class').match(/nav-\w+/)[0]
    },

    /*
     * Manually setting heights of some of the elements
     */
    setHeights: function() {
        $('.full-height').height(this.global.windowHeight);
        $('.half-height').height(this.global.windowHeight / 2);
    },

    /*
    * Setting up owl galleries
    * For more information and options visit:
    *
    * Reference: owlcarousel.owlgraphic.com/docs/started-welcome.html
    */
    owl: function() {
        $('.owl-carousel > div').height(this.global.windowHeight);
        $('.owl-carousel').owlCarousel({
            items: 1,
            nav: true,
            navText: [
                '<i class="fa fa-long-arrow-left"></i>',
                '<i class="fa fa-long-arrow-right"></i>'
            ],
            loop: true
        });
    },

    /*
    * Overlay navigation
    */
    navOverlay: function() {
        if (this.global.navType === 'nav-overlay') {
            var navWrapper = $('.nav-overlay-wrapper'),
                navListItems = $('#nav-items').find('li'),
                navIcon = $('.nav-icon'),
                keyCode;

            $('.nav-icon-container').on('click', function() {
                toggleNavClasses();

                if (isNavOpen()) {
                    openNav();
                } else {
                    closeNav();
                }
            });

            // Closing nav on ESC press and on scroll
            $(document).on({
                'keyup': function(e) {
                    keyCode = e.keyCode;
                    if (isNavOpen() && keyCode === 27) {
                        toggleNavClasses();
                        closeNav();
                    }
                },
                'scroll': function() {
                    if (isNavOpen()) {
                        toggleNavClasses();
                        closeNav();
                    }
                }
            });

            // Jumping to a desired section and hiding nav
            navListItems.find('a').on('click', function() {
                setTimeout(function() {
                    if (isNavOpen()) {
                        toggleNavClasses();
                        closeNav();
                    }
                }, 50);
            });
        }

        function openNav() {
            navListItems.css('opacity', 0).show();
            Materialize.showStaggeredList('#nav-items');
        }

        function closeNav() {
            navListItems.hide();
            navListItems.velocity('stop');
        }

        function toggleNavClasses () {
            navIcon.toggleClass('transformed');
            navWrapper.toggleClass('open');
        }

        function isNavOpen() {
            return navWrapper.hasClass('open');
        }
    },

    /*
    * Fixed navigation bar
    */
    navFixed: function() {
        if (this.global.navType === 'nav-fixed') {
            var fixedNav = $('.navbar-fixed'),
                nav = fixedNav.children(),
                oldScrollTop = 0;

            // Hide on scroll down and show on scroll up
            $(window).on('scroll', function() {
                var newScrollTop = $(this).scrollTop();
                if (newScrollTop > oldScrollTop) {
                    nav.removeClass('active');
                } else {
                    nav.addClass('active');
                }
                oldScrollTop = newScrollTop;
            });

            /*
            * Mobile side navigation
            * You can open it with a swipe!
            *
            * Reference: http://materializecss.com/mobile.html
            */
            $('.button-collapse').sideNav({
                closeOnClick: true
            });
        } else {
            return false;
        }
    },

    /*
    * Setting up Materialize tabs
    * This function also handles tabs stickiness (see the next function)
    *
    * Reference: http://materializecss.com/tabs.html
    */
    tabs: function() {
        var tabs = this.global.tabs,
            tabsWrapper = $('#menu-tabs-sticky-wrapper'),
            noSticky = tabsWrapper.length === 0;

        if (noSticky) {
            tabsWrapper = $('#menu-tabs');
        }

        var tabsWrapperOffsetTop = tabsWrapper.offset().top;

        tabs.tabs();

        // If sticky isn't active, don't scroll up on tab click
        // Otherwise do
        if ( ! noSticky) {
            tabs.on('click', function() {
                $('html, body').animate(
                    {
                        scrollTop: tabsWrapperOffsetTop + 1
                    },
                    {
                        duration: 250,
                        easing: 'easeOutCirc'
                    }
                );
            });
        }
    },

    /*
    * Making menu tabs stick to the top.
    * Works only if overlay navigation is active to avoid
    * overlapping with fixed navigation bar.
    *
    * Reference: http://stickyjs.com/
    */
    sticky: function() {
        if (this.global.navType === 'nav-overlay') {
            var tabs = Sauce.global.tabs,
                navIconContainer = $('.nav-icon-container');

            tabs.sticky({
                topSpacing: 0
            });

            // Hiding nav icon, so it doesn't overlap with tabs
            // Valid only for tablets and down
            if (this.global.isMediumAndDown()) {
                tabs.on('sticky-start', function() {
                    navIconContainer.addClass('hidden');
                });
                tabs.on('sticky-end', function() {
                    navIconContainer.removeClass('hidden');
                });
            }

            // Handling the stick/unstick functions
            var controller = new ScrollMagic.Controller();
            var scene = new ScrollMagic.Scene({triggerElement: '#menu + div', triggerHook: 0})
                .addTo(controller);

            scene.on('start', function(e) {
                if (e.scrollDirection === 'FORWARD') {

                    // Unsticks when the next section starts
                    tabs.unstick();

                    // Showing the nav icon
                    navIconContainer.removeClass('hidden');
                } else if (e.scrollDirection === 'REVERSE') {

                    // Sticks, if we're coming back up from the next section
                    tabs.sticky({
                        topSpacing: 0
                    });
                }
            });
        }
    },

    /*
    * Masonry photo gallery
    *
    * Reference: http://masonry.desandro.com/
    */
    masonry: function() {
        $('.masonry').masonry({
            itemSelector: '.masonry .col',
            columnWidth: '.masonry .col',
            percentPosition: true
        });
    },

    /*
    * Materialize datepicker initialization
    *
    * Reference: http://materializecss.com/forms.html#date-picker
    */
    datepicker: function() {
        var datepicker = $('.datepicker');

        datepicker.pickadate({
            selectMonths: true,
            selectYears: 2,
            onClose: function() {
                $(document.activeElement).blur();
                datepicker.blur();
            }
        });
    },

    /*
    * Materialize custom select initialization
    *
    * Reference: http://materializecss.com/forms.html#select
    */
    select: function() {
        $('select').material_select();
    },

    /*
    * Materialize modal initialization
    * This particular is a Bottom Sheet modal
    *
    * Reference: http://materializecss.com/modals.html
    */
    modal: function() {
        $('.modal-trigger').leanModal();
    },

    /*
    * Google map settings
    * Styled with Snazzy.
    *
    * Note: mapStyle variable is taken from scripts/map-style.js
    *
    * References
    * Google maps API: https://developers.google.com/maps/
    * Snazzy: https://snazzymaps.com/
    */
    map: function() {
        var styledMap = new google.maps.StyledMapType(mapStyle, {
                name: "Sauce Map"
            }),

            myLatLng = new google.maps.LatLng(
                config.googleMaps.lat,
                config.googleMaps.lng
            ),

            mapOptions = {
                zoom: config.googleMaps.zoom,
                center: myLatLng,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
                },
                scrollwheel: false,
                draggable: this.global.isTouch() ? false : true
            },

            map = new google.maps.Map(document.getElementById('map'), mapOptions),

            marker = new google.maps.Marker({
                position: myLatLng,
                map: map
            });

        map.mapTypes.set('map_style', styledMap);
        map.setMapTypeId('map_style');
    },

    /*
    * Main spinner on initial load
    *
    * Note: if you want to create your own configuration, make sure you keep the color as it is, i.e.:
    * color: Sauce.global.colors.base()
    *
    * This way you will stick to the site's brand colors
    *
    * Reference: http://fgnass.github.io/spin.js/
    */
    spinner: function() {
        var opts = {
            lines: 5,
            length: 0,
            width: 52,
            radius: 0,
            scale: 0.75,
            corners: 1,
            color: Sauce.global.colors.base(),
            opacity: 0.15,
            rotate: 4,
            direction: 1,
            speed: 1.4,
            trail: 70,
            fps: 20,
            zIndex: 2e9,
            className: 'spinner',
            top: '50%',
            left: '50%',
            shadow: false,
            hwaccel: true,
            position: 'absolute'
        };

        this.global.spinner = new Spinner(opts).spin(this.global.overlay);
    },

    /*
    * A function that handles onload event.
    * It turns off the spinner, unlocks the body and refreshes masonry gallery.
    */
    loaded: function() {
        $(window).on('load', function() {
            Sauce.global.overlay.className = 'disappear';
            Sauce.global.spinner.stop();
            $('body').removeClass('locked');
            Sauce.masonry();
        });
    },

    /*
    * Events stickiness handled by ScrollMagic.
    *
    * Works only with desktop devices for the sake of perfromance,
    * since mobile browsers hate position: fixed
    *
    * Reference: http://scrollmagic.io/docs/index.html
    */
    events: function events() {
        if ( ! this.global.isTouch()) {
            var controller = new ScrollMagic.Controller({
                globalSceneOptions: {
                    triggerHook: 'onLeave'
                }
            });

            var slides = document.getElementsByClassName('event-container'),
                scenes = [],
                windowWidth = window.innerWidth;

            for (var i = 0; i < slides.length; i++) {
                slides[i].style.width = windowWidth + 'px'; // Safari bug fix
                slides[i].style.zIndex = i; // Linux Firefox bug fix

                scenes[i] = new ScrollMagic.Scene({triggerElement: slides[i], duration: -1})
                    .setPin(slides[i])
                    .addTo(controller);

                if (i === slides.length - 1) {
                    scenes[i].on('start', function(e) {
                        if (e.scrollDirection === 'FORWARD') {
                            removePins();
                        } else if (e.scrollDirection === 'REVERSE') {
                            setPins();
                        }
                    });
                }
            }
        }

        function removePins() {
            for (var i = 0; i < slides.length; i++) {
                scenes[i].removePin();
            }
        }

        function setPins() {
            for (var i = 0; i < slides.length; i++) {
                scenes[i].setPin(slides[i]);
            }
        }
    },

    /*
    * Animations with WOW and Animate.css
    *
    * This function also fixes Materialize bug for Safari
    * that prevented datepicker and selects from working properly
    *
    * Reference: http://mynameismatthieu.com/WOW/
    */
    wow: function() {
        if ( ! this.global.isMediumAndDown()) {
            var wow = new WOW({
                callback: function(box) {
                    if (box.className.indexOf('remove-wow') !== -1) {
                        setTimeout(function() {
                            $('.remove-wow').removeClass('slideInLeft').css('-webkit-animation', 'none');
                        }, 1000);
                    }
                }
            });

            wow.init();
        }
    },

    /*
    * Ajax form with email validation.
    * Usage: form.('#form-id');
    */
    form: function(formId) {
        var form = $(formId),
            formFields = form.find('input, textarea, select'),
            submitButton = form.find('button[type=submit]'),
            requiredFields = form.find('input.required, select.required, textarea.required'),
            requiredFieldsLength = requiredFields.length,
            emailField = form.find('input[type=email]'),
            isFormReady = false,
            status = $('#status');

        submitButton.on('click', function(e) {
            e.preventDefault();

            if (isFormReady && ! submitButton.hasClass('disabled')) {
                form.submit();
            } else {
                if ( ! checkRequired()) {
                    Materialize.toast(config.toastMessages.fillInRequiredFields, 5000, 'error');
                }
                if (checkRequired() && ! isEmailValid()) {
                    Materialize.toast(config.toastMessages.enterValidEmail, 5000, 'error');
                }
            }
        });

        form.on('submit', function(e) {
            e.preventDefault();
            submitButton.addClass('disabled');
            submitForm();
        });

        formFields.on('blur', function() {
            setTimeout(function() {
                checkForm();
            }, 250);
        });

        emailField.on('blur', function() {
            var emailFieldValueLength = emailField[0].value.length;
            if ( ! isEmailValid() && emailFieldValueLength > 0) {
                emailField.addClass('invalid').removeClass('valid');
            } else if (isEmailValid() && emailFieldValueLength > 0) {
                emailField.addClass('valid').removeClass('invalid');
            } else if (emailFieldValueLength === 0) {
                emailField.removeClass('valid invalid');
            }
        });

        function checkRequired() {
            for (var i = 0; i < requiredFieldsLength; i++) {
                if (requiredFields[i].value.length === 0) {
                    return false;
                }
            }

            return true;
        }

        function isEmailValid() {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return emailField[0].value.length > 0 && re.test(emailField[0].value);
        }

        function checkForm() {
            if (checkRequired() && isEmailValid()) {
                submitButton.removeClass('disabled');
                isFormReady = true;
            } else {
                submitButton.addClass('disabled');
                isFormReady = false;
            }
        }

        function submitForm() {
            status.show();
            $.ajax({
                url: form.attr('action'),
                data: form.serialize(),
                type: 'POST'
            }).done(function(resp) {
                status.hide();
                if (resp === 'success') {
                    Materialize.toast(config.toastMessages.messageSent, 7500, 'success');
                    formFields.val('').blur();
                    emailField.addClass('disabled');
                    checkForm();
                } else {
                    Materialize.toast(config.toastMessages.somethingWrong + resp, 7500, 'error');
                }
            }).error(function(error) {
                status.hide();
                Materialize.toast(config.toastMessages.somethingWrong + error, 7500, 'error');
            });
        }
    },

    /*
    * Applying smart form rules to the #reserve-form
    */
    reserve: function() {
        this.form('#reserve-form');
    },

    /*
     * Applying smart form rules to the #contact-form
     */
    contact: function() {
        this.form('#contact-form');
    },

    /*
    * Customizing AjaxChimp form
    * Handling the default Slim MailChimp form
    *
    * Reference: https://github.com/scdoshi/jquery-ajaxchimp
    */
    ajaxchimp: function() {
        var mcForm = $('form#mc-embedded-subscribe-form'),
            mcFormInput = $('#mce-EMAIL'),
            mcFormButton = mcForm.find('input[type=submit]');

        // Trying to make it look like nice Materialize input
        mcFormInput
            .on({
                'focus': function() {
                    mcFormInput.next('label').addClass('active');
                },
                'blur': function() {
                    if (mcFormInput[0].value.length === 0) {
                        mcFormInput.next('label').removeClass('active');
                    }
                }
            })
            .attr('placeholder', '')
            .after('<label for="mce-EMAIL">Email</label>')
            .next()
            .andSelf()
            .wrapAll('<div class="input-field"/>')
            .end();

        setTimeout(function() {
            $('label[for=mce-EMAIL]').removeClass('active');
        }, 100);

        // Adding some fanciness to the button as well
        mcFormButton.addClass('btn-large btn-bordered transparent black-text black-border');

        mcForm.ajaxChimp({
            url: $(this).attr('action'),
            callback: function(resp) {
                var message = resp.msg,
                    result = resp.result,
                    dissmissTime = result === 'success' ? 10000 : 5000;
                Materialize.toast(message.replace(/\d - /, ''), dissmissTime, result);
                if (result === 'success') {
                    mcForm.find('input[type=email]').val('');
                    mcForm.find('label').removeClass('active');
                }
            }
        });
    },

    /*
    * A simple call to action button that will just scroll to #intro
    */
    explore: function() {
        $('#explore').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate(
                {
                    scrollTop: $('#intro').position().top
                },
                {
                    duration: 450,
                    easing: 'easeOutCirc'
                }
            );
        });
    },

    /*
    * This function enables a fixed footer on non-touch devices,
    * it detects footer height after the Instagram feed contents are loaded
    * and applies a corresponding margin-bottom to the body
    */
    footer: function() {
        if ( ! Sauce.global.isTouch()) {
            var footer = $('.page-footer'),
                footerHeight = footer.innerHeight(),
                newFooterHeight,
                resizeListener,
                numberOfListens = 0;

            footer.addClass('fixed');

            resizeListener = setInterval(function() {
                footer.resize();
                numberOfListens++;
            }, 300);

            footer.on('resize', function() {
                newFooterHeight = footer.innerHeight();

                if (footerHeight !== newFooterHeight || numberOfListens > 30) {
                    clearInterval(resizeListener);
                    footerHeight = newFooterHeight;
                    $('body').css('margin-bottom', footerHeight);
                }
            });
        }
    },

    /*
    * Functions to call when the DOM is ready
    * They follow a particular order, so don't play around too much :-)
    */
    init: function() {
        this.setHeights();
        this.owl();
        this.navOverlay();
        this.navFixed();
        this.sticky();
        this.tabs();
        this.masonry();
        this.datepicker();
        this.select();
        this.modal();
        this.map();
        this.loaded();
        this.events();
        this.wow();
        this.reserve();
        this.contact();
        this.ajaxchimp();
        this.explore();
        this.footer();
    }
};

/*
* Spinner time! This should be the first thing you see when you open the page
*/
Sauce.spinner();

/*
* And finally, call all the needed functions, when the DOM is ready
*/
$(document).ready(function() {
    Sauce.init();
});