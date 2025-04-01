import React from &quot;react&quot;;
import styles from &quot;./ProductCard.module.css&quot;;

const ProductCard = ({ name, price, description }) =&gt; {
  return (
    &lt;div className={styles.card}&gt;
      &lt;h2 className={styles.name}&gt;{name}&lt;/h2&gt;
      &lt;p className={styles.price}&gt;${price}&lt;/p&gt;
      &lt;p className={styles.description}&gt;{description}&lt;/p&gt;
      &lt;button className={styles.button}&gt;Buy Now&lt;/button&gt;
    &lt;/div&gt;
  );
};

export default ProductCard;

.card {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    text-align: center;
    max-width: 350px;
    margin: 20px auto;
    transition: transform 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
 
  .card:hover {
    transform: scale(1.05);
  }
 
  .name {
    font-size: 1.6rem;
    font-weight: bold;
    color: #333;
  }
 
  .price {
    font-size: 1.4rem;
    color: green;
    font-weight: bold;
    margin: 8px 0;
  }

 
  .description {
    font-size: 1rem;
    color: #555;
    padding: 0 15px;
  }
 
  .button {
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 8px;
    margin-top: 10px;
    transition: background 0.3s ease-in-out;
  }
 
  .button:hover {
    background: #0056b3;
  }
 
  /* Responsive Design */
  @media (max-width: 768px) {
    .card {
      max-width: 90%;
      padding: 15px;
    }
   

    .name {
      font-size: 1.4rem;
    }
 
    .price {
      font-size: 1.2rem;
    }
 
    .description {
      font-size: 0.9rem;
    }
 
    .button {
      font-size: 0.9rem;
      padding: 8px 12px;
    }
  }
 
  @media (max-width: 480px) {
    .card {
      max-width: 100%;
      padding: 12px;
    }
 
    .name {
      font-size: 1.2rem;
    }
 
    .price {
      font-size: 1rem;

    }
 
    .description {
      font-size: 0.8rem;
    }
 
    .button {
      font-size: 0.8rem;
      padding: 6px 10px;
    }
  }
