/*
Student ID: it24102279
Name: Helambage H.D.R.w.
*/

$(document).ready(function(){

    console.log("Page fully loaded.");

    document.title = "Library Seat Booking - DOM Test";

    console.log("Current URL: " + window.location.href);



    // Task 2
    $("#pageTitle").css("color","#147d1b");
    $("#pageTitle").css("font-size","34px");

    setTimeout(function(){
        $("body").css("background-color", "#D3D3D3");
    }, 2000);



    // Task 3
    $("#libraryImage").mouseenter(function(){
        $(this).css("border","5px solid #0000ff");
    });

    $("#libraryImage").mouseleave(function(){
        $(this).css("border","none");
    });

    $("#seatTable").click(function(){
        alert("Seat Categories table was clicked");
    });



    // Task 4
    $("#studentName").keyup(function(){
        $(this).css("background-color", "#FFFF00");
    });

    $(window).resize(function(){
        console.log("Window resized");
    });



    // Task 5
    let originalImg = $("#libraryImage").attr("src");
    let preloadedImg = new Image();
    preloadedImg.src = "https://stanforddaily.com/wp-content/uploads/2018/05/building-aisle-library-public-library-inventory-bookselling-24143-pxhere.com_.jpg";

    let toggled = false;

    $("#libraryImage").dblclick(function(){
        if(!toggled){
            $(this).attr("src", preloadedImg.src);
            toggled = true;
        }else{
            $(this).attr("src", originalImg);
            toggled = false;
        }
    });



    // Task 6
    $("#bookingForm").submit(function(event){

        event.preventDefault();

        let name = $("#studentName").val().trim();
        let email = $("#studentEmail").val().trim();

        if(name === "" || email === ""){
            alert("Please enter both Name and Email!");
            return;
        }

        let newRow = $("<tr></tr>");

        let nameCell = $("<td></td>").text(name);
        let emailCell = $("<td></td>").text(email);

        let deleteBtn = $("<button></button>").text("Delete");

        deleteBtn.click(function(){
            $(this).closest("tr").remove();
        });

        let actionCell = $("<td></td>").append(deleteBtn);

        newRow.append(nameCell);
        newRow.append(emailCell);
        newRow.append(actionCell);

        $("#bookingTable").append(newRow);

        $("#studentName").val("").focus();
        $("#studentEmail").val("");

    });

});