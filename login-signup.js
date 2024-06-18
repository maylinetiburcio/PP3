
function toggleForm() {
    document.getElementById('signupForm').classList.toggle('active');
    document.getElementById('loginForm').classList.toggle('active');
}

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();


    const fname = document.getElementById('signupFirstName').value;
    const lname = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const mobile = document.getElementById('signupMobile').value;
    const password = document.getElementById('signupPassword').value;


    let isValid = true;
    document.getElementById('signupFirstName').textContent = '';
    document.getElementById('signupLastName').textContent = '';
    document.getElementById('signupEmailError').textContent = '';
    document.getElementById('signupMobileError').textContent = '';
    document.getElementById('signupPasswordError').textContent = '';

    if (!fname) {
        document.getElementById('signupNameError').textContent = 'First Name is required';
        isValid = false;
    }

    if (!lname) {
        document.getElementById('signupNameError').textContent = 'Last Name is required';
        isValid = false;
    }

    if (!email) {
        document.getElementById('signupEmailError').textContent = 'Email is required';
        isValid = false;        
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('signupEmailError').textContent = 'Email is invalid';
        isValid = false;
    }
    const mobileRegex = /^(\+63|0)(\d{10})$/;
    if (!mobileRegex.test(mobile)) {
        document.getElementById('signupMobileError').textContent = 'Please enter a valid 11-digit mobile number.';
        isValid = false;
    }

    if (!password) {
        document.getElementById('signupPasswordError').textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('signupPasswordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }

    if (isValid) {
        
        signUp(fname, lname, mobile, email, password);
    }
});


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 


    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;


    let isValid = true;
    document.getElementById('loginEmailError').textContent = '';
    document.getElementById('loginPasswordError').textContent = '';

    if (!email) {
        document.getElementById('loginEmailError').textContent = 'Email is required';
        isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('loginEmailError').textContent = 'Email is invalid';
        isValid = false;
    }

    if (!password) {
        document.getElementById('loginPasswordError').textContent = 'Password is required';
        isValid = false;
    }

    if (isValid) {
        login(email, password);
    }
});

// Function to handle sign-up process
function signUp(fname, lname, mobile, email, password) {
    fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: fname,
            lastName: lname,
            email: email,
            mobile: mobile,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sign Up Success:', data);
        alert('Sign up successful! Logging you in...');

        login(email, password);
    })
    .catch((error) => {
        console.error('Sign Up Error:', error);
        alert('Sign up failed!');
    });
}

// Function to handle login process
function login(email, password) {
    fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to log in');
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            console.log('Login Success:', data);
            alert('Login successful! Token: ' + data.token);
         
            sessionStorage.setItem('userToken', data.token);
           
            window.location.href = 'menu.html'; 
        } else {
            throw new Error('No token received');
        }
    })
    .catch((error) => {
        console.error('Login Error:', error);
        alert('Login failed!');
    });
}
