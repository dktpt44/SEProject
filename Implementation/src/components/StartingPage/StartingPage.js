import './StartingPage.css';
import rc1 from '../../assets/rc1.jpg';
import rc2 from '../../assets/rc2.jpg';
import rc3 from '../../assets/rc3.jpg';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const StartingPage = () => {
  return (
    <div className="carouselclss">
      <Carousel showArrows={true} showThumbs={false} autoPlay={true} autoFocus={true} stopOnHover={false} infiniteLoop={true}>
        <div>
          <img src={rc1} />
          <p className="legend">“Every mountain top is within reach if you just keep climbing. – Barry Finlay”</p>
        </div>
        <div>
          <img src={rc2} />
          <p className="legend">“Only those who will risk going too far can possibly find out how far they can go. – T.S. Eliot”</p>
        </div>
        <div>
          <img src={rc3} />
          <p className="legend">“Everyone wants to live on the top of the mountain, but all the happiness and growth occurs while you’re climbing it.” – Andy Rooney</p>
        </div>

      </Carousel>
    </div>
  );
};

export default StartingPage;
