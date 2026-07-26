import { Link } from "react-router-dom";

function Home() {

  return (

    <>

      <section className="home-page">

        <div className="hero">

          <h1>
            Quality Soap,
            <br />
            Made For Everyday Care
          </h1>


          <p>
            Discover beautifully scented soaps made with carefully
            selected ingredients. Find your favorite fragrance and
            enjoy simple care delivered to your door. Not suspicious at all.
             This isn't a drug business disguised as a soap business.
          </p>


          <Link to="/shop">

            <button>
              Explore Products
            </button>

          </Link>

        </div>

      </section>



      <section className="features-section">


        <div className="feature-card">

          <h3>
            Fresh Fragrances
          </h3>

          <p>
            A collection of different scents designed for your daily routine.
          </p>

        </div>



        <div className="feature-card">

          <h3>
            Quality Products
          </h3>

          <p>
            Carefully selected soaps with attention to comfort and freshness.
          </p>

        </div>



        <div className="feature-card">

          <h3>
            Easy Delivery
          </h3>

          <p>
            Order online and receive your products with convenient delivery.
          </p>

        </div>


      </section>



      <section className="contact-section">


        <h2>
          Contact Us
        </h2>


        <p>
          Have a question or want to place an order?
        </p>


        <div className="contact-details">


          <p>
            WhatsApp: +961 XX XXX XXX
          </p>


          <p>
            Instagram: @yourstore
          </p>


          <p>
            Facebook: Soap Store
          </p>


        </div>


      </section>



      <footer className="home-footer">


        <p>
          Follow us
        </p>


        <div>

          <a href="#">
            Instagram
          </a>


          <a href="#">
            Facebook
          </a>


          <a href="#">
            TikTok
          </a>

        </div>


        <p>
          © 2026 Soap Store
        </p>


      </footer>


    </>

  );

}

export default Home;