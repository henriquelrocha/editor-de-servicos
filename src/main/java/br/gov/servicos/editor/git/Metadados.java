package br.gov.servicos.editor.git;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

import java.io.Serializable;
import java.util.Objects;

@Data
@Wither
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Metadados implements Serializable {
    String id;
    Revisao publicado;
    Revisao editado;
    ConteudoMetadados conteudo;

    public boolean getTemAlteracoesNaoPublicadas() {
        if (editado == null) {
            return false;
        }
        if (publicado == null) {
            return true;
        }
        return !Objects.equals(editado.getHash(), publicado.getHash());
    }

}