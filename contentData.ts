export interface ConnectorItem {
  id: string;
  es: string;
  hy: string;
  level?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  category: string;
  exampleEs?: string;
  exampleHy?: string;
  note?: string;
}

export interface SectionContent {
  id: string;
  number: number;
  titleEs: string;
  titleHy: string;
  levelBadge?: string;
  descriptionEs?: string;
  descriptionHy?: string;
  introPoints?: { es?: string; hy: string }[];
  connectors: ConnectorItem[];
  examples?: {
    connector: string;
    es: string;
    hy: string;
    ruleNote?: string;
  }[];
  differences?: {
    title: string;
    items: { term: string; hy: string; exampleEs?: string; exampleHy?: string }[];
  };
  extraGrammar?: {
    title: string;
    explanationHy: string;
    patterns: { rule: string; exampleEs: string; exampleHy: string }[];
  };
}

export interface ConfusedPair {
  id: string;
  pairEs: string;
  pairHy: string;
  explanation: string;
}

export const SECTIONS_DATA: SectionContent[] = [
  {
    id: 'sec-1',
    number: 1,
    titleEs: '¿Qué son los conectores?',
    titleHy: 'Ի՞նչ են կապակցող բառերը',
    levelBadge: 'A2–C1',
    descriptionEs: 'Los conectores son palabras o expresiones que sirven para unir ideas, relacionar oraciones y organizar un discurso de manera lógica y clara.',
    descriptionHy: 'Conectores-ը բառեր կամ արտահայտություններ են, որոնք կապում են մտքերը, նախադասությունները և օգնում են խոսքը դարձնել տրամաբանական, հասկանալի ու սահուն։',
    introPoints: [
      {
        es: 'Sin conector: Estoy cansado. Voy a trabajar.',
        hy: 'Առանց կապակցող բառի՝ Ես հոգնած եմ։ Գնում եմ աշխատանքի։'
      },
      {
        es: 'Con conector: Estoy cansado, pero voy a trabajar.',
        hy: 'Կապակցող բառով՝ Ես հոգնած եմ, բայց գնում եմ աշխատանքի։'
      }
    ],
    connectors: [],
    differences: {
      title: 'Կարևորությունը B1–C1 մակարդակներում',
      items: [
        {
          term: 'pero-ի դերը',
          hy: 'Այստեղ pero-ն ցույց է տալիս հակադրություն երկու մտքերի միջև։'
        },
        {
          term: 'Ինչո՞ւ են կարևոր',
          hy: 'Կապակցող բառերը կարևոր են հատկապես B1–C1 մակարդակներում, երբ սովորողը ցանկանում է ոչ միայն կարճ նախադասություններ կազմել, այլ նաև բացատրել իր կարծիքը, պատմել դեպքեր, հիմնավորել որոշումները և երկար զրույց վարել։'
        }
      ]
    }
  },
  {
    id: 'sec-2',
    number: 2,
    titleEs: 'Conectores de adición',
    titleHy: 'Հավելում արտահայտող կապակցող բառեր',
    levelBadge: 'A1–B2',
    descriptionHy: 'Օգտագործվում են, երբ ցանկանում ենք ավելացնել նոր տեղեկություն կամ միտք։',
    connectors: [
      { id: 'ad-1', es: 'Y', hy: 'և', level: 'A1', category: 'Adición', exampleEs: 'Trabajo y estudio español.', exampleHy: 'Ես աշխատում եմ և սովորում իսպաներեն։' },
      { id: 'ad-2', es: 'También', hy: 'նաև', level: 'A1', category: 'Adición', exampleEs: 'Mi hermano juega al fútbol. Yo también juego.', exampleHy: 'Եղբայրս ֆուտբոլ է խաղում։ Ես նույնպես խաղում եմ։' },
      { id: 'ad-3', es: 'Además', hy: 'բացի այդ', level: 'A2', category: 'Adición', exampleEs: 'El hotel es cómodo. Además, está cerca del centro.', exampleHy: 'Հյուրանոցը հարմարավետ է։ Բացի այդ, այն գտնվում է կենտրոնի մոտ։' },
      { id: 'ad-4', es: 'Además de', hy: 'բացի ...-ից', level: 'A2', category: 'Adición', exampleEs: 'Además de inglés, habla español.', exampleHy: 'Անգլերենից բացի՝ խոսում է իսպաներեն։' },
      { id: 'ad-5', es: 'Incluso', hy: 'նույնիսկ', level: 'B1', category: 'Adición', exampleEs: 'Todos estaban cansados. Incluso el entrenador.', exampleHy: 'Բոլորը հոգնած էին։ Նույնիսկ մարզիչը։' },
      { id: 'ad-6', es: 'Asimismo', hy: 'նույնպես, ինչպես նաև', level: 'B2', category: 'Adición', exampleEs: 'Asimismo, es importante repasar el vocabulario.', exampleHy: 'Ինչպես նաև՝ կարևոր է կրկնել բառապաշարը։' },
      { id: 'ad-7', es: 'No solo... sino también', hy: 'ոչ միայն... այլ նաև', level: 'B1', category: 'Adición', exampleEs: 'No solo habla español, sino también italiano.', exampleHy: 'Նա խոսում է ոչ միայն իսպաներեն, այլ նաև իտալերեն։' },
      { id: 'ad-8', es: 'Encima', hy: 'դեռ մի բան էլ, դրան գումարած', level: 'B2', category: 'Adición', exampleEs: 'Llegó tarde y, encima, olvidó las llaves.', exampleHy: 'Նա ուշ եկավ և դեռ մի բան էլ մոռացավ բանալիները։' }
    ],
    differences: {
      title: 'Տարբերությունները հավելման բառերի միջև',
      items: [
        { term: 'También', hy: 'Պարզապես ավելացնում է տեղեկություն։' },
        { term: 'Además', hy: 'Ավելացնում է նոր փաստ կամ լրացուցիչ փաստարկ։' },
        { term: 'Incluso', hy: 'Ընդգծում է անսպասելի կամ առանձնահատուկ տեղեկություն։' },
        { term: 'Encima', hy: 'Հաճախ արտահայտում է դժգոհություն կամ անսպասելի հավելում։' }
      ]
    }
  },
  {
    id: 'sec-3',
    number: 3,
    titleEs: 'Conectores de contraste',
    titleHy: 'Հակադրություն արտահայտող կապակցող բառեր',
    levelBadge: 'A2–C1',
    descriptionHy: 'Օգտագործվում են, երբ երկու մտքեր հակադրվում են։',
    connectors: [
      { id: 'co-1', es: 'Pero', hy: 'բայց', level: 'A1', category: 'Contraste', exampleEs: 'Quiero salir, pero está lloviendo.', exampleHy: 'Ուզում եմ դուրս գալ, բայց անձրև է գալիս։' },
      { id: 'co-2', es: 'Sin embargo', hy: 'սակայն, այնուամենայնիվ', level: 'B1', category: 'Contraste', exampleEs: 'Estudió mucho. Sin embargo, no aprobó el examen.', exampleHy: 'Նա շատ սովորեց։ Սակայն չհանձնեց քննությունը։' },
      { id: 'co-3', es: 'No obstante', hy: 'այնուամենայնիվ', level: 'B2', category: 'Contraste', exampleEs: 'Tenía miedo; no obstante, dio el paso.', exampleHy: 'Վախենում էր, այնուամենայնիվ, քայլ արեց։' },
      { id: 'co-4', es: 'En cambio', hy: 'փոխարենը, մինչդեռ', level: 'B1', category: 'Contraste', exampleEs: 'Mi hermano prefiere el fútbol. Yo, en cambio, prefiero el tenis.', exampleHy: 'Եղբայրս նախընտրում է ֆուտբոլը։ Ես, ընդհակառակը, նախընտրում եմ թենիսը։' },
      { id: 'co-5', es: 'Por el contrario', hy: 'ընդհակառակը', level: 'B1', category: 'Contraste', exampleEs: 'No fue una decisión equivocada. Por el contrario, fue muy acertada.', exampleHy: 'Դա սխալ որոշում չէր։ Ընդհակառակը, շատ ճիշտ որոշում էր։' },
      { id: 'co-6', es: 'Mientras que', hy: 'մինչդեռ', level: 'B1', category: 'Contraste', exampleEs: 'Él gana mucho, mientras que ella gana poco.', exampleHy: 'Նա շատ է վաստակում, մինչդեռ աղջիկը՝ քիչ։' },
      { id: 'co-7', es: 'Aun así', hy: 'նույնիսկ այդ դեպքում', level: 'B1', category: 'Contraste', exampleEs: 'Estaba enfermo. Aun así, fue a trabajar.', exampleHy: 'Նա հիվանդ էր։ Նույնիսկ այդ դեպքում գնաց աշխատանքի։' },
      { id: 'co-8', es: 'Ahora bien', hy: 'սակայն, այդուհանդերձ', level: 'C1', category: 'Contraste', exampleEs: 'Es un buen plan. Ahora bien, tiene riesgos.', exampleHy: 'Լավ ծրագիր է։ Այդուհանդերձ, ռիսկեր ունի։' }
    ],
    differences: {
      title: 'Կարևոր տարբերություն',
      items: [
        { term: 'Pero', hy: 'Սովորական, ամենօրյա հակադրություն է։' },
        { term: 'Sin embargo', hy: 'Ավելի ընդգծված և հաճախ ավելի պաշտոնական հակադրություն է։' },
        { term: 'En cambio', hy: 'Հատկապես օգտագործվում է երկու անձ, իրավիճակ կամ տարբերակ համեմատելիս։' }
      ]
    }
  },
  {
    id: 'sec-4',
    number: 4,
    titleEs: 'Conectores de causa',
    titleHy: 'Պատճառ արտահայտող կապակցող բառեր',
    levelBadge: 'A2–B2',
    descriptionHy: 'Պատասխանում են ¿Por qué? — Ինչո՞ւ հարցին։',
    connectors: [
      { id: 'ca-1', es: 'Porque', hy: 'որովհետև', level: 'A1', category: 'Causa', exampleEs: 'No salí porque estaba cansado.', exampleHy: 'Ես դուրս չեկա, որովհետև հոգնած էի։' },
      { id: 'ca-2', es: 'Como', hy: 'քանի որ', level: 'A2', category: 'Causa', exampleEs: 'Como estaba lloviendo, nos quedamos en casa.', exampleHy: 'Քանի որ անձրև էր գալիս, մենք մնացինք տանը։', note: 'Պատճառ արտահայտող como-ն սովորաբար դրվում է նախադասության սկզբում։' },
      { id: 'ca-3', es: 'Ya que', hy: 'քանի որ', level: 'B1', category: 'Causa', exampleEs: 'Ya que tienes tiempo, podemos hablar.', exampleHy: 'Քանի որ ժամանակ ունես, կարող ենք խոսել։' },
      { id: 'ca-4', es: 'Puesto que', hy: 'քանի որ', level: 'B2', category: 'Causa', exampleEs: 'Puesto que todos están de acuerdo, comenzamos.', exampleHy: 'Քանի որ բոլորը համաձայն են, սկսում ենք։' },
      { id: 'ca-5', es: 'Dado que', hy: 'հաշվի առնելով, որ', level: 'B2', category: 'Causa', exampleEs: 'Dado que no hay opciones, esperaremos.', exampleHy: 'Հաշվի առնելով, որ տարբերակներ չկան, կսպասենք։' },
      { id: 'ca-6', es: 'Debido a', hy: '...-ի պատճառով', level: 'B1', category: 'Causa', exampleEs: 'El partido se canceló debido a la lluvia.', exampleHy: 'Խաղը չեղարկվեց անձրևի պատճառով։' },
      { id: 'ca-7', es: 'A causa de', hy: '...-ի պատճառով', level: 'B1', category: 'Causa', exampleEs: 'Llegamos tarde a causa de la nieve.', exampleHy: 'Ուշացանք ձյան պատճառով։' },
      { id: 'ca-8', es: 'Gracias a', hy: '...-ի շնորհիվ', level: 'A2', category: 'Causa', exampleEs: 'Ganamos gracias al trabajo en equipo.', exampleHy: 'Մենք հաղթեցինք թիմային աշխատանքի շնորհիվ։' },
      { id: 'ca-9', es: 'Por culpa de', hy: '...-ի մեղքով', level: 'A2', category: 'Causa', exampleEs: 'Perdimos el tren por culpa del tráfico.', exampleHy: 'Մենք բաց թողեցինք գնացքը խցանման պատճառով։' }
    ],
    differences: {
      title: 'Diferencia — Տարբերություն',
      items: [
        { term: 'Gracias a', hy: 'Հիմնականում դրական պատճառ (օր.՝ շնորհիվ)։' },
        { term: 'Por culpa de', hy: 'Բացասական պատճառ, երբ ինչ-որ բանի մեղքն ենք ընդգծում։' },
        { term: 'Debido a', hy: 'Չեզոք կամ պաշտոնական պատճառ։' }
      ]
    }
  },
  {
    id: 'sec-5',
    number: 5,
    titleEs: 'Conectores de consecuencia',
    titleHy: 'Հետևանք արտահայտող կապակցող բառեր',
    levelBadge: 'A2–C1',
    descriptionHy: 'Պատճառից հետո ներկայացնում են արդյունքը։',
    connectors: [
      { id: 'cn-1', es: 'Por eso', hy: 'այդ պատճառով', level: 'A2', category: 'Consecuencia', exampleEs: 'No dormí bien. Por eso estoy cansado.', exampleHy: 'Ես լավ չքնեցի։ Այդ պատճառով հոգնած եմ։' },
      { id: 'cn-2', es: 'Así que', hy: 'այնպես որ', level: 'A2', category: 'Consecuencia', exampleEs: 'Hace frío, así que voy a ponerme una chaqueta.', exampleHy: 'Ցուրտ է, այնպես որ բաճկոն եմ հագնելու։' },
      { id: 'cn-3', es: 'Por lo tanto', hy: 'հետևաբար', level: 'B1', category: 'Consecuencia', exampleEs: 'No tenemos suficiente dinero. Por lo tanto, debemos ahorrar.', exampleHy: 'Մենք բավարար գումար չունենք։ Հետևաբար պետք է խնայենք։' },
      { id: 'cn-4', es: 'Entonces', hy: 'ուրեմն, այդ դեպքում', level: 'A2', category: 'Consecuencia', exampleEs: '¿No tienes hambre? Entonces comeré solo.', exampleHy: 'Քաղցած չե՞ս։ Ուրեմն մենակ կուտեմ։' },
      { id: 'cn-5', es: 'Por consiguiente', hy: 'հետևաբար', level: 'B2', category: 'Consecuencia', exampleEs: 'Ha subido el precio; por consiguiente, la demanda bajó.', exampleHy: 'Գինը բարձրացավ, հետևաբար պահանջարկը նվազեց։' },
      { id: 'cn-6', es: 'En consecuencia', hy: 'արդյունքում, հետևաբար', level: 'B2', category: 'Consecuencia', exampleEs: 'El equipo no se preparó bien. En consecuencia, perdió el partido.', exampleHy: 'Թիմը լավ չէր պատրաստվել։ Արդյունքում պարտվեց խաղում։' },
      { id: 'cn-7', es: 'De modo que', hy: 'այնպես որ', level: 'B1', category: 'Consecuencia', exampleEs: 'Terminé temprano, de modo que puedo descansar.', exampleHy: 'Շուտ ավարտեցի, այնպես որ կարող եմ հանգստանալ։' },
      { id: 'cn-8', es: 'De ahí que', hy: 'այստեղից էլ այն, որ (այդ պատճառով էլ)', level: 'C1', category: 'Consecuencia', exampleEs: 'Ha entrenado muy poco. De ahí que no esté preparado.', exampleHy: 'Նա շատ քիչ է մարզվել։ Այդ պատճառով էլ պատրաստ չէ։', note: 'Նշում․ De ahí que-ից հետո սովորաբար օգտագործվում է Subjuntivo՝ esté, tenga, sea և այլն։' }
    ],
    differences: {
      title: 'Causa vs consecuencia — Պատճառ և հետևանք',
      items: [
        { term: 'CAUSA', hy: 'Estaba enfermo (Նա հիվանդ էր)' },
        { term: 'CONSECUENCIA', hy: 'No fue al colegio (Նա դպրոց չգնաց)' },
        { term: 'Porque (Causa)', hy: 'No fue al colegio porque estaba enfermo. (Նա դպրոց չգնաց, որովհետև հիվանդ էր։)' },
        { term: 'Por eso (Consecuencia)', hy: 'Estaba enfermo, por eso no fue al colegio. (Նա հիվանդ էր, այդ պատճառով դպրոց չգնաց։)' }
      ]
    }
  },
  {
    id: 'sec-6',
    number: 6,
    titleEs: 'Conectores de finalidad',
    titleHy: 'Նպատակ արտահայտող կապակցող բառեր',
    levelBadge: 'A2–B2',
    descriptionHy: 'Ցույց են տալիս, թե ինչ նպատակով է կատարվում գործողությունը։',
    connectors: [
      { id: 'fi-1', es: 'Para', hy: 'որպեսզի, ...-ելու համար', level: 'A1', category: 'Finalidad', exampleEs: 'Estudio español para trabajar en España.', exampleHy: 'Ես իսպաներեն եմ սովորում Իսպանիայում աշխատելու համար։', note: 'Para + infinitivo' },
      { id: 'fi-2', es: 'Para que', hy: 'որպեսզի', level: 'B1', category: 'Finalidad', exampleEs: 'Te explico la regla para que la entiendas.', exampleHy: 'Ես քեզ բացատրում եմ կանոնը, որպեսզի դու այն հասկանաս։', note: 'Para que + subjuntivo' },
      { id: 'fi-3', es: 'A fin de', hy: 'նպատակով', level: 'B2', category: 'Finalidad', exampleEs: 'A fin de ahorrar dinero, cocinamos en casa.', exampleHy: 'Գումար խնայելու նպատակով տանն ենք եփում։' },
      { id: 'fi-4', es: 'A fin de que', hy: 'որպեսզի', level: 'B2', category: 'Finalidad', exampleEs: 'Te aviso a fin de que estés preparado.', exampleHy: 'Զգուշացնում եմ, որպեսզի պատրաստ լինես։' },
      { id: 'fi-5', es: 'Con el objetivo de', hy: '...-ի նպատակով', level: 'B1', category: 'Finalidad', exampleEs: 'Entrena cada día con el objetivo de mejorar su rendimiento.', exampleHy: 'Նա ամեն օր մարզվում է իր արդյունքները բարելավելու նպատակով։' },
      { id: 'fi-6', es: 'Con la intención de', hy: '...-ի մտադրությամբ', level: 'B2', category: 'Finalidad', exampleEs: 'Viajó con la intención de aprender el idioma.', exampleHy: 'Ճամփորդեց լեզուն սովորելու մտադրությամբ։' }
    ],
    extraGrammar: {
      title: 'Կարևոր կանոն՝ Para + Infinitivo vs Para que + Subjuntivo',
      explanationHy: 'Երբ գործողության կատարողը նույնն է, օգտագործում ենք Infinitivo: Երբ կատարողները տարբեր են, պարտադիր օգտագործում ենք Subjuntivo:',
      patterns: [
        {
          rule: 'Միևնույն ենթակա: Para + infinitivo',
          exampleEs: 'Trabajo para ganar dinero.',
          exampleHy: 'Ես աշխատում եմ գումար վաստակելու համար։'
        },
        {
          rule: 'Տարբեր ենթականեր: Para que + subjuntivo',
          exampleEs: 'Trabajo para que mis hijos tengan una buena vida.',
          exampleHy: 'Ես աշխատում եմ, որպեսզի երեխաներս լավ կյանք ունենան։'
        }
      ]
    }
  },
  {
    id: 'sec-7',
    number: 7,
    titleEs: 'Conectores de condición',
    titleHy: 'Պայման արտահայտող կապակցող բառեր',
    levelBadge: 'A2–C1',
    descriptionHy: 'Ցույց են տալիս, թե ինչ պայմանով կարող է ինչ-որ բան տեղի ունենալ։',
    connectors: [
      { id: 'cd-1', es: 'Si', hy: 'եթե', level: 'A1', category: 'Condición', exampleEs: 'Si tengo tiempo, te llamaré.', exampleHy: 'Եթե ժամանակ ունենամ, քեզ կզանգեմ։' },
      { id: 'cd-2', es: 'Siempre que', hy: 'պայմանով, որ', level: 'B1', category: 'Condición', exampleEs: 'Puedes salir siempre que termines tus deberes.', exampleHy: 'Կարող ես դուրս գալ, պայմանով, որ ավարտես տնային աշխատանքներդ։' },
      { id: 'cd-3', es: 'A condición de que', hy: 'այն պայմանով, որ', level: 'B2', category: 'Condición', exampleEs: 'Te ayudaré a condición de que me escuches.', exampleHy: 'Կօգնեմ քեզ այն պայմանով, որ ինձ լսես։' },
      { id: 'cd-4', es: 'Con tal de que', hy: 'միայն թե, պայմանով, որ', level: 'B2', category: 'Condición', exampleEs: 'Te prestaré el coche con tal de que conduzcas con cuidado.', exampleHy: 'Ես քեզ մեքենան կտամ, միայն թե զգույշ վարես։' },
      { id: 'cd-5', es: 'A menos que', hy: 'եթե ոչ, եթե միայն չ...', level: 'B1', category: 'Condición', exampleEs: 'Iremos a la playa a menos que llueva.', exampleHy: 'Մենք կգնանք լողափ, եթե անձրև չգա։' },
      { id: 'cd-6', es: 'Salvo que', hy: 'եթե միայն չ...', level: 'B2', category: 'Condición', exampleEs: 'Vendré a verte salvo que surja un imprevisto.', exampleHy: 'Կգամ քեզ տեսնելու, եթե անսպասելի բան չառաջանա։' },
      { id: 'cd-7', es: 'En caso de que', hy: 'այն դեպքում, եթե', level: 'B1', category: 'Condición', exampleEs: 'En caso de que necesites ayuda, llámame.', exampleHy: 'Եթե օգնության կարիք ունենաս, զանգիր ինձ։' }
    ],
    extraGrammar: {
      title: 'Քերականական կանոններ (Si + ...)',
      explanationHy: 'Պայմանական նախադասությունների հիմնական 3 մոդելները՝',
      patterns: [
        {
          rule: '1. Si + presente de indicativo -> իրական կամ հնարավոր ապագա պայման',
          exampleEs: 'Si tengo dinero, viajaré.',
          exampleHy: 'Եթե գումար ունենամ, կճանապարհորդեմ։'
        },
        {
          rule: '2. Si + imperfecto de subjuntivo + condicional -> ենթադրական պայման',
          exampleEs: 'Si tuviera dinero, viajaría.',
          exampleHy: 'Եթե գումար ունենայի, կճանապարհորդեի։'
        },
        {
          rule: '3. Si + pluscuamperfecto de subjuntivo + condicional compuesto -> անցյալում չիրականացած պայման',
          exampleEs: 'Si hubiera tenido dinero, habría viajado.',
          exampleHy: 'Եթե գումար ունեցած լինեի, ճանապարհորդած կլինեի։'
        }
      ]
    }
  },
  {
    id: 'sec-8',
    number: 8,
    titleEs: 'Conectores concesivos',
    titleHy: 'Զիջում արտահայտող կապակցող բառեր',
    levelBadge: 'B1–C1',
    descriptionHy: 'Ցույց են տալիս, որ ինչ-որ հանգամանք գոյություն ունի, բայց չի խանգարում հիմնական գործողությանը։',
    connectors: [
      { id: 'cc-1', es: 'Aunque', hy: 'չնայած, թեև', level: 'B1', category: 'Concesivo', exampleEs: 'Aunque estoy cansado, voy a estudiar.', exampleHy: 'Թեև հոգնած եմ, պատրաստվում եմ սովորել։' },
      { id: 'cc-2', es: 'A pesar de', hy: 'չնայած', level: 'B1', category: 'Concesivo', exampleEs: 'A pesar del frío, salimos. / A pesar de estar cansado, siguió trabajando.', exampleHy: 'Չնայած ցրտին՝ մենք դուրս եկանք։ / Չնայած հոգնած լինելուն՝ նա շարունակեց աշխատել։', note: 'A pesar de + sustantivo / infinitivo' },
      { id: 'cc-3', es: 'A pesar de que', hy: 'չնայած նրան, որ', level: 'B2', category: 'Concesivo', exampleEs: 'A pesar de que llovía, fueron al parque.', exampleHy: 'Չնայած նրան, որ անձրև էր գալիս, գնացին այգի։' },
      { id: 'cc-4', es: 'Pese a que', hy: 'չնայած նրան, որ', level: 'B2', category: 'Concesivo', exampleEs: 'Pese a que no tenía experiencia, consiguió el puesto.', exampleHy: 'Չնայած փորձ չուներ, ստացավ պաշտոնը։' },
      { id: 'cc-5', es: 'Por mucho que', hy: 'որքան էլ որ', level: 'C1', category: 'Concesivo', exampleEs: 'Por mucho que estudies, siempre habrá algo nuevo que aprender.', exampleHy: 'Որքան էլ սովորես, միշտ նոր սովորելու բան կլինի։' },
      { id: 'cc-6', es: 'Por más que', hy: 'որքան էլ որ', level: 'C1', category: 'Concesivo', exampleEs: 'Por más que lo intento, no consigo entenderlo.', exampleHy: 'Որքան էլ փորձում եմ, չեմ կարողանում դա հասկանալ։' },
      { id: 'cc-7', es: 'Si bien', hy: 'թեև, չնայած', level: 'C1', category: 'Concesivo', exampleEs: 'Si bien el proyecto es interesante, necesita algunos cambios.', exampleHy: 'Թեև նախագիծը հետաքրքիր է, որոշ փոփոխությունների կարիք ունի։' },
      { id: 'cc-8', es: 'Incluso si', hy: 'նույնիսկ եթե', level: 'B2', category: 'Concesivo', exampleEs: 'Incluso si no vienes, iremos nosotros.', exampleHy: 'Նույնիսկ եթե չգաս, մենք կգնանք։' }
    ],
    differences: {
      title: 'Aunque + Indicativo vs Subjuntivo (B2 տարբերություն)',
      items: [
        {
          term: 'Aunque + Indicativo (Իրական փաստ)',
          hy: 'Երբ խոսողը փաստը ներկայացնում է որպես իրական, հաստատված տեղեկություն։',
          exampleEs: 'Aunque hace frío, voy a salir.',
          exampleHy: 'Չնայած ցուրտ է (իրոք ցուրտ է), դուրս եմ գալու։'
        },
        {
          term: 'Aunque + Subjuntivo (Ենթադրական իրավիճակ)',
          hy: 'Երբ իրավիճակը ենթադրական է, անհաստատ կամ ներկայացվում է առանց փաստը հաստատելու։',
          exampleEs: 'Aunque haga frío, voy a salir.',
          exampleHy: 'Նույնիսկ եթե ցուրտ լինի (դեռ չգիտեմ), դուրս եմ գալու։'
        }
      ]
    }
  },
  {
    id: 'sec-9',
    number: 9,
    titleEs: 'Conectores temporales',
    titleHy: 'Ժամանակ արտահայտող կապակցող բառեր',
    levelBadge: 'A2–B2',
    descriptionHy: 'Ցույց են տալիս գործողությունների ժամանակային կապը։',
    connectors: [
      { id: 'tm-1', es: 'Cuando', hy: 'երբ', level: 'A1', category: 'Temporal', exampleEs: 'Cuando llego a casa, descanso.', exampleHy: 'Երբ տուն եմ հասնում, հանգստանում եմ։' },
      { id: 'tm-2', es: 'Mientras', hy: 'մինչ, մինչդեռ', level: 'A2', category: 'Temporal', exampleEs: 'Mientras cocino, escucho música.', exampleHy: 'Մինչ պատրաստում եմ, երաժշտություն եմ լսում։' },
      { id: 'tm-3', es: 'Antes de', hy: 'նախքան', level: 'A2', category: 'Temporal', exampleEs: 'Antes de comer, lávate las manos.', exampleHy: 'Նախքան ուտելը լվա ձեռքերդ։' },
      { id: 'tm-4', es: 'Antes de que', hy: 'նախքան ...', level: 'B1', category: 'Temporal', exampleEs: 'Llámame antes de que salgas.', exampleHy: 'Զանգիր ինձ նախքան դուրս գալդ։' },
      { id: 'tm-5', es: 'Después de', hy: 'հետո', level: 'A2', category: 'Temporal', exampleEs: 'Después de clase voy a entrenar.', exampleHy: 'Դասից հետո գնալու եմ մարզվելու։' },
      { id: 'tm-6', es: 'Después de que', hy: 'այն բանից հետո, երբ', level: 'B1', category: 'Temporal', exampleEs: 'Fuimos al cine después de que cenamos.', exampleHy: 'Գնացինք կինո այն բանից հետո, երբ ընթրեցինք։' },
      { id: 'tm-7', es: 'En cuanto', hy: 'հենց որ', level: 'B1', category: 'Temporal', exampleEs: 'En cuanto termine el trabajo, te llamaré.', exampleHy: 'Հենց ավարտեմ աշխատանքը, քեզ կզանգեմ։' },
      { id: 'tm-8', es: 'Tan pronto como', hy: 'հենց որ', level: 'B1', category: 'Temporal', exampleEs: 'Tan pronto como pueda, iré a verte.', exampleHy: 'Հենց որ կարողանամ, կգամ քեզ տեսնելու։' },
      { id: 'tm-9', es: 'Hasta que', hy: 'մինչև որ', level: 'B1', category: 'Temporal', exampleEs: 'Esperaré hasta que vuelvas.', exampleHy: 'Կսպասեմ մինչև վերադառնաս։' },
      { id: 'tm-10', es: 'Desde que', hy: 'այն պահից, երբ', level: 'B1', category: 'Temporal', exampleEs: 'Desde que vivo aquí, conozco a mucha gente.', exampleHy: 'Այն պահից, երբ այստեղ եմ ապրում, շատ մարդկանց եմ ճանաչում։' },
      { id: 'tm-11', es: 'Cada vez que', hy: 'ամեն անգամ, երբ', level: 'A2', category: 'Temporal', exampleEs: 'Cada vez que lo veo, me saluda con una sonrisa.', exampleHy: 'Ամեն անգամ, երբ նրան տեսնում եմ, ժպիտով է ողջունում։' },
      { id: 'tm-12', es: 'Al + infinitivo', hy: '...-ելիս, հենց որ', level: 'B1', category: 'Temporal', exampleEs: 'Al llegar al hotel, dejamos las maletas.', exampleHy: 'Հյուրանոց հասնելուն պես թողեցինք ճամպրուկները։' }
    ],
    differences: {
      title: 'Ժամանակային կապակցող բառեր և Subjuntivo',
      items: [
        {
          term: 'Ապագա չկատարված գործողություն -> Subjuntivo',
          hy: 'Երբ խոսում ենք ապագայում դեռ չկատարված գործողության մասին, cuando, en cuanto, hasta que, tan pronto como հետո օգտագործվում է Subjuntivo։',
          exampleEs: 'Cuando llegues, hablaremos.',
          exampleHy: 'Երբ հասնես (դեռ չես հասել), կխոսենք։'
        },
        {
          term: 'Սովորական կրկնվող գործողություն -> Indicativo',
          hy: 'Սովորական կրկնվող գործողությունների դեպքում օգտագործում ենք Indicativo։',
          exampleEs: 'Cuando llego, siempre llamo.',
          exampleHy: 'Երբ տուն եմ հասնում, միշտ զանգում եմ։'
        }
      ]
    }
  },
  {
    id: 'sec-10',
    number: 10,
    titleEs: 'Conectores de orden y secuencia',
    titleHy: 'Հերթականություն արտահայտող կապակցող բառեր',
    levelBadge: 'A1–B1',
    descriptionHy: 'Օգնում են կազմակերպել պատմությունը կամ խոսքը։',
    connectors: [
      { id: 'or-1', es: 'Primero', hy: 'սկզբում', level: 'A1', category: 'Secuencia' },
      { id: 'or-2', es: 'En primer lugar', hy: 'առաջին հերթին', level: 'B1', category: 'Secuencia' },
      { id: 'or-3', es: 'Para empezar', hy: 'սկսելու համար', level: 'A2', category: 'Secuencia' },
      { id: 'or-4', es: 'Después', hy: 'հետո', level: 'A1', category: 'Secuencia' },
      { id: 'or-5', es: 'Luego', hy: 'այնուհետև', level: 'A1', category: 'Secuencia' },
      { id: 'or-6', es: 'A continuación', hy: 'դրանից հետո', level: 'B1', category: 'Secuencia' },
      { id: 'or-7', es: 'Más tarde', hy: 'ավելի ուշ', level: 'A2', category: 'Secuencia' },
      { id: 'or-8', es: 'Finalmente', hy: 'վերջապես', level: 'A2', category: 'Secuencia' },
      { id: 'or-9', es: 'Por último', hy: 'վերջում', level: 'B1', category: 'Secuencia' },
      { id: 'or-10', es: 'Al final', hy: 'ի վերջո, վերջում', level: 'A2', category: 'Secuencia' }
    ],
    introPoints: [
      {
        es: 'Primero desayuné. Después fui al colegio. Luego entrené con mi equipo. Finalmente, regresé a casa.',
        hy: 'Սկզբում նախաճաշեցի։ Հետո գնացի դպրոց։ Այնուհետև մարզվեցի թիմիս հետ։ Վերջապես վերադարձա տուն։'
      }
    ],
    differences: {
      title: 'Finalmente vs Al final',
      items: [
        { term: 'Finalmente', hy: 'Հաճախ ներկայացնում է հերթականության վերջին քայլը։' },
        {
          term: 'Al final',
          hy: 'Շեշտում է վերջնական արդյունքը, հատկապես երբ իրավիճակը փոխվել է։',
          exampleEs: 'Queríamos ir al cine, pero al final nos quedamos en casa.',
          exampleHy: 'Մենք ուզում էինք կինոթատրոն գնալ, բայց ի վերջո մնացինք տանը։'
        }
      ]
    }
  },
  {
    id: 'sec-11',
    number: 11,
    titleEs: 'Conectores de ejemplificación',
    titleHy: 'Օրինակ բերելու կապակցող բառեր',
    levelBadge: 'A1–B2',
    descriptionHy: 'Օգտագործվում են օրինակներ և կոնկրետ դեպքեր նշելիս։',
    connectors: [
      { id: 'ej-1', es: 'Por ejemplo', hy: 'օրինակ', level: 'A1', category: 'Ejemplificación', exampleEs: 'Me gustan muchos deportes, por ejemplo, el fútbol y el tenis.', exampleHy: 'Ես սիրում եմ շատ մարզաձևեր, օրինակ՝ ֆուտբոլն ու թենիսը։' },
      { id: 'ej-2', es: 'Como', hy: 'ինչպես', level: 'A1', category: 'Ejemplificación', exampleEs: 'Ciudades grandes como Madrid o Barcelona atraen a muchos turistas.', exampleHy: 'Մեծ քաղաքները, ինչպես Մադրիդը կամ Բարսելոնան, շատ զբոսաշրջիկներ են գրավում։' },
      { id: 'ej-3', es: 'En particular', hy: 'մասնավորապես', level: 'B1', category: 'Ejemplificación', exampleEs: 'Me interesan los idiomas, en particular el español.', exampleHy: 'Ինձ հետաքրքրում են լեզուները, մասնավորապես իսպաներենը։' },
      { id: 'ej-4', es: 'En concreto', hy: 'կոնկրետ', level: 'B2', category: 'Ejemplificación', exampleEs: 'Necesitamos mejorar una cosa; en concreto, la comunicación.', exampleHy: 'Մենք պետք է բարելավենք մի բան, մասնավորապես՝ հաղորդակցությունը։' },
      { id: 'ej-5', es: 'Tal como', hy: 'ինչպես որ', level: 'B1', category: 'Ejemplificación', exampleEs: 'Tal como te dije antes, no vendrán hoy.', exampleHy: 'Ինչպես որ քեզ նախկինում ասացի, այսօր չեն գալու։' },
      { id: 'ej-6', es: 'A modo de ejemplo', hy: 'որպես օրինակ', level: 'B2', category: 'Ejemplificación', exampleEs: 'A modo de ejemplo, analicemos esta frase.', exampleHy: 'Որպես օրինակ՝ վերլուծենք այս նախադասությունը։' }
    ]
  },
  {
    id: 'sec-12',
    number: 12,
    titleEs: 'Conectores explicativos',
    titleHy: 'Բացատրող և վերաձևակերպող կապակցող բառեր',
    levelBadge: 'A2–C1',
    descriptionHy: 'Օգտագործվում են, երբ ցանկանում ենք նույն միտքն ավելի պարզ ասել։',
    connectors: [
      { id: 'ex-1', es: 'Es decir', hy: 'այսինքն', level: 'A2', category: 'Explicativo', exampleEs: 'Es bilingüe, es decir, habla dos idiomas.', exampleHy: 'Նա երկլեզու է, այսինքն՝ խոսում է երկու լեզվով։' },
      { id: 'ex-2', es: 'O sea', hy: 'այսինքն (խոսակցական)', level: 'A2', category: 'Explicativo', exampleEs: 'Hoy no trabajo, o sea, tengo el día libre.', exampleHy: 'Այսօր չեմ աշխատում, այսինքն՝ ազատ օր ունեմ։' },
      { id: 'ex-3', es: 'En otras palabras', hy: 'այլ կերպ ասած', level: 'B1', category: 'Explicativo', exampleEs: 'No tenemos suficiente tiempo. En otras palabras, debemos organizarnos mejor.', exampleHy: 'Մենք բավարար ժամանակ չունենք։ Այլ կերպ ասած՝ պետք է ավելի լավ կազմակերպվենք։' },
      { id: 'ex-4', es: 'Dicho de otro modo', hy: 'այլ կերպ ասած', level: 'B2', category: 'Explicativo', exampleEs: 'El resultado es negativo, dicho de otro modo, perdimos.', exampleHy: 'Արդյունքը բացասական է, այլ կերպ ասած՝ մենք պարտվեցինք։' },
      { id: 'ex-5', es: 'Mejor dicho', hy: 'ավելի ճիշտ', level: 'B1', category: 'Explicativo', exampleEs: 'Llegaré a las ocho, mejor dicho, a las ocho y media.', exampleHy: 'Կհասնեմ ութին, ավելի ճիշտ՝ ութն անց կեսին։' },
      { id: 'ex-6', es: 'Esto es', hy: 'այսինքն', level: 'B2', category: 'Explicativo', exampleEs: 'El plazo vence hoy, esto es, en pocas horas.', exampleHy: 'Ժամկետը լրանում է այսօր, այսինքն՝ մի քանի ժամից։' }
    ],
    differences: {
      title: 'Տարբերությունները',
      items: [
        { term: 'O sea', hy: 'Հաճախ օգտագործվում է առօրյա, խոսակցական խոսքում։' },
        { term: 'Es decir', hy: 'Չեզոք է և շատ տարածված է նաև գրավոր խոսքում։' },
        { term: 'Dicho de otro modo', hy: 'Ավելի պաշտոնական և հղկված է։' }
      ]
    }
  },
  {
    id: 'sec-13',
    number: 13,
    titleEs: 'Conectores de comparación',
    titleHy: 'Համեմատություն արտահայտող կապակցող բառեր',
    levelBadge: 'A2–B2',
    descriptionHy: 'Օգտագործվում են երկու կամ ավելի տարրեր համեմատելիս։',
    connectors: [
      { id: 'cp-1', es: 'Como', hy: 'ինչպես', level: 'A1', category: 'Comparación', exampleEs: 'Canta bien como su madre.', exampleHy: 'Լավ է երգում, ինչպես իր մայրը։' },
      { id: 'cp-2', es: 'Igual que', hy: 'ճիշտ այնպես, ինչպես', level: 'A2', category: 'Comparación', exampleEs: 'Mi hermana estudia español igual que yo.', exampleHy: 'Քույրս ինձ պես իսպաներեն է սովորում։' },
      { id: 'cp-3', es: 'Al igual que', hy: 'ինչպես և', level: 'B1', category: 'Comparación', exampleEs: 'Al igual que su padre, quiere ser médico.', exampleHy: 'Ինչպես իր հայրը, նա նույնպես ցանկանում է բժիշկ դառնալ։' },
      { id: 'cp-4', es: 'Del mismo modo', hy: 'նույն կերպ', level: 'B2', category: 'Comparación', exampleEs: 'Del mismo modo, debemos revisar los detalles.', exampleHy: 'Նույն կերպ մենք պետք է վերանայենք մանրամասները։' },
      { id: 'cp-5', es: 'De la misma manera', hy: 'նույն ձևով', level: 'B2', category: 'Comparación', exampleEs: 'Reaccionó de la misma manera que su amigo.', exampleHy: 'Արձագանքեց նույն ձևով, ինչպես իր ընկերը։' },
      { id: 'cp-6', es: 'Mientras que', hy: 'մինչդեռ', level: 'B1', category: 'Comparación', exampleEs: 'Él prefiere el frío, mientras que ella adora el calor.', exampleHy: 'Նա նախընտրում է ցուրտը, մինչդեռ նա պաշտում է տաքը։' },
      { id: 'cp-7', es: 'En comparación con', hy: '...-ի համեմատ', level: 'B1', category: 'Comparación', exampleEs: 'Este ejercicio es fácil en comparación con el anterior.', exampleHy: 'Այս վարժությունը հեշտ է նախորդի համեմատ։' }
    ]
  },
  {
    id: 'sec-14',
    number: 14,
    titleEs: 'Conectores de opinión y argumentación',
    titleHy: 'Կարծիք և փաստարկ արտահայտող կապակցող բառեր',
    levelBadge: 'B1–C1',
    descriptionHy: 'Այս արտահայտությունները հատկապես օգտակար են B1–C1 մակարդակներում՝ քննարկումների, բանավոր պատասխանների և շարադրությունների համար։',
    connectors: [
      { id: 'op-1', es: 'En mi opinión', hy: 'իմ կարծիքով', level: 'A2', category: 'Opinión', exampleEs: 'En mi opinión, leer libros es enriquecedor.', exampleHy: 'Իմ կարծիքով՝ գրքեր կարդալը հարստացնող է։' },
      { id: 'op-2', es: 'Desde mi punto de vista', hy: 'իմ տեսանկյունից', level: 'B1', category: 'Opinión', exampleEs: 'Desde mi punto de vista, aprender idiomas abre muchas oportunidades.', exampleHy: 'Իմ տեսանկյունից՝ լեզուներ սովորելը բազմաթիվ հնարավորություններ է բացում։' },
      { id: 'op-3', es: 'A mi parecer', hy: 'իմ կարծիքով', level: 'B2', category: 'Opinión', exampleEs: 'A mi parecer, este es el mejor camino.', exampleHy: 'Իմ կարծիքով՝ սա լավագույն ճանապարհն է։' },
      { id: 'op-4', es: 'Considero que', hy: 'կարծում եմ, որ', level: 'B1', category: 'Opinión', exampleEs: 'Considero que debemos tener más paciencia.', exampleHy: 'Կարծում եմ, որ մենք պետք է ավելի համբերատար լինենք։' },
      { id: 'op-5', es: 'Creo que', hy: 'կարծում եմ, որ', level: 'A2', category: 'Opinión', exampleEs: 'Creo que tienes razón.', exampleHy: 'Կարծում եմ, որ դու ճիշտ ես։' },
      { id: 'op-6', es: 'Por una parte', hy: 'մի կողմից', level: 'B1', category: 'Opinión', exampleEs: 'Por una parte me alegra, por otra me preocupa.', exampleHy: 'Մի կողմից ուրախացնում է, մյուս կողմից՝ մտահոգում։' },
      { id: 'op-7', es: 'Por otra parte', hy: 'մյուս կողմից', level: 'B1', category: 'Opinión', exampleEs: 'Por otra parte, los costes son muy elevados.', exampleHy: 'Մյուս կողմից՝ ծախսերը շատ բարձր են։' },
      { id: 'op-8', es: 'Por un lado... por otro lado', hy: 'մի կողմից... մյուս կողմից', level: 'B1', category: 'Opinión', exampleEs: 'Por un lado, vivir en una ciudad grande ofrece oportunidades. Por otro lado, puede ser estresante.', exampleHy: 'Մի կողմից՝ մեծ քաղաքում ապրելը հնարավորություններ է տալիս։ Մյուս կողմից՝ կարող է սթրեսային լինել։' },
      { id: 'op-9', es: 'De hecho', hy: 'իրականում, փաստորեն', level: 'B1', category: 'Opinión', exampleEs: 'El español es muy útil. De hecho, se habla en numerosos países.', exampleHy: 'Իսպաներենը շատ օգտակար է։ Իրականում այն խոսում են բազմաթիվ երկրներում։' },
      { id: 'op-10', es: 'En realidad', hy: 'իրականում', level: 'B1', category: 'Opinión', exampleEs: 'En realidad, no quería ofenderte.', exampleHy: 'Իրականում չէի ուզում քեզ նեղացնել։' },
      { id: 'op-11', es: 'Sobre todo', hy: 'հատկապես', level: 'A2', category: 'Opinión', exampleEs: 'Me gusta España, sobre todo su comida.', exampleHy: 'Ինձ դուր է գալիս Իսպանիան, հատկապես իր ուտեստները։' }
    ]
  },
  {
    id: 'sec-15',
    number: 15,
    titleEs: 'Conectores de conclusión',
    titleHy: 'Եզրակացություն արտահայտող կապակցող բառեր',
    levelBadge: 'A2–C1',
    descriptionHy: 'Օգտագործվում են միտքը կամ խոսքն ամփոփելիս և եզրակացնելիս։',
    connectors: [
      { id: 'cl-1', es: 'En conclusión', hy: 'եզրափակելով', level: 'B1', category: 'Conclusión', exampleEs: 'En conclusión, aprender un idioma requiere práctica y paciencia.', exampleHy: 'Եզրափակելով՝ լեզու սովորելը պահանջում է վարժանք և համբերություն։' },
      { id: 'cl-2', es: 'En resumen', hy: 'ամփոփելով', level: 'B1', category: 'Conclusión', exampleEs: 'En resumen, el viaje fue corto, pero muy interesante.', exampleHy: 'Ամփոփելով՝ ճանապարհորդությունը կարճ էր, բայց շատ հետաքրքիր։' },
      { id: 'cl-3', es: 'En definitiva', hy: 'ի վերջո', level: 'B2', category: 'Conclusión', exampleEs: 'En definitiva, fue una experiencia provechosa.', exampleHy: 'Ի վերջո, դա օգտակար փորձառություն էր։' },
      { id: 'cl-4', es: 'Para concluir', hy: 'եզրափակելու համար', level: 'B1', category: 'Conclusión', exampleEs: 'Para concluir, agradezco a todos su asistencia.', exampleHy: 'Եզրափակելու համար՝ շնորհակալություն եմ հայտնում բոլորին ներկայության համար։' },
      { id: 'cl-5', es: 'En pocas palabras', hy: 'մի քանի բառով', level: 'A2', category: 'Conclusión', exampleEs: 'En pocas palabras, necesitamos trabajar más.', exampleHy: 'Մի քանի բառով՝ պետք է ավելի շատ աշխատենք։' },
      { id: 'cl-6', es: 'En general', hy: 'ընդհանուր առմամբ', level: 'A2', category: 'Conclusión', exampleEs: 'En general, los resultados son excelentes.', exampleHy: 'Ընդհանուր առմամբ՝ արդյունքները գերազանց են։' },
      { id: 'cl-7', es: 'En fin', hy: 'մի խոսքով', level: 'B1', category: 'Conclusión', exampleEs: 'En fin, veremos qué ocurre mañana.', exampleHy: 'Մի խոսքով՝ կտեսնենք, թե ինչ կլինի վաղը։' }
    ]
  },
  {
    id: 'sec-16',
    number: 16,
    titleEs: 'Conectores avanzados (B2–C1)',
    titleHy: 'Բարդ կապակցող բառեր (B2–C1)',
    levelBadge: 'B2–C1',
    descriptionHy: 'Սրանք հատկապես օգտակար են, երբ սովորողը ցանկանում է խոսել ավելի հարուստ և բնական իսպաներենով։',
    connectors: [
      { id: 'av-1', es: 'Ahora bien', hy: 'սակայն, այդուհանդերձ', level: 'C1', category: 'Avanzado', exampleEs: 'La idea es buena. Ahora bien, necesitamos más tiempo.', exampleHy: 'Գաղափարը լավն է։ Սակայն մեզ ավելի շատ ժամանակ է հարկավոր։' },
      { id: 'av-2', es: 'Dicho esto', hy: 'այս ամենն ասելով', level: 'B2', category: 'Avanzado', exampleEs: 'El trabajo es difícil. Dicho esto, creo que podemos conseguirlo.', exampleHy: 'Աշխատանքը դժվար է։ Այս ամենն ասելով՝ կարծում եմ, որ կարող ենք հաջողել։' },
      { id: 'av-3', es: 'De ahí que', hy: 'այդ պատճառով էլ', level: 'C1', category: 'Avanzado', exampleEs: 'No tenía pruebas, de ahí que dudaran de él.', exampleHy: 'Ապացույցներ չուներ, այդ պատճառով էլ կասկածում էին նրան։' },
      { id: 'av-4', es: 'A raíz de', hy: '...-ի հետևանքով', level: 'B2', category: 'Avanzado', exampleEs: 'A raíz del accidente, cambiaron las normas de seguridad.', exampleHy: 'Վթարի հետևանքով փոխեցին անվտանգության կանոնները։' },
      { id: 'av-5', es: 'En vista de que', hy: 'հաշվի առնելով, որ', level: 'C1', category: 'Avanzado', exampleEs: 'En vista de que nadie respondió, decidimos cancelar la reunión.', exampleHy: 'Հաշվի առնելով, որ ոչ ոք չպատասխանեց, որոշեցինք չեղարկել հանդիպումը։' },
      { id: 'av-6', es: 'Con respecto a', hy: 'ինչ վերաբերում է', level: 'B2', category: 'Avanzado', exampleEs: 'Con respecto a su propuesta, la evaluaremos hoy.', exampleHy: 'Ինչ վերաբերում է նրա առաջարկին, կգնահատենք այսօր։' },
      { id: 'av-7', es: 'En cuanto a', hy: 'ինչ վերաբերում է', level: 'B1', category: 'Avanzado', exampleEs: 'En cuanto al dinero, no te preocupes.', exampleHy: 'Ինչ վերաբերում է գումարին, մի անհանգստացիր։' },
      { id: 'av-8', es: 'A diferencia de', hy: 'ի տարբերություն', level: 'B1', category: 'Avanzado', exampleEs: 'A diferencia de ayer, hoy hace buen sol.', exampleHy: 'Ի տարբերություն երեկվա՝ այսօր լավ արև է։' },
      { id: 'av-9', es: 'Sea como sea', hy: 'ինչպես էլ որ լինի', level: 'B2', category: 'Avanzado', exampleEs: 'Sea como sea, tenemos que encontrar una solución.', exampleHy: 'Ինչպես էլ որ լինի, պետք է լուծում գտնենք։' },
      { id: 'av-10', es: 'En cualquier caso', hy: 'ամեն դեպքում', level: 'B1', category: 'Avanzado', exampleEs: 'En cualquier caso, avísame cuando salgas.', exampleHy: 'Ամեն դեպքում զգուշացրու, երբ դուրս գաս։' },
      { id: 'av-11', es: 'De todos modos', hy: 'ամեն դեպքում', level: 'A2', category: 'Avanzado', exampleEs: 'De todos modos, gracias por la información.', exampleHy: 'Ամեն դեպքում շնորհակալություն տեղեկության համար։' },
      { id: 'av-12', es: 'Por si acaso', hy: 'ամեն դեպքում, ապահովության համար', level: 'A2', category: 'Avanzado', exampleEs: 'Lleva un paraguas por si acaso.', exampleHy: 'Ամեն դեպքում հովանոց վերցրու։' }
    ]
  }
];

export const CONFUSED_CONNECTORS = [
  {
    id: 'conf-1',
    pairEs: 'Porque / Por eso',
    pairHy: 'որովհետև / այդ պատճառով',
    diff: 'Porque արտահայտում է պատճառ (չեկա, որովհետև...), Por eso արտահայտում է հետևանք (հիվանդ էի, այդ պատճառով...)։',
    example1Es: 'No fui a clase porque estaba enfermo.',
    example1Hy: 'Դասի չգնացի, որովհետև հիվանդ էի։',
    example2Es: 'Estaba enfermo. Por eso no fui a clase.',
    example2Hy: 'Հիվանդ էի։ Այդ պատճառով դասի չգնացի։'
  },
  {
    id: 'conf-2',
    pairEs: 'Pero / Aunque',
    pairHy: 'բայց / թեև, չնայած',
    diff: 'Pero-ն հավասարազոր համադասական հակադրություն է (մեջտեղում), Aunque-ն զիջում է ստորադաս նախադասությամբ (կարող է լինել սկզբում)։',
    example1Es: 'Estaba enfermo, pero fui a clase.',
    example1Hy: 'Հիվանդ էի, բայց դասի գնացի։',
    example2Es: 'Aunque estaba enfermo, fui a clase.',
    example2Hy: 'Չնայած հիվանդ էի՝ դասի գնացի։'
  },
  {
    id: 'conf-3',
    pairEs: 'Aunque / Sin embargo',
    pairHy: 'թեև (ստորադաս միտք) / սակայն (հակադրում է մտքերը)',
    diff: 'Aunque-ն կապում է երկրորդական միտքը (զիջում), իսկ Sin embargo-ն առանձին նախադասությունների հակադրություն է (կետից կամ կետ-ստորակետից հետո)։',
    example1Es: 'Aunque estudió, no aprobó.',
    example1Hy: 'Թեև սովորեց, չհանձնեց։',
    example2Es: 'Estudió mucho. Sin embargo, no aprobó.',
    example2Hy: 'Շատ սովորեց։ Սակայն չհանձնեց։'
  },
  {
    id: 'conf-4',
    pairEs: 'Además / También',
    pairHy: 'բացի այդ / նաև',
    diff: 'También-ը պարզապես ավելացնում է նույնատիպ գործողություն/անդամ, Además-ը հաճախ ներկայացնում է նոր փաստարկ կամ ամբողջական նախադասության հավելում։',
    example1Es: 'Fui a clase. Además, hice todos los ejercicios.',
    example1Hy: 'Դասի գնացի։ Բացի այդ, կատարեցի բոլոր վարժությունները։',
    example2Es: 'Él va a la clase. Yo también voy.',
    example2Hy: 'Նա գնում է դասի։ Ես նույնպես գնում եմ։'
  },
  {
    id: 'conf-5',
    pairEs: 'Por lo tanto / Por ejemplo',
    pairHy: 'հետևաբար / օրինակ',
    diff: 'Por lo tanto-ն բխող տրամաբանական հետևանք է, Por ejemplo-ն՝ պատկերավոր օրինակ։',
    example1Es: 'No hay trenes. Por lo tanto, iremos en coche.',
    example1Hy: 'Գնացքներ չկան։ Հետևաբար մեքենայով կգնանք։',
    example2Es: 'Hay muchos deportes, por ejemplo, el baloncesto.',
    example2Hy: 'Կան շատ սպորտաձևեր, օրինակ՝ բասկետբոլը։'
  },
  {
    id: 'conf-6',
    pairEs: 'Mientras / Mientras que',
    pairHy: 'մինչ (ժամանակ) / մինչդեռ (հակադրություն)',
    diff: 'Mientras-ը ցույց է տալիս ժամանակային միաժամանակություն, Mientras que-ն՝ երկու փաստի հակադրություն։',
    example1Es: 'Mientras cocino, escucho música.',
    example1Hy: 'Մինչ պատրաստում եմ, երաժշտություն եմ լսում։',
    example2Es: 'A mí me gusta el frío, mientras que a él le gusta el calor.',
    example2Hy: 'Ինձ դուր է գալիս ցուրտը, մինչդեռ նրան դուր է գալիս տաքը։'
  },
  {
    id: 'conf-7',
    pairEs: 'Para / Para que',
    pairHy: 'նպատակ + infinitivo / նպատակ + subjuntivo',
    diff: 'Para + անորոշ դերբայ (նույն ենթակա), Para que + Subjuntivo (երբ ենթակաները տարբեր են)։',
    example1Es: 'Estudio para aprender.',
    example1Hy: 'Սովորում եմ սովորելու համար։',
    example2Es: 'Te explico para que aprendas.',
    example2Hy: 'Բացատրում եմ, որպեսզի սովորես։'
  },
  {
    id: 'conf-8',
    pairEs: 'A pesar de / A pesar de que',
    pairHy: 'չնայած (+ գոյական/infinitivo) / չնայած նրան, որ (+ նախադասություն)',
    diff: 'A pesar de + գոյական կամ infinitivo (չնայած ցրտին), A pesar de que + դիմավոր բայով նախադասություն։',
    example1Es: 'A pesar de la lluvia, salimos.',
    example1Hy: 'Չնայած անձրևին՝ դուրս եկանք։',
    example2Es: 'A pesar de que llovía, salimos.',
    example2Hy: 'Չնայած նրան, որ անձրև էր գալիս, դուրս եկանք։'
  },
  {
    id: 'conf-9',
    pairEs: 'Así que / Ya que',
    pairHy: 'այնպես որ (հետևանք) / քանի որ (պատճառ)',
    diff: 'Así que ներկայացնում է արդյունքը/հետևանքը, իսկ Ya que ներկայացնում է արդեն հայտնի պատճառը։',
    example1Es: 'Terminé temprano, así que me fui a descansar.',
    example1Hy: 'Շուտ ավարտեցի, այնպես որ գնացի հանգստանալու։',
    example2Es: 'Ya que estás aquí, ayúdame por favor.',
    example2Hy: 'Քանի որ այստեղ ես, օգնիր ինձ խնդրեմ։'
  },
  {
    id: 'conf-10',
    pairEs: 'En cambio / Por el contrario',
    pairHy: 'հակադրվող տարբերակ (մինչդեռ) / ուղղակի հակառակ միտք (ընդհակառակը)',
    diff: 'En cambio-ն օգտագործվում է 2 անձի կամ տարբերակի տարբերությունը նշելիս, Por el contrario-ն ամբողջությամբ հերքում է նախորդ պնդումը։',
    example1Es: 'A ella le gusta el té; yo, en cambio, prefiero el café.',
    example1Hy: 'Նա սիրում է թեյ, ես, փոխարենը, նախընտրում եմ սուրճ։',
    example2Es: 'No fue aburrido. Por el contrario, fue fascinante.',
    example2Hy: 'Ձանձրալի չէր։ Ընդհակառակը, հիանալի էր։'
  }
];

export const DISCURSO_PARAGRAPHS = [
  {
    id: 'p-1',
    es: 'En mi opinión, aprender español es una experiencia muy interesante porque nos permite comunicarnos con personas de diferentes países.',
    hy: 'Իմ կարծիքով՝ իսպաներեն սովորելը շատ հետաքրքիր փորձառություն է, որովհետև այն մեզ հնարավորություն է տալիս շփվել տարբեր երկրների մարդկանց հետ։',
    highlightedConnectors: ['En mi opinión', 'porque']
  },
  {
    id: 'p-2',
    es: 'Además, conocer otro idioma ofrece nuevas oportunidades laborales. Sin embargo, aprenderlo no siempre es fácil, ya que requiere tiempo y dedicación.',
    hy: 'Բացի այդ, մեկ այլ լեզվի իմացությունը նոր աշխատանքային հնարավորություններ է տալիս։ Սակայն լեզու սովորելը միշտ չէ, որ հեշտ է, քանի որ պահանջում է ժամանակ և նվիրվածություն։',
    highlightedConnectors: ['Además', 'Sin embargo', 'ya que']
  },
  {
    id: 'p-3',
    es: 'Por ejemplo, algunas personas entienden bien la gramática, pero tienen dificultades para hablar. Por eso, es importante practicar todos los días, aunque solo tengamos unos minutos.',
    hy: 'Օրինակ՝ որոշ մարդիկ լավ հասկանում են քերականությունը, բայց դժվարանում են խոսել։ Այդ պատճառով կարևոր է ամեն օր զբաղվել, թեկուզ ընդամենը մի քանի րոպե։',
    highlightedConnectors: ['Por ejemplo', 'pero', 'Por eso', 'aunque']
  },
  {
    id: 'p-4',
    es: 'En conclusión, si somos constantes y no tenemos miedo de equivocarnos, podremos mejorar poco a poco.',
    hy: 'Եզրափակելով՝ եթե հետևողական լինենք և չվախենանք սխալվելուց, կկարողանանք աստիճանաբար առաջադիմել։',
    highlightedConnectors: ['En conclusión', 'si']
  }
];

export const LEVEL_RECOMMENDATIONS = [
  {
    level: 'A1',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    connectors: 'y, pero, porque, también, después',
    descriptionHy: 'Հիմնական կապակցող բառեր պարզ նախադասություններ կազմելու և առօրյա հաղորդակցության համար։'
  },
  {
    level: 'A2',
    badgeClass: 'bg-teal-100 text-teal-800 border-teal-300',
    connectors: 'entonces, por eso, primero, luego, además, cuando',
    descriptionHy: 'Մտքերի հաջորդականություն, պարզ պատճառ-հետևանք և ժամանակային կապեր։'
  },
  {
    level: 'B1',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-300',
    connectors: 'sin embargo, aunque, mientras que, en cambio, por lo tanto',
    descriptionHy: 'Սահուն հակադրություն, զիջում, համեմատություն և տրամաբանական փաստարկներ։'
  },
  {
    level: 'B2',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    connectors: 'a pesar de que, no obstante, puesto que, por consiguiente, con tal de que',
    descriptionHy: 'Պաշտոնական և հղկված խոսք, Subjuntivo-ի խորացված կիրառում, պայմանական կառույցներ։'
  },
  {
    level: 'C1',
    badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
    connectors: 'si bien, de ahí que, ahora bien, en vista de que, por mucho que, dicho esto',
    descriptionHy: 'Գիտական, վերլուծական, բարդ ոճական նրբերանգներ և ակադեմիական շարադրանք։'
  }
];

export const PARTE_2_ADDITIONAL_CONNECTORS = [
  { id: 'p2-1', es: 'De todas formas', hy: 'ամեն դեպքում', exampleEs: 'De todas formas, iré.', exampleHy: 'Ամեն դեպքում կգնամ։' },
  { id: 'p2-2', es: 'Aun cuando', hy: 'նույնիսկ եթե, թեև', exampleEs: 'Aun cuando sea difícil, lo intentaré.', exampleHy: 'Նույնիսկ եթե դժվար լինի, կփորձեմ։' },
  { id: 'p2-3', es: 'En lugar de', hy: 'փոխարենը', exampleEs: 'En lugar de salir, estudié.', exampleHy: 'Դուրս գալու փոխարեն սովորեցի։' },
  { id: 'p2-4', es: 'En vez de', hy: 'փոխարենը', exampleEs: 'En vez de café, tomé té.', exampleHy: 'Սուրճի փոխարեն թեյ խմեցի։' },
  { id: 'p2-5', es: 'Por si', hy: 'այն դեպքի համար, եթե', exampleEs: 'Lleva dinero por si lo necesitas.', exampleHy: 'Գումար վերցրու այն դեպքի համար, եթե պետք գա։' },
  { id: 'p2-6', es: 'Siempre y cuando', hy: 'պայմանով, որ', exampleEs: 'Iré siempre y cuando tenga tiempo.', exampleHy: 'Կգնամ, պայմանով, որ ժամանակ ունենամ։' },
  { id: 'p2-7', es: 'De lo contrario', hy: 'հակառակ դեպքում', exampleEs: 'Estudia; de lo contrario, suspenderás.', exampleHy: 'Սովորիր, հակառակ դեպքում կկտրվես քննությունից։' },
  { id: 'p2-8', es: 'Por otra parte', hy: 'մյուս կողմից', exampleEs: 'Por otra parte, es caro.', exampleHy: 'Մյուս կողմից՝ թանկ է։' },
  { id: 'p2-9', es: 'En cuanto a', hy: 'ինչ վերաբերում է', exampleEs: 'En cuanto al trabajo, todo va bien.', exampleHy: 'Ինչ վերաբերում է աշխատանքին, ամեն ինչ լավ է։' },
  { id: 'p2-10', es: 'A medida que', hy: 'որքան, այնքան / զուգընթաց', exampleEs: 'A medida que practico, mejoro.', exampleHy: 'Որքան պարապում եմ, այնքան բարելավվում եմ։' },
  { id: 'p2-11', es: 'Ni siquiera', hy: 'նույնիսկ ... ոչ', exampleEs: 'Ni siquiera me llamó.', exampleHy: 'Նույնիսկ ինձ չզանգեց։' },
  { id: 'p2-12', es: 'Es más', hy: 'ավելին', exampleEs: 'Es más, ya lo sabía.', exampleHy: 'Ավելին՝ ես արդեն գիտեի դա։' },
  { id: 'p2-13', es: 'Eso sí', hy: 'բայց մի պայմանով / սակայն', exampleEs: 'Puedes venir. Eso sí, no llegues tarde.', exampleHy: 'Կարող ես գալ։ Բայց մի պայմանով՝ չուշանաս։' },
  { id: 'p2-14', es: 'Al fin y al cabo', hy: 'ի վերջո, վերջիվերջո', exampleEs: 'Al fin y al cabo, somos amigos.', exampleHy: 'Ի վերջո, մենք ընկերներ ենք։' },
  { id: 'p2-15', es: 'Por un lado... por otro', hy: 'մի կողմից... մյուս կողմից', exampleEs: 'Por un lado es útil; por otro, es caro.', exampleHy: 'Մի կողմից օգտակար է, մյուս կողմից՝ թանկ։' }
];

// EXERCISES DATA (1 to 10)
export interface QuizOptionQuestion {
  id: number;
  sentenceEs: string;
  sentenceHy: string;
  options: { label: string; text: string }[];
  correct: string;
  explanation: string;
}

export const EXERCISE_1_QUESTIONS: QuizOptionQuestion[] = [
  {
    id: 1,
    sentenceEs: 'Estaba cansado, ___ terminé todos mis deberes.',
    sentenceHy: 'Ես հոգնած էի, բայց ավարտեցի բոլոր տնային աշխատանքներս։',
    options: [
      { label: 'A', text: 'porque' },
      { label: 'B', text: 'sin embargo' },
      { label: 'C', text: 'por eso' },
      { label: 'D', text: 'además' }
    ],
    correct: 'B',
    explanation: 'Sin embargo ցույց է տալիս հակադրություն (սակայն / բայց ավարտեցի)։'
  },
  {
    id: 2,
    sentenceEs: 'No había autobuses, ___ tuvimos que caminar.',
    sentenceHy: 'Ավտոբուսներ չկային, այդ պատճառով ստիպված էինք քայլել։',
    options: [
      { label: 'A', text: 'aunque' },
      { label: 'B', text: 'por eso' },
      { label: 'C', text: 'mientras' },
      { label: 'D', text: 'pero' }
    ],
    correct: 'B',
    explanation: 'Por eso արտահայտում է հետևանք (այդ պատճառով ստիպված էինք քայլել)։'
  },
  {
    id: 3,
    sentenceEs: '___ llovía, decidimos quedarnos en casa.',
    sentenceHy: 'Քանի որ անձրև էր գալիս, որոշեցինք տանը մնալ։',
    options: [
      { label: 'A', text: 'Como' },
      { label: 'B', text: 'Sin embargo' },
      { label: 'C', text: 'Además' },
      { label: 'D', text: 'Por lo tanto' }
    ],
    correct: 'A',
    explanation: 'Como-ն նախադասության սկզբում օգտագործվում է որպես պատճառ՝ «քանի որ» իմաստով։'
  },
  {
    id: 4,
    sentenceEs: 'Puedes usar mi ordenador ___ lo cuides bien.',
    sentenceHy: 'Կարող ես օգտագործել համակարգիչս, պայմանով, որ լավ խնամես այն։',
    options: [
      { label: 'A', text: 'porque' },
      { label: 'B', text: 'aunque' },
      { label: 'C', text: 'siempre que' },
      { label: 'D', text: 'así que' }
    ],
    correct: 'C',
    explanation: 'Siempre que նշանակում է «պայմանով, որ» և պահանջում է Subjuntivo (lo cuides)։'
  },
  {
    id: 5,
    sentenceEs: 'Estudio español ___ poder trabajar en España.',
    sentenceHy: 'Իսպաներեն եմ սովորում Իսպանիայում աշխատելու համար։',
    options: [
      { label: 'A', text: 'para' },
      { label: 'B', text: 'porque' },
      { label: 'C', text: 'por eso' },
      { label: 'D', text: 'aunque' }
    ],
    correct: 'A',
    explanation: 'Para + infinitivo (poder) արտահայտում է նպատակ, երբ ենթական նույնն է։'
  }
];

export const EXERCISE_2_ITEMS = [
  {
    id: 1,
    before: 'No fui al trabajo',
    after: 'estaba enfermo.',
    hy: 'Աշխատանքի չգնացի, որովհետև հիվանդ էի։',
    correct: 'porque'
  },
  {
    id: 2,
    before: 'Estudié mucho.',
    after: ', no aprobé el examen.',
    hy: 'Շատ սովորեցի։ Սակայն չհանձնեցի քննությունը։',
    correct: 'Sin embargo'
  },
  {
    id: 3,
    before: 'Te llamo',
    after: 'llego a casa.',
    hy: 'Քեզ կզանգեմ, հենց տուն հասնեմ։',
    correct: 'en cuanto'
  },
  {
    id: 4,
    before: 'Mi hermana cocina',
    after: 'yo limpio la casa.',
    hy: 'Քույրս ճաշ է եփում, մինչ ես տունն եմ մաքրում։',
    correct: 'mientras'
  },
  {
    id: 5,
    before: 'Hace mucho frío,',
    after: 'no vamos a salir.',
    hy: 'Շատ ցուրտ է, այդ պատճառով դուրս չենք գալու։',
    correct: 'por eso'
  },
  {
    id: 6,
    before: '',
    after: 'no tengo dinero, quiero viajar.',
    hy: 'Չնայած գումար չունեմ, ուզում եմ ճանապարհորդել։',
    correct: 'Aunque'
  },
  {
    id: 7,
    before: 'Te lo explico',
    after: 'lo entiendas.',
    hy: 'Քեզ բացատրում եմ, որպեսզի հասկանաս։',
    correct: 'para que'
  },
  {
    id: 8,
    before: 'El piso es grande y,',
    after: ', tiene terraza.',
    hy: 'Բնակարանը մեծ է և, բացի այդ, ունի պատշգամբ։',
    correct: 'además'
  }
];

export const EXERCISE_2_WORD_BANK = [
  'aunque',
  'además',
  'por eso',
  'mientras',
  'para que',
  'porque',
  'sin embargo',
  'en cuanto'
];

export const EXERCISE_3_ITEMS = [
  { id: 1, hy: 'Ես շատ էի սովորել, սակայն չհանձնեցի քննությունը։', answerEs: 'Había estudiado mucho; sin embargo, no aprobé el examen.' },
  { id: 2, hy: 'Քանի որ վաղը աշխատում եմ, այսօր շուտ եմ քնելու։', answerEs: 'Como mañana trabajo, hoy voy a dormir temprano.' },
  { id: 3, hy: 'Նա չի զանգել ինձ, այդ պատճառով ես անհանգստանում եմ։', answerEs: 'No me ha llamado, por eso me preocupo (estoy preocupado).' },
  { id: 4, hy: 'Չնայած անձրևին՝ մենք շարունակեցինք խաղալ։', answerEs: 'A pesar de la lluvia, seguimos jugando.' },
  { id: 5, hy: 'Ես սովորում եմ, որպեսզի ծնողներս հպարտանան ինձնով։', answerEs: 'Estudio para que mis padres estén orgullosos de mí.' },
  { id: 6, hy: 'Եթե ժամանակ ունենայի, ավելի շատ կկարդայի։', answerEs: 'Si tuviera tiempo, leería más.' },
  { id: 7, hy: 'Հենց տուն հասնես, ինձ հաղորդագրություն ուղարկիր։', answerEs: 'En cuanto llegues a casa, envíame un mensaje.' },
  { id: 8, hy: 'Ես սիրում եմ ճանապարհորդել։ Բացի այդ, սիրում եմ նոր լեզուներ սովորել։', answerEs: 'Me gusta viajar. Además, me gusta aprender nuevos idiomas.' },
  { id: 9, hy: 'Մենք կմնանք տանը, եթե միայն եղանակը չլավանա։', answerEs: 'Nos quedaremos en casa a menos que mejore el tiempo.' },
  { id: 10, hy: 'Որքան ավելի շատ եմ պարապում, այնքան ավելի լավ եմ խոսում։', answerEs: 'A medida que practico más, hablo mejor.' }
];

export const EXERCISE_4_ITEMS = [
  {
    id: 1,
    sentences: 'Estoy cansado. Voy al gimnasio.',
    connector: 'aunque',
    instruction: 'Միացրու նախադասությունները',
    solution: 'Aunque estoy cansado, voy al gimnasio.',
    hy: 'Չնայած հոգնած եմ՝ գնում եմ մարզասրահ։'
  },
  {
    id: 2,
    sentences: 'No tenía dinero. No compré el teléfono.',
    connector: 'por eso',
    instruction: 'Միացրու նախադասությունները',
    solution: 'No tenía dinero, por eso no compré el teléfono.',
    hy: 'Գումար չունեի, այդ պատճառով հեռախոսը չգնեցի։'
  },
  {
    id: 3,
    sentences: 'Quiero aprender español. Quiero vivir en Madrid.',
    connector: 'porque',
    instruction: 'Միացրու նախադասությունները',
    solution: 'Quiero aprender español porque quiero vivir en Madrid.',
    hy: 'Ուզում եմ իսպաներեն սովորել, որովհետև ուզում եմ ապրել Մադրիդում։'
  },
  {
    id: 4,
    sentences: 'Hace frío. Vamos a jugar al fútbol.',
    connector: 'sin embargo',
    instruction: 'Միացրու նախադասությունները',
    solution: 'Hace frío; sin embargo, vamos a jugar al fútbol.',
    hy: 'Ցուրտ է, սակայն մենք ֆուտբոլ ենք խաղալու։'
  },
  {
    id: 5,
    sentences: 'No encontró trabajo. Decidió hacer un curso.',
    connector: 'así que',
    instruction: 'Միացրու նախադասությունները',
    solution: 'No encontró trabajo, así que decidió hacer un curso.',
    hy: 'Աշխատանք չգտավ, այնպես որ որոշեց դասընթաց անցնել։'
  },
  {
    id: 6,
    sentences: 'Él practica mucho. Él mejora rápidamente.',
    connector: 'a medida que',
    instruction: 'Միացրու նախադասությունները',
    solution: 'A medida que practica, mejora rápidamente.',
    hy: 'Որքան պարապում է, այնքան արագ առաջադիմում է։'
  }
];

export const EXERCISE_5_ITEMS = [
  {
    id: 1,
    prompt: 'Cuando ___ (llegar) mañana, te llamaré.',
    verb: 'llegar',
    correctAnswer: 'llegues',
    mood: 'Subjuntivo',
    explanation: 'Ապագայում դեռ չկատարված ժամանակային գործողություն (mañana) -> Subjuntivo (llegues):'
  },
  {
    id: 2,
    prompt: 'Aunque ___ (hacer) frío ahora, salgo a caminar.',
    verb: 'hacer',
    correctAnswer: 'hace',
    mood: 'Indicativo',
    explanation: 'Խոսողը նշում է իրական, հաստատված ներկա փաստ (ahora) -> Indicativo (hace):'
  },
  {
    id: 3,
    prompt: 'Te ayudaré siempre que me ___ (decir) la verdad.',
    verb: 'decir',
    correctAnswer: 'digas',
    mood: 'Subjuntivo',
    explanation: 'Siempre que (պայմանով, որ) պահանջում է Subjuntivo (digas):'
  },
  {
    id: 4,
    prompt: 'Como no ___ (tener) tiempo ayer, me quedé en casa.',
    verb: 'tener',
    correctAnswer: 'tuve / tenía',
    mood: 'Indicativo (pretérito)',
    explanation: 'Անցյալի հաստատված իրական փաստ (ayer) -> Indicativo (tuve կամ tenía):'
  },
  {
    id: 5,
    prompt: 'En cuanto ___ (terminar) el examen, saldremos.',
    verb: 'terminar',
    correctAnswer: 'terminemos / termine',
    mood: 'Subjuntivo',
    explanation: 'En cuanto + ապագա գործողություն (saldremos) -> Subjuntivo (terminemos / termine):'
  },
  {
    id: 6,
    prompt: 'A menos que ___ (llover), iremos al parque.',
    verb: 'llover',
    correctAnswer: 'llueva',
    mood: 'Subjuntivo',
    explanation: 'A menos que (եթե միայն չ...) միշտ պահանջում է Subjuntivo (llueva):'
  }
];

export const EXERCISE_6_ITEMS = [
  {
    id: 1,
    sentence: 'Estaba enfermo, porque fui a trabajar.',
    errorWord: 'porque',
    correction: 'Estaba enfermo, pero / sin embargo fui a trabajar.',
    explanation: '«Porque» նշանակում է «որովհետև», որը տրամաբանորեն սխալ է (հիվանդ էր, ուստի պետք է լինի հակադրություն՝ «բայց/սակայն»՝ pero/sin embargo)։'
  },
  {
    id: 2,
    sentence: 'Te llamaré cuando llegaré.',
    errorWord: 'llegaré',
    correction: 'Te llamaré cuando llegue.',
    explanation: 'Cuando-ից հետո ապագա ժամանակի Futuro (llegaré) չի գործածվում, պարտադիր պետք է Subjuntivo՝ «llegue»։'
  },
  {
    id: 3,
    sentence: 'Estudio para que aprender español.',
    errorWord: 'para que aprender',
    correction: 'Estudio para aprender español.',
    explanation: 'Երբ ենթական նույնն է (ես եմ սովորում), օգտագործվում է «para + infinitivo» (para aprender), ոչ թե «para que»։'
  },
  {
    id: 4,
    sentence: 'A pesar de que estaba cansado, pero salió.',
    errorWord: 'pero',
    correction: 'A pesar de que estaba cansado, salió.',
    explanation: 'Միևնույն նախադասության մեջ չի կարելի կրկնակի հակադրություն դնել (կա՛մ A pesar de que, կա՛մ pero)։ Ավելորդ «pero»-ն հեռացվում է։'
  },
  {
    id: 5,
    sentence: 'No estudié, sin embargo suspendí.',
    errorWord: 'sin embargo',
    correction: 'No estudié, por eso suspendí.',
    explanation: 'Չսովորելու և քննությունը տապալելու միջև ոչ թե հակադրություն է, այլ բնական հետևանք, ուստի պետք է լինի «por eso» (այդ պատճառով)։'
  },
  {
    id: 6,
    sentence: 'Iré a menos que no llueva.',
    errorWord: 'no llueva',
    correction: 'Iré a menos que llueva.',
    explanation: '«A menos que» արդեն իսկ իր մեջ ունի ժխտական իմաստ («եթե միայն չ...»), հետևաբար «no» բառը դնելը կրկնակի ժխտում է դառնում։'
  }
];

export const EXERCISE_7_STORY = {
  titleEs: 'Un viaje inesperado',
  titleHy: 'Անսպասելի ճանապարհորդություն',
  bank: [
    'sin embargo',
    'porque',
    'primero',
    'después',
    'por eso',
    'aunque',
    'finalmente',
    'además'
  ],
  slots: [
    { num: 1, correct: 'Primero', hy: 'սկզբում' },
    { num: 2, correct: 'porque', hy: 'որովհետև' },
    { num: 3, correct: 'Después', hy: 'հետո' },
    { num: 4, correct: 'Sin embargo', hy: 'սակայն' },
    { num: 5, correct: 'Por eso', hy: 'այդ պատճառով' },
    { num: 6, correct: 'Aunque', hy: 'թեև, չնայած' },
    { num: 7, correct: 'además', hy: 'բացի այդ' },
    { num: 8, correct: 'Finalmente', hy: 'վերջապես' }
  ],
  completedEs:
    'Ayer tuve un día bastante complicado. (1) Primero, me desperté tarde (2) porque mi despertador no sonó. (3) Después, salí de casa rápidamente. (4) Sin embargo, cuando llegué a la estación, el tren ya se había marchado. Estaba muy preocupado. (5) Por eso, decidí buscar otro transporte. (6) Aunque era caro, tomé un taxi. El conductor fue muy amable y, (7) además, me ayudó con las maletas. (8) Finalmente, llegué a tiempo a mi reunión.',
  translationHy:
    'Երեկ իմ օրը բավականին բարդ էր։ Սկզբում ուշ արթնացա, որովհետև զարթուցիչս չզանգեց։ Հետո տնից շտապ դուրս եկա։ Սակայն, երբ հասա կայարան, գնացքն արդեն մեկնել էր։ Շատ անհանգստացած էի։ Այդ պատճառով որոշեցի այլ տրանսպորտ գտնել։ Թեև թանկ էր, տաքսի նստեցի։ Վարորդը շատ բարեհամբույր էր և, բացի այդ, օգնեց ինձ ճամպրուկների հարցում։ Վերջապես, ճիշտ ժամանակին հասա հանդիպմանս։'
};

export const EXERCISE_8_ITEMS = [
  {
    id: 1,
    questionEs: '¿Qué haces cuando tienes mucho trabajo?',
    questionHy: 'Ի՞նչ ես անում, երբ շատ աշխատանք ունես։',
    requiredConnectors: ['cuando', 'primero', 'después'],
    sampleResponseEs: 'Cuando tengo mucho trabajo, primero organizo mis tareas por prioridad y, después, empiezo con la más importante para no estresarme.',
    sampleResponseHy: 'Երբ շատ աշխատանք ունեմ, սկզբում կազմակերպում եմ գործերս ըստ առաջնահերթության, իսկ հետո սկսում եմ ամենակարևորից, որպեսզի չսթրեսավորվեմ։'
  },
  {
    id: 2,
    questionEs: '¿Viajarías aunque tuvieras poco dinero?',
    questionHy: 'Կճանապարհորդեի՞ր, եթե նույնիսկ քիչ գումար ունենայիր։',
    requiredConnectors: ['aunque', 'porque'],
    sampleResponseEs: 'Sí, viajaría aunque tuviera poco presupuesto, porque siempre se pueden buscar hostales económicos y viajar en autobús para ahorrar.',
    sampleResponseHy: 'Այո, կճանապարհորդեի, նույնիսկ եթե քիչ բյուջե ունենայի, որովհետև միշտ կարելի է էժան հոսթելներ գտնել և ավտոբուսով ճանապարհորդել խնայելու համար։'
  },
  {
    id: 3,
    questionEs: '¿Qué harías si perdieras tu teléfono?',
    questionHy: 'Ի՞նչ կանեիր, եթե կորցնեիր հեռախոսդ։',
    requiredConnectors: ['si', 'primero', 'después'],
    sampleResponseEs: 'Si perdiera mi teléfono, primero intentaría rastrearlo con el ordenador y, después, bloquearía mis tarjetas bancarias por seguridad.',
    sampleResponseHy: 'Եթե կորցնեի հեռախոսս, սկզբում կփորձեի գտնել այն համակարգչով, իսկ հետո կապահովագրեի և կբլոկավորեի բանկային քարտերս։'
  },
  {
    id: 4,
    questionEs: '¿Por qué es importante aprender idiomas?',
    questionHy: 'Ինչո՞ւ է կարևոր լեզուներ սովորելը։',
    requiredConnectors: ['porque', 'además', 'por ejemplo'],
    sampleResponseEs: 'Es importante aprender idiomas porque nos abre la mente y, además, nos da mejores oportunidades de trabajo, por ejemplo, en empresas internacionales.',
    sampleResponseHy: 'Կարևոր է լեզուներ սովորել, որովհետև դա բացում է մեր աշխարհայացքը, բացի այդ՝ աշխատանքային լավ հնարավորություններ է տալիս, օրինակ՝ միջազգային ընկերություններում։'
  },
  {
    id: 5,
    questionEs: '¿Qué haces para mejorar tu español?',
    questionHy: 'Ի՞նչ ես անում իսպաներենս բարելավելու համար։',
    requiredConnectors: ['para', 'además', 'aunque'],
    sampleResponseEs: 'Leo libros en español para ampliar mi vocabulario; además, escucho podcasts a diario, aunque a veces me cueste entender a los nativos.',
    sampleResponseHy: 'Իսպաներեն գրքեր եմ կարդում բառապաշարս հարստացնելու համար. բացի այդ, ամեն օր փոդքասթներ եմ լսում, թեև երբեմն դժվարանում եմ հասկանալ բնիկ խոսողներին։'
  },
  {
    id: 6,
    questionEs: '¿Prefieres vivir en una ciudad grande o pequeña?',
    questionHy: 'Նախընտրո՞ւմ ես ապրել մեծ, թե՞ փոքր քաղաքում։',
    requiredConnectors: ['por un lado', 'por otro lado', 'sin embargo'],
    sampleResponseEs: 'Por un lado, la gran ciudad ofrece museos y eventos; por otro lado, el tráfico es terrible. Sin embargo, para mi carrera profesional prefiero la gran ciudad.',
    sampleResponseHy: 'Մի կողմից՝ մեծ քաղաքն առաջարկում է թանգարաններ և իրադարձություններ, մյուս կողմից՝ խցանումները սարսափելի են։ Սակայն մասնագիտական աճի համար նախընտրում եմ մեծ քաղաքը։'
  }
];

export const EXERCISE_9_ITEMS = [
  { id: 1, term: 'Debido a', correctCategory: 'Causa', options: ['Causa', 'Consecuencia', 'Contraste', 'Finalidad', 'Condición'] },
  { id: 2, term: 'Por consiguiente', correctCategory: 'Consecuencia', options: ['Causa', 'Consecuencia', 'Adición', 'Temporal', 'Ejemplificación'] },
  { id: 3, term: 'No obstante', correctCategory: 'Contraste', options: ['Contraste', 'Causa', 'Finalidad', 'Opinión', 'Secuencia'] },
  { id: 4, term: 'Asimismo', correctCategory: 'Adición', options: ['Adición', 'Concesivo', 'Causa', 'Comparación', 'Conclusión'] },
  { id: 5, term: 'A fin de', correctCategory: 'Finalidad', options: ['Finalidad', 'Condición', 'Temporal', 'Explicativo', 'Contraste'] },
  { id: 6, term: 'Siempre y cuando', correctCategory: 'Condición', options: ['Condición', 'Concesivo', 'Consecuencia', 'Ejemplificación', 'Temporal'] },
  { id: 7, term: 'A causa de', correctCategory: 'Causa', options: ['Causa', 'Consecuencia', 'Opinión', 'Adición', 'Secuencia'] },
  { id: 8, term: 'En consecuencia', correctCategory: 'Consecuencia', options: ['Consecuencia', 'Causa', 'Contraste', 'Concesivo', 'Comparación'] }
];

export const EXERCISE_10_ITEMS = [
  {
    id: 1,
    titleEs: 'Causa — Պատճառ',
    hy: 'Մենք դուրս չեկանք անձրևի պատճառով։',
    variants: [
      { es: 'No salimos porque llovía.', note: 'porque + դիմավոր բայ' },
      { es: 'Como llovía, no salimos.', note: 'como նախադասության սկզբում' },
      { es: 'No salimos debido a la lluvia.', note: 'debido a + գոյական' }
    ]
  },
  {
    id: 2,
    titleEs: 'Contraste — Հակադրություն',
    hy: 'Չնայած հոգնած էր՝ շարունակեց աշխատել։',
    variants: [
      { es: 'Estaba cansado, pero siguió trabajando.', note: 'pero համադասական' },
      { es: 'Aunque estaba cansado, siguió trabajando.', note: 'aunque զիջում' },
      { es: 'Estaba cansado. Sin embargo, siguió trabajando.', note: 'sin embargo առանձին նախադասություն' }
    ]
  },
  {
    id: 3,
    titleEs: 'Consecuencia — Հետևանք',
    hy: 'Նա շատ սովորեց, այդ պատճառով հանձնեց քննությունը։',
    variants: [
      { es: 'Estudió mucho, por eso aprobó.', note: 'por eso սովորական հետևանք' },
      { es: 'Estudió mucho, así que aprobó.', note: 'así que խոսակցական արդյունք' },
      { es: 'Estudió mucho. Por lo tanto, aprobó.', note: 'por lo tanto տրամաբանական հետևանք' }
    ]
  }
];
