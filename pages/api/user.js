import dbConnect from "../../lib/dbConnect";
import User from "../../model/user";
import Post from "../../model/post";
import Comment from "../../model/comment";


const validateToken = (req, res, next) => {
    console.log("validateToken");
    next();
}
const checkPermissions = (req, res, next) => {
    // Check the user's permissions
    // ...
    next();
}
// export default (req, res) => {
//     validateToken(req, res, () => {
//       checkPermissions(req, res, () => {
//         // Handle the request
//         // ...
//         res.send('POST request received');
//       });
//     });
//   };

// import { check, validationResult } from 'express-validator';

// export default (req: NextApiRequest, res: NextApiResponse) => {
//   check('title', 'Title is required').notEmpty();
//   check('content', 'Content is required').notEmpty();
//   check('author', 'Author is required').notEmpty();

//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).send({ errors: errors.array() });
//   }

//   // Save the post to the database
//   // ...
//   res.send('POST request received');
// };


export default async (req, res) =>{
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                validateToken (req, res, async ()=>{
                    const energies = await User.find({})
                    res.status(200).json({ success: true, data: energies })
                })

            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const user = new User(req.body);
                // await user.validate();
                // await user.save();
                const energy = await User.create(req.body)
                res.status(201).json({ success: true, data: energy })
            } catch (error) {
                res.status(400).json({ error: error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}