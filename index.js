var num;      // Used to store random number
// var level = 1;           Basically I have No need of levels
var arr = [];   // Stores Computer pattern
var ans = [];   // Stores User pattern
var clicked;

// Mapping the numbers so that I can use it in animation
var mapping = new Map();
mapping.set(1, "one");
mapping.set(2, "two");
mapping.set(3, "three");
mapping.set(4, "four");


// Making sounds function using the switch-case
function makeSound(key) {
    switch (key) {
        case 1:
            var sound1 = new Audio("sounds/green.mp3");
            sound1.play();
            break;
        case 2:
            var sound2 = new Audio("sounds/red.mp3");
            sound2.play();
            break;
        case 3:
            var sound3 = new Audio("sounds/yellow.mp3");
            sound3.play();
            break;
        case 4:
            var sound4 = new Audio("sounds/blue.mp3");
            sound4.play();
            break;
    }
}

// keypress for keyboard to sense when to start
$(document).keypress(function (event) {

    init(event.key);
})

// Animation when key is pressed
function animate(num) {
    var val = "#" + mapping.get(num); // Getting the value from mapping by putting the key
    $(val).addClass("animate");       // Adding Class
    setTimeout(function () {
        $(val).removeClass("animate");
    }, 1000)
}

// Actions to the keyboard press
function init(key) {
    if (key === "s") {
        gameplay();   // Calling the game function

    }
    else if (key === "q") {
        $("body").attr("id", "quit");   // adding ID quit to body
        $("h1").html("You Quitted The Game");  // Changing the HTML
        setTimeout(function () {
            $("body").removeAttr("id");   // Removing attribute
            $("h1").html("Press S to start the game and Q to quit");
        }, 3000)

    }
    else if (key === "l") {
        $("body").attr("id", "quit");    // Adding the attribute to the element
        $("h1").html("YOU LOSE");        // Changing the HTML of an element

        // sound
        var lose = new Audio("sounds/wrong.mp3");
        lose.play();

        // Timeout function so that after losing screen comes to normal after some time
        setTimeout(function () {
            $("body").removeAttr("id");
            $("h1").html("Press S to start the game and Q to quit");
        }, 3000)
    }
}


$(".box").click(function () {

    clicked = $(this).text();
    ans.push(parseInt(clicked));
    console.log(parseInt(clicked));
    console.log(ans);
    makeSound(parseInt(clicked));
    // if (ans.length === arr.length) {  // Check only if when length of arr and ans is equal
    //     check();
    // }

    checkAnswer(ans.length-1);

})


function gameplay() {

    ans = [];

    num = Math.floor((Math.random() * 4) + 1);
    arr.push(num);
    makeSound(num);
    animate(num);
    console.log(num);
    console.log(arr);

}

function check() {   // This check function is used to check when you completed your answer
    if (JSON.stringify(arr) == JSON.stringify(ans)) {

        setTimeout(function () {
            gameplay();
        }, 500);
    }
    else {
        init("l");
        level = 1;
        arr = [];
    }
}


function checkAnswer(currentLevel) {   // This function is designed to check for every entry of the user
                                       // If user pressed one wrong key it will show wrong answer
    if (arr[currentLevel] === ans[currentLevel]) {
        if (ans.length === arr.length) {  // Check only if when length of arr and ans is equal
            check();
        }
    }
    else {
        init("l");
        level = 1;
        arr = [];
    }
}




