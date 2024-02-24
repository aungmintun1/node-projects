const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema ({

question: {
    type: String,
    required: [true, 'enter a name'],
},

},

// total thread likes
// total # of comments

{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

threadSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'thread',
    localField: '_id'
  });

  threadSchema.virtual('likes', {
    ref: 'Like',
    foreignField: 'thread',
    localField: '_id'
  });

//total likes method

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;

