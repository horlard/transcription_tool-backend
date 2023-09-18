const mongoose = require("mongoose");

const transcriptSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the transcript name"],
    },
    text: {
      type: String,
      required: [true, "Please add the text"],
    },
    type: {
      type: String,
      required: [true, "Please add the type"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transcript", transcriptSchema);
