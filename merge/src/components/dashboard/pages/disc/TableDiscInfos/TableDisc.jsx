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
                        em um teste de personalidade, uma pessoa dominante ?? aquela que se adapta melhor ??s dificuldades,
                        de modo a solucion??-las com mais facilidade.</p>
                    <p>Em uma equipe, por exemplo, as pessoas desse perfil s??o aquelas que se antecipam ??s adversidades</p>
                    <p>E mesmo que os obst??culos surjam, elas s??o as primeiras a tomar ?? frente e pensar em estrat??gias para super??-lo</p>
                    <p>Os dominantes tamb??m podem ser ??timos l??deres. Neste caso, se souberem aproveitar a presen??a da caracter??stica
                        comandante, s??o capazes de inspirar e orientar seus liderados para a obten????o de resultados.</p>
                    <p>Neste caso, independente da hierarquia, os Dominantes s??o comumente vistos em posi????es como:</p>

                    <ul>
                        <li>Diretoria Comercial</li>
                        <li>Diretoria Financeira</li>
                        <li>Coordena????o de Novos Neg??cios</li>
                        <li>Ger??ncia de Varejo</li>
                        <li>Consultoria de Vendas</li>
                        <li>Controladoria de Qualidade</li>
                        <li>Assist??ncia em Expans??o de Neg??cios</li>
                        <li>Governan??a</li>

                    </ul>
  
                    <h3>
                        Entenda agora quais s??o as principais caracter??sticas do perfil dominante:
                    </h3>   

                    <ul>
                        <li><strong>Vision??ria</strong> ??? enxerga o futuro.</li>
                        <li><strong>Ambiciosa</strong> ??? busca vencer sempre.</li>
                        <li><strong>Gosta de desafios</strong> ??? quebra limites externos de tempo/espa??o.</li>
                        <li><strong>Perspicaz</strong> ??? antenada com as oportunidades.</li>
                        <li><strong>Foca nos resultados</strong> ??? n??o admite falhar.</li>
                        <li><strong>Autorreferenciada</strong> ??? r??pida nas decis??es.</li>
                        <li><strong>Assume o poder</strong> ??? dita as ordens na primeira oportunidade.</li>
                    </ul>

                </div>



            </TabPanel>
            <TabPanel value={value} index={1}>
                <div className='infos-table'>
                    <h3>Perfil influente: Entenda o perfil</h3>
                    <p>Os indiv??duos com o esse perfil s??o calorosos e acolhedores e se preocupam com os sentimentos das outras pessoas ao seu redor.</p>
                    <p>Al??m disso, s??o considerados encantadores para aqueles que convivem com eles.</p>
                    <p>Isso faz com que eles possam socializar em qualquer ambiente de forma natural e amig??vel.</p>
                    <p>Tamb??m criativo esse indiv??duo pensa em voz alta e n??o se importa em se expressar de forma franca com as pessoas do seu ciclo social, essa atitude faz com ele seja visto de forma confi??vel.</p>
                    <p>Al??m disso, como s??o mais expressivos usam gestos e express??es na sua forma de se comunicar para garantir que sua mensagem seja compreendida</p>
                    <p>Trazem tamb??m com eles uma habilidade de persuas??o, isso se d?? por conta da facilidade de comunica????o que tem e por levarem muito em conta a opini??o dos outros sabe exatamente o que os motivaria.</p>
                    <p>Tais caracter??sticas s??o essenciais e sempre solicitadas nos cargos de, por exemplo, lideran??a.Por??m, ?? claro, assim como todos os perfis, existem alguns pontos e caracter??sticas que podem ser trabalhadas.</p>

                    <h3>
                        Entenda agora quais s??o as principais caracter??sticas do perfil influente:
                    </h3>

                    <ul>
                        <li><strong>Idealista</strong> ??? busca satisfazer as pessoas.</li>
                        <li><strong>Busca a harmonia entre as pessoas</strong> ??? foco no prazer.</li>
                        <li><strong>Simp??tico</strong> ??? influencia e motiva as pessoas.</li>
                        <li><strong>Intuitivo</strong> ??? escuta seu cora????o.</li>
                        <li><strong>Persuasivo</strong> ??? quebra as barreiras internas.</li>
                        <li><strong>Flex??vel</strong> ??? capacidade de adaptar-se e trazer leveza ?? vida.</li>
                        <li><strong>Comunicativo</strong> ??? flu??ncia verbal.</li>
                    </ul>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div className='infos-table'>
                    <h3>Perfil est??vel: Entenda o perfil</h3>
                    <p>Inicialmente, o que voc?? precisa entender ?? que esses indiv??duos s??o reservados e imaginativos. Se guardam das opini??es das pessoas e usam sua criatividade para viver mentalmente tudo que n??o fazem por receio do novo.</p>
                    <p>S??o tamb??m calmos com fala tranquila e muito atenciosos, cuidadosos em tudo que fazem, s??o extremamente gentis e pacientes. Pessoas com esse perfil est??o dispostas a ouvir bem mais do que falar, deixam que o outros expressem seus sentimentos.</p>
                    <p>S??o emp??ticas, a opini??o dos outros ?? muito importante e s??o sempre levadas em considera????o antes que eles tomem qualquer decis??o.</p>
                    <p>Por??m, quando o a pessoa de perfil est??vel toma uma decis??o, dificilmente volta atr??s, uma vez decidido est?? decidido e n??o se fala mais sobre o assunto. Al??m dessas caracter??sticas, o perfil Est??vel possui muitos outros diferenciais que o tornam pe??a chave dentro das no mundo corporativo.</p>
                    
                    <h3>
                        Entenda agora quais s??o as principais caracter??sticas do perfil est??vel:
                    </h3>

                    <ul>
                        <li><strong>Est??veis</strong> ??? Buscam a seguran??a, procurando sempre deixar o ambiente apraz??vel e seguro.</li>
                        <li><strong>Simp??ticas</strong> ??? Est??o sempre dispon??veis para colaborar e gostam de ajudar as pessoas.</li>
                        <li><strong>Sens??veis</strong> ??? Valorizam os sentimentos dos outros e empatizam com as pessoas a respeito de seus problemas.</li>
                        <li><strong>Imaginativas</strong> ??? Quebram as barreiras da imagina????o e fantasiam com facilidade porque vivenciam mentalmente tudo aquilo que n??o vivem na vida real, por falta de coragem ou vontade.</li> 
                        <li><strong>Atenciosas</strong> ??? Capacidade de ouvir atentamente as pessoas e se interessam realmente pelo que elas dizem.</li>
                        <li><strong>Pacientes</strong> ??? Sabem esperar as oportunidades surgirem.</li>
                        <li><strong>Persistentes</strong> ??? Terminam tudo o que iniciaram.</li>
                        <li>S??o pessoas que amam a beleza e a poesia da vida e possuem grande <strong>senso de est??tica</strong>, trazendo ao ambiente uma sensa????o de aconchego.</li>
                    </ul>
                </div>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <div className='infos-table'>
                    <h3>Perfil cautela: Entenda o perfil</h3>
                    <p>Neste caso, inicialmente, o que voc?? precisa entender ?? que pessoas que possuem este perfil s??o pessoas aut??nomas, reservadas.</p>
                    <p>Normalmente trabalham de forma focada e independente por longos per??odos, em vez de ter que trabalhar com as m??ltiplas tarefas.</p>
                    <p>A personalidade C ?? marcada por comportamentos est??veis ??????e estoicos que algumas vezes podem at?? parecer rob??ticos. Neste caso, mesmo que gostem de longas conversas e de assuntos complexos esse tra??o fica muito evidente.</p>
                    <p>Disciplinados e perfeccionistas tamb??m seguem bem as regras e normas, se preocupam muito em atingir o n??vel de perfei????o estipulado por eles mesmos em tudo em que fazem.</p>
                    <p>Al??m disso s??o pessoas ponderados que buscam estar certos e sempre que poss??vel ao lado da verdade. Na maioria das vezes, tendem a ser diplomatas e n??o reagem com agressividade mais sim com propriedade nos seus argumentos.</p>
                    <p>Usam a l??gica para guiar as solu????es de problemas em vez de serem envolvidos pelas emo????es que podem confundir seu julgamento.</p>
                    <p>Por??m, al??m dessas caracter??sticas, o perfil conforme possui muitos outros diferenciais que o tornam pe??a chave dentro das principais estrat??gias no mundo corporativo.</p>

                    <h3>
                        Entenda agora quais s??o as principais caracter??sticas do perfil est??vel:
                    </h3>

                    <ul>
                        <li><strong>L??gicos</strong> ??? Buscam a certeza nos fatos, querem os detalhes de tudo o que aconteceu.</li>
                        <li><strong>Anal??ticos</strong> ??? Pesquisam o passado, analisam o presente e projetam o futuro.</li>
                        <li><strong>Curiosos</strong> ??? Mergulham nos detalhes, sempre na busca da profundidade do conhecimento.</li>
                        <li><strong>Disciplinados</strong> ??? Seguem as normas e padr??es pr??-estabelecidos e descobrem, com sua sensibilidade agu??ada, novos pontos de converg??ncia, criando outros padr??es.</li>
                        <li><strong>Ponderados</strong> ??? Buscam ser justos e estar sempre certos e ao lado da verdade.</li>
                        <li><strong>Diplom??ticos</strong> ??? N??o confrontam com agressividade, usam argumentos consistentes.</li>
                        <li><strong>Perfeccionistas</strong> ??? Desejam que tudo saia como planejaram e s?? se satisfazem se atingirem o n??vel de perfei????o estipulado por eles mesmos.</li>
                    </ul>
                </div>
            </TabPanel>

        </Box>
    );
}
