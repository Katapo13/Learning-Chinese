const Test = require('../models/Test');

class TestController {
  async getTests(req, res) {
    try {
      const tests = await Test.find({}); 
      res.json(tests);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  }

}

module.exports = new TestController();