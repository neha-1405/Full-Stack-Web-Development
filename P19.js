import React, { useState, useEffect } from &quot;react&quot;;

const API_KEY = &quot;aa62e1e8b9504a1c85d115029253103&quot;; // Your API key

const Weather = () =&gt; {
  const [city, setCity] = useState(&quot;London&quot;); // Default city
  const [weather, setWeather] = useState(null);

  useEffect(() =&gt; {
    const fetchWeather = async () =&gt; {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&amp;q=${city}`
        );
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error(&quot;Error fetching weather data:&quot;, error);
      }
};

    fetchWeather();
  }, [city]); // ✅ Fix: Only depends on &#39;city&#39;

  return (
    &lt;div className=&quot;weather-container&quot;&gt;
      &lt;h2&gt;Weather App&lt;/h2&gt;
      &lt;input
        type=&quot;text&quot;
        value={city}
        onChange={(e) =&gt; setCity(e.target.value)}
        placeholder=&quot;Enter city&quot;
      /&gt;
      &lt;button onClick={() =&gt; setCity(city)}&gt;Get Weather&lt;/button&gt;

      {weather ? (
        &lt;div&gt;
          &lt;h3&gt;{weather.location.name}, {weather.location.country}&lt;/h3&gt;
          &lt;p&gt;Temperature: {weather.current.temp_c}°C&lt;/p&gt;
          &lt;p&gt;Condition: {weather.current.condition.text}&lt;/p&gt;
          &lt;img src={weather.current.condition.icon} alt=&quot;Weather icon&quot; /&gt;
        &lt;/div&gt;
      ) : (
        &lt;p&gt;Loading weather...&lt;/p&gt;
      )}
    &lt;/div&gt;
  );
};
export default Weather;
