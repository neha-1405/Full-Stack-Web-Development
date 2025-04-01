import React from &quot;react&quot;;
import { Link } from &quot;react-router-dom&quot;;
import styles from &quot;./BlogList.module.css&quot;; // Import CSS Module

const blogs = [
  { id: 1, title: &quot;React Basics&quot; },
  { id: 2, title: &quot;Understanding useState&quot; },
];

function BlogList() {
  return (
    &lt;div className={styles.container}&gt;
      &lt;h1 className={styles.title}&gt;Blog List&lt;/h1&gt;
      &lt;ul className={styles.list}&gt;
        {blogs.map((blog) =&gt; (
          &lt;li key={blog.id} className={styles.item}&gt;
            &lt;Link to={`/blogs/${blog.id}`} className={styles.button}&gt;
              {blog.title}
            &lt;/Link&gt;
          &lt;/li&gt;
        ))}
      &lt;/ul&gt;

    &lt;/div&gt;
  );
}

export default BlogList;

import React from &quot;react&quot;;
import { useParams } from &quot;react-router-dom&quot;;

const blogData = {
  1: { title: &quot;React Basics&quot;, content: &quot;Learn the fundamentals of React.&quot; },
  2: { title: &quot;Understanding useState&quot;, content: &quot;State management in React.&quot; },
};

function BlogPost() {
  const { id } = useParams();
  const blog = blogData[id];

  if (!blog) return &lt;h2&gt;Blog not found&lt;/h2&gt;;

  return (
    &lt;div&gt;
      &lt;h1&gt;{blog.title}&lt;/h1&gt;
      &lt;p&gt;{blog.content}&lt;/p&gt;
    &lt;/div&gt;
  );
}

export default BlogPost;

import React from &quot;react&quot;;
import { Link } from &quot;react-router-dom&quot;;
import styles from &quot;./Home.module.css&quot;; // Import CSS Module

function Home() {
  return (
    &lt;div className={styles.container}&gt;
      &lt;h1 className={styles.title}&gt;Welcome to the Blog&lt;/h1&gt;
      &lt;p className={styles.subtitle}&gt;Discover insightful articles and tutorials.&lt;/p&gt;
      &lt;Link to=&quot;/blogs&quot; className={styles.button}&gt;View Blogs&lt;/Link&gt;
    &lt;/div&gt;
  );
}

export default Home;
