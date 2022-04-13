const router = require("express").Router();
const Pin = require("../models/Pin");

// 핀 생성
router.post("/", async (req, res) => {
  const newPin = new Pin(req.body);
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
