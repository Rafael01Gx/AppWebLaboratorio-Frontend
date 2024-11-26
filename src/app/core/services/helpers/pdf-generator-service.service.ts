import { inject, Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  IAmostra,
  IAmostrasCollection,
  IAmostrasResponse,
  IResultado,
  IResultadoValues,
} from '../../../shared/interfaces/IAmostra.interface';
import { IOrdemDeServico, IOrdemDeServicoByOsResponse, IOrdemDeServicoResponse } from '../../../shared/interfaces/IOrdemDeservico.interface';
import { OrdemDeServicoService } from '../ordem-de-servico/ordem-de-servico.service';
import { AmostraService } from '../amostra/amostra.service';

@Injectable({
  providedIn: 'root',
})
export class PdfGeneratorServiceService {
#ordermDeServicoService = inject(OrdemDeServicoService);
#amostraService = inject(AmostraService)



async generatePdfForOsNumer(osNumber: string) {
  try {
    const amostra_response: IAmostrasResponse | undefined = await this.#amostraService.httpListarAmostraByOrdemDeServico(osNumber).toPromise();
    const ordemDeServico_response: IOrdemDeServicoByOsResponse | undefined = await this.#ordermDeServicoService.httpOrdemDeServicoByOsNumber(osNumber).toPromise();
    const amostra = amostra_response!.amostras;
    const ordemDeServico = ordemDeServico_response!.ordemDeServico;
    if(amostra && ordemDeServico) this.generatePdfFromElement(ordemDeServico, amostra);
    console.log(ordemDeServico);   
  } catch (error) {
    console.error('Erro ao gerar o PDF:', error);
  }
}

  async generatePdfFromElement(
    ordemDeServico: IOrdemDeServico,
    amostras: IAmostrasCollection[]
  ): Promise<void> {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    doc.setFont('Helvetica');

    for (const [index, amostra] of amostras.entries()) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = this.createReportTemplate(ordemDeServico, amostra);
      tempDiv.style.width = '210mm';
      tempDiv.style.minHeight = '297mm';
      tempDiv.style.margin = '1cm';
      tempDiv.style.boxSizing = 'border-box';

      const styleElement = document.createElement('style');
      styleElement.textContent = this.getCssStyles();
      tempDiv.appendChild(styleElement);

      document.body.appendChild(tempDiv);

      try {
        const canvas = await html2canvas(tempDiv, {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
          backgroundColor: '#ffffff',
        });

        document.body.removeChild(tempDiv);

        const imgData = canvas.toDataURL('image/png');
        if (!imgData || imgData === 'data:,') {
          throw new Error('Imagem inválida gerada pelo canvas');
        }

        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');

        if (index < amostras.length - 1) {
          doc.addPage();
        }
      } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        document.body.removeChild(tempDiv);
      }
    }

    doc.save(`Relatorio_${ordemDeServico.numeroOs}.pdf`);
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
                    <fieldset><p>GAPSI</p></fieldset>
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
    return html;
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
            <span>${resultado.valor_resultado}</span>
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

  private getCssStyles(): string {
    // Aqui você pode copiar o conteúdo completo do seu SCSS
    return `
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
  min-height: 29.7cm;
  margin: auto;
  border: 1px #d3d3d3 solid;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.subpage {
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

@page {
  size: A4;
  margin: 0;
}

@media print {
  *{
    overflow: hidden;
  }
  html, body {
    height: 100%;
    overflow: visible;
  }

  .book {
    display: block;
    margin: 0;
  }

  .page {
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
    width: 100%;
    height: auto;
    page-break-before: always;
    page-break-after: always;
  }

  .subpage {
    display: block;
    min-height: 100%;
    box-sizing: border-box;
    page-break-inside: avoid;
  }

  * {
    -webkit-print-color-adjust: exact !important;
    color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .header {
    background: #538DD5 !important;
    color: white !important;
    padding: 10px 0;
  }

  .body {
    background: white !important;
    color: black !important;
  }

  .tabela-resultado {
    background: white !important;
    color: #333 !important;
    border: 1px solid #ccc;
    page-break-inside: avoid;
  }

  .result-item {
    background: #a39fa9;
    color: white;
  }

  .ensaios {
    page-break-inside: avoid;
  }
}

    `;
  }
}
