import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './tableDisc.css'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function TableDisc() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'flex' }}
        >
            <Tabs
                visibleScrollbar={true}
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label="Dominante" {...a11yProps(0)} />
                <Tab label="Influente" {...a11yProps(1)} />
                <Tab label="Estabilidade" {...a11yProps(2)} />
                <Tab label="Cautela" {...a11yProps(3)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <div className='infos-table'>
                    <h3>Perfil dominante: Entenda o perfil</h3>
                    <p>Segundo a metodologia DISC, que estabelece quatro perfis profissionais com base
                        em um teste de personalidade, uma pessoa dominante é aquela que se adapta melhor às dificuldades,
                        de modo a solucioná-las com mais facilidade.</p>
                    <p>Em uma equipe, por exemplo, as pessoas desse perfil são aquelas que se antecipam às adversidades</p>
                    <p>E mesmo que os obstáculos surjam, elas são as primeiras a tomar à frente e pensar em estratégias para superá-lo</p>
                    <p>Os dominantes também podem ser ótimos líderes. Neste caso, se souberem aproveitar a presença da característica
                        comandante, são capazes de inspirar e orientar seus liderados para a obtenção de resultados.</p>
                    <p>Neste caso, independente da hierarquia, os Dominantes são comumente vistos em posições como:</p>

                    <ul>
                        <li>Diretoria Comercial</li>
                        <li>Diretoria Financeira</li>
                        <li>Coordenação de Novos Negócios</li>
                        <li>Gerência de Varejo</li>
                        <li>Consultoria de Vendas</li>
                        <li>Controladoria de Qualidade</li>
                        <li>Assistência em Expansão de Negócios</li>
                        <li>Governança</li>

                    </ul>
  
                    <h3>
                        Entenda agora quais são as principais características do perfil dominante:
                    </h3>   

                    <ul>
                        <li><strong>Visionária</strong> – enxerga o futuro.</li>
                        <li><strong>Ambiciosa</strong> – busca vencer sempre.</li>
                        <li><strong>Gosta de desafios</strong> – quebra limites externos de tempo/espaço.</li>
                        <li><strong>Perspicaz</strong> – antenada com as oportunidades.</li>
                        <li><strong>Foca nos resultados</strong> – não admite falhar.</li>
                        <li><strong>Autorreferenciada</strong> – rápida nas decisões.</li>
                        <li><strong>Assume o poder</strong> – dita as ordens na primeira oportunidade.</li>
                    </ul>

                </div>



            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className='infos-table'>
                    <h3>Perfil influente: Entenda o perfil</h3>
                    <p>Os indivíduos com o esse perfil são calorosos e acolhedores e se preocupam com os sentimentos das outras pessoas ao seu redor.</p>
                    <p>Além disso, são considerados encantadores para aqueles que convivem com eles.</p>
                    <p>Isso faz com que eles possam socializar em qualquer ambiente de forma natural e amigável.</p>
                    <p>Também criativo esse indivíduo pensa em voz alta e não se importa em se expressar de forma franca com as pessoas do seu ciclo social, essa atitude faz com ele seja visto de forma confiável.</p>
                    <p>Além disso, como são mais expressivos usam gestos e expressões na sua forma de se comunicar para garantir que sua mensagem seja compreendida</p>
                    <p>Trazem também com eles uma habilidade de persuasão, isso se dá por conta da facilidade de comunicação que tem e por levarem muito em conta a opinião dos outros sabe exatamente o que os motivaria.</p>
                    <p>Tais características são essenciais e sempre solicitadas nos cargos de, por exemplo, liderança.Porém, é claro, assim como todos os perfis, existem alguns pontos e características que podem ser trabalhadas.</p>

                    <h3>
                        Entenda agora quais são as principais características do perfil influente:
                    </h3>

                    <ul>
                        <li><strong>Idealista</strong> – busca satisfazer as pessoas.</li>
                        <li><strong>Busca a harmonia entre as pessoas</strong> – foco no prazer.</li>
                        <li><strong>Simpático</strong> – influencia e motiva as pessoas.</li>
                        <li><strong>Intuitivo</strong> – escuta seu coração.</li>
                        <li><strong>Persuasivo</strong> – quebra as barreiras internas.</li>
                        <li><strong>Flexível</strong> – capacidade de adaptar-se e trazer leveza à vida.</li>
                        <li><strong>Comunicativo</strong> – fluência verbal.</li>
                    </ul>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div className='infos-table'>
                    <h3>Perfil estável: Entenda o perfil</h3>
                    <p>Inicialmente, o que você precisa entender é que esses indivíduos são reservados e imaginativos. Se guardam das opiniões das pessoas e usam sua criatividade para viver mentalmente tudo que não fazem por receio do novo.</p>
                    <p>São também calmos com fala tranquila e muito atenciosos, cuidadosos em tudo que fazem, são extremamente gentis e pacientes. Pessoas com esse perfil estão dispostas a ouvir bem mais do que falar, deixam que o outros expressem seus sentimentos.</p>
                    <p>São empáticas, a opinião dos outros é muito importante e são sempre levadas em consideração antes que eles tomem qualquer decisão.</p>
                    <p>Porém, quando o a pessoa de perfil estável toma uma decisão, dificilmente volta atrás, uma vez decidido está decidido e não se fala mais sobre o assunto. Além dessas características, o perfil Estável possui muitos outros diferenciais que o tornam peça chave dentro das no mundo corporativo.</p>
                    
                    <h3>
                        Entenda agora quais são as principais características do perfil estável:
                    </h3>

                    <ul>
                        <li><strong>Estáveis</strong> – Buscam a segurança, procurando sempre deixar o ambiente aprazível e seguro.</li>
                        <li><strong>Simpáticas</strong> – Estão sempre disponíveis para colaborar e gostam de ajudar as pessoas.</li>
                        <li><strong>Sensíveis</strong> – Valorizam os sentimentos dos outros e empatizam com as pessoas a respeito de seus problemas.</li>
                        <li><strong>Imaginativas</strong> – Quebram as barreiras da imaginação e fantasiam com facilidade porque vivenciam mentalmente tudo aquilo que não vivem na vida real, por falta de coragem ou vontade.</li> 
                        <li><strong>Atenciosas</strong> – Capacidade de ouvir atentamente as pessoas e se interessam realmente pelo que elas dizem.</li>
                        <li><strong>Pacientes</strong> – Sabem esperar as oportunidades surgirem.</li>
                        <li><strong>Persistentes</strong> – Terminam tudo o que iniciaram.</li>
                        <li>São pessoas que amam a beleza e a poesia da vida e possuem grande <strong>senso de estética</strong>, trazendo ao ambiente uma sensação de aconchego.</li>
                    </ul>
                </div>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <div className='infos-table'>
                    <h3>Perfil cautela: Entenda o perfil</h3>
                    <p>Neste caso, inicialmente, o que você precisa entender é que pessoas que possuem este perfil são pessoas autônomas, reservadas.</p>
                    <p>Normalmente trabalham de forma focada e independente por longos períodos, em vez de ter que trabalhar com as múltiplas tarefas.</p>
                    <p>A personalidade C é marcada por comportamentos estáveis ​​e estoicos que algumas vezes podem até parecer robóticos. Neste caso, mesmo que gostem de longas conversas e de assuntos complexos esse traço fica muito evidente.</p>
                    <p>Disciplinados e perfeccionistas também seguem bem as regras e normas, se preocupam muito em atingir o nível de perfeição estipulado por eles mesmos em tudo em que fazem.</p>
                    <p>Além disso são pessoas ponderados que buscam estar certos e sempre que possível ao lado da verdade. Na maioria das vezes, tendem a ser diplomatas e não reagem com agressividade mais sim com propriedade nos seus argumentos.</p>
                    <p>Usam a lógica para guiar as soluções de problemas em vez de serem envolvidos pelas emoções que podem confundir seu julgamento.</p>
                    <p>Porém, além dessas características, o perfil conforme possui muitos outros diferenciais que o tornam peça chave dentro das principais estratégias no mundo corporativo.</p>

                    <h3>
                        Entenda agora quais são as principais características do perfil estável:
                    </h3>

                    <ul>
                        <li><strong>Lógicos</strong> – Buscam a certeza nos fatos, querem os detalhes de tudo o que aconteceu.</li>
                        <li><strong>Analíticos</strong> – Pesquisam o passado, analisam o presente e projetam o futuro.</li>
                        <li><strong>Curiosos</strong> – Mergulham nos detalhes, sempre na busca da profundidade do conhecimento.</li>
                        <li><strong>Disciplinados</strong> – Seguem as normas e padrões pré-estabelecidos e descobrem, com sua sensibilidade aguçada, novos pontos de convergência, criando outros padrões.</li>
                        <li><strong>Ponderados</strong> – Buscam ser justos e estar sempre certos e ao lado da verdade.</li>
                        <li><strong>Diplomáticos</strong> – Não confrontam com agressividade, usam argumentos consistentes.</li>
                        <li><strong>Perfeccionistas</strong> – Desejam que tudo saia como planejaram e só se satisfazem se atingirem o nível de perfeição estipulado por eles mesmos.</li>
                    </ul>
                </div>
            </TabPanel>

        </Box>
    );
}
