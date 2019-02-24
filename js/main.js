//document.addEventListener("DOMContentLoaded",func(){};
//$(document).ready(func(){});
document.addEventListener("DOMContentLoaded", function() {
    'use strict';
    //gobla varibales definations 
    const theTimer = document.getElementById('count');
    var timer = [0, 0, 0, 0];
    var highestBox = 0;
    //browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300;
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced 
    var offsetOpacity = 1200;
    //duration of the top scrolling animation (in ms)
    var scrollDuration = 700;
    //how to use section Edition
    $('.how-to-use .l').each(function() {
        if ($(this).height() > highestBox) {
            highestBox = $(this).height();
        }
    });
    $('.how-to-use .v').height(highestBox);
    var h2 = 0;
    $('.how-to-use .l').each(function() {
        if ($(this).height() > highestBox) {
            highestBox = $(this).height();
        }
    });
    $('.how-to-use .v video').height(highestBox);
    // ===== Scroll to Top ==== 
    $(window).scroll(function() {
        if ($(this).scrollTop() >= 50) { // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200); // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200); // Else fade out the arrow
        }
    });
    $('#return-to-top').click(function() { // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0 // Scroll to top of body
        }, 500);
    });

    //Timer
    function leadingZero(time) {
        if (time < 9) {
            time = '0' + time;
        }
        return time;
    }

    function runTimer() {
        let currentTime = leadingZero(timer[0]) + ':' + leadingZero(timer[1]) + ':' + leadingZero(timer[2]);
        theTimer.innerHTML = currentTime;
        timer[3]++;

        timer[0] = Math.floor((timer[3] / 100) / 60);
        timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
        timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
    }
    setInterval(runTimer, 10);


    //accordian of tests of profile


    //vue js
    //VueCode();

    $('.custom-file-input').on('change', function() {
        let fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    });

});

new Vue({
    el: '#app',
    data: {
        color: 'none',
        o: true,
        o2: true,
        o3: true,
        o4: true,
        o5: true,
        o6: true,
        o7: true,
        bool1: true,
        bool2: false,
        bool3: false,
        up1: true,
        down1: false,
        up2: false,
        down2: true,
        up3: false,
        down3: true,
        up4: false,
        down4: true,
        f1: false,
        f2: false,
        f3: false,
        f4: false,
        msq: true,
        tf: false,
        l1: true,
        l2: false,
        l3: false
    },
    methods: {
        open: function(arg) {
            return arg = !arg;
        }
    },
    computed: {
        change: function() {
            return this.color;
        }
    }
});
$(function() {
    $("#accordion").accordion();
});
$(function() {
    $("#accordion1").accordion();
});
$(function() {
    $("#accordion2").accordion();
});