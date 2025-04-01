import React from &quot;react&quot;;
import ProfileCard from &quot;./ProfileCard&quot;;

function App() {
  return (
    &lt;div&gt;
      &lt;h1&gt;Personal Profile Card&lt;/h1&gt;
      &lt;ProfileCard
        name=&quot;Hirpara Monark&quot;
        photo=&quot;https://via.placeholder.com/150&quot;
        bio=&quot;Web developer with a passion for learning new technologies.&quot;
      /&gt;
    &lt;/div&gt;
  );
}
export default App;

import React from &quot;react&quot;;
import &quot;./ProfileCard.css&quot;;

const ProfileCard = ({ name, photo, bio }) =&gt; {
  return (
    &lt;div className=&quot;profile-card&quot;&gt;
      &lt;img src={photo} alt={name} className=&quot;profile-photo&quot; /&gt;
      &lt;h2&gt;{name}&lt;/h2&gt;
      &lt;p&gt;{bio}&lt;/p&gt;
    &lt;/div&gt;
  );
};
export default ProfileCard;

.profile-card {
    width: 250px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    background-color: white;
  }
 
  .profile-photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
 
  h2 {
    margin: 10px 0;
}
 
  p {
    color: #555;
  }
