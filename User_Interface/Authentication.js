const artSide = document.getElementById('artSide');
  const tabs = document.querySelectorAll('.tab');
  const indicator = document.getElementById('tabIndicator');
  const contents = { login: document.getElementById('loginContent'), signup: document.getElementById('signupContent') };
  const formTitle = document.getElementById('formTitle');
  const formSub = document.getElementById('formSub');

  const copy = {
    login: { title: 'Welcome Back', sub: 'Enter your account to login.' },
    signup: { title: 'Create an Account', sub: 'Enter the appropriate details to create an account.' }
  };

  function setTab(name){
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    Object.entries(contents).forEach(([key, el]) => el.classList.toggle('active', key === name));
    artSide.classList.toggle('is-signup', name === 'signup');
    formTitle.textContent = copy[name].title;
    formSub.textContent = copy[name].sub;
    indicator.style.transform = name === 'signup' ? 'translateX(100%)' : 'translateX(0)';
  }

  tabs.forEach(t => t.addEventListener('click', () => setTab(t.dataset.tab)));
  document.querySelectorAll('[data-switch]').forEach(a =>
    a.addEventListener('click', e => { e.preventDefault(); setTab(a.dataset.switch); })
  );

  document.querySelectorAll('[data-eye]').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      input.type = input.type === 'password' ? 'text' : 'password';
    });
  });

  const pwInput = document.getElementById('signupPassword');
  const checklist = document.getElementById('pwChecklist');
  pwInput.addEventListener('input', () => {
    const v = pwInput.value;
    const rules = { len: v.length >= 8, upper: /[A-Z]/.test(v), num: /[0-9]/.test(v), special: /[^A-Za-z0-9]/.test(v) };
    Object.entries(rules).forEach(([key, met]) => {
      checklist.querySelector(`[data-rule="${key}"]`).classList.toggle('met', met);
    });
  });

  function showError(name, msg){
    const el = document.querySelector(`[data-err="${name}"]`);
    if(el) el.textContent = msg || '';
  }

  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value;
    let ok = true;
    if(!email){ showError('login-email','Email is required.'); ok = false; }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showError('login-email','Enter a valid email address.'); ok = false; }
    else showError('login-email','');
    if(!password){ showError('login-password','Password is required.'); ok = false; }
    else showError('login-password','');
    if(ok){
      const btn = loginForm.querySelector('.primary-btn');
      btn.textContent = 'Welcome aboard!';
      btn.classList.add('success');
      setTimeout(() => { btn.textContent = 'Login'; btn.classList.remove('success'); }, 1800);
    }
  });

  const signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const f = signupForm;
    const username = f.username.value.trim();
    const email = f.email.value.trim();
    const password = f.password.value;
    const confirm = f.confirmPassword.value;
    const agree = f.agree.checked;
    let ok = true;

    if(!username){ showError('username','Username is required.'); ok = false; } else showError('username','');
    if(!email){ showError('signup-email','Email is required.'); ok = false; }
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ showError('signup-email','Enter a valid email address.'); ok = false; }
    else showError('signup-email','');

    const pwOk = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password);
    if(!pwOk){ showError('signup-password','Password does not meet the requirements above.'); ok = false; }
    else showError('signup-password','');

    if(confirm !== password || !confirm){ showError('confirm','Passwords do not match.'); ok = false; }
    else showError('confirm','');

    if(!agree){ showError('agree','Please accept the Terms and Privacy Policy.'); ok = false; }
    else showError('agree','');

    if(ok){
      const btn = f.querySelector('.primary-btn');
      btn.textContent = 'Account created!';
      btn.classList.add('success');
      setTimeout(() => { btn.textContent = 'Create an Account'; btn.classList.remove('success'); }, 1800);
    }
  });