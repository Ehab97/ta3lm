//document.addEventListener("DOMContentLoaded",func(){};
//$(document).ready(func(){});
document.addEventListener("DOMContentLoaded", function() {
    'use strict';
    //global variables  definations
    const theTimer = document.getElementById('count');
    var liColor = document.querySelectorAll('.lesson .arrow li');
    var howUse = document.querySelector('.how-to-use .l');
    var courseDrtailsColor = document.querySelectorAll('.body-lg .head-lg li');
    var tabColor = document.querySelectorAll('.content #nav li');
    var timer = [0, 0, 0, 0];
    var highestBox = 0;
    //browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300;
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced 
    var offsetOpacity = 1200;
    //duration of the top scrolling animation (in ms)
    var scrollDuration = 700;
    //chang color links
    var ChangeTapColor = function() {
        for (let i = 0; i < tabColor.length; ++i) {
            tabColor[i].onclick = () => {
                var c = 0;
                while (c < tabColor.length) {
                    // tabColor[c].classList.contains('activeTap') ? tabColor.classList.remove('activeTap') : '';
                    if (tabColor[c].classList.contains('activeTap')) {
                        tabColor[c].classList.remove('activeTap');
                    }
                    c++;
                }
                tabColor[i].classList.add('activeTap');
            }
        }
    }
    var changeColor = function() {
        for (let i = 0; i < liColor.length; ++i) {
            liColor[i].onclick = () => {
                var c = 0;
                while (c < liColor.length) {
                    if (liColor[c].classList.contains('activeli')) {
                        liColor[c].classList.remove('activeli');
                    }
                    c++;
                }
                liColor[i].classList.add('activeli');
            }
        }
    }
    var changeColorCourse = function() {
        for (let i = 0; i < courseDrtailsColor.length; ++i) {
            courseDrtailsColor[i].onclick = () => {
                var c = 0;
                while (c < courseDrtailsColor.length) {
                    if (courseDrtailsColor[c].classList.contains('liColor')) {
                        courseDrtailsColor[c].classList.remove('liColor');
                    }
                    c++;
                }
                courseDrtailsColor[i].classList.add('liColor');
            }
        }
    }
    changeColorCourse();
    changeColor();
    ChangeTapColor();
    //how to use section Edition
    // $('.how-to-use .l')
    $('.how-to-use .l').each(function() {
        $(this).height() > highestBox ? highestBox = $(this).height() : '';
    });
    $('.how-to-use .v').height(highestBox);
    var h2 = 0;
    $('.how-to-use .l').each(function() {
        $(this).height() > highestBox ? highestBox = $(this).height() : '';
    });
    $('.how-to-use .v video').height(highestBox);
    // ===== Scroll to Top ==== 
    $(window).scroll(function() {
        $(this).scrollTop() >= 50 ? $('#return-to-top').fadeIn(200) : $('#return-to-top').fadeOut(200);
    });
    $('#return-to-top').click(function() { // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0 // Scroll to top of body
        }, 500);
    });

    //Timer
    function leadingZero(time) {
        // if (time < 9) {
        //     time = '0' + time;
        // }
        time < 9 ? time = '0' + time : '';
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

    $('.custom-file-input').on('change', function() {
        let fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    });
    //payment
    var $form = $('#payment-form');
    $form.on('submit', payWithStripe);

    /* If you're using Stripe for payments */
    function payWithStripe(e) {
        e.preventDefault();

        /* Visual feedback */
        $form.find('[type=submit]').html('Validating <i class="fa fa-spinner fa-pulse"></i>');

        var PublishableKey = 'pk_test_b1qXXwATmiaA1VDJ1mOVVO1p'; // Replace with your API publishable key
        Stripe.setPublishableKey(PublishableKey);

        /* Create token */
        var expiry = $form.find('[name=cardExpiry]').payment('cardExpiryVal');
        var ccData = {
            number: $form.find('[name=cardNumber]').val().replace(/\s/g, ''),
            cvc: $form.find('[name=cardCVC]').val(),
            exp_month: expiry.month,
            exp_year: expiry.year
        };

        Stripe.card.createToken(ccData, function stripeResponseHandler(status, response) {
            if (response.error) {
                /* Visual feedback */
                $form.find('[type=submit]').html('Try again');
                /* Show Stripe errors on the form */
                $form.find('.payment-errors').text(response.error.message);
                $form.find('.payment-errors').closest('.row').show();
            } else {
                /* Visual feedback */
                $form.find('[type=submit]').html('Processing <i class="fa fa-spinner fa-pulse"></i>');
                /* Hide Stripe errors on the form */
                $form.find('.payment-errors').closest('.row').hide();
                $form.find('.payment-errors').text("");
                // response contains id and card, which contains additional card details            
                console.log(response.id);
                console.log(response.card);
                var token = response.id;
                // AJAX - you would send 'token' to your server here.
                $.post('/account/stripe_card_token', {
                        token: token
                    })
                    // Assign handlers immediately after making the request,
                    .done(function(data, textStatus, jqXHR) {
                        $form.find('[type=submit]').html('Payment successful <i class="fa fa-check"></i>').prop('disabled', true);
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        $form.find('[type=submit]').html('There was a problem').removeClass('success').addClass('error');
                        /* Show Stripe errors on the form */
                        $form.find('.payment-errors').text('Try refreshing the page and trying again.');
                        $form.find('.payment-errors').closest('.row').show();
                    });
            }
        });
    }
    /* Fancy restrictive input formatting via jQuery.payment library*/
    $('input[name=cardNumber]').payment('formatCardNumber');
    $('input[name=cardCVC]').payment('formatCardCVC');
    $('input[name=cardExpiry').payment('formatCardExpiry');

    /* Form validation using Stripe client-side validation helpers */
    jQuery.validator.addMethod("cardNumber", function(value, element) {
        return this.optional(element) || Stripe.card.validateCardNumber(value);
    }, "Please specify a valid credit card number.");

    jQuery.validator.addMethod("cardExpiry", function(value, element) {
        /* Parsing month/year uses jQuery.payment library */
        value = $.payment.cardExpiryVal(value);
        return this.optional(element) || Stripe.card.validateExpiry(value.month, value.year);
    }, "Invalid expiration date.");

    jQuery.validator.addMethod("cardCVC", function(value, element) {
        return this.optional(element) || Stripe.card.validateCVC(value);
    }, "Invalid CVC.");

    validator = $form.validate({
        rules: {
            cardNumber: {
                required: true,
                cardNumber: true
            },
            cardExpiry: {
                required: true,
                cardExpiry: true
            },
            cardCVC: {
                required: true,
                cardCVC: true
            }
        },
        highlight: function(element) {
            $(element).closest('.form-control').removeClass('success').addClass('error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-control').removeClass('error').addClass('success');
        },
        errorPlacement: function(error, element) {
            $(element).closest('.form-group').append(error);
        }
    });

    paymentFormReady = function() {
        if ($form.find('[name=cardNumber]').hasClass("success") &&
            $form.find('[name=cardExpiry]').hasClass("success") &&
            $form.find('[name=cardCVC]').val().length > 1) {
            return true;
        } else {
            return false;
        }
    }

    $form.find('[type=submit]').prop('disabled', true);
    var readyInterval = setInterval(function() {
        if (paymentFormReady()) {
            $form.find('[type=submit]').prop('disabled', false);
            clearInterval(readyInterval);
        }
    }, 250);


    //end paymen

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
        l3: false,
        isOn: true,
        names: ['Ehab Reda', 'Omnia Salah', 'Yasmeen Mahdy', 'Aya Esmail', 'Alshimaa Abdelaal'],
        images: ['ehab.jpg', 'woman.png', 'woman.png', 'woman.png', 'woman.png'],
        // pos:['Leader','Busimess']
    },
    methods: {
        open: function(arg) {
            return arg = !arg;
        },
        change: function() {
            return this.isOn = !isOn;
        }
    },

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