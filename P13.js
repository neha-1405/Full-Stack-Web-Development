const Author = require(&quot;../models/Author&quot;);

exports.createAuthor = async (req, res) =&gt; {
    try {
        const { name, email } = req.body;
        const author = new Author({ name, email });
        await author.save();
        res.status(201).json(author);
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
};
   

const BlogPost = require(&quot;../models/BlogPost&quot;);

exports.createBlogPost = async (req, res) =&gt; {
    try {
        const { title, content, author } = req.body;
        const blogPost = new BlogPost({ title, content, author });
        await blogPost.save();
        res.status(201).json(blogPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllBlogPosts = async (req, res) =&gt; {
    try {
        const blogPosts = await BlogPost.find().populate(&quot;author&quot;);
        res.json(blogPosts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBlogPostById = async (req, res) =&gt; {
    try {

        const blogPost = await BlogPost.findById(req.params.id).populate(&quot;author&quot;);
        if (!blogPost) return res.status(404).json({ error: &quot;Blog post not found&quot; });
        res.json(blogPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBlogPost = async (req, res) =&gt; {
    try {
        await BlogPost.findByIdAndDelete(req.params.id);
        res.json({ message: &quot;Blog post deleted&quot; });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

require(&quot;dotenv&quot;).config();

const mongoose = require(&quot;mongoose&quot;);

const connectDB = async () =&gt; {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error(&quot;MONGO_URI is not defined in .env file&quot;);
        }
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,

            useUnifiedTopology: true,
        });
        console.log(&quot;MongoDB Connected&quot;);
    } catch (err) {
        console.error(&quot;Error connecting to MongoDB:&quot;, err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

require(&quot;dotenv&quot;).config();
const express = require(&quot;express&quot;);
const mongoose = require(&quot;mongoose&quot;);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error(&quot;❌ MONGO_URI is not defined in .env file&quot;);
    process.exit(1);
}

mongoose.connect(MONGO_URI)
    .then(() =&gt; console.log(&quot;✅ MongoDB Connected&quot;))
    .catch(err =&gt; {
        console.error(&quot;❌ Error connecting to MongoDB:&quot;, err.message);

        process.exit(1);
});

app.listen(PORT, () =&gt; {
    console.log(`�� Server running on por ${PORT}`);
});
