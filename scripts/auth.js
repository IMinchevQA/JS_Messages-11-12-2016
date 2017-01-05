const kinveyBaseUrl = "https://baas.kinvey.com/";
const appKey = 'kid_SywnC_9Xx';
const kinveyAppSecret = 'c136f87b0b79406a9284b14eaa425360';
const kinveyAppAuthHeaders = {
    'Authorization': "Basic " + btoa(appKey + ':' + kinveyAppSecret),
};

function loginUser(event){
    event.preventDefault();
    let userLoginData = {
        username: $('#formLogin input[name=username]').val(),
        password: $('#formLogin input[name=password]').val(),
    };

    // console.log(JSON.stringify(userLoginData))

    $.ajax({
        method: 'POST',
        url: kinveyBaseUrl + 'user/' + appKey + '/login',
        headers: kinveyAppAuthHeaders,
        data: JSON.stringify(userLoginData),
        contentType: 'application/json',
        success: loginSuccess,
        error: handleAjaxError
    })



    function loginSuccess(userInfo){
        saveAuthInSession(userInfo);
        showHideMenuLinks();
        showUserHomeView();
        showInfo('Login successful!')
    }
}

function registerUser(event){
    event.preventDefault();
    let userRegisterData = {
        username: $('#formRegister input[name=username]').val(),
        password: $('#formRegister input[name=password]').val(),
        name: $('#formRegister input[name=name]').val()
    }

    $.ajax({
        method: 'POST',
        url: kinveyBaseUrl + 'user/' + appKey + '/',
        headers: kinveyAppAuthHeaders,
        data: JSON.stringify(userRegisterData),
        contentType: 'application/json',
        success: registerSuccess,
        error: handleAjaxError
    })

    function registerSuccess(userInfo){
        saveAuthInSession(userInfo);
        $('#msgRecipientUsername').append($('<option>').text(userInfo.name));
        showHideMenuLinks();
        showUserHomeView();
        showInfo('Register successful!');
        // listMessages()
    }
}

function saveAuthInSession(userInfo){
    sessionStorage.setItem("username", userInfo.username);
    sessionStorage.setItem("authToken", userInfo._kmd.authtoken);
    sessionStorage.setItem("userId", userInfo._id);
    sessionStorage.setItem("name", userInfo.name);
    $('#viewUserHomeHeading').text("Welcome, " + userInfo.username + '!' );
    $('#spanMenuLoggedInUser').text("Welcome, " + userInfo.username + '!' );
}



function logoutUser(){
    $.ajax({
        method:'POST',
        url: kinveyBaseUrl + 'user/' + appKey + '/_logout',
        headers: getKinveyUserAuthHeaders(),
        success: logoutSuccess,
        error: handleAjaxError
    });

    function logoutSuccess() {
        sessionStorage.clear();
        $('#spanMenuLoggedInUser').text('');
        $('#viewUserHomeHeading').text('');
        showView('viewAppHome');
        showHideMenuLinks();
        showInfo('Logout successful!');
    };
}

function getKinveyUserAuthHeaders(){
    return {
        "Authorization": "Kinvey " + sessionStorage.getItem("authToken"),
    }
}