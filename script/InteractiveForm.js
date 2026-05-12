const form = document.getElementById('registrationForm');
const inputs = form.querySelectorAll('input');

const rules = {
    username: (val) => val.trim().length >= 3,
    email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    phone: (val) => val.replace(/\D/g, '').length >= 10,
    password: (val) => val.length >= 8 && /\d/.test(val)
};

function validateField(input) {
    const isValid = rules[input.id](input.value);
    const errorMsg = document.getElementById(`${input.id}Error`);

    if (!isValid && input.value !== "") {
        input.classList.add('invalid');
        errorMsg.style.display = 'block';
    } else {
        input.classList.remove('invalid');
        errorMsg.style.display = 'none';
    }
    return isValid;
}

inputs.forEach(input => {

    if (input.id === 'password') {
        input.addEventListener('input', () => {
            let strength = 0;
            const val = input.value;
            if (val.length >= 8) strength += 40;
            if (/\d/.test(val)) strength += 30;
            if (/[A-Z]/.test(val)) strength += 30;

            const bar = document.getElementById('strengthBar');
            bar.style.width = strength + "%";
            bar.style.backgroundColor = strength < 40 ? '#ff453a' : strength < 80 ? '#ff9f0a' : '#30d158';
        });
    }


    input.addEventListener('blur', () => validateField(input));


    input.addEventListener('input', () => {
        if (input.classList.contains('invalid')) validateField(input);
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    inputs.forEach(input => {
        if (!validateField(input)) isFormValid = false;
    });

    if (isFormValid) {
        document.getElementById('successMessage').style.display = 'block';
        document.getElementById('submitBtn').innerText = "Account Created";
        document.getElementById('submitBtn').style.background = "#30d158";
        form.reset();
        document.getElementById('strengthBar').style.width = "0%";
    }
});