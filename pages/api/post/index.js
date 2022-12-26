import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/user";
import Post from "../../../model/post";


export default async (req, res) => {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            await Post.find({}).then((x) => { return res.status(200).json({ success: true, data: x }) }
            ).catch(e => {
                return res.status(500).json({ success: false, data: e })
            })
            break
        case 'POST':
            await Post.create(req.body).then(() =>
                res.status(201).json({ success: true, msg: "Post create success!!" })
            ).catch(err =>
                res.status(400).json({ error: err, msg: "Something wrong!!" })
            )
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}