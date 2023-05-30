
let signupActive = true
let callbackDismissed = null

function signupIsActive() {
    return signupActive
}

function initSignup(cbDismissed) {
    callbackDismissed = cbDismissed
    const $signup = document.querySelector('#signup')
    $signup.classList.add('active')
    /*
    if (!signupFrag) {
      globalThis.alert('signup html not found')
    }
    const $target = document.getElementById('signup')
    // Generate a div and populate it with the string from the fragment.
    const $div = document.createElement('div')
    $div.innerHTML = signupFrag
    // Now get the signup html
    const $signup = $div.querySelector('#signup')
    // Now replace the target with the fragment.
    $target.replaceWith($signup)
    */
    let signupCloseBtn = document.querySelector('#signup-close-btn')
    signupCloseBtn.addEventListener('click', (e) => {
        //debugger
        /*
        if (signupIsActive()) {
          // does the click target the signup form?
          if (e.target.closest('#signup')) {
            // yes, do nothing
            return
          }
        }
        */
        $signup.classList.remove('active')
        e.preventDefault()
        e.stopPropagation()
        // remove click handler
        signupCloseBtn.removeEventListener('click', arguments.callee)
        setTimeout(() => {
            let $signup = document.querySelector('#signup')
            $signup.style.display = 'none'
        }, 1000)
        callbackDismissed()
        //if (window.location.hash === '#signup') {
        //  window.location.hash = ''
        //}
        // e.preventDefault()
    })
}
