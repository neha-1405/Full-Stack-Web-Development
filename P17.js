import React, { useState } from &quot;react&quot;;

const FeedbackForm = () =&gt; {
  const [formData, setFormData] = useState({
    name: &quot;&quot;,
    email: &quot;&quot;,
    feedback: &quot;&quot;,
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) =&gt; {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () =&gt; {
    let newErrors = {};
    if (!formData.name) newErrors.name = &quot;Name is required&quot;;
    if (!formData.email) newErrors.email = &quot;Email is required&quot;;

    if (!formData.feedback) newErrors.feedback = &quot;Feedback is required&quot;;
    return newErrors;
  };

  const handleSubmit = (e) =&gt; {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setSubmittedData(formData);
      setFormData({ name: &quot;&quot;, email: &quot;&quot;, feedback: &quot;&quot; });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    &lt;div&gt;
      &lt;h2&gt;Feedback Form&lt;/h2&gt;
      &lt;form onSubmit={handleSubmit}&gt;
        &lt;input type=&quot;text&quot; name=&quot;name&quot; value={formData.name} placeholder=&quot;Name&quot; onChange={handleChange} /&gt;
        {errors.name &amp;&amp; &lt;p&gt;{errors.name}&lt;/p&gt;}

        &lt;input type=&quot;email&quot; name=&quot;email&quot; value={formData.email} placeholder=&quot;Email&quot;
onChange={handleChange} /&gt;
        {errors.email &amp;&amp; &lt;p&gt;{errors.email}&lt;/p&gt;}

        &lt;textarea name=&quot;feedback&quot; value={formData.feedback} placeholder=&quot;Your Feedback&quot;
onChange={handleChange} /&gt;
        {errors.feedback &amp;&amp; &lt;p&gt;{errors.feedback}&lt;/p&gt;}

        &lt;button type=&quot;submit&quot;&gt;Submit&lt;/button&gt;
      &lt;/form&gt;

      {submittedData &amp;&amp; (
        &lt;div&gt;
          &lt;h3&gt;Submitted Feedback:&lt;/h3&gt;
          &lt;p&gt;&lt;strong&gt;Name:&lt;/strong&gt; {submittedData.name}&lt;/p&gt;
          &lt;p&gt;&lt;strong&gt;Email:&lt;/strong&gt; {submittedData.email}&lt;/p&gt;
          &lt;p&gt;&lt;strong&gt;Feedback:&lt;/strong&gt; {submittedData.feedback}&lt;/p&gt;
        &lt;/div&gt;
      )}
    &lt;/div&gt;
  );
};

export default FeedbackForm;
