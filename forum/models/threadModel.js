const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema ({

question: {
    type: String,
    required: [true, 'enter a name'],
},

},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
)

threadSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'thread',
    localField: '_id'
  });

const Thread = mongoose.model('Thread', threadSchema);
module.exports = Thread;

