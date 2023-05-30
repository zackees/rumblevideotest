
let signupActive = false
let callbackDismissed = null

// Note, do not use directly, this is for router only.
function signupSetActive(on) {
    const $signup = document.querySelector('#signup')
    if (on) {
        $signup.classList.add('active')
        //pageWrapperSetFocus(false)
    } else {
        $signup.classList.remove('active')
        //pageWrapperSetFocus(true)
    }
    signupActive = on
}

function signupIsActive() {
    return signupActive
}

function initSignup(cbDismissed) {
    callbackDismissed = cbDismissed
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
        const $signup = document.querySelector('#signup')
        $signup.classList.remove('active')
        e.preventDefault()
        e.stopPropagation()
        // remove click handler
        signupCloseBtn.removeEventListener('click', arguments.callee)
        callbackDismissed()
        //if (window.location.hash === '#signup') {
        //  window.location.hash = ''
        //}
        // e.preventDefault()
    })
}
