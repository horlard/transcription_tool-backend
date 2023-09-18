const express = require("express");
const router = express.Router();
const {
  getTranscripts,
  createTranscript,
  getTranscript,
  updateTranscript,
  deleteTranscript,
} = require("../controllers/transcriptController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.route("/").get(getTranscripts).post(createTranscript);
router
  .route("/:id")
  .get(getTranscript)
  .put(updateTranscript)
  .delete(deleteTranscript);

module.exports = router;
