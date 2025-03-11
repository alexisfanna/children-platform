// window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
// require('bootstrap');

import 'bootstrap/js/dist/scrollspy';

import jQuery from 'jQuery';

// import 'bootstrap/js/dist/util';
// import 'popper.js/dist/popper';

// import 'bootstrap/js/dist/tooltip';

(function ($) {

    let $html = $('html');
    let $body = $('body');
    let $window = $(window);
    let $document = $(document);
    let windowHeight = $window.height().toString();
    $html.addClass('js');

    // $('[data-toggle='tooltip']').tooltip();

    /* ***************** */
//    Scroll
    /* ***************** */
    $window.on('load scroll', function () {
        if ($window.scrollTop() > 0) {
            $body
                .removeClass('not-pageScroll')
                .addClass('pageScroll');
        } else {
            $body
                .removeClass('pageScroll')
                .addClass('not-pageScroll');
        }
    });

    $('.back-to-top').click(function () {
        $html.add($body).animate({scrollTop: '0'}, 650);
    });

    $('.nav-link').click(function (e) {
        e.preventDefault();
        let $this = $(this);
        $html.add($body).animate({scrollTop: $($this.attr('href')).offset().top}, 650);
    });

    $(document).ready(function () {

        /* ***************** */
//    Animations
        /* ***************** */

        let animationWatcher = function (animatedElements) {
            animatedElements.forEach(animatedElement => {
                if (animatedElement.isIntersecting) {

                    let $target = $(animatedElement.target);
                    let delay = window.matchMedia('(min-width: 768px)') ? $target.attr('data-animation-delay') : 0;
                    let duration = window.matchMedia('(min-width: 768px)') ? $target.attr("data-animation-duration") : 200;
                    let animationName = window.matchMedia('(min-width: 768px)') ? 'animate__' + $target.attr('data-animation-name') : 'animate__fadeIn';
                    let animationRepeat = $target.is('[data-animation-repeat]') ? $target.is('[data-animation-repeat]') === 'infinite' ? 'infinite' : $target.attr("data-animation-repeat") : '';

                    $target
                        .addClass('animate animate__animated animationend ' + animationName);

                    if (delay !== '') {
                        $target.css('animation-delay', delay + 'ms');
                    }
                    if (duration !== '') {
                        $target.css('animation-duration', duration + 'ms');
                    }
                    if (animationRepeat.length > 0) {
                        $target.addClass('animate__' + animationRepeat);
                    }
                }
            });
        }


        // FIRST SLIDE
        let animationObserver = new IntersectionObserver(animationWatcher, {
            root: null,
            rootMargin: window.matchMedia('(min-width: 768px)') ? '0px 0px 0px 0px' : '0% 0% 15% 0%',
            threshold: 0
        });

        document.querySelectorAll('#section-0 .animateMe, .header-site .animateMe').forEach((animatedEl) => {
            animationObserver.observe(animatedEl);
        });

        // OTHER SLIDES
        let animationObserverUnderTheFold = new IntersectionObserver(animationWatcher, {
            root: null,
            rootMargin: window.matchMedia('(min-width: 768px)') ? '0px 0px -35% 0px' : '0% 0% 15% 0%',
            threshold: 0
        });

        document.querySelectorAll('section:not(#section-0) .animateMe').forEach((animatedEl) => {
            animationObserverUnderTheFold.observe(animatedEl);
        });

        // OTHER SLIDES
        let animationObserverUnderText = new IntersectionObserver(animationWatcher, {
            root: null,
            rootMargin: window.matchMedia('(min-width: 768px)') ? '0px 0px 0px 0px' : '0% 0% 15% 0%',
            threshold: 0
        });

        document.querySelectorAll('section:not(#section-0) .animateMeText').forEach((animatedEl) => {
            animationObserverUnderText.observe(animatedEl);
        });

        function navigateToSelectedCountry(element) {
			window.location.href = element.value;
		}

        $('#language-select').on('change', function(){
			window.location.href = $(this).val();
        });

    });
}(jQuery));
