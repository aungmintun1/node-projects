const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema ({

text: {
    type: String
},

thread: {
    type: mongoose.Schema.ObjectId,
    ref: 'Thread',
    // required: [true, 'comment must belong to a thread.']
  },

replyList: [{

    reply: {
      type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }

}]

})


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

