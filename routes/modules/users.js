const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

/*
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: 'users/login',
  failureFlash: true
}))*/

const loginfn = (req, res) => new Promise((resolve, reject) => {
  passport.authenticate('local', function (err, user) {
    let errors = []
    // 若登入發生錯誤
    if (err) {
      errors.push({ message: '登入時發生問題...' })
    }
    // 如果找不到使用者
    if (!user) {
      errors.push({ message: '帳號密碼不正確！' })
    }
    return resolve({ errors, user })
    return reject({ errors, user })
  })(req, res);
})

router.post('/login', async (req, res) => {
  const { errors, user } = await loginfn(req, res)
  // 登入
  if (errors.length) {
    const { email } = req.body
    res.render('login', { errors, email })
  } else {
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return res.redirect('/')
    })
  }
})

/*
router.post('/login', function (req, res, next) {
  const { email } = req.body
  const errors = []
  // 在 routes 的 handler 中使用 passport.authenticate
  passport.authenticate('local', function (err, user, info) {

    if (err) { errors.push({ message: "登入時發生問題..." }) }

    // 如果找不到使用者
    if (!user) { errors.push({ message: "帳號密碼不正確！" }) }

    if (errors.length) {
      return res.render('login', { errors, email })
    } else {
      req.logIn(user, function (err) {
        if (err) { return next(err) }
        return res.redirect('/')
      })
    }
  })(req, res, next);
})
*/
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }

    return bcrypt
      .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
      .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
      .then(hash => User.create({
        name,
        email,
        password: hash // 用雜湊值取得原本的使用者密碼
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router
