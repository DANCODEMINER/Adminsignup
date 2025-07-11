let tempUsername = "";
let tempPassword = "";

function showSignupForm() {
  document.getElementById("signup-form").style.display = "block";
  document.getElementById("otp-form").style.display = "none";
  document.getElementById("message").innerText = "";
}

function sendAdminOtp() {
  const username = document.getElementById("admin-username").value.trim();
  const password = document.getElementById("admin-password").value.trim();

  if (!username || !password) {
    document.getElementById("message").innerText = "❌ Fill in both username and password.";
    return;
  }

  fetch("https://danoski-backend.onrender.com/admin/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      document.getElementById("message").innerText = "❌ " + data.error;
    } else {
      tempUsername = username;
      tempPassword = password;
      document.getElementById("signup-form").style.display = "none";
      document.getElementById("otp-form").style.display = "block";
      document.getElementById("message").innerText = "✅ OTP sent to admin email. Check your inbox.";
    }
  })
  .catch(err => {
    document.getElementById("message").innerText = "❌ Failed to send OTP.";
  });
}

function verifyAdminOtpAndSignup() {
  const otp = document.getElementById("admin-otp").value.trim();

  if (!otp || !tempUsername || !tempPassword) {
    document.getElementById("message").innerText = "❌ OTP and all signup info required.";
    return;
  }

  fetch("https://danoski-backend.onrender.com/admin/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: tempUsername,
      password: tempPassword,
      otp: otp
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      document.getElementById("message").innerText = "❌ " + data.error;
    } else {
      document.getElementById("otp-form").style.display = "none";
      document.getElementById("message").innerText = "✅ Admin account created successfully!";
    }
  })
  .catch(err => {
    document.getElementById("message").innerText = "❌ Signup failed.";
  });
}
