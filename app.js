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

let generatedOTP = "";
let countdownInterval = null;

// generate 4‑digit OTP using Math.random()
function createOTP() {
  const num = Math.floor(1000 + Math.random() * 9000); // always 4 digits [web:9]
  return String(num);
}

function startTimer(durationSeconds) {
  let remaining = durationSeconds;

  if (countdownInterval) clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    otpTimer.textContent = `${m}:${String(s).padStart(2, "0")}`;
    remaining -= 1;
    if (remaining < 0) {
      clearInterval(countdownInterval);
      // Create the resend OTP button
      const resendBtn = document.createElement("button");
      resendBtn.textContent = "Resend OTP";
      resendBtn.className = "resend-btn";
      resendBtn.id = "resendOtpBtn";

      // Optional: Add disabled state initially (common pattern)
      resendBtn.disabled = false;
      let newOtp = "";
      // Add click event listener
      resendBtn.addEventListener("click", function () {
        signingText.textContent = "Authenticating...";

        console.log("Resending OTP...");
        newOtp = createOTP();
        generatedOTP = newOtp;
        otpGeneratedDisplay.textContent = newOtp;
        console.log("New Fake OTP:", newOtp);
        resendBtn.disabled = true;
        startTimer(10);
      });

      if (newOtp !== "") {
        resendBtn.disabled = true;
      }

      // Append to parent element (replace with your container)
      document.querySelector(".otp-resend").innerHTML = "";
      document.querySelector(".otp-resend").appendChild(resendBtn);
    }
  }, 1000);
}
// reset visual state of OTP boxes
function clearOtpState() {
  otpInputs.forEach((inp) => {
    inp.classList.remove(
      "otp-input--error",
      "otp-input--success",
      "otp-input--checking"
    );
  });
  otpInputsWrapper.classList.remove("otp-inputs--shake");
  otpMessage.textContent = "";
  otpMessage.className = "otp-message";
}

// STEP 1: submit phone -> show OTP section + generate OTP
phoneForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const phone = phoneInput.value.trim();
  if (!phone || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
    phoneInput.classList.add("otp-input--error");
    phoneInput.style.animation = `shake 0.3s`;
    errorMsg.style.display = "block";
    errorMsg.style.animation = `shake 0.2s`;
    setTimeout(() => {
      phoneInput.classList.remove("otp-input--error");
      phoneInput.style.animation = `none`;
    }, 1500);
    return;
  }

  generatedOTP = createOTP();
  console.log("Fake OTP:", generatedOTP); // just for dev
  otpGeneratedDisplay.textContent = generatedOTP;
  otpPhone.textContent = phone;
  otpSection.style.display = "block";
  phoneForm.style.display = "none";
  signingBlock.style.display = "inline-flex";
  signingText.textContent = "Authenticating...";

  clearOtpState();
  otpInputs.forEach((inp) => (inp.value = ""));
  otpInputs[0].focus();

  startTimer(30);
});

editPhoneBtn.addEventListener("click", () => {
  otpSection.style.display = "none";
  phoneForm.style.display = "block";
  phoneInput.focus();
});

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

function verifyOtp() {
  clearOtpState();

  const entered = otpInputs.map((i) => i.value).join("");

  // highlight each block one by one
  otpInputs.forEach((input, index) => {
    setTimeout(() => {
      input.classList.add("otp-input--checking");

      setTimeout(() => {
        input.classList.remove("otp-input--checking");

        // after last check, show result
        if (index === otpInputs.length - 1) {
          showOtpResult(entered === generatedOTP);
        }
      }, 120);
    }, index * 150);
  });
}

function showOtpResult(isCorrect) {
  if (isCorrect) {
    otpInputs.forEach((inp) => {
      inp.classList.remove("otp-input--error");
      inp.classList.add("otp-input--success");
    });
    otpMessage.textContent = "OTP verified successfully";
    otpMessage.classList.add("otp-message--success");
    signingText.textContent = "Signing in ...";
  } else {
    otpInputs.forEach((inp) => {
      inp.classList.remove("otp-input--success");
      inp.classList.add("otp-input--error");
    });
    otpMessage.textContent = "Invalid OTP";
    otpMessage.classList.add("otp-message--error");
    otpInputsWrapper.classList.add("otp-inputs--shake");

    // clear after short delay so user can re‑enter
    setTimeout(() => {
      otpInputsWrapper.classList.remove("otp-inputs--shake");
      otpInputs.forEach((inp) => (inp.value = ""));
      otpInputs[0].focus();
    }, 600);
  }
}
verifyBtn.addEventListener("click", verifyOtp);
