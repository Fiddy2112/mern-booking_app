class AuthController {
  /**
   * @route POST api/auth/register
   * @desc Register user
   * @access Public
   */

  async register(req, res) {
    const { username, password } = req.body;
  }
}

module.exports = new AuthController();
