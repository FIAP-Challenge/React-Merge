import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'
import './resultDisc.css'

const ResultDisc = (props) => {


 

    const data = [
        {
          data: {
            Dominante: props.disc.dominante,
            Influente: props.disc.influente,
            Estável: props.disc.estavel,
            Condescendente: props.disc.condescendente,
            
          },
          meta: { color: 'blue' }
        },
      ];
  
  const captions = {
        // columns
        Dominante: 'Dominante',
        Influente: 'Influente',
        Estável: 'Estável',
        Condescendente: 'Condescendente',
        
      };
    return(
        <>
        <RadarChart
    captions={captions}
    data={data}
    size={450}
  />
        </>
    )
}

export default ResultDisc;