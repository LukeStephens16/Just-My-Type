let sentences = ['I like apples', 'I would much prefer pinnapples', 'Watermelon is actually the best', 'Let us talk about peaches tho', 'No way man, grapes are the best'];
let keyUpper = $("#keyboard-upper-container");
let keyLower = $("#keyboard-lower-container");
let sentenceNumber = 0;
let sentence = sentences[sentenceNumber];
let myNumber = 0;
let myLetter = sentence.substring(myNumber, myNumber + 1);
let mistakes = 0;
let isTimeCounting = false;
let highlightPosition = 0;



let feature = $("#target");
let playButton = $("#play-button");
$(playButton).click(function () {
    $(feature).css("display", "block");
    $("#menu").css("display", "none");


    $(document).keydown(function (e1) {

        if (e1.which === 16) {

            $(keyUpper).css("display", "block");
            $(keyLower).css("display", "none");

            $(document).keyup(function (e2) {

                if (e2.which === 16) {

                    $(keyUpper).css("display", "none");
                    $(keyLower).css("display", "block");
                }
            });
        }
    });

    $(document).keypress(function (e) {

        let $key = $("#" + e.which);
        $($key).css("background-color", "yellow");

        $(document).keyup(function (e) {

            $($key).css("background-color", "#f5f5f5");
        });
    });

    let highlight = $("#yellow-block");

    $("#sentence").text(sentence);

    $("#target-myLetter").text(myLetter);

    $(document).keypress(function (e) {

        if (isTimeCounting === false) {
            startDate = new Date();
            startTime = startDate.getTime();
            isTimeCounting = true;
        }

        if (e.which == sentences[sentenceNumber].charCodeAt(myNumber)) {

            let right = $("<span>✔</span>");
            $(right).addClass('green');
            $(right).appendTo("#feedback");

            highlightPosition += 21;
            $(highlight).css("margin-left", highlightPosition + "px");

            myNumber++;
            myLetter = sentence.substring(myNumber, myNumber + 1);
            $("#target-myLetter").text(myLetter);

            if (myNumber === sentence.length) {

                sentenceNumber++;

                if (sentenceNumber === sentences.length) {

                    let endDate = new Date();
                    let endTime = endDate.getTime();
                    let minutes = (endTime - startTime) / 60000;

                    $wpm = Math.round(54 / minutes - 2 * mistakes);

                    let r = confirm("You type " + $wpm + " words per minute. Would you like to try again?");

                    if (r == true) {

                        location.reload();
                    }
                } else {

                    sentence = sentences[sentenceNumber];
                    $("#sentence").text(sentence);

                    myNumber = 0;
                    myLetter = sentence.substring(myNumber, myNumber + 1);
                    $("#target-myLetter").text(myLetter);

                    highlightPosition = 0;
                    $(highlight).css("margin-left", highlightPosition + "px");
                    $("#feedback").text("");
                }
            }
        } else {

            let wrong = $("<span>X</span>");
            $(wrong).addClass('red');
            $(wrong).appendTo("#feedback");
            mistakes++;
        }
    });
});