package br.gov.servicos.editor.frontend;

import br.gov.servicos.editor.servicos.*;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;

@Controller
public class IndexController {

    @RequestMapping("/")
    public ModelAndView index() {
        return new ModelAndView("index", "servico", new Servico());
    }

    @RequestMapping("/exemplo")
    public ModelAndView exemplo() {
        return new ModelAndView("index", "servico", new Servico()
                .withNome("Carteira Nacional de Habilitação (CNH)")
                .withNomesPopulares("carta de motorista, carteira, carta, cnh, habilitação")
                .withDescricao("A CNH blah blah blah...")
                .withPalavrasChave("carta de motorista, carteira, carta, cnh, habilitação")
                .withAreasDeInteresse(asList("Comércio e Serviços", "Comunicações"))
                .withSegmentosDaSociedade(asList("Cidadãos", "Empresas"))
                .withEventosDaLinhaDaVida(asList("Documentos e certidões", "Contas e Impostos"))
                .withLegislacoes(asList(
                        "http://www.lexml.gov.br/urn/urn:lex:br:federal:decreto:2009-08-11;6932",
                        "http://www.lexml.gov.br/urn/urn:lex:br:federal:lei:1993-06-21;8666"))
                .withSolicitantes(singletonList("Cidadãos maiores de 18 anos"))
                .withTempoEstimado(new TempoEstimado()
                                .withTipo("entre")
                                .withMinimo("15")
                                .withTipoMinimo("dias")
                                .withMaximo("20")
                                .withTipoMaximo("dias")
                                .withExcecoes("Para solicitantes dos tipos C, D e E, o processo pode levar mais tempo.")
                )
                .withEtapas(singletonList(new Etapa()
                                .withTitulo("Agendar prova teórica do CFC")
                                .withDescricao("A prova teórica do CFC deve ser agendada nas...")
                                .withDocumentos(asList("RG", "CPF", "Termo de conclusão de curso no CFC"))
                                .withCustos(singletonList(new Custo().withDescricao("Taxa de emissão").withValor("78,50")))
                                .withCanaisDePrestacao(asList(
                                        new CanalDePrestacao().withDescricao("Posto de atendimento").withPreferencial(true).withTipo("Presencial"),
                                        new CanalDePrestacao().withDescricao("555").withPreferencial(false).withTipo("Telefone")
                                ))
                ))

                .withOrgao(new Orgao().withId("ministerio-da-saude-ms"))
                .withGratuito(true)
                .withSituacao("Sim: serviço parcialmente eletrônico (partes presenciais, via telefone ou em papel)")
        );
    }

    @RequestMapping(value = "/salvar", method = RequestMethod.POST)
    RedirectView salvar(@ModelAttribute("servico") Servico servico, BindingResult result) {
        System.out.println("servico = " + servico);
        return new RedirectView("/");
    }

}
