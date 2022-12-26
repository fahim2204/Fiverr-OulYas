import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/user";
import Post from "../../../model/post";
import Comment from "../../../model/comment";



export default async (req, res) => {
    const { blogId } = req.query
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            await Comment.find({ post: blogId }).then((y) => {
                return res.status(200).json({ success: true, data: y })
            }).catch(e => {
                return res.status(500).json({ success: false, data: e })
            })
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}