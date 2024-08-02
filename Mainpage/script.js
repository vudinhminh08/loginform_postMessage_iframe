document.getElementById('openIframeButton').addEventListener('click', function () {
    var iframe = document.getElementById('loginIframe');
    iframe.src = 'http://localhost:3000/account/login';
    iframe.style.display = 'block';
    iframe.style.width = '80%';
    iframe.style.height = '500px';
});
window.addEventListener('message', function (event) {
    // Ensure the message is coming from the correct origin
    if (event.origin !== 'http://localhost:3000') {
        return;
    }
    if (event.data) {
        console.log('Message received from iframe:', event.data);
        // localStorage.setItem('user-from-iframe', JSON.stringify(event.data));

        setCookie("token-from-iframe", event.data, 30);
        let data_user = getCookie("token-from-iframe")
        console.log(data_user);
        alert('Login successful');
    }
});

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

