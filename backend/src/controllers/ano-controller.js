import Anonymous from "../models/anonymousSharing.js";

export const getAnonymousPosts = async (req, res) => {
    try {
      const anonymousPosts = await Anonymous.find({}).sort({ createdAt: -1 });
      return res.status(200).json(anonymousPosts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};

export const createAnonymousPost = async (req, res) => {
    try {
        const { title, article, options, tags } = req.body;

        const newPost = new Anonymous({
            title,
            article,
            options,
            tags
        });

        await newPost.save();

        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};