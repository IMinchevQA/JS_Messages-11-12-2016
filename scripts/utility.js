function showInfo(message){
    $('#infoBox').text(message);
    $('#infoBox').show();
    setTimeout(function(){
        $('#infoBox').fadeOut()
    }, 3000);
}

function handleAjaxError(error){
    let errorMsg=JSON.stringify(error);

    if(error.readyState === 0){
        errorMsg = "Cannot connect!!!";
        displayError(errorMsg);
    }

    if(error.responseJSON
        && error.responseJSON.description){
        errorMsg = error.responseJSON.description;
        displayError(errorMsg);
    }

    function displayError(errorMsg){
        $('#errorBox').text(errorMsg);
        $('#errorBox').show();
        setTimeout(function(){
            $('#errorBox').fadeOut()
        }, 10000);
    }
}