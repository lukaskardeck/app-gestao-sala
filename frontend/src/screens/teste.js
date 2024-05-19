const espacos = [
  {id: 1, dados: {nome: 'sala01', capacidade: 30}},
  {id: 2, dados: {nome: 'sala02', capacidade: 30}},
  {id: 3, dados: {nome: 'sala03', capacidade: 30}},
  {id: 4, dados: {nome: 'sala04', capacidade: 30}},
  {id: 5, dados: {nome: 'sala05', capacidade: 30}},
];

const espacosSelecionadosIds = [1, 2, 5];

const espacosFiltrados = espacos.filter(espaco =>
  espacosSelecionadosIds.includes(espaco.id),
);

console.log(espacosFiltrados);
