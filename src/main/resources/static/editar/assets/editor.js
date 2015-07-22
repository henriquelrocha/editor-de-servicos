var models = {};

models.Solicitante = function (data) {
  var data = (data || {});
  this.descricao = m.prop(data.descricao || '');
  this.requisitos = m.prop(data.requisitos || '');
};

models.Servico = function (data) {
  var data = (data || {});
  this.nome = m.prop(data.nome || '');
  this.nomesPopulares = m.prop(data.nomesPopulares || '');
  this.descricao = m.prop(data.descricao || '');
  this.solicitantes = (data.solicitantes || []);
  this.tempoTotalEstimado = (data.tempoTotalEstimado || new models.TempoTotalEstimado());
};

models.TempoTotalEstimado = function(data) {
  var data = (data || {});
  this.tipo = m.prop(data.tipo || '');
  this.entreMinimo = m.prop(data.entreMinimo || '');
  this.entreTipoMinimo = m.prop(data.entreTipoMinimo || '');
  this.ateMaximo = m.prop(data.ateMaximo || '');
  this.ateTipoMaximo = m.prop(data.ateTipoMaximo || '');
  this.entreMaximo = m.prop(data.entreMaximo || '');
  this.entreTipoMaximo = m.prop(data.entreTipoMaximo || '');
  this.excecoes = m.prop(data.excecoes || '');
};

var Cabecalho = {
  controller: function () {
    this.login = 'cvillela@thoughtworks.com';
  },

  view: function (ctrl) {
    return m('header', [
      m('.auto-grid', [
        m('#logout', [
          m('span', [' ', ctrl.login, ' ']),
          m('button', [
            m('i.fa.fa-sign-out'), m.trust('&nbsp; Sair'),
          ])
        ])
      ]),
    ]);
  }
};

var EditorMarkdown = function (config) {
  return [
    m('.editor-barra-ferramentas', [
      m('a', {
        alt: 'Adicionar link',
        title: 'Adicionar link',
        href: 'javascript:void(0)'
      }, [m('i.fa.fa-link')]),

      m('a', {
        alt: 'Adicionar item de lista',
        title: 'Adicionar item de lista',
        href: 'javascript:void(0)'
      }, [m('i.fa.fa-list')])

    ]),
    m('textarea', config)
  ];
}

var DadosBasicos = {
  controller: function (args) {
    this.servico = args.servico;
  },

  view: function (ctrl, args) {
    return m('#dados-principais', [
      m('h2', 'Dados Principais'),

      m('fieldset', [
        m('h3', 'Nome do serviço'),
        m('input[type=text]', {
          onchange: m.withAttr('value', ctrl.servico.nome),
          value: ctrl.servico.nome()
        }),

        m('h3', 'Nomes populares'),
        m('input[type=text]', {
          onchange: m.withAttr('value', ctrl.servico.nomesPopulares),
          value: ctrl.servico.nomesPopulares()
        }),

        m('h3', 'Descrição do serviço'),
        new EditorMarkdown({
          rows: 10,
          style: {
            maxWidth: '100%',
            width: '100%'
          },
          oninput: m.withAttr('value', ctrl.servico.descricao),
          value: ctrl.servico.descricao()
        })
      ])
    ]);
  }
}

var Solicitantes = {
  controller: function (args) {
    this.servico = args.servico;

    this.adicionar = function() {
      this.servico.solicitantes.push(new models.Solicitante());
    };

    this.remover = function(i) {
      this.servico.solicitantes.splice(i, 1);
    };

  },
  view: function (ctrl, args) {
    return m('#solicitantes', [
      m('h2', 'Quem pode utilizar este serviço?'),

      ctrl.servico.solicitantes.map(function(s, i) {
        return m('fieldset', [
          m('h3', 'Solicitante'),

          m("input.inline.inline-xg[type='text']", {
            value: s.descricao(),
            onchange: m.withAttr('value', s.descricao)
          }),

          m("button.inline.remove-peq", {
            onclick: ctrl.remover.bind(ctrl, i)
          }, [
            m("span.fa.fa-times")
          ]),

          m('h3', 'Requisitos'),
          m('textarea', {
            rows: 5,
            style: {
              maxWidth: '100%',
              width: '100%'
            },
            value: s.requisitos(),
            onchange: m.withAttr('value', s.requisitos)
          })
        ]);
      }),

      m("button.adicionar-solicitante", {
        onclick: ctrl.adicionar.bind(ctrl)
      }, [
        m("i.fa.fa-plus"),
        " Novo solicitante "
      ])
    ]);
  }
};

var TempoTotalEstimado = {
  controller: function (args) {
    this.servico = args.servico;

    this.modificarTipo = function(e) {
      this.servico.tempoTotalEstimado.tipo(e.target.value);
    };
  },
  view: function (ctrl, args) {
    var unidades = [
      m("option[value='']", "Selecione…"),
      m("option[value='minutos']", "minutos"),
      m("option[value='horas']", "horas"),
      m("option[value='dias corridos']", "dias corridos"),
      m("option[value='dias úteis']", "dias úteis"),
      m("option[value='meses']", "meses")
    ];

    return m('#tempo-total-estimado', [
      m('fieldset', [
        m('h3', 'Tempo total estimado'),

        m("select.inline", {
          onchange: ctrl.modificarTipo.bind(ctrl)
        }, [
          m("option[value='']", "Selecione…"),
          m("option[value='entre']", "Entre"),
          m("option[value='até']", "Até")
        ]),
        ' ',
        m('span.ateTipo', {
          style: {
            display: ctrl.servico.tempoTotalEstimado.tipo() == 'até' ? 'inline' : 'none'
          }
        }, [
          m("input.inline[type='text']", {
            value: ctrl.servico.tempoTotalEstimado.ateMaximo(),
            onchange: m.withAttr('value', ctrl.servico.tempoTotalEstimado.ateMaximo)
          }),
          " ",
          m("select.inline", {
            onchange: m.withAttr('value', ctrl.servico.tempoTotalEstimado.ateTipoMaximo)
          }, unidades),
        ]),
        m('span.entreTipo', {
          style: {
            display: ctrl.servico.tempoTotalEstimado.tipo() == 'entre' ? 'inline' : 'none'
          }
        }, [
          m("input.inline[type='text']", {
            value: ctrl.servico.tempoTotalEstimado.entreMinimo(),
            onchange: m.withAttr('value', ctrl.servico.tempoTotalEstimado.entreMinimo)
          }),
          " ",
          m("select.inline", {
            onchange: m.withAttr('value', ctrl.servico.tempoTotalEstimado.entreTipoMinimo)
          }, unidades),

          " e ",
          m("input.inline[type='text']", {
            value: ctrl.servico.tempoTotalEstimado.entreMaximo(),
            onchange: m.withAttr('value', ctrl.servico.tempoTotalEstimado.entreMaximo)
          }),
          " ",
          m("select.inline", {
            onchange: m.withAttr('value', ctrl.servico.tempoTotalEstimado.entreTipoMaximo)
          }, unidades)
        ]),

        m("p", "Existem exceções ao tempo estimado? Quais?"),
        new EditorMarkdown({
          rows: 5,
          style: {
            maxWidth: '100%',
            width: '100%'
          },
          oninput: m.withAttr('value', ctrl.servico.tempoTotalEstimado.excecoes),
          value: ctrl.servico.tempoTotalEstimado.excecoes()
        })
      ])
    ]);
  }
};

var EditorDeServicos = {
  controller: function () {
    this.servico = new models.Servico();

    this.debug = function () {
      console.log(JSON.stringify(this));
    };
  },

  view: function (ctrl) {
    return m('#principal.auto-grid', [
      m.component(DadosBasicos, {
        servico: ctrl.servico
      }),

      m.component(Solicitantes, {
        servico: ctrl.servico
      }),

      m.component(TempoTotalEstimado, {
        servico: ctrl.servico
      }),

      m('button', {
        onclick: ctrl.debug.bind(ctrl.servico),
        style: {
          backgroundColor: '#d00'
        }
      }, [
        m("i.fa.fa-bug"),
        " Debug "
      ])
    ]);
  }
};

m.module(document.getElementById('cabecalho'), Cabecalho);
m.module(document.getElementById('conteudo'), EditorDeServicos);