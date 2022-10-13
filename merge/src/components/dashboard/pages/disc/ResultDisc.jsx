import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'
import './resultDisc.css'

const ResultDisc = () => {

    const data = [
        {
          data: {
            Dominante: 0.90,
            Influente: 0.45,
            Estável: 0.65,
            Condescendente: 0.26,
            
          },
          meta: { color: 'red' }
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