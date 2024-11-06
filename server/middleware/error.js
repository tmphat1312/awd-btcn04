export function error(err, req, res, next) {
  try {
    const message = JSON.parse(err.message);
    res.status(err.statusCode).json({ message });
  } catch (error) {
    res.status(err.statusCode).json({ message: err.message });
  }
}
