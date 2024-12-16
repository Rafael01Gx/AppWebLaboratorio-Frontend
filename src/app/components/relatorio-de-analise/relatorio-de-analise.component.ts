import { Component, inject, OnInit} from '@angular/core';
import { IOrdemDeServico } from '../../shared/interfaces/IOrdemDeservico.interface';
import { IAmostrasCollection, IAnalista, IResultado, IResultadoValues } from '../../shared/interfaces/IAmostra.interface';
import { AmostraService } from '../../core/services/amostra/amostra.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HelpersService } from '../../core/services/helpers/helpers.service';


@Component({
  selector: 'app-relatorio-de-analise',
  standalone: true,
  imports: [],
  templateUrl: './relatorio-de-analise.component.html',
  styleUrl: './relatorio-de-analise.component.scss'
})
export class RelatorioDeAnaliseComponent implements OnInit {
#amoastraService = inject(AmostraService)
ordemDeServico! : IOrdemDeServico ;
#helpersService = inject(HelpersService)

amostras!: IAmostrasCollection[];
relatorio!: SafeHtml;

constructor(private sanitizer: DomSanitizer) {}

ngOnInit() {
  const storedOs = sessionStorage.getItem('ordemDeServico');
  if (storedOs) {
    this.ordemDeServico = JSON.parse(storedOs);
    sessionStorage.removeItem('ordemDeServico');
  }

  try {
    this.#amoastraService.httpListarAmostraByOrdemDeServico(this.ordemDeServico.numeroOs).subscribe((response) => {
      this.amostras = response.amostras;
      const html = this.generateHTML(this.ordemDeServico, this.amostras);
      this.relatorio = this.sanitizer.bypassSecurityTrustHtml(html);
    });
  } catch (error) {
    console.log(error);
  }
}


public generateHTML(  ordemDeServico: IOrdemDeServico,
  amostras: IAmostrasCollection[]): string{
let html = '';
for (const amostra of amostras) {
  html += this.createReportTemplate(ordemDeServico, amostra);
}

return html;
}


  private createReportTemplate(
    ordemDeServico: IOrdemDeServico,
    amostra: IAmostrasCollection
  ): string {
    return `
      <div class="book">
        <div class="page">
          <div class="subpage">
            <div class="header">
              <div>
                <img src="img/logo_relatorio.png" width="150px" />
              </div>
              <div>
                <h1>Laudo de Análise</h1>
              </div>
              <div class="header-right">
                <img height="24px" src="img/arcelor.png" />
              </div>
            </div>
            <div class="body">
              <fieldset class="solicitante">
                <div>
                  <div>
                    <span>Área Solicitante:</span>
                    <fieldset><p>${ordemDeServico.solicitante?.area}</p></fieldset>
                  </div>
                  <div>
                    <span>Data de Início:</span>
                    <fieldset>
                      <p>${
                        ordemDeServico.prazo_inicio_fim?.trim().split('-')[0] ||
                        'N/A'
                      }</p>
                    </fieldset>
                  </div>
                  <div>
                    <span>Data Final:</span>
                    <fieldset>
                      <p>${
                        ordemDeServico.prazo_inicio_fim?.trim().split('-')[1] ||
                        'N/A'
                      }</p>
                    </fieldset>
                  </div>
                </div>
                <div>
                  <div>
                    <span>Requerente:</span>
                    <fieldset>
                      <p>${ordemDeServico.solicitante?.name || 'N/A'}</p>
                    </fieldset>
                  </div>
                  <div>
                    <span>E-mail:</span>
                    <fieldset>
                      <p>${ordemDeServico.solicitante?.email || 'N/A'}</p>
                    </fieldset>
                  </div>
                  <div>
                    <span>Contato:</span>
                    <fieldset>
                      <p>${ordemDeServico.solicitante?.phone || 'N/A'}</p>
                    </fieldset>
                  </div>
                </div>
              </fieldset>
              
              <fieldset class="analise">
                <div>
                  <div>
                    <span>Identificação da amostra:</span>
                    <fieldset>
                      <p>${amostra['nome_amostra']}</p>
                    </fieldset>
                  </div>
                  <div>
                    <span>Tipo de amostras:</span>
                    <fieldset>
                      <p>${amostra['amostra_tipo']}</p>
                    </fieldset>
                  </div>
                </div>
                <div>
                  <div>
                    <span>Data da Amostra:</span>
                    <fieldset>
                      <p>${amostra['data_amostra']}</p>
                    </fieldset>
                  </div>
                  <div>
                    <span>Data da Recepção:</span>
                    <fieldset>
                      <p>${amostra['data_recepcao']}</p>
                    </fieldset>
                  </div>
                </div>
              </fieldset>

              <fieldset class="ensaios">
                <div class="title">
                  <h2>Ensaios Solicitados</h2>
                </div>
                <span style="text-transform: uppercase">
                  ${amostra['ensaios_solicitados']}
                </span>
              </fieldset>

              ${this.renderResultados(amostra['resultados'] as IResultado)}

                    <fieldset class="ensaios elaboracao">
        <div class="title">
          <h2>Elaboração & aprovação</h2>
        </div>
        ${this.renderAnalistas(amostra['analistas'] as IAnalista,ordemDeServico as IOrdemDeServico)}
      </fieldset>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderResultados(resultados: IResultado): string {
    let html = '';
    Object.entries(resultados).forEach(([key, value]) => {
      html += `
        <fieldset class="ensaios">
          <div class="title">
            <h2>${key}</h2>
          </div>
          ${this.renderResultadosTable(key, value)}
        </fieldset>
      `;
    });

    html+= ` <style>
          * { box-sizing: border-box; }    
.header,
.body {
  max-width: 100%;
  overflow: hidden;
}

span,
p {
  font-size: 12px;
  margin: 0;
}

body {
  margin: 0;
  padding: 0;
  background-color: #fafafa;
  font: 12pt "Tahoma";
}

* {
  box-sizing: border-box;
}

.page {
  width: 21cm;
  margin: auto;
  border: 1px #d3d3d3 solid;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  
}

.subpage {
margin:35px 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  border: 2px #005cbb solid;
  outline: 1cm white solid;
  overflow: hidden;


  .header {
    height: 45px;
    padding: 15px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #538dd5;
.header-right{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
    div {
      flex-grow: 1;

      h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 450;
        text-align: start;
        text-transform: uppercase;
        color: white;
      }
    }
  }

  .body {
    margin-top: 20px;
    padding: 10px;

    fieldset {
      border: 1px #005cbb solid;
    }

    .solicitante,
    .analise {
      margin-bottom: 10px;
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 10px;
      padding: 10px;
      border: 1px #005cbb solid;

      & > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 10px;
        align-items: center;
        margin-left: 30px;

        & > div,
        & > span {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        fieldset {
          min-width: 130px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          margin: 0;
          border:none;
          border-bottom: 1px solid #ccc;
          border-radius: 2px;
        }
      }
    }

    .tabela-resultado {
      width: 95%;
      margin: 20px 10px;
      display: flex;
      gap: 1px;

      .borda {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        div {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid #a39fa9;
          text-align: center;

          span {
            width: 100%;
          }
        }
      }
    }

    .ensaios {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      .title {
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #538dd5;
        color: white;
        text-transform: uppercase;

        h2 {
          margin: 0;
          text-align: center;
          font-size: 0.7rem;
        }
      }
      .result-item{
        background: #a39fa9;
        color:white;
      }
    }
  }
}
.granulometria{
  display: flex;
  flex-direction: column;
  
}
  .container-assinatura{
  padding: 5px;
width: 100%;
display: flex;
flex-direction: row-reverse;
align-items:center ;
justify-content: space-around;

  .analista-aprovador{
    font-size: small;
    display: flex;
    flex-direction: column;
    border: 1px solid grey;
    border-radius: 4px;
    text-align: center;
div{
  margin: 0 10px;}
.analista-funcao{
  background-color: rgb(221, 221, 221);
}
  }
}

@page {
  size: A4;
  margin: 0;
}

@media print {
  body {
    margin: 0;
    padding: 0;
    background-color: white;
  }

  .page {
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }

  .subpage {
    margin: 0;
    border: none;
    outline: none;
    width: 100%;
    max-width: 100%;
  }

  .header {
    background-color: #538dd5 !important;
    color: white !important;
    height: auto;
    padding: 15px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header h1 {
    font-size: 24px;
    font-weight: 450;
    color: white !important;
    margin: 0;
  }

  .body {
    margin-top: 0;
    padding: 10px;
  }

  .solicitante,
  .analise {
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 10px;
    padding: 10px;
    border: 1px #005cbb solid;
  }

  .tabela-resultado {
    width: 100%;
    margin: 20px 0;
    display: flex;
    gap: 1px;
    page-break-inside: avoid;
  }

  .ensaios {
    margin-top: 20px;
    page-break-inside: avoid;
  }

  .ensaios .title {
    background-color: #538dd5;
    color: white !important;
  }

  .result-item {
    background: #a39fa9 !important;
    color: white !important;
  }

  .container-assinatura {
    margin-top: 20px;
    page-break-inside: avoid;
  }

  * {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* Ensure content fits on page */
  .header,
  .body,
  .solicitante,
  .analise,
  .tabela-resultado,
  .ensaios,
  .container-assinatura {
    page-break-inside: avoid;
  }
}
        </style>`
    return html;
  }

  private renderAnalistas(analistas: IAnalista, ordemDeServico: IOrdemDeServico): string {
    return Object.entries(analistas)
      .map(
        ([key, analista]) => `
        <div class="container-assinatura">
          ${analista ? `
          <div class="analista-aprovador">
            <div>${analista.name?.toUpperCase()}</div>
            <div><small class="analista-funcao">${analista.funcao}</small></div>
            <div><em><strong>${analista.area}</strong></em></div>
          </div>` : ''}
          <div class="analista-aprovador">
            <div>${ordemDeServico.revisor_da_os?.name?.toUpperCase()||  ''}</div>
            <div><small class="analista-funcao">${ordemDeServico.revisor_da_os?.funcao || ''}</small></div>
            <div><em><strong>${ordemDeServico.revisor_da_os?.area || ''}</strong></em></div>
          </div>
        </div>`
      )
      .join('');
  }

  private renderResultadosTable(key: string, value: IResultadoValues): string {
    const isSpecialCase = ['RDI', 'GRANULOMETRIA'].includes(
      key.trim().toUpperCase()
    );
    const entries = Object.entries(value).map((entry) => entry[1]);

    const tableStyle = isSpecialCase
      ? 'style="display: flex;flex-direction: column; flex-wrap: wrap;"'
      : '';

    const rowStyle = isSpecialCase
      ? 'style="display: flex;flex-direction: row; flex-wrap: nowrap;"'
      : '';

    let html = `<div class="tabela-resultado" ${tableStyle}>`;
    entries.forEach((resultado) => {
      html += `
        <div class="borda" ${rowStyle}>
          <div class="result-item">
            <span>${resultado.item}</span>
          </div>
          ${
            !isSpecialCase
              ? `<div class="result-unidade-resultado"><span>${resultado.unidade_resultado}</span></div>`
              : ''
          }
          <div class="result-valor-resultado">
            <span>${this.#helpersService.transformarResultado(resultado.valor_resultado,resultado.casas_decimais)}</span>
          </div>
          ${
            isSpecialCase
              ? `<div class="result-unidade-resultado"><span>${resultado.unidade_resultado}</span></div>`
              : ''
          }
        </div>
      `;
    });
    html += `</div>`;
    return html;
  }

}