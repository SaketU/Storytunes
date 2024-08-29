import React from 'react';
import Image from 'next/image';
import eiffeltower from '../images/eiffeltower.png';
import frenchtoast from '../images/frenchtoast.png';
import tjifridays from '../images/tjifridays.png';
import nightsky from '../images/nightsky.png';
import songpic from '../images/songpic.png';

const BackgroundImages = () => (
  <>
    <Image src={eiffeltower} alt="Eiffel Tower" layout="fixed" width={200} height={300} style={{ position: 'absolute', top: '25px', left: '35px', transform: 'rotate(-10deg)' }} />
    <Image src={frenchtoast} alt="French Toast" layout="fixed" width={250} height={250} style={{ position: 'absolute', top: '30px', right: '30px', transform: 'rotate(10deg)' }} />
    <Image src={tjifridays} alt="TGI Fridays" layout="fixed" width={250} height={250} style={{ position: 'absolute', bottom: '20px', left: '30px', transform: 'rotate(-10deg)' }} />
    <Image src={nightsky} alt="Night Sky" layout="fixed" width={300} height={200} style={{ position: 'absolute', bottom: '20px', right: '20px', transform: 'rotate(10deg)' }} />
    <div style={{ position: 'absolute', top: '52%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <Image src={songpic} alt="Song Pic" layout="fixed" width={350} height={500} style={{ borderRadius: '15px' }} />
    </div>
  </>
);

export default BackgroundImages;
