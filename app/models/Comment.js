const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    movie_id: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true
    },
    comment: {
      type: String,
      maxlength: [100, "Comment can not be more than 100 characters"]
    },
},
  { 
    timestamps: true 
  });

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema);