const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// 회원가입
router.post("/register", async (req, res) => {
  try {
    // 비밀번호 생성
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // 유저 생성
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // 유저 정보 저장과 응답
    const user = await newUser.save();
    res.status(200).json(user._id);
  } catch (e) {
    res.status(500).json(e);
  }
});

// 로그인
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("유저 정보가 일치하지 않습니다.");

    // 비밀번호 유효성 체크
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("유저 정보가 일치하지 않습니다.");

    res.status(200).json({ _id: user._id, username: user.username });
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
