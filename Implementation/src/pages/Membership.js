import './Membership.css';

const Membership = () => {
  return (
    <div className="background">
      <div className="container background">
        <div className="row">
          <div class="backxxxx">
            <div class="panel pricing-table">

              <div class="pricing-plan">
                <img src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png" alt="" class="pricing-img" />
                <h2 class="pricing-header">Beginner</h2>
                <ul class="pricing-features">
                  <li class="pricing-features-item">Coach included</li>
                  <li class="pricing-features-item">2 bookings a week</li>
                  <li class="pricing-features-item">Equipments provided</li>
                </ul>
                <span class="pricing-price">200 AED /M</span>
                <a href="#/" class="pricing-button">Sign up</a>
              </div>

              <div class="pricing-plan">
                <img src="https://s28.postimg.cc/ju5bnc3x9/plane.png" alt="" class="pricing-img" />
                <h2 class="pricing-header">Intermediate</h2>
                <ul class="pricing-features">
                  <li class="pricing-features-item">Coach on request</li>
                  <li class="pricing-features-item">5 bookings a week</li>
                  <li class="pricing-features-item">Equipments provided</li>
                </ul>
                <span class="pricing-price">300 AED /M</span>
                <a href="#/" class="pricing-button is-featured">Sign Up</a>
              </div>

              <div class="pricing-plan">
                <img src="https://s21.postimg.cc/tpm0cge4n/space-ship.png" alt="" class="pricing-img" />
                <h2 class="pricing-header">Enterprise</h2>
                <ul class="pricing-features">
                  <li class="pricing-features-item">10 bookings a week</li>
                  <li class="pricing-features-item">NFC to conquer routes</li>
                  <li class="pricing-features-item">Equipments provided</li>

                </ul>
                <span class="pricing-price">400 AED /M</span>
                <a href="#/" class="pricing-button">Sign up</a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
