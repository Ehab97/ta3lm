$(document).ready(function() {
    'use strict';

    var highestBox = 0;
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

    //lesson side bar
    $('.lesson .arrow .v2').click(function() {
        $('.lesson .content .video').css({ "display": "block" });
        $('.lesson .content .read').css({ "display": "none" });
        $('.lesson .content .questions').css({ "display": "none" });

    });
    $('.lesson .arrow .i2').click(function() {
        $('.lesson .content .read').css({ "display": "block" });
        $('.lesson .content .video').css({ "display": "none" });
        $('.lesson .content .questions').css({ "display": "none" });

    });
    $('.lesson .arrow .q2').click(function() {
        $('.lesson .content .questions').css({ "display": "block" });
        $('.lesson .content .read').css({ "display": "none" });
        $('.lesson .content .video').css({ "display": "none" });

    });
    //end function lesson side bar
    //timer
    // Set the date we're counting down to
    var countDownDate = new Date("Jan 5, 2019 15:37:25").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds

        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("count").innerHTML = 1 + "h " +
            minutes + "m " + seconds + "s ";

        // If the count down is finished, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("count").innerHTML = "EXPIRED";
        }
    }, 1000);
    //accordian of tests of profile


    //vue js
    VueCode();

    $('.custom-file-input').on('change', function() {
        let fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    });

});
//browser window scroll (in pixels) after which the "back to top" link is shown
var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced 
    offsetOpacity = 1200,
    //duration of the top scrolling animation (in ms)
    scrollDuration = 700;
var VueCode = new Vue({
    el: '#app',
    data: {
        color:'none',
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
        tf: false


    },
    methods: {
        open: function(arg) {
            return arg = !arg
        }
    },
    computed: {
        change:function(){
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