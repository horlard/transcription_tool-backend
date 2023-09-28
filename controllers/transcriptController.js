const asyncHandler = require("express-async-handler");
const Transcript = require("../models/transcriptModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getTranscripts = asyncHandler(async (req, res) => {
  const transcripts = await Transcript.find({ user_id: req.user.id });
  res.status(200).json(transcripts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createTranscript = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, text, type } = req.body;
  if (!name || !text || !type) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const transcript = await Transcript.create({
    name,
    text,
    type,
    user_id: req.user.id,
  });

  res.status(201).json(transcript);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getTranscript = asyncHandler(async (req, res) => {
  const transcript = await Transcript.findById(req.params.id);
  if (!transcript) {
    res.status(404);
    throw new Error("transcript not found");
  }
  res.status(200).json(transcript);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateTranscript = asyncHandler(async (req, res) => {
  const transcript = await Transcript.findById(req.params.id);
  if (!transcript) {
    res.status(404);
    throw new Error("transcript not found");
  }

  if (transcript.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to update other user transcripts"
    );
  }

  const updatedTranscript = await Transcript.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTranscript);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteTranscript = asyncHandler(async (req, res) => {
  const transcript = await Transcript.findById(req.params.id);
  if (!transcript) {
    res.status(404);
    throw new Error("Transcript not found");
  }
  if (transcript.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to update other user transcript"
    );
  }
  await Transcript.deleteOne({ _id: req.params.id });
  res.status(200).json(transcript);
});

module.exports = {
  getTranscripts,
  createTranscript,
  getTranscript,
  updateTranscript,
  deleteTranscript,
};
