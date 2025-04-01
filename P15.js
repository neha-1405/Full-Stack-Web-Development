import React, { useState } from &quot;react&quot;;

function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;div style={styles.container}&gt;
      &lt;h1&gt;Counter: {count}&lt;/h1&gt;
      &lt;div&gt;
        &lt;button onClick={() =&gt; setCount(count + 1)} style={styles.button}&gt;
          Increment
        &lt;/button&gt;
        &lt;button onClick={() =&gt; setCount(count - 1)} style={styles.button}&gt;
          Decrement
        &lt;/button&gt;
        &lt;button onClick={() =&gt; setCount(0)} style={styles.button}&gt;
          Reset
        &lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;

  );
}

const styles = {
  container: {
    textAlign: &quot;center&quot;,
    marginTop: &quot;50px&quot;,
  },
  button: {
    margin: &quot;10px&quot;,
    padding: &quot;10px 20px&quot;,
    fontSize: &quot;16px&quot;,
    cursor: &quot;pointer&quot;,
  },
};

export default Counter;

import React from &quot;react&quot;;
import ReactDOM from &quot;react-dom/client&quot;;  // ✅ Correct import for React 18
import App from &quot;./App&quot;;

const root = ReactDOM.createRoot(document.getElementById(&quot;root&quot;));  // ✅ Correct method
root.render(&lt;App /&gt;);
