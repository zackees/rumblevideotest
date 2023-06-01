
let _signupCallbackDismissed = null
let $signupCloseBtn = null
let $signup = null

function signupIsActive() {
    return $signup.classList.contains('active')
}

function signupAddContact(name, email) {
    let message = `Hi ${name},\n\nI'm writing to let you know that I've added your email ${email} to my contact list.`
    alert(message)
}

function signupDismissed() {
    $signup.classList.remove('active')
    $signupCloseBtn.removeEventListener('click', arguments.callee)
    // Remove element from dom after a timeout.
    setTimeout(() => {
        let $signup = document.querySelector('#signup')
        $signup.style.display = 'none'
    }, 1000)
    _signupCallbackDismissed()
}

function initSignup(cbDismissed) {
    _signupCallbackDismissed = cbDismissed
    $signup = document.querySelector('#signup')
    $signupCloseBtn = document.querySelector('#signup-close-btn')
    //assert($signupCloseBtn, 'signupCloseBtn not found')
    //assert($signup, 'signup not found')
    $signup.classList.add('active')
    $signupCloseBtn.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        signupDismissed()
    })
}
