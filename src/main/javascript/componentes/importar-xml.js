'use strict';

var modelos = require('modelos');

var item = function (i, n) {
  return n.textContent;
};

var solicitantes = function (i, n) {
  var t = jQuery(n);
  return new modelos.Solicitante({
    descricao: t.find('descricao').text(),
    requisitos: t.find('requisitos').text(),
  });
};

var tempoTotalEstimado = function (i, n) {
  var tag, t = jQuery(n);

  if (t.find('entre').length !== 0) {
    tag = t.find('entre');
    return new modelos.TempoTotalEstimado({
      tipo: 'entre',
      entreMinimo: tag.attr('min'),
      entreMaximo: tag.attr('max'),
      entreTipoMaximo: tag.attr('unidade'),
      descricao: t.find('descricao').text()
    });
  }

  if (t.find('ate').length !== 0) {
    tag = t.find('ate');
    return new modelos.TempoTotalEstimado({
      tipo: 'ate',
      ateMaximo: tag.attr('max'),
      ateTipoMaximo: tag.attr('unidade'),
      descricao: t.find('descricao').text()
    });
  }

  return new modelos.TempoTotalEstimado();
};

var caso = function (tipo) {
  return function (i, c) {
    var t = jQuery(c);
    return new modelos.Caso(null, {
      descricao: t.attr('descricao'),
      campos: t.find('> *').map(tipo).get()
    });
  };
};

var documentos = function (i, d) {
  var t = jQuery(d);
  return new modelos.Documentos({
    casoPadrao: new modelos.Caso(null, {
      campos: t.find('> default item').map(item).get(),
    }),
    outrosCasos: t.find('caso').map(caso(item)).get()
  });
};

var custo = function (i, c) {
  var t = jQuery(c);
  return new modelos.Custo({
    descricao: t.find('descricao').text(),
    moeda: t.find('moeda').text(),
    valor: t.find('valor').text()
  });
};

var custos = function (i, c) {
  var t = jQuery(c);
  return new modelos.Custos({
    casoPadrao: new modelos.Caso(null, {
      campos: t.find('> default custo').map(custo).get(),
    }),
    outrosCasos: t.find('caso').map(caso(custo)).get()
  });
};

var canalDePrestacao = function (i, c) {
  var t = jQuery(c);
  return new modelos.CanalDePrestacao({
    tipo: t.find('tipo').text(),
    descricao: t.find('descricao').text()
  });
};

var canaisDePrestacao = function (i, c) {
  var t = jQuery(c);
  return new modelos.CanaisDePrestacao({
    casoPadrao: new modelos.Caso(null, {
      campos: t.find('> default canal-de-prestacao').map(canalDePrestacao).get(),
    }),
    outrosCasos: t.find('caso').map(caso(canalDePrestacao)).get()
  });
};

var etapas = function (i, e) {
  var t = jQuery(e);
  return new modelos.Etapa({
    titulo: t.find('> titulo').text(),
    descricao: t.find('> descricao').text(),
    documentos: t.find('> documentos').map(documentos).get(0),
    custos: t.find('> custos').map(custos).get(0),
    canaisDePrestacao: t.find('> canais-de-prestacao').map(canaisDePrestacao).get(0)
  });
};

var servico = function (x) {
  return new modelos.Servico({
    nome: x.find('> nome').text(),
    sigla: x.find('> sigla').text(),
    nomesPopulares: x.find('> nomes-populares > item').map(item).get(),
    descricao: x.find('> descricao').text(),
    tempoTotalEstimado: x.find('> tempo-total-estimado').map(tempoTotalEstimado).get(0),
    solicitantes: x.find('> solicitantes > solicitante').map(solicitantes).get(),
    etapas: x.find('etapas > etapa', x).map(etapas).get(),
    orgao: x.find('servico > orgao').attr('id'),
    segmentosDaSociedade: x.find('servico > segmentos-da-sociedade > item').map(item).get(),
    eventosDaLinhaDaVida: x.find('servico > eventos-da-linha-da-vida > item').map(item).get(),
    areasDeInteresse: x.find('servico > areas-de-interesse > item').map(item).get(),
    palavrasChave: x.find('servico > palavras-chave > item').map(item).get(),
    legislacoes: x.find('servico > legislacoes > item').map(item).get(),
  });
};

module.exports = function (dom) {
  var x = jQuery('servico', dom);
  var svc = servico(x);
  console.log(JSON.parse(JSON.stringify(svc))); // jshint ignore:line
  return svc;
};