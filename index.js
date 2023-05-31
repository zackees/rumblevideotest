!function (r, u, m, b, l, e) { r._Rumble = b, r[b] || (r[b] = function () { (r[b]._ = r[b]._ || []).push(arguments); if (r[b]._.length == 1) { l = u.createElement(m), e = u.getElementsByTagName(m)[0], l.async = 1, l.src = "https://rumble.com/embedJS/urq2e0" + (arguments[1].video ? '.' + arguments[1].video : '') + "/?url=" + encodeURIComponent(location.href) + "&args=" + encodeURIComponent(JSON.stringify([].slice.apply(arguments))), e.parentNode.insertBefore(l, e) } }) }(window, document, "script", "Rumble");

Rumble("play", { "video": "v2nwlhq", "div": "rumble_v2nwlhq" });
const $divRumble = document.getElementById('rumble_v2nwlhq');
$divRumble.addEventListener('click', function (e) {
    if (signupIsActive()) {
        e.preventDefault();
        e.stopPropagation();
        return;
    }
}, true);

let jobId = setInterval(() => {
    let videos = document.getElementsByTagName('video');
    if (videos.length < 1) {
        return
    }
    // Define the click handler
    function handleBodyClick() {
        if (signupIsActive()) {
            return;
        }
        for (let i = 0; i < videos.length; i++) {
            let video = videos[i];
            video.play();
        }
        // Remove the click handler after one click
        document.body.removeEventListener('click', handleBodyClick);
    }
    // Add the click handler
    document.body.addEventListener('click', handleBodyClick);
    clearInterval(jobId);
}, 8);


initSignup(function () {
    console.log('signup closed');
});
