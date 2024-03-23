import mongoose from 'mongoose'

const Schema = mongoose.Schema
const CodeBlockSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
})

export default mongoose.model('CodeBlock', CodeBlockSchema)