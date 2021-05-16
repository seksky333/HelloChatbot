exports.getHello = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      message: 'Hello World'
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
