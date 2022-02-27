function productSlider(el) {
    var mySwiper = new Swiper(el, {
        slidesPerView: 4,
        autoplay: 2500,
        spaceBetween: 30,
        preloadImages: false,
        lazyLoading: true,
        breakpoints: {
            1200: {
                slidesPerView: 4,
                spaceBetween: 40
            },
            991: {
                slidesPerView: 3,
                spaceBetween: 70
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 10
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 50
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 3
            },
            380: {
                slidesPerView: 1,
                spaceBetween: 5
            }
        },
        nextButton: $(el).siblings('.row').find('.carousel-control.prev'),
        prevButton: $(el).siblings('.row').find('.carousel-control.next')
    });
}
productSlider("#newCourses");
productSlider("#popularCourse");
productSlider("#bestSaleCourse");

var defaultSettings = 'fa';
(function($) {

    $.fn.persiaNumber = function(settings) {
        if (typeof(settings) == 'string' && settings.length > 0)
            defaultSettings = settings;
        var range = 1728;
        if (settings == 'ar') {
            range = 1584;
        }
        window.persiaNumberedDOM = this;
        convert(this, range);
        $(document).ajaxComplete(function() {
            var thisObj = window.persiaNumberedDOM;
            convert(thisObj, range);
        });

        function convert(obj, range) {
            obj.find("*").andSelf().contents().each(function() {
                if (this.nodeType === 3 && this.parentNode.localName != "style" && this.parentNode.localName != "script") {
                    this.nodeValue = this.nodeValue.replace(this.nodeValue.match(/[0-9]*\.[0-9]+/), function(txt) {
                        return txt.replace(/\./, ',');
                    });
                    this.nodeValue = this.nodeValue.replace(/\d/g, function(v) {
                        return String.fromCharCode(v.charCodeAt(0) + range);
                    });
                }
            });
        }
    };
})(jQuery);
origParseInt = parseInt;
parseInt = function(str) {
    str = str && str.toString().replace(/[\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9]/g, function(v) {
        return String.fromCharCode(v.charCodeAt(0) - 1728)
    }).replace(/[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/g, function(v) {
        return String.fromCharCode(v.charCodeAt(0) - 1584)
    }).replace(/[\u066B]/g, '.');
    return origParseInt(str);
};
origParseFloat = parseFloat;
parseFloat = function(str) {
    str = str && str.toString().replace(/[\u06F0\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9]/g, function(v) {
        return String.fromCharCode(v.charCodeAt(0) - 1728)
    }).replace(/[\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669]/g, function(v) {
        return String.fromCharCode(v.charCodeAt(0) - 1584)
    }).replace(/[\u066B]/g, '.');
    return origParseFloat(str);
};
var FormatNumb = wNumb({
    // suffix: 'تومان ',
    decimals: 0,
    thousand: ','
});
$('.formatted-number').each(function(i, obj) {
    var price = parseInt($(obj).text());
    var formattedPrice = FormatNumb.to(price);
    $(obj).text(formattedPrice).persiaNumber();
});
$(document).ready(function() {

    $('#registers,#gotop').addClass("hiddens").viewportChecker({ classToAdd: 'visibles animated rotateIn', offset: 100 });

    $('body').on('click', function(e) {
        $('[data-toggle="popover"]').each(function() {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    //    if ($(window).width() < 767) {

    //     //****************
    //     function resize() {
    //         var newH = $(window).innerHeight();
    //         $('ul#list').height(newH);
    //     };

    //     $(function() {
    //         $(window).on('resize', resize);
    //     });
    //     //**************

    // } else {

    //     //****************

    //     $(function() {
    //         $(window).on('resize', resize);
    //     });
    //     //**************

    //     // $.scrollify({
    //     //   section: ".scrollables",
    //     //   sectionName: "section-name",
    //     //   interstitialSection: "",
    //     //   easing: "easeOutExpo",
    //     //   scrollSpeed: 1100,
    //     //   offset: 0,
    //     //   scrollbars: true,
    //     //   standardScrollElements: "",
    //     //   setHeights: true,
    //     //   overflowScroll: true,
    //     //   updateHash: true,
    //     //   touchScroll: true,
    //     //   interstitialSection: "#footer",
    //     //   before: function(index, sections) {
    //     //     var ref = sections[index].attr('data-section-name');
    //     //     $('.scrollables').each(function() {
    //     //       if ($(this).attr('data-section-name') === ref) {
    //     //         $(this).addClass('active-section');
    //     //       } else {
    //     //         $(this).removeClass('active-section');
    //     //       }
    //     //     });
    //     //   }
    //     // });


    // }

    $('.modal').on('shown.bs.modal', function() {
        $.scrollify.disable();
    })

    $('.modal').on('hidden.bs.modal', function() {
        $.scrollify.enable();
    });

    $(document).on('click', '.navicon', function() {

        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $('.sidemenu').removeClass('opened');
            $('.sidebg').fadeOut('fast');
            $('body').removeClass('modal-open');
        } else {
            $(this).addClass('open');
            $('.sidemenu').addClass('opened');
            $('.sidebg').fadeIn('fast');
            $('body').addClass('modal-open');
        }

    });

    $(document).on('click', '.sidebg', function() {
        $('.navicon').removeClass('open')
        $('.sidemenu').removeClass('opened')
        $('.sidebg').fadeOut('fast')
        $('body').removeClass('modal-open');
    });

    $(document).on('click', '.continues', function() {
        $('.moread').slideToggle('fast')
        $(this).parent().parent().toggleClass('open')
    });

    //* *****************

    function slidechanger(index) {
        var current = $('#AboutUs .mainabout').eq(index);
        $('.mainabout').hide();
        current.show();
        $('.bullets li').removeClass('currens');
        $('.bullets > li').eq(index).addClass('currens');
    }

    $(document).on('click', '.bullets > li', function() {
        clearInterval(switcher);
        if ($(this).hasClass('currens')) {
            switcherInterval();
            return;
        }

        var index = $('.bullets > li').index(this);
        slidechanger(index);
        switcherInterval();

    });

    var switcher;

    function switcherInterval() {
        switcher = setInterval(function() {
            var listeq = $('.bullets > li').length;
            var currentliNumber = $('.bullets > li').index('.currens');
            if (currentliNumber == (listeq))
                var nextli = 0;
            else
                var nextli = currentliNumber + 1;
            slidechanger(nextli);
        }, 15000);
    }
    switcherInterval();

    //***************************

    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    //******************************
    $('#slideshow li').hover(function() {
        clearInterval(slideshowIntStp);
    }, function() {
        slideshowchanger();
    });

    $("#slideshow ul li:gt(0)").hide();
    var slideshowIntStp;

    function slideshowchanger() {
        slideshowIntStp = setInterval(function() {
            $('#slideshow ul li:visible').hide().next().show().end().appendTo('#slideshow ul');
        }, 5000);
    };
    slideshowchanger();

    //********************

    $("#slideshow2 h3:gt(0)").hide();

    setInterval(function() {
        $('#slideshow2 h3:first').hide().next().show().end().appendTo('#slideshow2');
    }, 2000);

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        $('.socielyty ').popover('hide');

        //>=, not <=
        if (scroll >= 200) {
            //clearHeader, not clearheader - caps H
            $(".header").addClass("prplehead");
        } else {
            $(".header").removeClass("prplehead");
        }
    });

    $(document).on('click', '.stepzs li', function() {
        $('.stepzs li').removeClass('actives');
        $(this).addClass('actives');
        var str = $(this).index();
        $('.listyef li').hide();
        $('.listyef li.listzz' + str).show();
    });

    $(document).on('click', '.getmoreinfo', function() {
        $(this).toggleClass('openz');
        $('.fulldata').slideToggle('normal');
    });

    $(".queti ul.gyfj li").click(function() {
        $('.queti ul.gyfj li').removeClass('avits');
        $(this).addClass('avits');
        var strs = $(this).index();
        $('.tiopl div.grpz').hide();
        $('.tiopl div.grpz.groupfaq' + strs).show();
    });

    $(".nopl li").click(function() {

        if ($(this).hasClass('enabled')) {
            $(this).find('p').slideUp('fast');
            $('.nopl li').removeClass('enabled');
            return;
        }
        $('.nopl li').removeClass('enabled');
        $('.nopl li p').slideUp('fast');
        $(this).addClass('enabled');
        $(this).find('p').slideDown('fast');
    });

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    // $('.carousel').carousel({
    //     interval: isMobile.any() ? false : 4000
    // });

    // When we click on the LI
    // function slideshow(listid) {
    //     var list = $(listid);
    //     var li = list.children();
    //     var lengthMinusOne = li.length - 1;
    //     var index = 0;
    //     var num = $(listid + " li").length;

    //     var prevLi = $(li[0]);

    //     function Timer(fn, t) {
    //         var timerObj = setInterval(fn, t);

    //         this.stop = function() {
    //             if (timerObj) {
    //                 clearInterval(timerObj);
    //                 timerObj = null;
    //             }
    //             return this;
    //         }

    //         // start timer using current settings (if it's not already running)
    //         this.start = function() {
    //             if (!timerObj) {
    //                 this.stop();
    //                 timerObj = setInterval(fn, t);
    //             }
    //             return this;
    //         }

    //         // start with new interval, stop current interval
    //         this.reset = function(newT) {
    //             t = newT;
    //             return this.stop().start();
    //         }
    //     }

    //     var timer = new Timer(function() {
    //         index++;
    //         if (index > lengthMinusOne)
    //             index = 0;
    //         prevLi.fadeOut("fast");
    //         prevLi = $(li[index]).fadeIn("fast");
    //     }, 8000);

    //     $("#NextButton").click(function() {
    //         index++;
    //         if (index > lengthMinusOne)
    //             index = 0;
    //         prevLi.fadeOut("fast");
    //         prevLi = $(li[index]).fadeIn("fast");
    //         timer.reset(10000);
    //     });
    //     $("#PrevButton").click(function() {
    //         index--;
    //         if (index < 0)
    //             index = lengthMinusOne;
    //         prevLi.fadeOut("fast");
    //         prevLi = $(li[index]).fadeIn("fast");
    //         timer.reset(10000);
    //     });

    //     // $(".regbox input").click(function(){
    //     //    timer.reset(100000);
    //     // });
    //     $(".cenetere a").hover(function() {
    //         timer.reset(20000);
    //     });

    // }

    // slideshow("#list");

    $(document).on('change', '#fileID5', function(e) {
        var filename = $('#fileID5').val().split('\\').pop();

        if (!document.getElementById("fileID5").files.length == 0) {
            $('.uploadbcs').addClass('choosed');
            $('.uploadbcs span').text(filename);

        } else {
            $('.uploadbcs span').text('انتخاب فایل پیوست');
            $('.uploadbcs').removeClass('choosed');
        }

    });

    $(document).on('keydown', '.numeric', function(e) {
        if ($.inArray(e.keyCode, [
                46,
                8,
                9,
                27,
                13,
                110,
                190
            ]) !== -1 || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;

        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
            $(this).parent().parent().find('.errorMessage').text('لطفا فقط عدد وارد کنید').show();

        } else {
            $(this).parent().parent().find('.errorMessage').hide();
        }
    });

    $(document).on('keydown', '.farsi', function(e) {

        if (e.key == 'Alt' || e.key == 'Shift' || e.key == 'Tab' || e.key == 'Backspace')
            return;
        $(this).parent().parent().find('.errorMessage').hide();

        if (!e.key.match(/^[0-9 ا آ ئ ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی]+$/)) {
            e.preventDefault();
            $(this).parent().parent().find('.errorMessage').text('لطفا فارسی تایپ کنید').show();

        }
    });
    $(document).on('keydown', '.farsinonum', function(e) {

        if (e.key == 'Alt' || e.key == 'Shift' || e.key == 'Tab' || e.key == 'Backspace')
            return;
        $(this).parent().parent().find('.errorMessage').hide();

        if (!e.key.match(/^[ا آ ئ ب پ ت ث ج چ ح خ د ذ ر ز ژ س ش ص ض ط ظ ع غ ف ق ک گ ل م ن و ه ی]+$/)) {
            e.preventDefault();
            $(this).parent().parent().find('.errorMessage').text('لطفا فارسی تایپ کنید').show();

        }
    });
    $(document).on('keypress', 'input.persian', function(e) {
        // backspace, delete, tab, escape, enter
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13]) !== -1 ||
            // Ctrl+A
            ((e.charCode == 65 || e.charCode == 97) && e.ctrlKey === true) ||
            // home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            $(this).parent().parent().find('.errorMessage').hide();
            return;

        }

        if (-1 == $.inArray(String.fromCharCode(e.charCode), [
                '‌',
                ' ',
                'آ',
                'ا',
                'ب',
                'پ',
                'ت',
                'ث',
                'ج',
                'چ',
                'ح',
                'خ',
                'د',
                'ذ',
                'ر',
                'ز',
                'ژ',
                'س',
                'ش',
                'ص',
                'ض',
                'ط',
                'ظ',
                'ع',
                'غ',
                'ف',
                'ق',
                'ک',
                'گ',
                'ل',
                'م',
                'ن',
                'و',
                'ه',
                'ی',
                'ي',
                'ك',
                'ة'
            ])) {
            e.preventDefault();
            $(this).parent().parent().find('.errorMessage').text('لطفا فارسی تایپ کنید').show();

        } else {
            $(this).parent().parent().find('.errorMessage').hide();
        }

    });

    $(document).on('focusout', 'input.emails', function(e) {

        $(this).filter(function() {
            var emil = $(this).val();
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if (!emailReg.test(emil)) {

                $(this).parent().parent().find('.errorMessage').text('آدرس پست الکترونیکی شما نا معتبر است').show();

            } else if ($(this).val() == '') {
                {
                    $(this).parent().parent().find('.errorMessage').text('لطفا ایمیل خود را وارد نمایید').show();
                    return false;
                }
            } else {
                //$(this).parent().parent().find('.errorMessage').text('آفرین درست زدی').show();
            }
        })

    });

    $(document).on('keydown', '.english', function(e) {

        if (e.key == 'Alt' || e.key == 'Shift' || e.key == 'Tab')
            return;
        $(this).parent().parent().find('.errorMessage').hide();

        if (!e.key.match(/^[0-9 a-z A-Z . @/]+$/)) {
            e.preventDefault();
            $(this).parent().parent().find('.errorMessage').text('لطفا انگلیسی تایپ کنید').show();

        }
    });

    $(document).on('click', '#callus .gh632d5 .btn-success', function(e) {
        $('.aftersend').fadeIn('fast');
        $(this).parent().parent().parent().parent().parent().find('.close').addClass('white');
    });

    $(document).on('click', '.aftersend a', function(e) {
        $(this).parent().fadeOut('fast');
        $(this).parent().parent().parent().parent().parent().find('.close').removeClass('white');

    });

    $(document).on('click', ' .sendnoww.btn-block', function(e) {
        $('.aftersend2').fadeIn('fast');
    });

    $(document).on('click', '.aftersend2 a', function(e) {
        $(this).parent().fadeOut('fast');

    });

    $(document).on('click', 'a', function(e) {
        e.preventDefault();

    });

    // Add slideDown animation to Bootstrap dropdown when expanding.
    $('.dropdown').on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown('fast');
    });

    // Add slideUp animation to Bootstrap dropdown when collapsing.
    $('.dropdown').on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp('fast');
    });

    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $('#registers').show();
        } else {
            $('#registers').fadeOut('fast');
        }
    });

    $(window).scroll(function() {
        if ((window.innerHeight + window.scrollY + 200) >= document.body.offsetHeight) {
            $('#registers').fadeOut('fast');
            $('#gotop').show();
        } else {
            $('#gotop').fadeOut('fast');
        }
    });

    //$('#Certificates').modal('show');

    function testAnim(x) {
        $('.modal .modal-dialog').attr('class', 'modal-dialog  ' + x + '  animated');
    };
    $('#Admission_Request').on('show.bs.modal', function(e) {
        var anim = boundeIn;
        testAnim(anim);
    })
    $('#Admission_Request').on('hide.bs.modal', function(e) {
        var anim = fadeOut;
        testAnim(anim);
    });

    // $(document).on('click', 'a[href^="#"]:not(.carousel-control,.noscrollpage)', function(e) {
    //   e.preventDefault();
    //   var target = this.hash;
    //   var $target = $(target);
    //   console.log(target);
    //   $('html, body').stop().animate({
    //     'scrollTop': $target.offset().top
    //   }, 100, 'swing', function() {
    //     if (history.pushState) {
    //       history.pushState(null, null, target);
    //     } else {
    //
    //       window.location.hash = target;
    //
    //     }
    //   });
    // });

});

// var owl = $("#carousel-example").carousel - example({
//   items: 4,
//   autoPlay: 4000,
//   itemsDesktop: [
//     1000, 3
//   ],
//   itemsDesktopSmall: [
//     900, 2
//   ],
//   itemsTablet: [
//     600, 1
//   ],
//   itemsMobile: false,
//   pagination: false
// });

var recaptcha1;
var recaptcha2;
var myCallBack = function() {
    //Render the recaptcha1 on the element with ID "recaptcha1"
    recaptcha1 = grecaptcha.render('recaptcha1', {
        'sitekey': '6Lc_0f4SAAAAAF9ZA', //Replace this with your Site key
        'theme': 'light'
    });

    //Render the recaptcha2 on the element with ID "recaptcha2"
    recaptcha2 = grecaptcha.render('recaptcha2', {
        'sitekey': '6Lc_0f4SAAAAAF9ZA', //Replace this with your Site key
        'theme': 'dark'
    });
};

//# sourceMappingURL=script.js.map
