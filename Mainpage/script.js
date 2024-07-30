document.getElementById('openIframeButton').addEventListener('click', function () {
    var iframe = document.getElementById('loginIframe');
    iframe.src = 'http://localhost:3000/account/login';
    iframe.style.display = 'block';
});
window.addEventListener('message', function (event) {
    // Ensure the message is coming from the correct origin
    if (event.origin !== 'http://localhost:3000') {
        return;
    }

    if (event.data) {
        console.log('Message received from iframe:', event.data);
        alert('Login successful!');
    }
});
