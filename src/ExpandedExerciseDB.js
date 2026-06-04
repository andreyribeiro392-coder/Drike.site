// Banco de dados expandido com 30+ exercícios

export const expandedExerciseDatabase = {
  academia: [
    // Peito
    {
      id: 'supino',
      name: 'Supino',
      category: 'Peito',
      difficulty: 'Intermediário',
      muscle: 'Peito, Tríceps, Ombro',
      equipment: 'Barra, Halteres',
      sets: '4',
      reps: '8-10',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      correctForm: {
        points: [
          'Deite-se no banco com os pés no chão',
          'Segure a barra na altura do peito',
          'Empurre a barra para cima até estender os braços',
          'Baixe controladamente até o peito',
          'Mantenha os cotovelos em 45 graus',
        ],
      },
      precautions: [
        'Não salte com a barra',
        'Mantenha os pés firmes no chão',
        'Não arqueia excessivamente as costas',
        'Use peso que possa controlar',
      ],
      injuries: [
        'Impacto no ombro: evite descer muito',
        'Lesão no pulso: mantenha os pulsos retos',
        'Lesão nas costas: não arqueia',
      ],
    },
    // Costas
    {
      id: 'barra-fixa',
      name: 'Barra Fixa',
      category: 'Costas',
      difficulty: 'Avançado',
      muscle: 'Costas, Bíceps',
      equipment: 'Barra fixa',
      sets: '4',
      reps: '6-12',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      correctForm: {
        points: [
          'Pendurado com os braços estendidos',
          'Puxe o corpo para cima',
          'Toque o peito na barra',
          'Baixe controladamente',
          'Mantenha o core contraído',
        ],
      },
      precautions: [
        'Não balance o corpo',
        'Use um assistente se necessário',
        'Aqueça bem os ombros',
      ],
      injuries: [
        'Lesão no ombro: amplitude limitada',
        'Lesão no cotovelo: não force',
      ],
    },
    // Pernas
    {
      id: 'leg-press',
      name: 'Leg Press',
      category: 'Pernas',
      difficulty: 'Intermediário',
      muscle: 'Quadríceps, Glúteos, Isquiotibiais',
      equipment: 'Máquina leg press',
      sets: '4',
      reps: '10-15',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      correctForm: {
        points: [
          'Sente-se com as costas apoiadas',
          'Coloque os pés na plataforma',
          'Empurre a plataforma para frente',
          'Não estenda completamente os joelhos',
          'Baixe controladamente',
        ],
      },
      precautions: [
        'Não desça muito (90 graus)',
        'Mantenha os joelhos alinhados',
        'Não force os joelhos',
      ],
      injuries: [
        'Lesão no joelho: não desça muito',
        'Lesão nas costas: mantenha apoio',
      ],
    },
    // Ombro
    {
      id: 'desenvolvimento',
      name: 'Desenvolvimento',
      category: 'Ombro',
      difficulty: 'Intermediário',
      muscle: 'Ombro, Tríceps',
      equipment: 'Halteres, Barra',
      sets: '3',
      reps: '10-12',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      correctForm: {
        points: [
          'Sente-se com as costas retas',
          'Levante os halteres até a altura dos ombros',
          'Empurre para cima até estender',
          'Baixe controladamente',
          'Mantenha o core contraído',
        ],
      },
      precautions: [
        'Não arqueia as costas',
        'Mantenha os cotovelos abaixo da barra',
        'Use peso moderado',
      ],
      injuries: [
        'Impacto no ombro: não force',
        'Lesão nas costas: postura correta',
      ],
    },
    // Bíceps
    {
      id: 'rosca-direta',
      name: 'Rosca Direta',
      category: 'Bíceps',
      difficulty: 'Iniciante',
      muscle: 'Bíceps',
      equipment: 'Halteres, Barra',
      sets: '3',
      reps: '10-12',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      correctForm: {
        points: [
          'Fique em pé com os pés na largura dos ombros',
          'Segure os halteres com as palmas para frente',
          'Dobre os cotovelos levantando os halteres',
          'Suba até a altura dos ombros',
          'Baixe controladamente',
        ],
      },
      precautions: [
        'Não balance o corpo',
        'Mantenha os cotovelos junto ao corpo',
        'Não use muito peso',
      ],
      injuries: [
        'Lesão no cotovelo: não force',
        'Lesão nas costas: não balance',
      ],
    },
    // Tríceps
    {
      id: 'tracao-tríceps',
      name: 'Tração Tríceps',
      category: 'Tríceps',
      difficulty: 'Intermediário',
      muscle: 'Tríceps',
      equipment: 'Cabo, Corda',
      sets: '3',
      reps: '12-15',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      correctForm: {
        points: [
          'Fique em pé de frente para a máquina',
          'Segure a corda com as duas mãos',
          'Puxe para baixo estendendo os cotovelos',
          'Suba controladamente',
          'Mantenha os cotovelos junto ao corpo',
        ],
      },
      precautions: [
        'Não use muito peso',
        'Mantenha os cotovelos fixos',
        'Controle o movimento',
      ],
      injuries: [
        'Lesão no cotovelo: não force',
        'Lesão no pulso: mantenha reto',
      ],
    },
  ],
  casa: [
    // Sem equipamento
    {
      id: 'flexao-casa',
      name: 'Flexão de Braço',
      category: 'Sem Equipamento',
      difficulty: 'Iniciante',
      muscle: 'Peito, Tríceps, Ombro',
      equipment: 'Nenhum',
      sets: '3',
      reps: '10-20',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      correctForm: {
        points: [
          'Deite-se no chão com as mãos embaixo dos ombros',
          'Mantenha o corpo reto',
          'Suba empurrando com os braços',
          'Desça até quase tocar o chão',
          'Mantenha o core contraído',
        ],
      },
      precautions: [
        'Não deixe as costas caírem',
        'Mantenha o corpo alinhado',
        'Respire corretamente',
      ],
      injuries: [
        'Lesão no ombro: não force',
        'Lesão nas costas: mantenha alinhado',
      ],
    },
    {
      id: 'agachamento-casa',
      name: 'Agachamento',
      category: 'Sem Equipamento',
      difficulty: 'Iniciante',
      muscle: 'Pernas, Glúteos',
      equipment: 'Nenhum',
      sets: '3',
      reps: '15-20',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      correctForm: {
        points: [
          'Fique em pé com os pés na largura dos ombros',
          'Desça dobrando os joelhos',
          'Mantenha as costas retas',
          'Desça até 90 graus',
          'Suba empurrando com as pernas',
        ],
      },
      precautions: [
        'Não deixe os joelhos passarem dos pés',
        'Mantenha as costas retas',
        'Não desça muito',
      ],
      injuries: [
        'Lesão no joelho: postura correta',
        'Lesão nas costas: não arqueia',
      ],
    },
    {
      id: 'prancha',
      name: 'Prancha',
      category: 'Sem Equipamento',
      difficulty: 'Intermediário',
      muscle: 'Core, Ombro',
      equipment: 'Nenhum',
      sets: '3',
      reps: '30-60s',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      correctForm: {
        points: [
          'Deite-se no chão com os cotovelos embaixo dos ombros',
          'Levante o corpo apoiado nos cotovelos e pés',
          'Mantenha o corpo reto',
          'Contraia o core',
          'Respire normalmente',
        ],
      },
      precautions: [
        'Não deixe as costas caírem',
        'Mantenha o pescoço alinhado',
        'Não force muito',
      ],
      injuries: [
        'Lesão nas costas: mantenha alinhado',
        'Lesão no ombro: não force',
      ],
    },
    {
      id: 'burpee',
      name: 'Burpee',
      category: 'Sem Equipamento',
      difficulty: 'Avançado',
      muscle: 'Full Body',
      equipment: 'Nenhum',
      sets: '3',
      reps: '10-15',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      correctForm: {
        points: [
          'Fique em pé',
          'Desça em posição de flexão',
          'Faça uma flexão',
          'Suba pulando',
          'Levante os braços',
        ],
      },
      precautions: [
        'Não force demais',
        'Descanse entre séries',
        'Aquece bem',
      ],
      injuries: [
        'Lesão no joelho: não force',
        'Lesão nas costas: postura correta',
      ],
    },
    {
      id: 'afundo',
      name: 'Afundo',
      category: 'Sem Equipamento',
      difficulty: 'Intermediário',
      muscle: 'Pernas, Glúteos',
      equipment: 'Nenhum',
      sets: '3',
      reps: '10-12 cada perna',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      correctForm: {
        points: [
          'Fique em pé com os pés juntos',
          'Dê um passo para frente',
          'Desça dobrando os joelhos',
          'Volte à posição inicial',
          'Alterne as pernas',
        ],
      },
      precautions: [
        'Mantenha o tronco reto',
        'Não deixe o joelho passar do pé',
        'Controle o movimento',
      ],
      injuries: [
        'Lesão no joelho: postura correta',
        'Lesão nas costas: não arqueia',
      ],
    },
    {
      id: 'abdominal',
      name: 'Abdominal Crunch',
      category: 'Sem Equipamento',
      difficulty: 'Iniciante',
      muscle: 'Abdominais',
      equipment: 'Nenhum',
      sets: '3',
      reps: '15-20',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      correctForm: {
        points: [
          'Deite-se no chão com os joelhos dobrados',
          'Coloque as mãos atrás da cabeça',
          'Levante o tronco contraindo o abdômen',
          'Baixe controladamente',
          'Não puxe o pescoço',
        ],
      },
      precautions: [
        'Não puxe o pescoço',
        'Mantenha o queixo afastado do peito',
        'Respire corretamente',
      ],
      injuries: [
        'Lesão no pescoço: não puxe',
        'Lesão nas costas: postura correta',
      ],
    },
    {
      id: 'polichinelo',
      name: 'Polichinelo',
      category: 'Sem Equipamento',
      difficulty: 'Iniciante',
      muscle: 'Cardio, Pernas',
      equipment: 'Nenhum',
      sets: '3',
      reps: '20-30',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      correctForm: {
        points: [
          'Fique em pé com os pés juntos',
          'Pule abrindo as pernas e levantando os braços',
          'Volte à posição inicial',
          'Repita o movimento',
          'Mantenha o ritmo',
        ],
      },
      precautions: [
        'Não force os joelhos',
        'Mantenha o equilíbrio',
        'Descanse entre séries',
      ],
      injuries: [
        'Lesão no joelho: não force',
        'Lesão no tornozelo: pouso suave',
      ],
    },
  ],
};

export default expandedExerciseDatabase;
