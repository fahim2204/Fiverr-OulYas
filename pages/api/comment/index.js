import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/user";
import Post from "../../../model/post";
import Comment from "../../../model/comment";



export default async (req, res) => {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'POST':
            await Comment.create(req.body).then(() =>
                res.status(201).json({ success: true, msg: "Comment create success!!" })
            ).catch(err =>
                res.status(400).json({ error: err, msg: "Something wrong!!" })
            )
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}