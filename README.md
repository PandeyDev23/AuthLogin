```markdown
# 🚀 OTP Phone Auth Demo

A modern, responsive OTP (One-Time Password) authentication component built with **HTML**, **CSS**, and **vanilla JavaScript**. Perfect for phone number verification flows! 📱✨

## ✨ Features

- ✅ **Phone Number Validation** - 10-digit Indian phone validation with shake animation
- 🔢 **Auto-generated 4-digit OTP** - Real-time generation with developer preview
- ⏱️ **Countdown Timer** - 30-second resend cooldown with smooth UI
- ⌨️ **Auto-focus OTP Inputs** - Seamless typing experience (tab/backspace navigation)
- 🎨 **Smooth Animations** - Sequential checking, success/error states, pulse loading
- 📱 **Fully Responsive** - Works on mobile/desktop with modern dark theme
- ⚡ **No Dependencies** - Pure vanilla JS, no frameworks needed

## 🎯 Quick Start

### 1. **HTML Structure**
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Auth Demo</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="auth">
    <!-- Your auth form HTML here -->
  </div>
  <script src="script.js"></script>
</body>
</html>
```

### 2. **File Structure**
```
otp-auth-demo/
├── index.html
├── style.css     🎨
└── script.js     ⚙️
```

## 🚀 Customization

```
// Change timer duration
startTimer(60); // 60 seconds instead of 30

// Custom OTP length (6 digits)
function createOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}
```

## 🎨 Design System

| Token | Value | Usage |
|-------|--------|--------|
| **Primary** | `#2fd39a` → `#22c55e` | Success, focus, accents |
| **Error** | `#ff4d4d` | Validation errors |
| **Background** | `#050505` | Main dark theme |
| **Surface** | `#151515` | Cards, inputs |

## 🔧 How It Works

```
1. Enter phone → Validate → Generate OTP
       ↓
2. Show OTP screen + 30s timer
       ↓
3. Type OTP → Auto-verify on complete
       ↓
4. Success → Loading → "Signed In!"
       ↓
5. Timer expires → Resend button
```

## 📱 Responsive

| Screen | Width |
|--------|--------|
| Mobile | < 480px |
| Tablet | 480px - 768px |
| Desktop | > 768px |

## 🎪 Animations

- **Shake** - Error validation feedback
- **Pulse** - Loading dot animation  
- **Sequential Check** - OTP verification highlight
- **FadeIn** - Signing block entrance

## 🛠️ Development

```
# Live reload
npx serve .

# Production ready - already minified! 🚀
```

## 🤝 Contributing

1. Fork the repo 🌟
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open PR 🎉

## 📄 License

**MIT** - Use anywhere! 🎉

```
MIT License
Copyright (c) 2025 PandeyDev23
```

## 🙌 Acknowledgments

- Built with ❤️ for learning full-stack development
- Inspired by modern auth UIs (WhatsApp, Instagram)
- Perfect for portfolio projects! 💼

---

⭐ **Star this repo if it helped you!** ⭐
```

**Ready to copy-paste into your GitHub repo!** 🚀📱

Sources
