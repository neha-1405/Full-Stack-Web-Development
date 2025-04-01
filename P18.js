import React, { useContext } from &quot;react&quot;;
import { ThemeContext } from &quot;./ThemeContext&quot;; // ✅ Correct import

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext); // ✅ Ensure useContext is used correctly

  const appStyles = {
    backgroundColor: theme === &quot;light&quot; ? &quot;#ffffff&quot; : &quot;#333&quot;,
    color: theme === &quot;light&quot; ? &quot;#000&quot; : &quot;#fff&quot;,
    minHeight: &quot;100vh&quot;,
    display: &quot;flex&quot;,
    alignItems: &quot;center&quot;,
    justifyContent: &quot;center&quot;,
    flexDirection: &quot;column&quot;,
    transition: &quot;all 0.3s ease&quot;,
  };

  return (
    &lt;div style={appStyles}&gt;
      &lt;h1&gt;{theme === &quot;light&quot; ? &quot;�� Light Mode&quot; : &quot;�� Dark Mode&quot;}&lt;/h1&gt;

      &lt;button
        onClick={toggleTheme}
        style={{
          padding: &quot;10px 20px&quot;,
          fontSize: &quot;16px&quot;,
          cursor: &quot;pointer&quot;,
          backgroundColor: theme === &quot;light&quot; ? &quot;#000&quot; : &quot;#fff&quot;,
          color: theme === &quot;light&quot; ? &quot;#fff&quot; : &quot;#000&quot;,
          border: &quot;none&quot;,
          borderRadius: &quot;5px&quot;,
          marginTop: &quot;20px&quot;
        }}
      &gt;
        Toggle Theme
      &lt;/button&gt;
    &lt;/div&gt;
  );
}

export default App;
