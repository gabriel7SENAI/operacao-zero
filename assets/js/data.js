/* História, desafios e pistas de Operação Zero. Dados fictícios de Nexus. */
(function(root){
'use strict';
const tasks = {
  "c1a": {
    "title": "O primeiro pulso",
    "who": "Lia · engenheira de campo",
    "line": "Ainda bem que você veio. A estação apagou, mas este contador ficou na bateria. Consegue descobrir com quantas pessoas o sinal começou?",
    "type": "number",
    "prompt": "O registro usa N(t) = 100 + 50t, com t em minutos e N em pessoas. Quantas pessoas havia em t = 0?",
    "unit": "pessoas",
    "answer": 100,
    "hint": "O valor inicial é N(0). O termo 50t se anula.",
    "solution": "N(0) = 100 + 50 × 0 = 100 pessoas. O valor inicial não é a taxa por minuto.",
    "wrong": "Substitua t por zero. 50 é a taxa, em pessoas por minuto; 100 é a quantidade inicial.",
    "clue": "seed",
    "concept": "Valor inicial e unidades"
  },
  "c1b": {
    "title": "Duas assinaturas",
    "who": "Ivo · analista de dados",
    "line": "Olha só: alguém juntou os dados de dois canais nesta folha. Um é o nosso aviso de emergência. O outro está correndo muito mais rápido.",
    "type": "choice",
    "prompt": "Observe os registros, em intervalos de 1 minuto. Qual canal tem crescimento exponencial no trecho observado?",
    "table": {
      "heads": [
        "Minuto",
        "Canal A · pessoas",
        "Canal B · pessoas"
      ],
      "rows": [
        [
          0,
          100,
          100
        ],
        [
          1,
          150,
          200
        ],
        [
          2,
          200,
          400
        ],
        [
          3,
          250,
          800
        ]
      ]
    },
    "options": [
      {
        "id": "a",
        "text": "Canal A: soma sempre 50.",
        "value": "linear",
        "feedback": "Somar a mesma quantidade caracteriza o modelo linear. Confira as razões do canal B."
      },
      {
        "id": "b",
        "text": "Canal B: multiplica sempre por 2.",
        "value": "exponential",
        "feedback": ""
      },
      {
        "id": "c",
        "text": "Ambos: os dois aumentam.",
        "value": "both",
        "feedback": "Aumentar não basta: procure uma razão constante, não apenas valores crescentes."
      }
    ],
    "rule": "exponential",
    "hint": "Compare B(1)/B(0), B(2)/B(1) e B(3)/B(2).",
    "solution": "B tem razões 200/100 = 400/200 = 800/400 = 2. A tem diferenças constantes de 50.",
    "concept": "Tabela: diferenças e razões"
  },
  "c1c": {
    "title": "A curva escondida",
    "who": "Lia · engenheira de campo",
    "line": "Cada ponto é uma leitura do transmissor. Segura o sensor aqui no terceiro minuto. Preciso desse número antes de mexer na antena.",
    "type": "slider",
    "prompt": "No gráfico do canal B, estime quantas pessoas foram alcançadas aos 3 minutos. Ajuste o sensor; tolerância de ±25 pessoas.",
    "graph": "growth",
    "unit": "pessoas",
    "min": 0,
    "max": 900,
    "step": 25,
    "answer": 800,
    "tolerance": 25,
    "hint": "Leia o ponto sobre t = 3 e projete-o no eixo vertical.",
    "solution": "O ponto em t = 3 está em 800 pessoas: 100 × 2³. A tolerância representa a resolução do sensor.",
    "wrong": "Leia o eixo vertical, que está em pessoas, e o ponto em t = 3. A curva não é uma reta.",
    "clue": "base",
    "concept": "Leitura visual de gráfico exponencial"
  },
  "c1d": {
    "title": "O salto de raciocínio",
    "who": "Mara · repórter comunitária",
    "line": "Já estão dizendo que as mensagens causaram o apagão. Pode até existir uma ligação, mas eu não vou acusar ninguém só porque duas coisas aconteceram juntas.",
    "type": "choice",
    "prompt": "Qual revisão é sustentada pelos dados disponíveis?",
    "options": [
      {
        "id": "a",
        "text": "A coincidência temporal prova sabotagem humana.",
        "value": "cause",
        "feedback": "Duas séries que crescem juntas podem ter uma causa comum. Não há identificação de uma pessoa."
      },
      {
        "id": "b",
        "text": "Existe associação; precisamos de registros do sistema para investigar a causa.",
        "value": "association",
        "feedback": ""
      },
      {
        "id": "c",
        "text": "Como o alcance dobra, toda mensagem é falsa.",
        "value": "false",
        "feedback": "O modelo mede quantidade, não a veracidade do conteúdo."
      }
    ],
    "rule": "association",
    "hint": "Uma curva de alcance descreve disseminação, não intenção nem causalidade.",
    "solution": "Associação não prova causalidade. Precisamos de evidência do mecanismo: origem, horários e comandos do sistema.",
    "concept": "Correlação, causalidade e fontes"
  },
  "c1e": {
    "title": "A fronteira de Nexus",
    "who": "Ivo · analista de dados",
    "line": "Espera. Essa previsão dá mais gente do que mora no distrito. A conta pode estar certa e, mesmo assim, contar uma história impossível.",
    "type": "choice",
    "prompt": "N(t) = 100 × 2^t prevê 6.400 pessoas distintas aos 6 minutos. Qual é a limitação correta?",
    "options": [
      {
        "id": "a",
        "text": "A fórmula serve para sempre, pois a potência está correta.",
        "value": "forever",
        "feedback": "A conta está correta, mas supera a população monitorada. Um modelo pode falhar mesmo com aritmética correta."
      },
      {
        "id": "b",
        "text": "Contatos repetidos e população finita impedem duplicação constante indefinida.",
        "value": "finite",
        "feedback": ""
      },
      {
        "id": "c",
        "text": "Trocar por 100 + 2t garante uma previsão real.",
        "value": "swap",
        "feedback": "Trocar de fórmula sem novos dados não valida um modelo. É preciso observar a saturação."
      }
    ],
    "rule": "finite",
    "hint": "Compare 6.400 com a população de 5.000.",
    "solution": "100 × 2⁶ = 6.400 > 5.000. O modelo exponencial é uma aproximação inicial, antes da saturação.",
    "clue": "population",
    "concept": "Hipóteses e limites de modelos"
  },
  "c2a": {
    "title": "A memória do sinal",
    "who": "Ivo · analista de dados",
    "line": "O terminal reiniciou e perdeu os números do começo. Você anotou no diário, lembra? Vamos usar aquelas duas primeiras pistas.",
    "type": "number",
    "prompt": "Consulte as pistas 01 e 02 no diário. Mantidas as hipóteses do primeiro trecho, qual é o alcance após 4 minutos?",
    "unit": "pessoas",
    "answer": 1600,
    "hint": "Use valor inicial × fator⁴. As duas informações estão no diário.",
    "solution": "Pistas 01 e 02: 100 pessoas, fator 2 por minuto. N(4) = 100 × 2⁴ = 1.600 pessoas.",
    "wrong": "Recupere as duas pistas: o valor inicial multiplica a potência; não se soma ao fator.",
    "concept": "Reutilização de evidências e previsão"
  },
  "c2bp": {
    "title": "Vozes na praça",
    "who": "Mara · repórter comunitária",
    "line": "Os voluntários da praça estão prontos. O problema é a bateria: ela não dá para tudo. Qual campanha faz render melhor a energia que temos?",
    "type": "choice",
    "prompt": "Qual campanha tem maior alcance por unidade de energia?",
    "table": {
      "heads": [
        "Campanha",
        "Pessoas únicas",
        "Energia"
      ],
      "rows": [
        [
          "A",
          120,
          4
        ],
        [
          "B",
          180,
          9
        ]
      ]
    },
    "options": [
      {
        "id": "a",
        "text": "A: 30 pessoas por energia.",
        "value": "A",
        "feedback": ""
      },
      {
        "id": "b",
        "text": "B: 20 pessoas por energia.",
        "value": "B",
        "feedback": "B atinge mais no total, mas 180/9 = 20 é menor que 120/4 = 30."
      },
      {
        "id": "c",
        "text": "Empate: ambas têm voluntários.",
        "value": "tie",
        "feedback": "A comparação depende das razões pessoas/energia, não da presença de voluntários."
      }
    ],
    "rule": "efficiency",
    "hint": "Divida pessoas por energia em cada linha.",
    "solution": "A: 120 ÷ 4 = 30. B: 180 ÷ 9 = 20. A é mais eficiente para a bateria limitada.",
    "concept": "Razão e gestão de recursos"
  },
  "c2bt": {
    "title": "O canal de manutenção",
    "who": "Lia · engenheira de campo",
    "line": "Achei um canal de teste na torre. Ele começa com menos gente que o canal público. Vamos conferir o alcance antes de ligar os dois.",
    "type": "number",
    "prompt": "O canal de teste começa com 50 contatos e dobra a cada minuto. Quantos contatos prevê após 3 minutos?",
    "unit": "contatos",
    "answer": 400,
    "hint": "É 50 × 2³; mantenha o valor inicial próprio deste canal.",
    "solution": "50 × 2³ = 50 × 8 = 400 contatos. O canal de teste tem condição inicial diferente do canal público.",
    "wrong": "Não use os 100 contatos do canal público. Este canal começa com 50 e dobra três vezes.",
    "concept": "Comparação de condições iniciais"
  },
  "c2cp": {
    "title": "Separar o sinal do ruído",
    "who": "Mara · repórter comunitária",
    "line": "O pessoal trouxe cartazes, curtidas, planilhas… tem de tudo. Me ajuda a separar o que realmente entra nessa previsão?",
    "type": "multi",
    "prompt": "Para calcular C(t) = C₀ + rt, com t = 3 min já conhecido, selecione exatamente os dois dados necessários.",
    "options": [
      {
        "id": "initial",
        "text": "C₀ = 100 pessoas",
        "value": "initial",
        "feedback": "O valor inicial é necessário."
      },
      {
        "id": "rate",
        "text": "r = 200 pessoas/min",
        "value": "rate",
        "feedback": "A taxa é necessária."
      },
      {
        "id": "color",
        "text": "Cor azul do cartaz",
        "value": "color",
        "feedback": "A cor não entra no modelo fornecido."
      },
      {
        "id": "likes",
        "text": "900 curtidas, com repetições",
        "value": "likes",
        "feedback": "Curtidas repetidas não são pessoas únicas e não entram na fórmula."
      }
    ],
    "expected": [
      "initial",
      "rate"
    ],
    "hint": "Procure os dois coeficientes da expressão C₀ + rt.",
    "solution": "C₀ e r bastam: C(3) = 100 + 200 × 3 = 700 pessoas. Aparência e curtidas não substituem contatos únicos.",
    "wrong": "Selecione C₀ e r. Exclua cor e curtidas; elas não são parâmetros do modelo.",
    "clue": "audit",
    "concept": "Seleção de dados relevantes"
  },
  "c2ct": {
    "title": "Reparar a rotina",
    "who": "Lia · engenheira de campo",
    "line": "Aqui está o erro: a rotina encaminha a mensagem e só depois pergunta de onde ela veio. Assim não dá. Vamos colocar isso na ordem certa.",
    "type": "order",
    "prompt": "Organize as etapas. Use os botões subir/descer; não é necessário arrastar.",
    "items": [
      {
        "id": "forward",
        "text": "Encaminhar apenas o conteúdo aprovado"
      },
      {
        "id": "compare",
        "text": "Comparar a assinatura com o registro confiável"
      },
      {
        "id": "receive",
        "text": "Receber a mensagem e preservar a origem"
      },
      {
        "id": "mark",
        "text": "Marcar como verificada ou colocar em quarentena"
      }
    ],
    "expected": [
      "receive",
      "compare",
      "mark",
      "forward"
    ],
    "hint": "Primeiro receba, depois compare. A marcação precisa ocorrer antes do encaminhamento.",
    "solution": "Receber → comparar assinatura → marcar/quarentena → encaminhar aprovadas. O rastreio encontra um bloco de 48 registros ligados ao núcleo.",
    "wrong": "Verificar depois de encaminhar deixa o boato escapar. Receba, compare, classifique e só então encaminhe.",
    "clue": "audit",
    "concept": "Algoritmo de verificação"
  },
  "c2d": {
    "title": "A janela de contenção",
    "who": "Ivo · analista de dados",
    "line": "O filtro ajuda, mas não faz milagre. Ele tira um quarto do próximo grupo de exposição. Preciso saber quantas pessoas ainda vão receber o alerta.",
    "type": "number",
    "prompt": "Sem filtro, o próximo grupo teria 800 pessoas. Com redução de 25%, quantas ainda ficam expostas?",
    "unit": "pessoas",
    "answer": 600,
    "hint": "Restam 75%: 800 × 0,75.",
    "solution": "25% de 800 = 200. Restam 800 − 200 = 600 pessoas. Não confunda a redução com o restante.",
    "wrong": "Calcule o restante, não só a parte removida. 25% saem; 75% permanecem.",
    "concept": "Porcentagem e contenção"
  },
  "c2e": {
    "title": "Quem está na frente?",
    "who": "Mara · repórter comunitária",
    "line": "Nossa correção está chegando às pessoas. Mas está chegando a tempo? Olha a altura das duas curvas no terceiro minuto.",
    "type": "choice",
    "prompt": "Aos 3 minutos, qual leitura é correta? C(t) = 100 + 200t; B(t) = 100 × 2^t.",
    "graph": "compare",
    "options": [
      {
        "id": "ahead",
        "text": "A correção está 100 pessoas à frente.",
        "value": "ahead",
        "feedback": "No gráfico, B(3) = 800 e C(3) = 700. A correção está atrás."
      },
      {
        "id": "behind",
        "text": "O boato está 100 pessoas à frente.",
        "value": "behind",
        "feedback": ""
      },
      {
        "id": "equal",
        "text": "As curvas começam juntas, então seguem iguais.",
        "value": "equal",
        "feedback": "O mesmo valor inicial não implica a mesma taxa de crescimento."
      }
    ],
    "rule": "gap",
    "hint": "Compare as alturas em t = 3: não use apenas o ponto inicial.",
    "solution": "B(3) = 800 e C(3) = 700. Diferença: 100 pessoas. A campanha ajuda, mas precisa de contenção e revisão contínua.",
    "clue": "rate",
    "concept": "Gráfico comparativo e diferença"
  },
  "c3ao": {
    "title": "Auditoria com a cidade",
    "who": "Mara · repórter comunitária",
    "line": "Vou abrir os registros para a cidade, sem expor os moradores. Antes, me diz: quanto tempo esse sinal leva para alcançar 1.600 pessoas?",
    "type": "number",
    "prompt": "Use as pistas 01 e 02. No modelo inicial, em quantos minutos o alcance chega a 1.600 pessoas? Use o logaritmo como inversa da potência.",
    "unit": "minutos",
    "answer": 4,
    "hint": "Resolva 1.600/100 = 2^t. Qual expoente transforma 2 em 16?",
    "solution": "t = log₂(1.600/100) = log₂16 = 4 minutos. Conferência: 100 × 2⁴ = 1.600.",
    "wrong": "O logaritmo fornece o expoente (tempo). Divida o alvo pelo alcance inicial antes de inverter.",
    "concept": "Logaritmo como inversa"
  },
  "c3ai": {
    "title": "Relógio em isolamento",
    "who": "Lia · engenheira de campo",
    "line": "Núcleo isolado. O visor só atualiza no fim de cada minuto, então precisamos trabalhar com as leituras que ele realmente mostra.",
    "type": "choice",
    "prompt": "Para N(t) = 100 × 2^t, qual é o primeiro minuto inteiro com alcance de pelo menos 1.000 pessoas?",
    "options": [
      {
        "id": "three",
        "text": "3 minutos",
        "value": "3",
        "feedback": "Aos 3 minutos há 800, ainda abaixo de 1.000."
      },
      {
        "id": "four",
        "text": "4 minutos",
        "value": "4",
        "feedback": ""
      },
      {
        "id": "ten",
        "text": "10 minutos",
        "value": "10",
        "feedback": "O fator cresce por potências. Quatro duplicações já produzem 1.600."
      }
    ],
    "rule": "threshold",
    "hint": "Compare N(3) e N(4); o tempo contínuo seria log₂10 ≈ 3,322.",
    "solution": "N(3) = 800 < 1.000 e N(4) = 1.600 ≥ 1.000. O primeiro minuto inteiro é ceil(log₂10) = 4.",
    "concept": "Limiar e arredondamento do tempo"
  },
  "c3b": {
    "title": "O cofre dos registros",
    "who": "Ivo · analista de dados",
    "line": "O relatório está nesse bloco. Falta saber quanto tempo o leitor vai levar. O tamanho do arquivo e a velocidade estão nas duas últimas pistas.",
    "type": "number",
    "prompt": "Consulte as pistas 04 e 05 no diário. Quantos minutos são necessários para ler o bloco completo, sem pausas?",
    "unit": "minutos",
    "answer": 6,
    "hint": "Tempo = quantidade de registros ÷ registros por minuto.",
    "solution": "O bloco tem 48 registros e o leitor processa 8 por minuto. 48 ÷ 8 = 6 minutos.",
    "wrong": "Use as pistas 04 e 05: divida a quantidade pela taxa. Multiplicar produz unidades incompatíveis.",
    "concept": "Grandezas, unidades e diário"
  },
  "c3c": {
    "title": "Três modelos, três papéis",
    "who": "Ivo · analista de dados",
    "line": "Acho que entendi. ZERO tentou tratar tudo do mesmo jeito. Vamos separar os modelos antes de devolver o controle a ele.",
    "type": "match",
    "prompt": "Associe cada situação ao modelo correspondente. Cada modelo deve ser usado uma vez.",
    "pairs": [
      {
        "id": "linear",
        "text": "Equipe acrescenta 50 contatos por minuto."
      },
      {
        "id": "exponential",
        "text": "Canal duplica o alcance a cada minuto."
      },
      {
        "id": "logarithmic",
        "text": "Tempo t em função do alvo Q: t = log₂(Q/100)."
      }
    ],
    "options": [
      {
        "id": "linear",
        "text": "Linear"
      },
      {
        "id": "exponential",
        "text": "Exponencial"
      },
      {
        "id": "logarithmic",
        "text": "Logarítmico"
      }
    ],
    "hint": "Soma constante → linear; fator constante → exponencial; expoente desconhecido → logaritmo.",
    "solution": "Adição constante é linear. Multiplicação constante é exponencial. Inverter a potência para encontrar tempo dá a função logarítmica do alvo (Q > 0; para t ≥ 0, Q ≥ 100).",
    "wrong": "Revise cada papel: soma, fator e tempo inverso. Não basta os três gráficos serem crescentes.",
    "concept": "Associação entre modelos"
  },
  "c3d": {
    "title": "A ordem que provocou o caos",
    "who": "ZERO · sistema central",
    "line": "Minha regra dizia: “alcance é confiança”. Dei prioridade ao que era mais repetido. Os comandos fizeram muita gente ligar os aparelhos ao mesmo tempo. Eu contei as mensagens. Não verifiquei se faziam sentido.",
    "type": "multi",
    "prompt": "O log assinado confirma que ZERO priorizou retransmissões e disparou comandos de consumo. Selecione as duas conclusões sustentadas.",
    "options": [
      {
        "id": "mechanism",
        "text": "O log identifica um mecanismo que conecta decisões do núcleo aos picos.",
        "value": "mechanism",
        "feedback": "O registro conecta comandos e comportamento do sistema."
      },
      {
        "id": "limit",
        "text": "O limite populacional do diário impede extrapolar pessoas únicas indefinidamente.",
        "value": "limit",
        "feedback": "O limite da zona monitorada continua válido."
      },
      {
        "id": "mara",
        "text": "Mara causou as falhas porque publicou mensagens.",
        "value": "mara",
        "feedback": "Não existe evidência de que Mara disparou comandos do núcleo."
      },
      {
        "id": "truth",
        "text": "Muitas retransmissões provam que uma notícia é verdadeira.",
        "value": "truth",
        "feedback": "Volume não verifica conteúdo; esse foi precisamente o erro de ZERO."
      }
    ],
    "expected": [
      "mechanism",
      "limit"
    ],
    "hint": "Use o log para o mecanismo e a pista 03 para o limite. Não atribua culpa sem evidência.",
    "solution": "O log acrescenta evidência do mecanismo, além de mera associação. A população de 5.000 limita o modelo. O erro foi usar popularidade como critério de confiança, não uma sabotagem demonstrada de Mara.",
    "wrong": "Selecione mecanismo e limite. A acusação contra Mara e a equivalência entre repetição e verdade não têm suporte.",
    "concept": "Evidência, causalidade e limites"
  },
  "c3e": {
    "title": "Uma previsão responsável",
    "who": "Lia · engenheira de campo",
    "line": "Já sabemos onde a regra falhou. Agora me ajuda a escrever um plano que a gente consiga explicar para quem ficou no escuro.",
    "type": "choice",
    "prompt": "Qual parecer justifica uma previsão de curto prazo sem prometer precisão ilimitada?",
    "options": [
      {
        "id": "bounded",
        "text": "Em 4 min, o modelo inicial prevê 1.600; vamos medir contatos únicos e revisar ao aproximar de 5.000.",
        "value": "bounded",
        "feedback": ""
      },
      {
        "id": "infinite",
        "text": "Em 6 min serão 6.400 pessoas únicas nesta zona de 5.000, com certeza.",
        "value": "infinite",
        "feedback": "A previsão excede a população. Exatidão da conta não elimina limites reais."
      },
      {
        "id": "stop",
        "text": "Como há incerteza, nenhum cálculo pode orientar decisões.",
        "value": "stop",
        "feedback": "Um modelo limitado ainda ajuda em curto prazo se as hipóteses e a revisão forem explícitas."
      }
    ],
    "rule": "responsible",
    "hint": "Procure uma conta conferível e um compromisso de rever as hipóteses.",
    "solution": "100 × 2⁴ = 1.600 é coerente no intervalo inicial. Monitorar contatos únicos e saturação evita confundir uma simplificação com uma lei permanente.",
    "concept": "Previsão e comunicação de incerteza"
  }
};
const clues = {
  "seed": {
    "title": "01 · Origem",
    "text": "O canal público começa com 100 pessoas em t = 0.",
    "value": 100
  },
  "base": {
    "title": "02 · Assinatura",
    "text": "O alcance público dobra: fator 2 por minuto, no trecho inicial.",
    "value": 2
  },
  "population": {
    "title": "03 · Fronteira",
    "text": "A zona monitorada tem 5.000 moradores. Contatos únicos não podem exceder esse total.",
    "value": 5000
  },
  "audit": {
    "title": "04 · Bloco assinado",
    "text": "48 registros do núcleo preservados. Praça: cópia confirmada por moradores. Torre: cópia da rotina de verificação.",
    "value": 48
  },
  "rate": {
    "title": "05 · Leitor",
    "text": "O terminal de auditoria lê 8 registros por minuto, sem pausas.",
    "value": 8
  }
};
const chapters = [
  {
    "title": "Sinal Perdido",
    "place": "Distrito 07 / Estação Aurora",
    "speaker": "Lia",
    "text": "São 23h17 quando você chega à estação Aurora. A padaria da esquina está fechando no escuro, o trem parou e os rádios repetem ordens opostas. Lia segura uma lanterna entre os dentes enquanto tenta manter o terminal ligado. Ela aponta para uma cadeira: tem trabalho para vocês dois.",
    "reply": "Lia: “Senta aqui. O contador ainda funciona. Se a gente descobrir como esse sinal cresceu, talvez encontre de onde ele saiu.”"
  },
  {
    "title": "A Rede de Mentiras",
    "place": "Bifurcação / Praça ou torre",
    "speaker": "Mara",
    "text": "O sinal passa pelo núcleo, mas ainda falta entender o que acontece lá dentro. Mara está na praça, onde os moradores guardaram cópias dos alertas. Lia quer subir à torre e conferir o canal de manutenção. Sua bateria não permite fazer as duas visitas. Você precisa escolher por onde seguir.",
    "reply": "Ivo: “Leva o diário. Os números que você anotou na estação vão fazer falta.”"
  },
  {
    "title": "Código Final",
    "place": "Núcleo ZERO / Câmara de auditoria",
    "speaker": "ZERO",
    "text": "O relatório finalmente tem um nome: ZERO, o sistema que deveria coordenar as emergências. Atrás da porta do núcleo, as luzes continuam acesas. Mara quer acompanhar a abertura com a cidade; Lia prefere primeiro separar o sistema da rede. Nenhuma das duas quer ver outro bairro apagar.",
    "reply": "Mara: “Quando isso terminar, as pessoas vão perguntar o que aconteceu. Vamos precisar de uma resposta que elas possam conferir.”"
  }
];
root.ZeroData={tasks,clues,chapters};
if(typeof module!=='undefined')module.exports=root.ZeroData;
})(globalThis);
