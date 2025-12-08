const phoneForm = document.getElementById("phoneForm");
const phoneInput = document.getElementById("phoneInput");
const otpSection = document.getElementById("otpSection");
const otpPhone = document.getElementById("otpPhone");
const editPhoneBtn = document.getElementById("editPhoneBtn");
const otpInputs = Array.from(document.querySelectorAll(".otp-input"));
const otpMessage = document.getElementById("otpMessage");
const verifyBtn = document.getElementById("verifyBtn");
const otpTimer = document.getElementById("otpTimer");
const otpInputsWrapper = document.getElementById("otpInputs");
const otpGeneratedDisplay = document.querySelector(".otp-generated");
const errorMsg = document.querySelector(".error-message");
const signingBlock = document.querySelector(".signing-block");
const signingText = document.querySelector(".signing-text");
const otpResendContainer = document.querySelector(".otp-resend");

let generatedOTP = "";
let countdownInterval = null;
let isTimerActive = false;

// Generate 4-digit OTP
function createOTP() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

// Reset OTP input visual state
function clearOtpState() {
  otpInputs.forEach((inp) => {
    inp.classList.remove("otp-input--error", "otp-input--success", "otp-input--checking");
  });
  otpInputsWrapper.classList.remove("otp-inputs--shake");
  otpMessage.textContent = "";
  otpMessage.className = "otp-message";
}

// Send new OTP (used for both initial and resend)
function sendNewOTP(phone = null) {
  generatedOTP = createOTP();
  console.log("Generated OTP:", generatedOTP);
  otpGeneratedDisplay.textContent = generatedOTP;
  
  if (phone) {
    otpPhone.textContent = phone;
  }
  
  clearOtpState();
  otpInputs.forEach((inp) => (inp.value = ""));
  otpInputs[0].focus();
  startTimer(30);
}

// Start countdown timer
function startTimer(durationSeconds) {
  let remaining = durationSeconds;
  isTimerActive = true;

  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  countdownInterval = setInterval(() => {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    otpTimer.textContent = `${m}:${String(s).padStart(2, "0")}`;
    
    remaining -= 1;
    
    if (remaining < 0) {
      clearInterval(countdownInterval);
      isTimerActive = false;
      showResendButton();
    }
  }, 1000);
}

// Show resend button
function showResendButton() {
  otpResendContainer.innerHTML = "";
  
  const resendBtn = document.createElement("button");
  resendBtn.textContent = "Resend OTP";
  resendBtn.className = "resend-btn";
  resendBtn.id = "resendOtpBtn";
  
  resendBtn.addEventListener("click", function() {
    if (!isTimerActive) {
      signingText.textContent = "Authenticating...";
      sendNewOTP();
      otpResendContainer.innerHTML = ""; // Hide button during new timer
    }
  });
  
  otpResendContainer.appendChild(resendBtn);
}

// Phone form submission
phoneForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const phone = phoneInput.value.trim();
  
  if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
    phoneInput.classList.add("otp-input--error");
    phoneInput.style.animation = "shake 0.3s";
    errorMsg.style.display = "block";
    errorMsg.style.animation = "shake 0.2s";
    
    setTimeout(() => {
      phoneInput.classList.remove("otp-input--error");
      phoneInput.style.animation = "none";
      errorMsg.style.display = "none";
    }, 1500);
    return;
  }

  sendNewOTP(phone);
  otpSection.style.display = "block";
  phoneForm.style.display = "none";
  signingBlock.style.display = "inline-flex";
  signingText.textContent = "Authenticating...";
});

// Edit phone button
editPhoneBtn.addEventListener("click", () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
  otpSection.style.display = "none";
  phoneForm.style.display = "block";
  signingBlock.style.display = "none";
  otpResendContainer.innerHTML = "";
  phoneInput.focus();
});

// OTP input handlers
otpInputs.forEach((input, idx) => {
  input.addEventListener("input", (e) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value.slice(0, 1);

    if (value && idx < otpInputs.length - 1) {
      otpInputs[idx + 1].focus();
    }

    const filled = otpInputs.every((i) => i.value !== "");
    if (filled) {
      verifyOtp();
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !e.target.value && idx > 0) {
      otpInputs[idx - 1].focus();
    }
  });
});

// Verify OTP
function verifyOtp() {
  clearOtpState();
  const entered = otpInputs.map((i) => i.value).join("");

  // Animate checking effect
  otpInputs.forEach((input, index) => {
    setTimeout(() => {
      input.classList.add("otp-input--checking");

      setTimeout(() => {
        input.classList.remove("otp-input--checking");
        if (index === otpInputs.length - 1) {
          showOtpResult(entered === generatedOTP);
        }
      }, 120);
    }, index * 150);
  });
}

// Show verification result
function showOtpResult(isCorrect) {
  if (isCorrect) {
    otpInputs.forEach((inp) => {
      inp.classList.add("otp-input--success");
    });
    otpMessage.textContent = "OTP verified successfully!";
    otpMessage.classList.add("otp-message--success");
    signingText.textContent = "Signing in...";
  } else {
    otpInputs.forEach((inp) => {
      inp.classList.add("otp-input--error");
    });
    otpMessage.textContent = "Invalid OTP. Try again.";
    otpMessage.classList.add("otp-message--error");
    otpInputsWrapper.classList.add("otp-inputs--shake");

    setTimeout(() => {
      otpInputsWrapper.classList.remove("otp-inputs--shake");
      otpInputs.forEach((inp) => (inp.value = ""));
      otpInputs[0].focus();
    }, 600);
  }
}

verifyBtn.addEventListener("click", verifyOtp);
