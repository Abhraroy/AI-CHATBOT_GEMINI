
import { TypeAnimation } from 'react-type-animation';


function Typing() {

    
      return (
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'Chat with your own AI',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'Built with GEMINI',
            1000,
            'Your own gemini',
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: '60px', display: 'inline-block',color:"white" }}
          repeat={Infinity}
        />
      );
}

export default Typing